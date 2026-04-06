(function () {
  "use strict";

  /* ───────── constants ───────── */
  var LOGICAL_W = 480;
  var LOGICAL_H = 320;
  var FPS = 12;
  var SCROLL_SPEED = 0.8;

  /* ───────── mono gray palette ───────── */
  var BG = "#f5f5f0";
  var GRAY_1 = "#e0e0e0"; /* lightest */
  var GRAY_2 = "#c8c8c8";
  var GRAY_3 = "#a0a0a0";
  var GRAY_4 = "#808080";
  var GRAY_5 = "#606060";
  var GRAY_6 = "#484848";
  var GRAY_7 = "#333333";
  var GRAY_8 = "#1a1a1a"; /* darkest */

  /* ───────── isometric helpers ───────── */
  /* Isometric projection: x_screen = (ix - iy) * tileW/2
                            y_screen = (ix + iy) * tileH/2  */
  var ISO_ANGLE = Math.PI / 6; /* 30 degrees */

  /* ───────── state ───────── */
  var canvas, ctx;
  var frame = 0;
  var scrollX = 0;

  /* ───────── helpers ───────── */
  function px(x, y, w, h) {
    ctx.fillRect(Math.floor(x), Math.floor(y), w || 1, h || 1);
  }

  /* ───────── init ───────── */
  function init() {
    canvas = document.createElement("canvas");
    canvas.id = "pixel-animation-canvas";
    canvas.width = LOGICAL_W;
    canvas.height = LOGICAL_H;

    /* Find the yellow box (bg-yellow-50) rendered by React and inject into it */
    function tryInject() {
      var target = document.querySelector(".bg-yellow-50");
      if (target) {
        /* Hide any existing children (like the Expand/Collapse button) */
        var children = target.children;
        for (var i = 0; i < children.length; i++) {
          children[i].style.display = "none";
        }
        target.appendChild(canvas);
        target.style.overflow = "hidden";
        target.style.padding = "0";
        /* Remove the old top animation container if it exists */
        var oldContainer = document.getElementById("pixel-animation-container");
        if (oldContainer) oldContainer.remove();

        ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        requestAnimationFrame(loop);
      } else {
        /* React hasn't rendered yet, retry */
        setTimeout(tryInject, 100);
      }
    }
    tryInject();
  }

  /* ───────── draw isometric ground plane ───────── */
  function drawGround() {
    var groundY = LOGICAL_H * 0.72;

    /* ground fill */
    ctx.fillStyle = GRAY_2;
    ctx.fillRect(0, Math.floor(groundY), LOGICAL_W, LOGICAL_H - Math.floor(groundY));

    /* isometric grid lines for ground feel */
    ctx.strokeStyle = GRAY_1;
    ctx.lineWidth = 1;

    /* horizontal perspective lines */
    for (var y = groundY; y < LOGICAL_H; y += 12) {
      ctx.beginPath();
      ctx.moveTo(0, Math.floor(y));
      ctx.lineTo(LOGICAL_W, Math.floor(y));
      ctx.stroke();
    }

    /* diagonal lines going left (isometric) */
    for (var i = -LOGICAL_W; i < LOGICAL_W * 2; i += 30) {
      var ox = ((i - scrollX * 1.2) % (LOGICAL_W * 2) + LOGICAL_W * 2) % (LOGICAL_W * 2) - LOGICAL_W * 0.5;
      ctx.beginPath();
      ctx.moveTo(Math.floor(ox), Math.floor(groundY));
      ctx.lineTo(Math.floor(ox - 80), LOGICAL_H);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(Math.floor(ox), Math.floor(groundY));
      ctx.lineTo(Math.floor(ox + 80), LOGICAL_H);
      ctx.stroke();
    }

    /* road stripe */
    ctx.fillStyle = GRAY_3;
    var roadY = groundY + 14;
    ctx.fillRect(0, Math.floor(roadY), LOGICAL_W, 18);

    /* dashed center line */
    ctx.fillStyle = GRAY_1;
    for (var d = 0; d < LOGICAL_W + 20; d += 20) {
      var dx = ((d - scrollX * 2.0) % (LOGICAL_W + 40) + LOGICAL_W + 40) % (LOGICAL_W + 40) - 20;
      ctx.fillRect(Math.floor(dx), Math.floor(roadY + 8), 10, 2);
    }
  }

  /* ───────── draw isometric mountain ───────── */
  function drawIsometricMountain(cx, baseY, height, shade) {
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(Math.floor(cx), Math.floor(baseY - height));
    ctx.lineTo(Math.floor(cx - height * 1.2), Math.floor(baseY));
    ctx.lineTo(Math.floor(cx + height * 1.2), Math.floor(baseY));
    ctx.closePath();
    ctx.fill();

    /* isometric right face (lighter) */
    ctx.fillStyle = shade === GRAY_5 ? GRAY_4 : shade === GRAY_6 ? GRAY_5 : GRAY_3;
    ctx.beginPath();
    ctx.moveTo(Math.floor(cx), Math.floor(baseY - height));
    ctx.lineTo(Math.floor(cx + height * 1.2), Math.floor(baseY));
    ctx.lineTo(Math.floor(cx + height * 0.4), Math.floor(baseY));
    ctx.closePath();
    ctx.fill();

    /* snow cap */
    var capH = height * 0.2;
    ctx.fillStyle = GRAY_1;
    ctx.beginPath();
    ctx.moveTo(Math.floor(cx), Math.floor(baseY - height));
    ctx.lineTo(Math.floor(cx - capH * 1.2), Math.floor(baseY - height + capH));
    ctx.lineTo(Math.floor(cx + capH * 1.2), Math.floor(baseY - height + capH));
    ctx.closePath();
    ctx.fill();
  }

  /* ───────── mountain ranges ───────── */
  function drawMountains() {
    var baseY = LOGICAL_H * 0.72;

    /* far range (lighter, smaller) */
    var farMtns = [
      { offX: 60, h: 90 },
      { offX: 180, h: 70 },
      { offX: 320, h: 100 },
      { offX: 440, h: 60 },
      { offX: 550, h: 85 },
      { offX: 700, h: 75 },
    ];
    for (var i = 0; i < farMtns.length; i++) {
      var m = farMtns[i];
      var mx = ((m.offX - scrollX * 0.15) % (LOGICAL_W + 300) + LOGICAL_W + 300) % (LOGICAL_W + 300) - 150;
      drawIsometricMountain(mx, baseY, m.h, GRAY_3);
    }

    /* near range (darker, larger) */
    var nearMtns = [
      { offX: 120, h: 65 },
      { offX: 280, h: 50 },
      { offX: 400, h: 70 },
      { offX: 560, h: 55 },
    ];
    for (var j = 0; j < nearMtns.length; j++) {
      var n = nearMtns[j];
      var nx = ((n.offX - scrollX * 0.3) % (LOGICAL_W + 200) + LOGICAL_W + 200) % (LOGICAL_W + 200) - 100;
      drawIsometricMountain(nx, baseY, n.h, GRAY_5);
    }
  }

  /* ───────── isometric bicycle boy ───────── */
  function drawBicycleBoy() {
    var bx = LOGICAL_W * 0.42;
    var by = LOGICAL_H * 0.72 + 18; /* on the road */
    var pedal = frame % 4;
    var spokeAngle = (frame * 0.7) % (Math.PI * 2);
    var bounce = pedal % 2 === 0 ? 0 : -1;

    /* ── shadow on ground (isometric ellipse) ── */
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.beginPath();
    ctx.ellipse(Math.floor(bx + 2), Math.floor(by + 16), 20, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    /* ── back wheel ── */
    drawIsoWheel(bx - 12, by + 8, 8, spokeAngle);

    /* ── front wheel ── */
    drawIsoWheel(bx + 16, by + 8, 8, spokeAngle + 0.5);

    /* ── frame ── */
    ctx.strokeStyle = GRAY_6;
    ctx.lineWidth = 2;

    /* top tube */
    ctx.beginPath();
    ctx.moveTo(Math.floor(bx - 4), Math.floor(by + 1));
    ctx.lineTo(Math.floor(bx + 10), Math.floor(by + 1));
    ctx.stroke();

    /* seat tube */
    ctx.beginPath();
    ctx.moveTo(Math.floor(bx - 4), Math.floor(by + 1));
    ctx.lineTo(Math.floor(bx - 2), Math.floor(by + 8));
    ctx.stroke();

    /* down tube */
    ctx.beginPath();
    ctx.moveTo(Math.floor(bx + 10), Math.floor(by + 1));
    ctx.lineTo(Math.floor(bx + 12), Math.floor(by + 8));
    ctx.stroke();

    /* chain stay */
    ctx.beginPath();
    ctx.moveTo(Math.floor(bx - 2), Math.floor(by + 8));
    ctx.lineTo(Math.floor(bx - 12), Math.floor(by + 8));
    ctx.stroke();

    /* seat stay */
    ctx.beginPath();
    ctx.moveTo(Math.floor(bx - 4), Math.floor(by + 1));
    ctx.lineTo(Math.floor(bx - 12), Math.floor(by + 8));
    ctx.stroke();

    /* fork */
    ctx.beginPath();
    ctx.moveTo(Math.floor(bx + 10), Math.floor(by + 1));
    ctx.lineTo(Math.floor(bx + 16), Math.floor(by + 8));
    ctx.stroke();

    /* seat */
    ctx.fillStyle = GRAY_7;
    ctx.fillRect(Math.floor(bx - 6), Math.floor(by - 1), 5, 2);

    /* handlebar */
    ctx.fillStyle = GRAY_5;
    ctx.fillRect(Math.floor(bx + 10), Math.floor(by - 2), 2, 4);
    ctx.fillRect(Math.floor(bx + 11), Math.floor(by - 3), 3, 2);

    /* ── pedals ── */
    var pedalOffsets = [
      { dx: 0, dy: 3 },
      { dx: 2, dy: 0 },
      { dx: 0, dy: -3 },
      { dx: -2, dy: 0 },
    ];
    var po = pedalOffsets[pedal];
    ctx.fillStyle = GRAY_6;
    ctx.fillRect(Math.floor(bx + po.dx - 1), Math.floor(by + 8 + po.dy), 3, 2);

    /* ── rider ── */

    /* legs */
    ctx.strokeStyle = GRAY_6;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(Math.floor(bx - 2), Math.floor(by + 2 + bounce));
    ctx.lineTo(Math.floor(bx + po.dx), Math.floor(by + 8 + po.dy));
    ctx.stroke();

    /* other leg offset */
    var po2 = pedalOffsets[(pedal + 2) % 4];
    ctx.beginPath();
    ctx.moveTo(Math.floor(bx - 2), Math.floor(by + 2 + bounce));
    ctx.lineTo(Math.floor(bx + po2.dx), Math.floor(by + 8 + po2.dy));
    ctx.stroke();

    /* torso */
    ctx.strokeStyle = GRAY_7;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(Math.floor(bx - 2), Math.floor(by + 2 + bounce));
    ctx.lineTo(Math.floor(bx - 2), Math.floor(by - 8 + bounce));
    ctx.stroke();

    /* arms */
    ctx.strokeStyle = GRAY_6;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(Math.floor(bx - 2), Math.floor(by - 5 + bounce));
    ctx.lineTo(Math.floor(bx + 10), Math.floor(by - 1));
    ctx.stroke();

    /* head */
    ctx.fillStyle = GRAY_5;
    ctx.beginPath();
    ctx.arc(Math.floor(bx - 2), Math.floor(by - 12 + bounce), 4, 0, Math.PI * 2);
    ctx.fill();

    /* cap / hair detail */
    ctx.fillStyle = GRAY_7;
    ctx.beginPath();
    ctx.arc(Math.floor(bx - 2), Math.floor(by - 13 + bounce), 4, Math.PI, Math.PI * 2);
    ctx.fill();
    /* visor */
    ctx.fillRect(Math.floor(bx), Math.floor(by - 13 + bounce), 4, 2);

    /* backpack */
    ctx.fillStyle = GRAY_4;
    ctx.fillRect(Math.floor(bx - 6), Math.floor(by - 7 + bounce), 3, 7);
    ctx.fillRect(Math.floor(bx - 7), Math.floor(by - 5 + bounce), 1, 4);
  }

  /* ── draw isometric wheel ── */
  function drawIsoWheel(cx, cy, r, angle) {
    /* rim */
    ctx.strokeStyle = GRAY_6;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(Math.floor(cx), Math.floor(cy), r, 0, Math.PI * 2);
    ctx.stroke();

    /* spokes */
    ctx.strokeStyle = GRAY_4;
    ctx.lineWidth = 1;
    for (var s = 0; s < 6; s++) {
      var sa = angle + (s * Math.PI) / 3;
      ctx.beginPath();
      ctx.moveTo(Math.floor(cx), Math.floor(cy));
      ctx.lineTo(Math.floor(cx + Math.cos(sa) * (r - 1)), Math.floor(cy + Math.sin(sa) * (r - 1)));
      ctx.stroke();
    }

    /* hub */
    ctx.fillStyle = GRAY_5;
    ctx.beginPath();
    ctx.arc(Math.floor(cx), Math.floor(cy), 2, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ───────── small rocks / pebbles on ground ───────── */
  function drawPebbles() {
    ctx.fillStyle = GRAY_3;
    for (var i = 0; i < 25; i++) {
      var px_x = ((i * 67 + 23 - scrollX * 1.5) % (LOGICAL_W * 2) + LOGICAL_W * 2) % (LOGICAL_W * 2) - 20;
      if (px_x < 0 || px_x > LOGICAL_W) continue;
      var py_y = LOGICAL_H * 0.72 + 4 + (i % 5) * 2;
      ctx.fillRect(Math.floor(px_x), Math.floor(py_y), 2 + (i % 3), 1);
    }
  }

  /* ───────── distant trees (simple isometric) ───────── */
  function drawTrees() {
    var baseY = LOGICAL_H * 0.72;
    var treeDefs = [
      { offX: 40, h: 25 },
      { offX: 150, h: 18 },
      { offX: 230, h: 22 },
      { offX: 350, h: 15 },
      { offX: 460, h: 20 },
      { offX: 520, h: 17 },
    ];

    for (var i = 0; i < treeDefs.length; i++) {
      var t = treeDefs[i];
      var tx = ((t.offX - scrollX * 0.5) % (LOGICAL_W + 100) + LOGICAL_W + 100) % (LOGICAL_W + 100) - 50;
      if (tx < -20 || tx > LOGICAL_W + 20) continue;

      /* trunk */
      ctx.fillStyle = GRAY_5;
      ctx.fillRect(Math.floor(tx), Math.floor(baseY - t.h), 3, t.h);

      /* isometric triangle crown */
      ctx.fillStyle = GRAY_4;
      ctx.beginPath();
      ctx.moveTo(Math.floor(tx + 1), Math.floor(baseY - t.h - t.h * 0.8));
      ctx.lineTo(Math.floor(tx - t.h * 0.4), Math.floor(baseY - t.h + 3));
      ctx.lineTo(Math.floor(tx + t.h * 0.4 + 3), Math.floor(baseY - t.h + 3));
      ctx.closePath();
      ctx.fill();
    }
  }

  /* ───────── main render ───────── */
  function render() {
    /* clear with background */
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

    /* sky gradient (subtle gray) */
    var grd = ctx.createLinearGradient(0, 0, 0, LOGICAL_H * 0.72);
    grd.addColorStop(0, "#eaeaea");
    grd.addColorStop(1, BG);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, LOGICAL_W, Math.floor(LOGICAL_H * 0.72));

    drawMountains();
    drawTrees();
    drawGround();
    drawPebbles();
    drawBicycleBoy();

    scrollX += SCROLL_SPEED;
    frame++;
  }

  /* ───────── loop (throttled rAF) ───────── */
  var lastTime = 0;
  var frameDuration = 1000 / FPS;

  function loop(timestamp) {
    if (timestamp - lastTime >= frameDuration) {
      lastTime = timestamp - ((timestamp - lastTime) % frameDuration);
      render();
    }
    requestAnimationFrame(loop);
  }

  /* ───────── kick off ───────── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

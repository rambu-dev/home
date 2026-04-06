(function () {
  "use strict";

  /* ───────── constants ───────── */
  var LOGICAL_W = 320;
  var LOGICAL_H = 100;
  var FPS = 10;

  /* ───────── colour palette (8-bit feel) ───────── */
  var SKY_TOP = "#1a1a2e";
  var SKY_BOT = "#0f3460";
  var MOUNTAIN_FAR = "#2a2a4a";
  var MOUNTAIN_MID = "#3a3a5a";
  var MOUNTAIN_NEAR = "#4a4a6a";
  var GROUND = "#3b5323";
  var GROUND_DARK = "#2d4118";
  var ROAD = "#6b6b6b";
  var ROAD_LINE = "#cccc55";
  var STAR = "#ffffff";
  var MOON = "#f0e68c";

  /* boy + bicycle palette */
  var SKIN = "#ffcc99";
  var HAIR = "#4a2800";
  var SHIRT = "#e74c3c";
  var PANTS = "#2980b9";
  var SHOE = "#333333";
  var BIKE_FRAME = "#c0392b";
  var BIKE_WHEEL = "#555555";
  var BIKE_SPOKE = "#999999";
  var BIKE_SEAT = "#4a2800";
  var BIKE_HANDLE = "#888888";

  /* ───────── state ───────── */
  var canvas, ctx;
  var frame = 0;
  var scrollX = 0;
  var stars = [];
  var trees = [];

  /* ───────── helpers ───────── */
  function px(x, y, w, h) {
    ctx.fillRect(Math.floor(x), Math.floor(y), w || 1, h || 1);
  }

  function randInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  /* ───────── init ───────── */
  function init() {
    /* create container */
    var container = document.createElement("div");
    container.id = "pixel-animation-container";

    canvas = document.createElement("canvas");
    canvas.id = "pixel-animation-canvas";
    canvas.width = LOGICAL_W;
    canvas.height = LOGICAL_H;
    container.appendChild(canvas);

    /* insert before #root so it sits at the very top */
    var root = document.getElementById("root");
    if (root) {
      root.parentNode.insertBefore(container, root);
    } else {
      document.body.prepend(container);
    }

    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    /* generate stars */
    for (var i = 0; i < 60; i++) {
      stars.push({ x: randInt(0, LOGICAL_W * 3), y: randInt(2, 35), b: Math.random() });
    }

    /* generate trees */
    for (var j = 0; j < 30; j++) {
      trees.push({ x: randInt(0, LOGICAL_W * 4), h: randInt(8, 18) });
    }

    loop();
  }

  /* ───────── sky gradient ───────── */
  function drawSky() {
    var grd = ctx.createLinearGradient(0, 0, 0, 55);
    grd.addColorStop(0, SKY_TOP);
    grd.addColorStop(1, SKY_BOT);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, LOGICAL_W, 55);
  }

  /* ───────── stars (twinkle) ───────── */
  function drawStars() {
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var sx = ((s.x - scrollX * 0.05) % (LOGICAL_W * 3) + LOGICAL_W * 3) % (LOGICAL_W * 3) - LOGICAL_W;
      if (sx < -2 || sx > LOGICAL_W + 2) continue;
      var twinkle = Math.sin(frame * 0.3 + s.b * 20) * 0.5 + 0.5;
      ctx.globalAlpha = 0.3 + twinkle * 0.7;
      ctx.fillStyle = STAR;
      px(sx, s.y);
      ctx.globalAlpha = 1;
    }
  }

  /* ───────── moon ───────── */
  function drawMoon() {
    var mx = ((250 - scrollX * 0.02) % (LOGICAL_W + 40) + LOGICAL_W + 40) % (LOGICAL_W + 40);
    ctx.fillStyle = MOON;
    for (var dy = -3; dy <= 3; dy++) {
      for (var dx = -3; dx <= 3; dx++) {
        if (dx * dx + dy * dy <= 10) {
          px(mx + dx, 12 + dy);
        }
      }
    }
    /* crater */
    ctx.fillStyle = "#d4c96a";
    px(mx - 1, 11);
    px(mx + 1, 13);
  }

  /* ───────── mountain layer ───────── */
  function drawMountain(baseY, color, speed, seed, peakH) {
    ctx.fillStyle = color;
    var w = LOGICAL_W;
    for (var x = 0; x < w; x++) {
      var wx = x + scrollX * speed;
      /* simple deterministic "terrain" using sine waves */
      var h =
        Math.sin(wx * 0.008 + seed) * peakH +
        Math.sin(wx * 0.02 + seed * 2) * (peakH * 0.35) +
        Math.sin(wx * 0.05 + seed * 3) * (peakH * 0.15);
      var top = baseY - Math.abs(h);
      ctx.fillRect(x, Math.floor(top), 1, Math.floor(baseY - top + 1));
    }
  }

  /* ───────── snow caps ───────── */
  function drawSnow(baseY, speed, seed, peakH) {
    ctx.fillStyle = "#e8e8e8";
    var w = LOGICAL_W;
    for (var x = 0; x < w; x++) {
      var wx = x + scrollX * speed;
      var h =
        Math.sin(wx * 0.008 + seed) * peakH +
        Math.sin(wx * 0.02 + seed * 2) * (peakH * 0.35) +
        Math.sin(wx * 0.05 + seed * 3) * (peakH * 0.15);
      var top = baseY - Math.abs(h);
      if (Math.abs(h) > peakH * 0.7) {
        var snowH = Math.floor((Math.abs(h) - peakH * 0.7) * 0.5);
        ctx.fillRect(x, Math.floor(top), 1, Math.min(snowH, 4));
      }
    }
  }

  /* ───────── ground + road ───────── */
  function drawGround() {
    /* grass */
    ctx.fillStyle = GROUND;
    ctx.fillRect(0, 70, LOGICAL_W, 30);

    /* darker grass stripe */
    ctx.fillStyle = GROUND_DARK;
    ctx.fillRect(0, 72, LOGICAL_W, 2);

    /* road */
    ctx.fillStyle = ROAD;
    ctx.fillRect(0, 78, LOGICAL_W, 12);

    /* road dashes */
    ctx.fillStyle = ROAD_LINE;
    for (var i = 0; i < LOGICAL_W; i += 12) {
      var dx = ((i - scrollX * 1.0) % (LOGICAL_W + 48) + LOGICAL_W + 48) % (LOGICAL_W + 48) - 24;
      if (dx >= -6 && dx < LOGICAL_W) {
        ctx.fillRect(Math.floor(dx), 83, 6, 1);
      }
    }

    /* ground bottom (dirt) */
    ctx.fillStyle = "#5a4630";
    ctx.fillRect(0, 90, LOGICAL_W, 10);
  }

  /* ───────── trees (parallax) ───────── */
  function drawTrees() {
    for (var i = 0; i < trees.length; i++) {
      var t = trees[i];
      var tx = ((t.x - scrollX * 0.6) % (LOGICAL_W * 4) + LOGICAL_W * 4) % (LOGICAL_W * 4) - LOGICAL_W * 0.5;
      if (tx < -10 || tx > LOGICAL_W + 10) continue;

      /* trunk */
      ctx.fillStyle = "#5a3a1a";
      ctx.fillRect(Math.floor(tx), 70 - t.h, 2, t.h);

      /* leaves (triangle-ish) */
      ctx.fillStyle = "#2d5a1e";
      var lh = Math.floor(t.h * 0.7);
      for (var ly = 0; ly < lh; ly++) {
        var lw = Math.floor((lh - ly) * 0.6) + 1;
        ctx.fillRect(Math.floor(tx) + 1 - lw, 70 - t.h - ly, lw * 2 + 1, 1);
      }
    }
  }

  /* ───────── boy on bicycle ───────── */
  function drawBicycleBoy() {
    var bx = 140; /* fixed screen x (center-ish) */
    var by = 75;  /* on the road */
    var pedal = frame % 4; /* pedal rotation phase */

    /* ── wheel animation offset ── */
    var spokeAngle = (frame * 0.8) % (Math.PI * 2);

    /* ── back wheel ── */
    drawWheel(bx - 7, by + 5, 5, spokeAngle);

    /* ── front wheel ── */
    drawWheel(bx + 9, by + 5, 5, spokeAngle + 0.5);

    /* ── frame / body of bike ── */
    ctx.fillStyle = BIKE_FRAME;
    /* seat tube */
    px(bx - 2, by + 1);
    px(bx - 1, by + 2);
    px(bx, by + 3);
    px(bx + 1, by + 4);
    /* top tube */
    px(bx, by + 2);
    px(bx + 1, by + 2);
    px(bx + 2, by + 2);
    px(bx + 3, by + 2);
    px(bx + 4, by + 2);
    /* down tube */
    px(bx + 4, by + 3);
    px(bx + 5, by + 4);
    px(bx + 6, by + 5);
    /* chain stay */
    px(bx - 1, by + 5);
    px(bx - 2, by + 5);
    px(bx - 3, by + 5);
    px(bx - 4, by + 5);
    px(bx - 5, by + 5);
    /* seat stay */
    px(bx - 3, by + 4);
    px(bx - 5, by + 4);

    /* seat */
    ctx.fillStyle = BIKE_SEAT;
    px(bx - 3, by);
    px(bx - 2, by);
    px(bx - 1, by);

    /* handlebar */
    ctx.fillStyle = BIKE_HANDLE;
    px(bx + 5, by);
    px(bx + 5, by + 1);
    px(bx + 6, by);

    /* ── pedals (animated) ── */
    ctx.fillStyle = "#666666";
    var pedalOffsets = [
      { dx: 0, dy: 1 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: -1, dy: 0 },
    ];
    var po = pedalOffsets[pedal];
    px(bx + po.dx, by + 5 + po.dy);

    /* ── rider (boy) ── */
    var bounce = pedal % 2 === 0 ? 0 : -1;

    /* legs (animated with pedals) */
    ctx.fillStyle = PANTS;
    if (pedal === 0 || pedal === 2) {
      px(bx - 1, by + 3 + bounce);
      px(bx, by + 4 + bounce);
    } else if (pedal === 1) {
      px(bx, by + 3 + bounce);
      px(bx + 1, by + 4 + bounce);
    } else {
      px(bx - 2, by + 3 + bounce);
      px(bx - 1, by + 4 + bounce);
    }

    /* shoes */
    ctx.fillStyle = SHOE;
    px(bx + po.dx, by + 5 + po.dy);

    /* body / torso */
    ctx.fillStyle = SHIRT;
    px(bx - 1, by - 1 + bounce);
    px(bx - 1, by - 2 + bounce);
    px(bx, by - 1 + bounce);
    px(bx, by - 2 + bounce);

    /* arms reaching to handlebar */
    ctx.fillStyle = SKIN;
    px(bx + 1, by - 1 + bounce);
    px(bx + 2, by - 1 + bounce);
    px(bx + 3, by);
    px(bx + 4, by);

    /* head */
    ctx.fillStyle = SKIN;
    px(bx - 1, by - 3 + bounce);
    px(bx, by - 3 + bounce);
    px(bx - 1, by - 4 + bounce);
    px(bx, by - 4 + bounce);

    /* hair */
    ctx.fillStyle = HAIR;
    px(bx - 1, by - 5 + bounce);
    px(bx, by - 5 + bounce);
    px(bx + 1, by - 5 + bounce);
    px(bx - 2, by - 4 + bounce);

    /* eye */
    ctx.fillStyle = "#ffffff";
    px(bx, by - 4 + bounce);
    ctx.fillStyle = "#000000";
    // eye blink every ~30 frames
    if (frame % 30 !== 0) {
      px(bx + 1, by - 4 + bounce, 1, 1);
    }
  }

  /* ── draw a single wheel ── */
  function drawWheel(cx, cy, r, angle) {
    /* rim */
    ctx.fillStyle = BIKE_WHEEL;
    for (var a = 0; a < Math.PI * 2; a += 0.3) {
      px(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }

    /* spokes */
    ctx.fillStyle = BIKE_SPOKE;
    for (var s = 0; s < 4; s++) {
      var sa = angle + (s * Math.PI) / 2;
      var sr = r * 0.6;
      px(cx + Math.cos(sa) * sr, cy + Math.sin(sa) * sr);
    }

    /* hub */
    ctx.fillStyle = "#aaaaaa";
    px(cx, cy);
  }

  /* ───────── clouds ───────── */
  function drawClouds() {
    ctx.fillStyle = "rgba(200,200,220,0.3)";
    var clouds = [
      { x: 50, y: 15, w: 20, h: 5 },
      { x: 180, y: 10, w: 25, h: 4 },
      { x: 280, y: 20, w: 15, h: 4 },
    ];
    for (var i = 0; i < clouds.length; i++) {
      var c = clouds[i];
      var cx = ((c.x - scrollX * 0.08) % (LOGICAL_W + 60) + LOGICAL_W + 60) % (LOGICAL_W + 60) - 30;
      /* blocky cloud shape */
      ctx.fillRect(Math.floor(cx), c.y, c.w, c.h);
      ctx.fillRect(Math.floor(cx) + 3, c.y - 2, c.w - 6, 2);
      ctx.fillRect(Math.floor(cx) + 2, c.y + c.h, c.w - 4, 2);
    }
  }

  /* ───────── birds ───────── */
  function drawBirds() {
    ctx.fillStyle = "#222233";
    var birdX = ((frame * 2 + 100) % (LOGICAL_W + 40)) - 20;
    var birdY = 22 + Math.sin(frame * 0.2) * 3;
    var wingUp = frame % 6 < 3;
    /* body */
    px(birdX, birdY);
    /* wings */
    if (wingUp) {
      px(birdX - 1, birdY - 1);
      px(birdX + 1, birdY - 1);
    } else {
      px(birdX - 1, birdY + 1);
      px(birdX + 1, birdY + 1);
    }

    /* second bird */
    var b2x = ((frame * 2 + 160) % (LOGICAL_W + 40)) - 20;
    var b2y = 18 + Math.sin(frame * 0.2 + 1) * 2;
    var w2 = (frame + 2) % 6 < 3;
    px(b2x, b2y);
    if (w2) {
      px(b2x - 1, b2y - 1);
      px(b2x + 1, b2y - 1);
    } else {
      px(b2x - 1, b2y + 1);
      px(b2x + 1, b2y + 1);
    }
  }

  /* ───────── small flowers on ground ───────── */
  function drawFlowers() {
    ctx.fillStyle = "#ff6b9d";
    for (var i = 0; i < 20; i++) {
      var fx = ((i * 53 + 17 - scrollX * 0.8) % (LOGICAL_W * 2) + LOGICAL_W * 2) % (LOGICAL_W * 2) - 20;
      if (fx < 0 || fx > LOGICAL_W) continue;
      px(fx, 71);
      if (i % 3 === 0) {
        ctx.fillStyle = "#ffcc00";
        px(fx, 70);
        ctx.fillStyle = "#ff6b9d";
      }
    }
  }

  /* ───────── main render ───────── */
  function render() {
    ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

    drawSky();
    drawStars();
    drawMoon();
    drawClouds();
    drawBirds();

    /* mountains: far → near */
    drawMountain(60, MOUNTAIN_FAR, 0.1, 0, 22);
    drawSnow(60, 0.1, 0, 22);
    drawMountain(65, MOUNTAIN_MID, 0.2, 5, 18);
    drawSnow(65, 0.2, 5, 18);
    drawMountain(70, MOUNTAIN_NEAR, 0.35, 10, 14);

    drawGround();
    drawTrees();
    drawFlowers();
    drawBicycleBoy();

    scrollX += 1.5;
    frame++;
  }

  /* ───────── loop ───────── */
  function loop() {
    render();
    setTimeout(loop, 1000 / FPS);
  }

  /* ───────── kick off ───────── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

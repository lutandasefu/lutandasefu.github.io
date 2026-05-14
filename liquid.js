(function() {
  var canvas = document.getElementById('liquid-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var mouse = { x: -999, y: -999 };
  var particles = [];
  var animating = true;

  function resize() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    initParticles();
  }

  /* silver liquid particle system */
  function initParticles() {
    particles = [];
    var w = canvas.offsetWidth;
    var h = canvas.offsetHeight;
    var count = Math.floor((w * h) / 800);

    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.008 + 0.002,
        offset: Math.random() * Math.PI * 2,
        /* silver color range */
        lightness: Math.floor(Math.random() * 60 + 160)
      });
    }
  }

  function drawParticles(t) {
    var w = canvas.offsetWidth;
    var h = canvas.offsetHeight;

    ctx.clearRect(0, 0, w, h);

    /* base liquid silver gradient */
    var grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, 'rgba(180, 180, 195, 1)');
    grad.addColorStop(0.3, 'rgba(220, 220, 235, 1)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.7, 'rgba(200, 200, 215, 1)');
    grad.addColorStop(1, 'rgba(160, 160, 175, 1)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    /* moving highlight that follows mouse */
    var mx = mouse.x === -999 ? w / 2 : mouse.x;
    var my = mouse.y === -999 ? h / 2 : mouse.y;
    var highlight = ctx.createRadialGradient(mx, my, 0, mx, my, w * 0.4);
    highlight.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    highlight.addColorStop(0.4, 'rgba(220, 225, 240, 0.2)');
    highlight.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = highlight;
    ctx.fillRect(0, 0, w, h);

    /* flowing silver particles */
    particles.forEach(function(p) {
      var wave = Math.sin(t * p.speed + p.offset);
      var px = p.x + Math.cos(t * p.speed * 0.7 + p.offset) * 12;
      var py = p.y + wave * 8;

      /* mouse influence */
      var dx = px - mx;
      var dy = py - my;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var influence = Math.max(0, 1 - dist / 150);
      px += dx * influence * 0.08;
      py += dy * influence * 0.08;

      var particleGrad = ctx.createRadialGradient(px, py, 0, px, py, p.radius * 3);
      particleGrad.addColorStop(0, 'rgba(' + p.lightness + ',' + p.lightness + ',' + (p.lightness + 10) + ',' + p.alpha + ')');
      particleGrad.addColorStop(1, 'rgba(' + p.lightness + ',' + p.lightness + ',' + p.lightness + ', 0)');

      ctx.beginPath();
      ctx.arc(px, py, p.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = particleGrad;
      ctx.fill();

      /* slow drift */
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    });

    /* flowing liquid streaks */
    for (var i = 0; i < 6; i++) {
      var streakX = (w / 6) * i + Math.sin(t * 0.003 + i) * 40;
      var streakGrad = ctx.createLinearGradient(streakX, 0, streakX + 30, h);
      streakGrad.addColorStop(0, 'rgba(255,255,255,0)');
      streakGrad.addColorStop(0.3 + Math.sin(t * 0.002 + i) * 0.2, 'rgba(255,255,255,0.12)');
      streakGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = streakGrad;
      ctx.fillRect(streakX, 0, 30, h);
    }
  }

  var startTime = null;
  function animate(timestamp) {
    if (!animating) return;
    if (!startTime) startTime = timestamp;
    var t = timestamp - startTime;
    drawParticles(t);
    requestAnimationFrame(animate);
  }

  /* track mouse over heading */
  var heading = document.getElementById('hero-heading');
  if (heading) {
    heading.addEventListener('mousemove', function(e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heading.addEventListener('mouseleave', function() {
      mouse.x = -999;
      mouse.y = -999;
    });
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(animate);
})();

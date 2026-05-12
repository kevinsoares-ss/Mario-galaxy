function initFloatingNav() {
    const nav = document.getElementById('floating-nav');
    const hero = document.getElementById('hero');
  
    if (!nav || !hero) return;
  
    const updateVisibility = () => {
      const threshold = hero.offsetHeight * 0.6;
      const past = window.scrollY > threshold;
      nav.classList.toggle('visible', past);
      nav.setAttribute('aria-hidden', past ? 'false' : 'true');
    };
  
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility, { passive: true });
  }
  
  function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas || !canvas.getContext) return;
  
    const ctx = canvas.getContext('2d', { alpha: true });
    const root = document.documentElement;
  
    function readTokenVars() {
      const s = getComputedStyle(root);
      return {
        bgDeep: s.getPropertyValue('--bg-deep').trim() || '#000000',
        bgMid: s.getPropertyValue('--bg-mid').trim() || '#0a0a1a',
        textMuted: s.getPropertyValue('--text-muted').trim() || 'rgba(245, 240, 232, 0.72)',
        textPrimary: s.getPropertyValue('--text-primary').trim() || '#f5f0e8',
        cosmicCyan: s.getPropertyValue('--cosmic-cyan').trim() || '#5ce0d8',
        accentStar: s.getPropertyValue('--accent-star').trim() || '#ffd23f',
        cosmicPurple: s.getPropertyValue('--cosmic-purple').trim() || '#6a3cbc',
        cosmicRose: s.getPropertyValue('--cosmic-rose').trim() || '#c8508c',
      };
    }
  
    function resolveToRgb(cssColorValue) {
      const probe = document.createElement('span');
      probe.style.cssText = `position:absolute;visibility:hidden;color:${cssColorValue};`;
      document.body.appendChild(probe);
      const rgb = getComputedStyle(probe).color;
      probe.remove();
      return rgb;
    }
  
    function rgbComponents(rgbStr) {
      const m = rgbStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
      return m ? { r: +m[1], g: +m[2], b: +m[3] } : { r: 255, g: 255, b: 255 };
    }
  
    let tokens = readTokenVars();
    let vw, vh, dpr;
    let stars = [];
  
    function rebuildStars() {
      dpr = window.devicePixelRatio || 1;
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  
      const count = Math.floor((vw * vh) / 10000);
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * vw,
          y: Math.random() * vh,
          r: Math.random() * 1.5 + 0.5,
          speed: 0.002 + Math.random() * 0.005, // Velocidade da pulsação
          phase: Math.random() * Math.PI * 2,
          isNear: Math.random() > 0.8,
          glow: Math.random() > 0.9 ? (Math.random() > 0.5 ? 'cyan' : 'gold') : null
        });
      }
    }
  
    const farRgb = rgbComponents(resolveToRgb(tokens.textMuted));
    const nearRgb = rgbComponents(resolveToRgb(tokens.textPrimary));
    const glowCyan = resolveToRgb(tokens.cosmicCyan);
    const glowGold = resolveToRgb(tokens.accentStar);
  
    function draw(now) {
      // Limpar e desenhar fundo
      ctx.fillStyle = tokens.bgDeep;
      ctx.fillRect(0, 0, vw, vh);
  
      // Gradiente radial para profundidade
      const grad = ctx.createRadialGradient(vw/2, vh/3, 0, vw/2, vh/3, vw);
      grad.addColorStop(0, tokens.bgMid);
      grad.addColorStop(1, tokens.bgDeep);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, vw, vh);
  
      const scrollY = window.scrollY;
  
      stars.forEach(s => {
        // Cálculo matemático para piscar (oscilação de opacidade)
        const opacityBase = Math.abs(Math.sin(now * s.speed + s.phase));
        const opacity = s.isNear ? 0.3 + opacityBase * 0.7 : 0.1 + opacityBase * 0.4;
        
        const yPos = s.isNear ? s.y + (scrollY * 0.05) : s.y;
  
        if (s.glow) {
          ctx.save();
          ctx.shadowBlur = opacityBase * 12;
          ctx.shadowColor = s.glow === 'cyan' ? glowCyan : glowGold;
        }
  
        ctx.fillStyle = s.isNear 
          ? `rgba(${nearRgb.r}, ${nearRgb.g}, ${nearRgb.b}, ${opacity})`
          : `rgba(${farRgb.r}, ${farRgb.g}, ${farRgb.b}, ${opacity})`;
  
        ctx.beginPath();
        // O tamanho também oscila levemente para reforçar o efeito visual
        const dynamicRadius = s.r * (0.8 + opacityBase * 0.4);
        ctx.arc(s.x, yPos % vh, dynamicRadius, 0, Math.PI * 2);
        ctx.fill();
  
        if (s.glow) ctx.restore();
      });
  
      requestAnimationFrame(draw);
    }
  
    window.addEventListener('resize', rebuildStars);
    rebuildStars();
    requestAnimationFrame(draw);
  }
   function initHeroScrollAnimation() {
    if(typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap .registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start:'top top',
        end:'+=100%',
      scrub:true,
      pin: '.hero__content-layer',
      pinSpacing:false,
      }
    })
    tl.to('.hero__planet', {scale: 1.5, ease:'none', duration: 1}, 0)

    .to('.hero__mario', {y: '100vh', ease:'none', duration: 2}, 0)
    .to('.hero__mario', {opacity: '0', ease:'none', duration: 1}, 0.5)

    .to('.hero__yoshi', {y: '100vh', ease:'none', duration: 2}, 0)
    .to('.hero__yoshi', {opacity: '0', ease:'none', duration: 1}, 0.5)

    .to('.hero__content-layer', {y: '100vh', ease:'none', duration: 0.9}, 0.9)
    .to('.hero__content-layer', {opacity: '0', ease:'none', duration: 0.5}, 0.5)
  }

  function initCountdown() {
    const countdownContainer = document.querySelector('.countdown-container[data-target-date]');
    if (!countdownContainer) return;

    const targetDate = new Date(countdownContainer.dataset.targetDate);
    if (Number.isNaN(targetDate.valueOf())) return;

    const values = {
      days: countdownContainer.querySelector('[data-countdown="days"]'),
      hours: countdownContainer.querySelector('[data-countdown="hours"]'),
      minutes: countdownContainer.querySelector('[data-countdown="minutes"]'),
      seconds: countdownContainer.querySelector('[data-countdown="seconds"]'),
    };

    if (!values.days || !values.hours || !values.minutes || !values.seconds) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timeoutId = null;

    const pad = (value) => String(value).padStart(2, '0');
    const animate = (element) => {
      if (prefersReducedMotion) return;
      element.classList.add('countdown-value--tick');
      window.setTimeout(() => element.classList.remove('countdown-value--tick'), 220);
    };

    const updateValues = () => {
      const now = Date.now();
      const diff = Math.max(targetDate.getTime() - now, 0);

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      const current = { days, hours, minutes, seconds };

      Object.entries(current).forEach(([key, value]) => {
        const element = values[key];
        if (!element) return;
        const formatted = key === 'days' ? String(value).padStart(2, '0') : pad(value);
        if (element.textContent !== formatted) {
          element.textContent = formatted;
          animate(element);
        }
      });

      if (diff === 0) return;

      const nextTick = 1000 - (Date.now() % 1000);
      timeoutId = window.setTimeout(updateValues, nextTick);
    };

    updateValues();
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && timeoutId === null) {
        updateValues();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
     initHeroScrollAnimation()
    initFloatingNav();
    initStarfield();
    initCountdown();
  });
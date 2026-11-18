(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const colors = ["#F2998C", "#F7D6E0", "#BFD4EC", "#2F4C7E"];

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Título do topo: palavra por palavra ---- */
  const h1 = document.querySelector(".home h1");
  if (h1 && !reduce) {
    let i = 0;
    const wrap = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((t) => {
            if (!t) return;
            if (/^\s+$/.test(t)) return frag.append(" ");
            const s = document.createElement("span");
            s.className = "w";
            s.style.setProperty("--i", i++);
            s.textContent = t;
            frag.append(s);
          });
          n.replaceWith(frag);
        } else wrap(n);
      });
    };
    wrap(h1);
  }

  /* ---- Barra de progresso ---- */
  const bar = document.createElement("div");
  bar.className = "progress";
  document.body.prepend(bar);
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Aparecer ao rolar ---- */
  const targets = document.querySelectorAll(
    ".section__title, .section__lead, .service, .work, .step, .quote, .about__numbers div, .about p, .contact__card",
  );
  if (!reduce && "IntersectionObserver" in window) {
    targets.forEach((el) => {
      const sibs = [...el.parentElement.children].filter((c) =>
        c.matches(targets.length ? "*" : ""),
      );
      el.style.setProperty(
        "--delay",
        Math.min(sibs.indexOf(el), 5) * 90 + "ms",
      );
      el.classList.add("reveal");
    });
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
          // devolve o elemento ao normal para o hover continuar funcionando
          setTimeout(() => e.target.classList.remove("reveal", "in"), 1000);
        }),
      { threshold: 0.15 },
    );
    targets.forEach((el) => io.observe(el));
  }

  /* ---- Contador dos números ---- */
  const counters = document.querySelectorAll("[data-count]");
  const run = (el) => {
    const end = +el.dataset.count,
      pre = el.dataset.prefix || "",
      suf = el.dataset.suffix || "";
    if (reduce) return;
    const t0 = performance.now(),
      dur = 1300;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1),
        v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = pre + v + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            run(e.target);
            co.unobserve(e.target);
          }
        }),
      { threshold: 0.6 },
    );
    counters.forEach((c) => co.observe(c));
  }

  if (!fine || reduce) return;

  /* ---- Cursor de lacinho ---- */
  root.classList.add("has-cursor");
  const cur = document.createElement("div");
  cur.className = "cursor";
  cur.innerHTML =
    '<div class="cursor__inner"><svg viewBox="0 0 64 40"><use href="#bow"/></svg></div>';
  document.body.append(cur);

  let x = innerWidth / 2,
    y = innerHeight / 2,
    cx = x,
    cy = y,
    lx = x,
    ly = y,
    last = 0;
  const loop = () => {
    cx += (x - cx) * 0.25;
    cy += (y - cy) * 0.25;
    cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
    requestAnimationFrame(loop);
  };
  loop();

  const spawn = (px, py, glyph, opts = {}) => {
    const s = document.createElement("span");
    s.className = "spark";
    s.textContent = glyph;
    s.style.left = px + "px";
    s.style.top = py + "px";
    s.style.setProperty("--c", pick(colors));
    s.style.setProperty("--s", (opts.size || 10 + Math.random() * 10) + "px");
    s.style.setProperty("--dx", (opts.dx ?? (Math.random() - 0.5) * 30) + "px");
    s.style.setProperty("--dy", (opts.dy ?? 30 + Math.random() * 30) + "px");
    s.style.setProperty("--r", Math.random() * 180 - 90 + "deg");
    document.body.append(s);
    setTimeout(() => s.remove(), 950);
  };

  addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    cur.style.opacity = 1;
    const now = performance.now();
    if (now - last > 70 && Math.hypot(x - lx, y - ly) > 14) {
      spawn(x, y, pick(["✦", "♡", "✧"]));
      last = now;
      lx = x;
      ly = y;
    }
  });
  document.addEventListener("mouseleave", () => (cur.style.opacity = 0));
  document.addEventListener("mouseover", (e) =>
    cur.classList.toggle("is-link", !!e.target.closest("a, button, .work")),
  );
  addEventListener("mousedown", () => cur.classList.add("is-down"));
  addEventListener("mouseup", () => cur.classList.remove("is-down"));

  /* Clique: explosão de corações */
  addEventListener("click", (e) => {
    for (let i = 0; i < 8; i++) {
      const a = (Math.PI * 2 * i) / 8;
      spawn(e.clientX, e.clientY, "♡", {
        size: 16,
        dx: Math.cos(a) * 50,
        dy: Math.sin(a) * 50,
      });
    }
  });

  /* ---- Cards de trabalho inclinam com o mouse ---- */
  document.querySelectorAll(".work").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5,
        py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
  });
})();

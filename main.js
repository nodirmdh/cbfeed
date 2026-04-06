document.addEventListener("DOMContentLoaded", () => {
  const toTopButtons = document.querySelectorAll(".to-top");

  toTopButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  const normalizePath = (path) => {
    if (!path || path === "/") return "index.html";
    return path.split("/").pop();
  };

  const currentPath = normalizePath(window.location.pathname);

  const menuLinks = document.querySelectorAll(".menu a[href]");
  menuLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    const linkPath = normalizePath(href);
    if (linkPath === currentPath) {
      link.classList.add("is-active");
    }
  });

  const socialMap = {
    instagram: "https://www.instagram.com/cbfeed?igsh=OGV6aGZvc2hnZnMw",
    facebook: "https://www.facebook.com/share/1RU4dd53oR/",
    telegram: "https://t.me/cbfeed1",
  };

  document.querySelectorAll("a").forEach((anchor) => {
    const img = anchor.querySelector("img");
    if (!img) return;
    const src = (img.getAttribute("src") || "").toLowerCase();

    if (src.includes("insta")) {
      anchor.href = socialMap.instagram;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    } else if (src.includes("facebook")) {
      anchor.href = socialMap.facebook;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    } else if (src.includes("telegram")) {
      anchor.href = socialMap.telegram;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }
  });

  const messages = {
    ru: {
      nav: {
        index: "ГЛАВНАЯ",
        about: "О НАС",
        products: "ПРОДУКТЫ",
        investors: "ИНВЕСТОРАМ",
        career: "КАРЬЕРА",
        media: "МЕДИА",
        contacts: "КОНТАКТЫ",
      },
      common: {
        consult: "Получить консультацию",
        gallery: "Галерея",
        leaveRequest: "Оставить заявку",
      },
    },
    uz: {
      nav: {
        index: "BOSH SAHIFA",
        about: "BIZ HAQIMIZDA",
        products: "MAHSULOTLAR",
        investors: "INVESTORLARGA",
        career: "KARYERA",
        media: "MEDIA",
        contacts: "ALOQA",
      },
      common: {
        consult: "Maslahat olish",
        gallery: "Galereya",
        leaveRequest: "So'rov qoldirish",
      },
    },
    en: {
      nav: {
        index: "HOME",
        about: "ABOUT",
        products: "PRODUCTS",
        investors: "INVESTORS",
        career: "CAREER",
        media: "MEDIA",
        contacts: "CONTACTS",
      },
      common: {
        consult: "Get consultation",
        gallery: "Gallery",
        leaveRequest: "Leave request",
      },
    },
  };

  const params = new URLSearchParams(window.location.search);
  const requestedLang = (params.get("lang") || "").toLowerCase();
  const savedLang = (localStorage.getItem("cbfeed-lang") || "").toLowerCase();
  const lang = messages[requestedLang]
    ? requestedLang
    : messages[savedLang]
    ? savedLang
    : "ru";

  localStorage.setItem("cbfeed-lang", lang);

  const langBox = document.querySelector(".langs");
  if (langBox) {
    const links = langBox.querySelectorAll("a");
    links.forEach((a) => {
      const code = (a.textContent || "").trim().toLowerCase();
      if (!["ru", "uz", "en"].includes(code)) return;
      a.href = `${currentPath}?lang=${code}`;
      a.classList.toggle("current", code === lang);
    });
  }

  const setText = (selector, text) => {
    const el = document.querySelector(selector);
    if (el && typeof text === "string") {
      el.textContent = text;
    }
  };

  const t = messages[lang];
  setText('.menu a[href="index.html"]', t.nav.index);
  setText('.menu a[href="about.html"]', t.nav.about);
  setText('.menu a[href="product-list.html"]', t.nav.products);
  setText('.menu a[href="investors.html"]', t.nav.investors);
  setText('.menu a[href="media.html"]', t.nav.media);
  setText(".menu .menu-contact", t.nav.contacts);

  const career = Array.from(document.querySelectorAll(".menu a")).find(
    (a) => (a.getAttribute("href") || "") === "#"
  );
  if (career) career.textContent = t.nav.career;

  setText(".hero-btn", t.common.consult);
  setText('.footer-nav a[href="media.html"]', t.common.gallery);

  document.querySelectorAll('.footer-nav a[href="contact.html"]').forEach((a) => {
    const txt = (a.textContent || "").trim().toLowerCase();
    if (txt.includes("заяв") || txt.includes("leave") || txt.includes("so")) {
      a.textContent = t.common.leaveRequest;
    } else {
      a.textContent = t.nav.contacts;
    }
  });

  const tabsBlock = document.querySelector(".tabs");
  if (!tabsBlock) return;

  const tabButtons = tabsBlock.querySelectorAll("button");
  const setActive = (target) => {
    tabButtons.forEach((b) => b.classList.toggle("active", b === target));
  };

  if (document.body.classList.contains("product-list-page")) {
    const cards = document.querySelectorAll(".product-list-page .list-card");
    cards.forEach((card, idx) => {
      if (!card.dataset.category) {
        card.dataset.category = idx < Math.ceil(cards.length * 0.66) ? "commercial" : "rnd";
      }
    });

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter || "commercial";
        setActive(btn);
        cards.forEach((card) => {
          card.style.display = card.dataset.category === filter ? "flex" : "none";
        });
      });
    });
  }

  if (document.body.classList.contains("product-page")) {
    const title = document.querySelector(".product-page .product-text h3");
    const text = document.querySelector(".product-page .product-text p");
    const btn = document.querySelector(".product-page .order-btn");
    const photo = document.querySelector(".product-page .product-photo");
    if (!title || !text || !btn) return;

    const modes = {
      commercial: {
        title: "Кормовая добавка CBFeed",
        text: "Биотехнологическая кормовая добавка для повышения продуктивности и снижения затрат на корм.",
        cta: "ОФОРМИТЬ ЗАКАЗ",
        photo: "./assets/background-home.svg",
      },
      rnd: {
        title: "CBFeed Bio Mass",
        text: "Пилотное R&D-решение на основе концентрированной биомассы для технологических применений.",
        cta: "ОБСУДИТЬ ПИЛОТ",
        photo: "./assets/certificate.svg",
      },
    };

    const applyMode = (mode) => {
      const cfg = modes[mode] || modes.commercial;
      title.textContent = cfg.title;
      text.textContent = cfg.text;
      btn.textContent = cfg.cta;
      if (photo && cfg.photo) {
        photo.src = cfg.photo;
      }
    };

    tabButtons.forEach((btnTab) => {
      btnTab.addEventListener("click", () => {
        setActive(btnTab);
        applyMode(btnTab.dataset.mode || "commercial");
      });
    });
  }
});

const music = document.getElementById('bgMusic');
const toggle = document.getElementById('musicToggle');

let isPlaying = false;

toggle.addEventListener('click', async () => {
  try {
    if (isPlaying) {
      music.pause();
      toggle.textContent = '— включить музыку';
    } else {
      await music.play();
      toggle.textContent = '— выключить музыку';
    }
    isPlaying = !isPlaying;
  } catch (e) {
    console.log('Автовоспроизведение заблокировано');
  }
});

/* ================= MOBILE CARD SCROLL EFFECT ================= */

if (window.innerWidth <= 768) {

const places = document.querySelectorAll('.place, .note-card');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.85) {
          entry.target.classList.add('is-active');
        } else {
          entry.target.classList.remove('is-active');
        }
      });
    },
    {
      threshold: [0.85]
    }
  );

  places.forEach(place => observer.observe(place));
}

/* ===== DATE SETTINGS ===== */
/* 3 ИЮНЯ 2026, 14:30 */
const weddingDate = new Date("2026-06-03T14:30:00").getTime();

function updateTimer() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) return;

  document.getElementById("days").textContent =
    Math.floor(distance / (1000 * 60 * 60 * 24));

  document.getElementById("hours").textContent =
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  document.getElementById("minutes").textContent =
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  document.getElementById("seconds").textContent =
    Math.floor((distance % (1000 * 60)) / 1000);
}

setInterval(updateTimer, 1000);
updateTimer();

/* ===== Reveal on scroll ===== */
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 120) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* ================= TIMELINE PNG REVEAL ================= */

document.addEventListener('DOMContentLoaded', () => {

  const timelineEvents = document.querySelectorAll('.event');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
        }
      });
    },
    {
      threshold: 0.4
    }
  );

  timelineEvents.forEach(event => observer.observe(event));

});


  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
      preloader.classList.add("hide");
    }, 2000); // дольше держим экран
  });
  
function openMap(e, type) {
  e.preventDefault();

  let lat, lon;

  if (type === 'ceremony') {
    lat = 45.059947;
    lon = 38.987506;
  } else {
    lat = 45.059796;
    lon = 38.988143;
  }

  const yandexUrl = `https://yandex.ru/maps/?pt=${lon},${lat}&z=16`;
  const gis2Url = `https://2gis.ru/geo/${lon},${lat}`;

  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /android|iphone|ipad|ipod/.test(ua);

  // ================= ПК =================
  if (!isMobile) {
    window.open(yandexUrl, "_blank");
    return;
  }

  // ================= МОБИЛКА =================
  // 1. пробуем Яндекс (app)
  const start = Date.now();

  window.location.href = `yandexmaps://maps.yandex.ru/?pt=${lon},${lat}&z=16`;

  // 2. если не открылось → 2ГИС
  setTimeout(() => {
    if (Date.now() - start < 1200) {
      window.location.href = gis2Url;
    }
  }, 1200);

  // 3. финальный fallback → браузер Яндекс.Карт
  setTimeout(() => {
    window.location.href = yandexUrl;
  }, 2500);
}

document.querySelectorAll('.place, .note-card').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

window.addEventListener('scroll', () => {
  document.querySelectorAll('.cover-bg').forEach(el => {
    el.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  });
});
// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

function closeMobileNav() {
  mobileNav.classList.remove('open');
}

// ===== STICKY HEADER SHADOW =====
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  if (window.scrollY > 60) {
    header.style.boxShadow = '0 4px 32px rgba(13,17,28,0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// ===== LIGHTBOX =====
const initLightbox = () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.src = trigger.src;
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.display = 'none';
    }
  });
};

// ===== SCROLL REVEAL =====
const initScrollReveal = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .suite-card, .mega-gallery-slot').forEach(el => {
    observer.observe(el);
  });
};

// ===== AMENITIES SLIDER =====
const initAmenitiesSlider = () => {
  const track = document.getElementById('amenities-track');
  if (!track) return;

  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  track.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
};

// ===== ROOM CAROUSELS =====
const initCarousels = () => {
  const carousels = document.querySelectorAll('.room-carousel');
  
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = carousel.querySelector('.next');
    const prevBtn = carousel.querySelector('.prev');
    const dotsNav = carousel.querySelector('.carousel-dots');
    
    let currentIdx = 0;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => moveToSlide(i));
      dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);

    const updateDots = (index) => {
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    };

    const moveToSlide = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      currentIdx = index;
      updateDots(index);
    };

    nextBtn.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % slides.length;
      moveToSlide(currentIdx);
    });

    prevBtn.addEventListener('click', () => {
      currentIdx = (currentIdx - 1 + slides.length) % slides.length;
      moveToSlide(currentIdx);
    });

    // Touch-Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});

    const handleSwipe = () => {
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        currentIdx = (currentIdx + 1) % slides.length;
        moveToSlide(currentIdx);
      } else if (touchEndX - touchStartX > swipeThreshold) {
        currentIdx = (currentIdx - 1 + slides.length) % slides.length;
        moveToSlide(currentIdx);
      }
    };
  });
};

// ===== AUDIO TOGGLE =====
const initAudioToggles = () => {
  const toggles = document.querySelectorAll('.audio-toggle');
  
  toggles.forEach(toggle => {
    const video = toggle.closest('.carousel-slide').querySelector('video');
    const unmuteIcon = toggle.querySelector('.icon-unmute');
    const muteIcon = toggle.querySelector('.icon-mute');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (video.muted) {
        video.muted = false;
        unmuteIcon.style.display = 'block';
        muteIcon.style.display = 'none';
      } else {
        video.muted = true;
        unmuteIcon.style.display = 'none';
        muteIcon.style.display = 'block';
      }
    });
  });
};

// ===== BOOKING FORM INTERACTION =====
const initBookingForm = () => {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.querySelector('input[type="text"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const checkIn = form.querySelectorAll('input[type="date"]')[0].value;
    const checkOut = form.querySelectorAll('input[type="date"]')[1].value;
    const guests = form.querySelector('select').value;
    const message = form.querySelector('textarea').value;

    const whatsappText = `Hi The Urban Homestay, I'd like to request a booking.%0A%0A` +
      `*Name:* ${name}%0A` +
      `*Phone:* ${phone}%0A` +
      `*Check-In:* ${checkIn}%0A` +
      `*Check-Out:* ${checkOut}%0A` +
      `*Guests:* ${guests}%0A` +
      `*Message:* ${message}`;

    const whatsappUrl = `https://wa.me/919707647235?text=${whatsappText}`;
    window.open(whatsappUrl, '_blank');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initLightbox();
  initAudioToggles();
  initScrollReveal();
  initAmenitiesSlider();
  initBookingForm();
});

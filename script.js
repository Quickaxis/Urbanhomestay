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
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const triggers = document.querySelectorAll('.lightbox-trigger');
  
  let currentImages = [];
  let currentIdx = 0;

  if (!lightbox || !lightboxImg || !closeBtn) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const carousel = trigger.closest('.room-carousel');
      if (carousel) {
        currentImages = Array.from(carousel.querySelectorAll('.lightbox-trigger')).map(img => img.src);
        currentIdx = currentImages.indexOf(trigger.src);
      } else {
        currentImages = [trigger.src];
        currentIdx = 0;
      }
      
      showLightboxImage(currentIdx);
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  const showLightboxImage = (index) => {
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = currentImages[index];
      lightboxImg.style.opacity = '1';
    }, 150);
  };

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx - 1 + currentImages.length) % currentImages.length;
    showLightboxImage(currentIdx);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx + 1) % currentImages.length;
    showLightboxImage(currentIdx);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-img-wrap')) {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') closeBtn.click();
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
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
    const room = document.getElementById('room-select').value;
    const guests = document.getElementById('guest-select').value;
    const preference = document.getElementById('preference-select').value;
    const message = form.querySelector('textarea').value;

    const whatsappText = `Hi The Urban Homestay, I'd like to request a booking.%0A%0A` +
      `*Name:* ${name}%0A` +
      `*Phone:* ${phone}%0A` +
      `*Room:* ${room}%0A` +
      `*Preference:* ${preference}%0A` +
      `*Check-In:* ${checkIn}%0A` +
      `*Check-Out:* ${checkOut}%0A` +
      `*Guests:* ${guests}%0A` +
      `*Message:* ${message}`;

    const whatsappUrl = `https://wa.me/919707647235?text=${whatsappText}`;
    window.open(whatsappUrl, '_blank');
  });
};

// ===== INTERACTIVE WHATSAPP BOOKING =====
window.toggleBooking = (suiteId) => {
  const selectors = document.getElementById(`selectors-${suiteId}`);
  const cardContent = selectors.closest('.card-content');
  const toggleBtn = cardContent.querySelector('.toggle-booking');
  const note = cardContent.querySelector('.room-note');
  
  if (selectors.style.display === 'none') {
    selectors.style.display = 'block';
    if (toggleBtn) toggleBtn.style.display = 'none';
    if (note) note.style.display = 'none';
    
    updateRoomBooking(suiteId);
  }
};

const roomBookingData = {
  "01": {
    name: "Deer Bliss (Room No. 1)",
    prices: {
      "AC|2 Guests": 2200,
      "AC|Up to 4 Guests": 3000,
      "Non AC|2 Guests": null,
      "Non AC|Up to 4 Guests": 2600
    }
  },
  "03": {
    name: "Deluxe 2 Room Suite (Room No 3)",
    prices: {
      "AC|2 Guests": 2200,
      "AC|Up to 4 Guests": 3000,
      "Non AC|2 Guests": 1700,
      "Non AC|Up to 4 Guests": 2600
    }
  },
  "05": {
    name: "Deep Sea Suite (Room No 5)",
    prices: {
      "AC|": 2200,
      "Non AC|": 1700
    }
  },
  "06": {
    name: "Sunshine Premium Suite (Room No 6)",
    prices: {
      "AC Only|": 2999,
      "AC|": 2999
    }
  }
};

window.updateRoomBooking = (roomId, btn) => {
  const container = document.getElementById(`selectors-${roomId}`);
  if (!container) return;

  // Toggle active class inside button groups
  if (btn) {
    if (btn.classList.contains('type-pill')) {
      container.querySelectorAll('.type-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
    } else if (btn.classList.contains('pax-pill')) {
      container.querySelectorAll('.pax-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
    }
  }

  // Auto-switching constraints for Room 1 (Deer Bliss)
  if (roomId === '01') {
    const activeTypePill = container.querySelector('.type-pill.active');
    const activeType = activeTypePill ? activeTypePill.getAttribute('data-type') : null;
    const activePaxPill = container.querySelector('.pax-pill.active');
    const activePax = activePaxPill ? activePaxPill.getAttribute('data-guests') : null;

    if (activeType === 'Non AC' && activePax === '2 Guests') {
      if (btn && btn.classList.contains('pax-pill')) {
        // User clicked "2 Guests" -> switch type back to AC
        const acPill = container.querySelector('.type-pill[data-type="AC"]');
        if (acPill) {
          container.querySelectorAll('.type-pill').forEach(p => p.classList.remove('active'));
          acPill.classList.add('active');
        }
      } else {
        // User clicked "Non AC" -> switch guests to "Up to 4 Guests"
        const upTo4Pill = container.querySelector('.pax-pill[data-guests="Up to 4 Guests"]');
        if (upTo4Pill) {
          container.querySelectorAll('.pax-pill').forEach(p => p.classList.remove('active'));
          upTo4Pill.classList.add('active');
        }
      }
    }
  }

  // Read current active states
  const activeTypePill = container.querySelector('.type-pill.active');
  const activeType = activeTypePill ? (activeTypePill.getAttribute('data-type') || activeTypePill.textContent.trim()) : 'AC';
  const activePaxPill = container.querySelector('.pax-pill.active');
  const activePax = activePaxPill ? (activePaxPill.getAttribute('data-guests') || activePaxPill.textContent.trim()) : '';

  const roomInfo = roomBookingData[roomId];
  if (!roomInfo) return;

  const priceKey = `${activeType}|${activePax}`;
  const price = roomInfo.prices[priceKey];

  // Build the display text: e.g. "Selected: AC · 2 Guests · ₹2,200"
  let displayParts = [];
  displayParts.push(`Selected: ${activeType}`);
  if (activePax) {
    displayParts.push(activePax);
  }
  if (price !== null && price !== undefined) {
    displayParts.push(`₹${price.toLocaleString()}`);
  } else {
    displayParts.push('Not Available');
  }
  const displayText = displayParts.join(' · ');

  // Update selected price display element
  const summaryEl = container.querySelector('.selected-price-display');
  if (summaryEl) {
    summaryEl.textContent = displayText;
  }

  // Update WhatsApp link
  const waLink = container.querySelector('.wa-btn');
  if (waLink && price !== null && price !== undefined) {
    let messageText = '';
    if (activePax) {
      messageText = `Hi, I want to book ${roomInfo.name} for ${activePax} with ${activeType}. Price ₹${price.toLocaleString()}.`;
    } else {
      messageText = `Hi, I want to book ${roomInfo.name} with ${activeType}. Price ₹${price.toLocaleString()}.`;
    }
    waLink.href = `https://wa.me/919707647235?text=${encodeURIComponent(messageText)}`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initLightbox();
  initAudioToggles();
  initScrollReveal();
  initAmenitiesSlider();
  initBookingForm();
});

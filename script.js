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
    const message = form.querySelector('textarea').value;

    const whatsappText = `Hi The Urban Homestay, I'd like to request a booking.%0A%0A` +
      `*Name:* ${name}%0A` +
      `*Phone:* ${phone}%0A` +
      `*Room:* ${room}%0A` +
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
  }
};

window.updatePrice = (suiteId, type, price) => {
  // Update UI Pills
  const container = document.getElementById(`selectors-${suiteId}`);
  const pills = container.querySelectorAll('.option-pill');
  pills.forEach(p => {
    p.classList.remove('active');
    if (p.innerText.trim().toUpperCase() === type.toUpperCase()) {
      p.classList.add('active');
    }
  });
  
  // Update Price Display
  const card = container.closest('.suite-card');
  const priceDisplay = card.querySelector('.price-tag') || card.querySelector('.price-value');
  if (priceDisplay) {
    priceDisplay.innerText = `₹${price.toLocaleString()}/- per night`;
  }
};

window.updateDeluxe = (suiteId, type, pax) => {
  const container = document.getElementById(`selectors-${suiteId}`);
  const card = container.closest('.suite-card');
  
  // Update state from active pills
  if (type) {
    container.querySelectorAll('.type-pill').forEach(p => {
      p.classList.remove('active');
      if (p.innerText.trim().toUpperCase() === type.toUpperCase()) {
        p.classList.add('active');
      }
    });
  }
  if (pax) {
    container.querySelectorAll('.pax-pill').forEach(p => {
      p.classList.remove('active');
      if (p.innerText.trim().toUpperCase() === pax.toUpperCase()) {
        p.classList.add('active');
      }
    });
  }
  
  const activeType = container.querySelector('.type-pill.active')?.innerText;
  const activePax = container.querySelector('.pax-pill.active')?.innerText;
  
  if (!activeType || !activePax) return;

  // Price Mapping for Deluxe (Room 3)
  let price = 0;
  if (activeType === 'AC') {
    price = (activePax === '2 PERSONS') ? 2200 : 2800;
  } else {
    price = (activePax === '2 PERSONS') ? 1700 : 2500;
  }
  
  // Update UI
  let priceValueEl = card.querySelector('.price-tag') || card.querySelector('.price-value');
  if (priceValueEl) {
    priceValueEl.innerText = `₹${price.toLocaleString()}/- per night`;
  } else {
    const suitePriceEl = card.querySelector('.suite-price');
    if (suitePriceEl) {
      suitePriceEl.innerHTML = `<span class="price-tag">₹${price.toLocaleString()}/- per night</span>`;
    }
  }
  
  const priceSecondary = card.querySelector('.price-secondary');
  if (priceSecondary) priceSecondary.style.display = 'none';
};

// Senior Frontend Engineer Implementation
window.togglePref = (btn, suiteId, type, pax) => {
  const parent = btn.parentElement;
  parent.querySelectorAll('.option-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  
  // Maintain dynamic price updates
  if (suiteId === '03') {
    updateDeluxe(suiteId, type, pax);
  } else if (suiteId === '05') {
    // For Room 05, type is the 2nd arg, price is the 3rd
    const price = type === 'AC' ? 2200 : 1700;
    updatePrice(suiteId, type, price);
  }
};

window.bookUrbanHomestay = (suiteId) => {
  const container = document.getElementById(`selectors-${suiteId}`);
  const card = container.closest('.suite-card');
  
  const acChoice = container.querySelector('.ac-row .active')?.innerText || 
                   container.querySelector('.type-pill.active')?.innerText || 'Not specified';
  const capacityChoice = container.querySelector('.capacity-row .active')?.innerText || 
                         container.querySelector('.pax-pill.active')?.innerText || 'Not specified';
  const price = card.querySelector('.price-tag')?.innerText || 
                card.querySelector('.price-value')?.innerText || 'See pricing';
  
  const message = `Hello Urban Homestay, I want to book a room. Preference: ${acChoice}, Guests: ${capacityChoice}, Rate: ${price}.`;
  const whatsappUrl = `https://wa.me/918471887311?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappUrl, '_blank');
};

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initLightbox();
  initAudioToggles();
  initScrollReveal();
  initAmenitiesSlider();
  initBookingForm();
});

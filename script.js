document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Typing Text Animation
  // ==========================================================================
  const typingText = document.getElementById('typing-text');
  const occupations = [
    'AIML Developer',
    'Computer Vision Specialist',
    'Data Analyst',
    'AI Engineer'
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentWord = occupations[wordIndex];
    
    if (isDeleting) {
      // Remove characters
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Faster deleting speed
    } else {
      // Add characters
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100; // Normal typing speed
    }

    // Word completion states
    if (!isDeleting && charIndex === currentWord.length) {
      // Wait before starting deletion
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Move to next word
      wordIndex = (wordIndex + 1) % occupations.length;
      typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Start typing loop if element exists
  if (typingText) {
    setTimeout(typeEffect, 800);
  }


  // ==========================================================================
  // 2. Mobile Navbar Menu Toggle
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });
  }

  // Close mobile menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  });


  // ==========================================================================
  // 3. Scroll Effects: Active Navbar Links & Sticky Header
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Navbar sticky height reduction
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlighting active section link
    let currentSectionId = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // adjust offset for nav bar height
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSectionId) {
        link.classList.add('active');
      }
    });
  });


  // ==========================================================================
  // 4. Reveal on Scroll Animation (IntersectionObserver)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, no need to track it further
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px' // offset bottom triggers slightly
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  // ==========================================================================
  // 5. Certificate Viewer Modal
  // ==========================================================================
  const certModal = document.getElementById('cert-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const downloadLink = document.getElementById('modal-download-link');
  const certButtons = document.querySelectorAll('.view-cert-btn');

  function openCertificate(filePath) {
    if (!certModal) return;

    // Extract filename for modal title
    const parts = filePath.split('/');
    const filenameWithExt = parts[parts.length - 1];
    
    // Format title from filename
    let formattedTitle = decodeURIComponent(filenameWithExt)
      .replace(/\.[^/.]+$/, "") // strip extension
      .replace(/[_-]/g, " ") // replace underscores/dashes with spaces
      .toUpperCase();

    // Map specific files to nicer titles
    if (filenameWithExt.includes('IIT CERTIFICATE')) {
      formattedTitle = "EDIFICIO'24 IIT JODHPUR - 1ST POSITION CERTIFICATE";
    } else if (filenameWithExt.includes('GPC MAJOR PROJECT')) {
      formattedTitle = "BEST MAJOR PROJECT AWARD CERTIFICATE";
    } else if (filenameWithExt.includes('DRDO certificate')) {
      formattedTitle = "DRDO RESEARCH INTERNSHIP CERTIFICATE";
    } else if (filenameWithExt.includes('Secure Meters certificate')) {
      formattedTitle = "SECURE METERS LTD. INTERNSHIP CERTIFICATE";
    } else if (filenameWithExt.includes('JDA CERTIFICATE')) {
      formattedTitle = "JODHPUR DEVELOPMENT AUTHORITY PROJECT CERTIFICATE";
    } else if (filenameWithExt.includes('Volunteer certificate')) {
      formattedTitle = "VOLUNTEER SERVICE RECOGNITION";
    } else if (filenameWithExt.includes('completion_certificate')) {
      formattedTitle = "IBM DATA ANALYST PROFESSIONAL CERTIFICATION";
    } else if (filenameWithExt.includes('1763580136986')) {
      formattedTitle = "ENCARTA '24 ANCHORING CERTIFICATE OF HONOR";
    } else if (filenameWithExt.includes('1765567207226')) {
      formattedTitle = "TCS FORAGE DATA VISUALIZATION CERTIFICATE";
    } else if (filenameWithExt.includes('download')) {
      formattedTitle = "GOOGLE CLOUD PLATFORM CERTIFICATION - SIMPLILEARN";
    }

    modalTitle.textContent = formattedTitle;
    modalBody.innerHTML = ''; // Clear previous content

    const extension = filePath.split('.').pop().toLowerCase();
    
    if (extension === 'pdf') {
      // Create PDF Embed object
      const embed = document.createElement('object');
      embed.data = filePath;
      embed.type = 'application/pdf';
      embed.className = 'modal-preview-pdf';
      
      // Fallback text/link if browser does not support inline PDFs
      const fallback = document.createElement('p');
      fallback.style.padding = '20px';
      fallback.style.textAlign = 'center';
      fallback.innerHTML = `This browser does not support inline PDF viewing. Please click the button below to view it.<br><br><a href="${filePath}" target="_blank" class="btn btn-primary">Open PDF in New Tab</a>`;
      
      embed.appendChild(fallback);
      modalBody.appendChild(embed);
    } else if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) {
      // Create Image tag
      const img = document.createElement('img');
      img.src = filePath;
      img.alt = formattedTitle;
      img.className = 'modal-preview-img';
      modalBody.appendChild(img);
    } else {
      // Generic fallback
      modalBody.innerHTML = `<p style="padding: 20px;">Cannot preview file type. <a href="${filePath}" target="_blank">Open in browser instead</a></p>`;
    }

    // Configure download / new-tab action
    if (downloadLink) {
      downloadLink.href = filePath;
    }

    // Show modal
    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock page scroll
  }

  function closeCertificate() {
    if (!certModal) return;
    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Unlock page scroll
    
    // Clear out embed objects to release memory/stop background processes
    setTimeout(() => {
      modalBody.innerHTML = '';
    }, 300);
  }

  // Bind trigger buttons
  certButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filePath = btn.getAttribute('data-file');
      if (filePath) {
        openCertificate(filePath);
      }
    });
  });

  // Bind close buttons
  if (modalClose) modalClose.addEventListener('click', closeCertificate);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeCertificate);
  
  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      closeCertificate();
    }
  });


  // ==========================================================================
  // 6. Contact Form Success Simulation
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Feedback button animation
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      
      // Simulate form submission network call
      setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Show success status
        formStatus.textContent = "Thank you, Suvidh! Your message has been sent successfully. (Note: This is a simulation. For live emails, integrate this form with a service like EmailJS or a backend server.)";
        formStatus.className = "form-status success";
        
        // Reset form inputs
        contactForm.reset();
        
        // Auto fadeout message after 8 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 8000);
        
      }, 1500);
    });
  }

});

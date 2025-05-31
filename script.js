// Portfolio Items Data
const portfolioItems = [
  {
    image: "https://static.readdy.ai/image/45f5a755c5aaf69b77bf8ac7ff2528de/e9064aae2d9e883a5ccfd07c8c05e0d7.jpeg",
    title: "Product Packaging Design"
  },
  {
    image: "https://static.readdy.ai/image/45f5a755c5aaf69b77bf8ac7ff2528de/2b59c2df5fccb82a948e445272e7cdcb.jpeg",
    title: "Ladies Night Campaign"
  },
  {
    image: "https://static.readdy.ai/image/45f5a755c5aaf69b77bf8ac7ff2528de/5b4c9c60e3d498a17fe3300baf6df848.jpeg",
    title: "Ladies Night Campaign"
  },
  {
    image: "https://static.readdy.ai/image/45f5a755c5aaf69b77bf8ac7ff2528de/f1e008baf4af82e2f80ecde89f80f360.jpeg",
    title: "Product Photography"
  },
  {
    image: "https://static.readdy.ai/image/45f5a755c5aaf69b77bf8ac7ff2528de/acbb2332457c6997c4275a417dfecf54.png",
    title: "Multi-Device Connection"
  },
  {
    image: "https://static.readdy.ai/image/45f5a755c5aaf69b77bf8ac7ff2528de/e90461f78729bcbfc33d64747b00f76a.png",
    title: "Social Media Campaign"
  }
];

// Create portfolio item elements
function createPortfolioItem(item) {
  return `
    <div class="portfolio-item">
      <img src="${item.image}" alt="${item.title}" class="portfolio-img">
      <div class="portfolio-overlay">
        <h3 class="portfolio-title">${item.title}</h3>
      </div>
    </div>
  `;
}

// Load portfolio items into the container
function loadPortfolioItems() {
  const container = document.getElementById('portfolioContainer');
  portfolioItems.forEach(item => {
    container.innerHTML += createPortfolioItem(item);
  });
}

// Clone and append portfolio items for infinite scroll effect
function cloneAndAppendItems() {
  const container = document.getElementById('portfolioContainer');
  const items = Array.from(container.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    container.appendChild(clone);
  });
}

// Handle mobile menu toggle
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const logo = document.querySelector('.logo-img');
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    
    if (mobileMenu.style.display === 'block') {
      logo.classList.add('mobile-active');
    } else {
      logo.classList.remove('mobile-active');
    }
  });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
  // Home link scrolling
  document.querySelectorAll('a[href="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu && mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
        document.querySelector('.logo-img').classList.remove('mobile-active');
      }
    });
  });
  
  // Section links scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.style.display === 'block') {
          mobileMenu.style.display = 'none';
        }
      }
    });
  });
}

// Setup button actions
function setupButtons() {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
      const buttonText = this.textContent.trim();
      
      if (buttonText === 'Book Free Call' || buttonText.includes('Get Started')) {
        scrollToSection('#contact');
      } else if (buttonText === 'Learn More') {
        scrollToSection('#services');
      }
    });
  });
}

// Helper function to scroll to a section
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (section) {
    const headerOffset = 80;
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.style.display === 'block') {
      mobileMenu.style.display = 'none';
    }
  }
}

// Setup intersection observer for animations
function setupAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('stats-count')) {
          animateValue(entry.target, 0, parseInt(entry.target.textContent), 2000);
        }
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.stats-count').forEach(el => observer.observe(el));
}

// Animate counting for statistics
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.textContent = Math.floor(progress * (end - start) + start) + '+';
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Setup portfolio scrolling animation
function setupPortfolioScroll() {
  const container = document.getElementById('portfolioContainer');
  if (!container) return;

  loadPortfolioItems();
  cloneAndAppendItems();

  // Add CSS for portfolio items
  const style = document.createElement('style');
  style.textContent = `
    .portfolio-item {
      position: relative;
      overflow: hidden;
      width: 280px;
      height: 200px;
      border-radius: 8px;
    }
    
    @media (min-width: 640px) {
      .portfolio-item {
        width: 400px;
        height: 250px;
      }
    }
    
    .portfolio-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .portfolio-overlay {
      position: absolute;
      inset: 0;
      background-color: rgba(109, 106, 200, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .portfolio-item:hover .portfolio-overlay {
      opacity: 1;
    }
    
    .portfolio-title {
      color: white;
      font-weight: bold;
      text-align: center;
      padding: 0 1rem;
      font-size: 1.125rem;
    }
    
    @media (min-width: 640px) {
      .portfolio-title {
        font-size: 1.25rem;
      }
    }
  `;
  document.head.appendChild(style);

  // Manual portfolio animation
  let scrollPosition = 0;
  let scrollDirection = 1;
  let scrollSpeed = 0.5;
  let isPaused = false;

  function animate() {
    if (!isPaused) {
      scrollPosition += scrollDirection * scrollSpeed;
      const maxScroll = container.scrollWidth / 2;
      
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      container.style.transform = `translateX(${-scrollPosition}px)`;
    }
    requestAnimationFrame(animate);
  }

  container.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  container.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  animate();
}

// Setup contact form submission with EmailJS
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  // Initialize EmailJS
  emailjs.init('gcULbDlD5aK8ODPg3');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Send the email using EmailJS
    emailjs.send('service_9zk5y8k', 'template_o0q7gpv', {
      from_name: data.name,
      from_email: data.email,
      message: data.message
    }).then(response => {
      console.log('Email sent successfully:', response);
      showNotification('Message sent successfully!', 'success');
      contactForm.reset();
    }).catch(error => {
      console.error('Email sending failed:', error);
      showNotification('Failed to send message. Please try again.', 'error');
    });
  });
}

// Helper function to show notifications
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Add CSS for notifications
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 1rem;
      right: 1rem;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      z-index: 1100;
    }
    
    .notification.success {
      background-color: #10b981;
    }
    
    .notification.error {
      background-color: #ef4444;
    }
    
    .notification.show {
      transform: translateX(0);
    }
  `;
  document.head.appendChild(style);

  // Animate notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupMobileMenu();
  setupSmoothScrolling();
  setupButtons();
  setupAnimations();
  setupPortfolioScroll();
  setupContactForm();
});
/**
 * SuperChat Website - Interactive Features
 * Handles navigation, form validation, tab switching, and animations
 */

// ===================================
// Mobile Navigation Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
});

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// Tab Switching for Workflow Nodes
// ===================================
const categoryTabs = document.getElementById('categoryTabs');
if (categoryTabs) {
    const tabButtons = categoryTabs.querySelectorAll('.tab-btn');
    const nodeGrids = document.querySelectorAll('.nodes-grid');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all node grids
            nodeGrids.forEach(grid => grid.classList.remove('active'));
            
            // Show selected category grid
            const selectedGrid = document.querySelector(`[data-category-content="${category}"]`);
            if (selectedGrid) {
                selectedGrid.classList.add('active');
            }
        });
    });
}

// ===================================
// Contact Form Validation & Submission
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        let isValid = true;
        let errors = [];
        
        // Validate required fields
        if (!data.firstName || data.firstName.trim() === '') {
            errors.push('First name is required');
            isValid = false;
        }
        
        if (!data.lastName || data.lastName.trim() === '') {
            errors.push('Last name is required');
            isValid = false;
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Valid email address is required');
            isValid = false;
        }
        
        if (!data.company || data.company.trim() === '') {
            errors.push('Company name is required');
            isValid = false;
        }
        
        if (!data.inquiryType || data.inquiryType === '') {
            errors.push('Please select an inquiry type');
            isValid = false;
        }
        
        if (!data.message || data.message.trim() === '') {
            errors.push('Message is required');
            isValid = false;
        }
        
        if (!data.terms) {
            errors.push('You must agree to the terms and privacy policy');
            isValid = false;
        }
        
        const formMessage = document.getElementById('formMessage');
        
        if (!isValid) {
            // Show errors
            showFormMessage(formMessage, errors.join('<br>'), 'error');
            return;
        }
        
        // Simulate form submission (in production, send to server)
        showFormMessage(formMessage, 'Sending...', 'info');
        
        setTimeout(() => {
            // Success message
            showFormMessage(formMessage, 
                'Thank you for contacting us! We\'ll get back to you within 24 hours.', 
                'success');
            
            // Reset form
            contactForm.reset();
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show form message helper
function showFormMessage(element, message, type) {
    if (!element) return;
    
    element.innerHTML = message;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
    
    // Auto-hide after 10 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 10000);
    }
}

// ===================================
// Scroll Animations (Fade in on scroll)
// ===================================
function animateOnScroll() {
    const elements = document.querySelectorAll('.model-card, .arch-card, .deploy-card, .stack-card, .team-member, .value-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll animations
if (window.innerWidth > 768) {
    animateOnScroll();
}

// ===================================
// Stats Counter Animation
// ===================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatStatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatNumber(Math.floor(start));
        }
    }, 16);
}

function formatStatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    } else if (num >= 100) {
        return num.toString() + '+';
    } else {
        return num.toString();
    }
}

// Animate stats on scroll
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(statNumber => {
                const originalText = statNumber.textContent;
                const numMatch = originalText.match(/\d+/);
                if (numMatch) {
                    const targetNum = parseInt(numMatch[0]);
                    animateCounter(statNumber, targetNum);
                }
            });
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainers = document.querySelectorAll('.hero-stats, .stats-grid');
statsContainers.forEach(container => {
    if (container) {
        statObserver.observe(container);
    }
});

// ===================================
// Navbar Background on Scroll
// ===================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Form Field Focus Effects
// ===================================
const formInputs = document.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// ===================================
// Copy Code Block (if any code blocks exist)
// ===================================
const codeBlocks = document.querySelectorAll('.code-block');
codeBlocks.forEach(block => {
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-btn';
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s;
    `;
    
    // Make parent relative
    block.parentElement.style.position = 'relative';
    block.parentElement.appendChild(copyButton);
    
    // Show button on hover
    block.parentElement.addEventListener('mouseenter', () => {
        copyButton.style.opacity = '1';
    });
    
    block.parentElement.addEventListener('mouseleave', () => {
        copyButton.style.opacity = '0';
    });
    
    // Copy functionality
    copyButton.addEventListener('click', () => {
        const code = block.textContent;
        navigator.clipboard.writeText(code).then(() => {
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
    });
});

// ===================================
// Accordion for FAQ (if exists)
// ===================================
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
        // Initially hide answers (optional - can be shown by default)
        // answer.style.display = 'none';
        
        question.style.cursor = 'pointer';
        
        question.addEventListener('click', function() {
            // Toggle answer visibility
            const isVisible = answer.style.display !== 'none';
            
            if (isVisible) {
                answer.style.display = 'none';
                question.style.opacity = '0.7';
            } else {
                answer.style.display = 'block';
                question.style.opacity = '1';
            }
        });
    }
});

// ===================================
// Back to Top Button
// ===================================
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.25rem;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Scroll to top on click
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
});

backToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
});

// ===================================
// Lazy Loading for Images (if needed)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// Print Page Function (utility)
// ===================================
function printPage() {
    window.print();
}

// ===================================
// Keyboard Shortcuts
// ===================================
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K: Focus search (if you add search later)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Focus search input if exists
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // ESC: Close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
    }
});

// ===================================
// Console Welcome Message
// ===================================
console.log('%cWelcome to SuperChat!', 'font-size: 20px; font-weight: bold; color: #4f46e5;');
console.log('%cEnterprise AI Solutions - Built with privacy and control in mind.', 'font-size: 14px; color: #6b7280;');
console.log('%cWebsite: https://superchat.ai | Email: hello@superchat.ai', 'font-size: 12px; color: #9ca3af;');

// ===================================
// Performance Monitoring (Development)
// ===================================
if (typeof performance !== 'undefined' && performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`%cPage Load Time: ${loadTime}ms`, 'color: #10b981; font-weight: bold;');
            
            const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
            console.log(`%cDOM Ready Time: ${domReady}ms`, 'color: #10b981;');
        }, 0);
    });
}

// ===================================
// Service Worker Registration (for PWA - optional)
// ===================================
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => {
//                 console.log('Service Worker registered successfully:', registration.scope);
//             })
//             .catch(error => {
//                 console.log('Service Worker registration failed:', error);
//             });
//     });
// }

// ===================================
// Detect Dark Mode Preference (optional enhancement)
// ===================================
// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     console.log('Dark mode detected - currently using light theme by design');
//     // Could add theme toggle functionality here
// }

// ===================================
// Google Analytics (placeholder - add your tracking ID)
// ===================================
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'GA_MEASUREMENT_ID');
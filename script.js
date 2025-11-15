// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Add copy button to citation
    const citationBox = document.querySelector('.citation-box');
    if (citationBox) {
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '📋 Copy Citation';
        copyButton.className = 'btn btn-small';
        copyButton.style.marginTop = '1rem';
        copyButton.style.display = 'block';
        copyButton.style.marginLeft = 'auto';
        copyButton.style.marginRight = 'auto';
        
        copyButton.addEventListener('click', function() {
            const citation = citationBox.querySelector('code').textContent;
            navigator.clipboard.writeText(citation).then(() => {
                copyButton.innerHTML = '✓ Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = '📋 Copy Citation';
                }, 2000);
            });
        });
        
        citationBox.appendChild(copyButton);
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for animation
    const cards = document.querySelectorAll('.finding-card, .method-card, .data-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Mobile menu toggle (for future enhancement)
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand && window.innerWidth <= 768) {
        navBrand.style.cursor = 'pointer';
    }
});

// Add loading state
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

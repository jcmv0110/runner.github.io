// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = `¡Gracias por suscribirte! Te enviaremos noticias a ${email}`;
        successMessage.style.cssText = `
            background: #4CAF50;
            color: white;
            padding: 1rem;
            border-radius: 10px;
            margin-top: 1rem;
            text-align: center;
            animation: slideIn 0.3s ease;
        `;
        
        // Insert success message after form
        this.parentNode.insertBefore(successMessage, this.nextSibling);
        
        // Clear form
        this.reset();
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Training Plan Buttons
document.querySelectorAll('.training-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.closest('.training-card').querySelector('h3').textContent;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Plan de Entrenamiento: ${planName}</h2>
                <p>Este es un plan de muestra para ${planName.toLowerCase()}. En una versión completa, aquí encontrarías:</p>
                <ul>
                    <li>Calendario detallado de entrenamiento</li>
                    <li>Ejercicios específicos para cada día</li>
                    <li>Guía de nutrición complementaria</li>
                    <li>Consejos para prevenir lesiones</li>
                    <li>Seguimiento del progreso</li>
                </ul>
                <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Entendido</button>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background-color: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            position: relative;
            animation: slideIn 0.3s ease;
        `;
        
        // Add close button functionality
        const closeBtn = modal.querySelector('.close');
        closeBtn.style.cssText = `
            position: absolute;
            right: 1rem;
            top: 1rem;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
        `;
        
        closeBtn.addEventListener('click', () => modal.remove());
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.body.appendChild(modal);
    });
});

// Event Registration Buttons - Redirect to official sites
document.querySelectorAll('.event-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const eventName = this.closest('.event-card').querySelector('h3').textContent;
        
        // Define URLs for each event
        const eventUrls = {
            'Corre Mi Tierra (21k, 15k, 10k, 5k)': 'https://corremitierra.com/medellin/',
            'Maratón Medellín': 'https://maratonmedellin.com/',
            'Carrera De Las Rosas': 'https://carreradelasrosas.com/'
        };
        
        // Get URL for the event or use a default
        const eventUrl = eventUrls[eventName] || 'https://www.google.com/search?q=' + encodeURIComponent(eventName + ' inscripción');
        
        // Open in new tab
        window.open(eventUrl, '_blank');
    });
});

// Read More Links
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create article modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <article style="max-width: 800px;">
                    <h2>${this.closest('.article-card').querySelector('h3').textContent}</h2>
                    <div class="article-meta" style="color: #7F8C8D; margin-bottom: 2rem;">
                        <span><i class="fas fa-calendar"></i> 20 de febrero, 2024</span>
                        <span style="margin-left: 1rem;"><i class="fas fa-user"></i> Runner's Magazine Team</span>
                        <span style="margin-left: 1rem;"><i class="fas fa-clock"></i> 5 min lectura</span>
                    </div>
                    <div class="article-body">
                        <p>Este es un artículo completo sobre ${this.closest('.article-card').querySelector('h3').textContent.toLowerCase()}. En una versión completa del sitio, aquí encontrarías contenido detallado y útil para corredores de todos los niveles.</p>
                        
                        <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Contenido del Artículo</h3>
                        <p>El artículo incluiría información exhaustiva sobre el tema, con consejos prácticos, ejercicios específicos, recomendaciones de expertos, y estudios científicos que respalden las técnicas presentadas.</p>
                        
                        <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Beneficios Clave</h3>
                        <ul style="line-height: 1.8;">
                            <li>Mejora del rendimiento deportivo</li>
                            <li>Prevención de lesiones comunes</li>
                            <li>Optimización del entrenamiento</li>
                            <li>Recuperación más eficiente</li>
                        </ul>
                        
                        <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Conclusión</h3>
                        <p>Implementar estas técnicas y consejos transformará tu forma de correr y te ayudará a alcanzar tus objetivos más rápido y de manera más segura.</p>
                    </div>
                    
                    <div class="article-actions" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e0e0e0;">
                        <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Cerrar</button>
                        <button class="btn btn-outline" style="margin-left: 1rem;">
                            <i class="fas fa-share"></i> Compartir
                        </button>
                    </div>
                </article>
            </div>
        `;
        
        // Style the modal
        modal.style.cssText = `
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background-color: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 90%;
            width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: slideIn 0.3s ease;
        `;
        
        // Add close button functionality
        const closeBtn = modal.querySelector('.close');
        closeBtn.style.cssText = `
            position: absolute;
            right: 1rem;
            top: 1rem;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
        `;
        
        closeBtn.addEventListener('click', () => modal.remove());
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.body.appendChild(modal);
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { 
            opacity: 0;
            transform: translateY(-20px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Intersection Observer for Animations
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

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.article-card, .training-card, .event-card, .section-title');
    
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

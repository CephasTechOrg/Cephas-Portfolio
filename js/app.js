// ===== INITIALIZATION =====
// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize EmailJS (replace with your actual public key)
emailjs.init('nj08zXY3oYv7ygQMp');

// ===== FLOATING TECH ELEMENTS =====
const floatingTech = document.getElementById('floatingTech');
const floatingIcons = [
    'fab fa-python', 'fab fa-js', 'fab fa-react', 'fab fa-node-js',
    'fab fa-aws', 'fas fa-database', 'fas fa-cloud', 'fas fa-robot'
];

floatingIcons.forEach((icon, index) => {
    const techElement = document.createElement('div');
    techElement.classList.add('tech-element');
    techElement.innerHTML = `<i class="${icon}"></i>`;

    // Random position and animation delay
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 20 + 20;
    const animationDelay = Math.random() * 5;

    techElement.style.left = `${left}%`;
    techElement.style.animationDuration = `${animationDuration}s`;
    techElement.style.animationDelay = `${animationDelay}s`;

    floatingTech.appendChild(techElement);
});

// ===== HERO ANIMATION =====
const heroName = document.getElementById('heroName');
setTimeout(() => {
    heroName.classList.add('animate');
}, 1000);

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const themeIcon = themeToggle.querySelector('i');
const mobileThemeIcon = mobileThemeToggle.querySelector('i');

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        mobileThemeIcon.classList.remove('fa-moon');
        mobileThemeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        mobileThemeIcon.classList.remove('fa-sun');
        mobileThemeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    mobileThemeIcon.classList.remove('fa-moon');
    mobileThemeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// ===== MOBILE NAVIGATION =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');

function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
const mobileNavLinks = mobileNav.querySelectorAll('a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
});

// ===== ROLE TITLE ANIMATION =====
const roleTitle = document.getElementById('roleTitle');
const roles = ["Software Engineer", "AI Innovator", "Visionary Builder"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        roleTitle.innerHTML = `<span>${currentRole.substring(0, charIndex--)}</span>`;
        typingSpeed = 50;
    } else {
        roleTitle.innerHTML = `<span>${currentRole.substring(0, charIndex++)}</span>`;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeRole, typingSpeed);
}

// Start typing animation after page loads
window.addEventListener('load', () => {
    setTimeout(typeRole, 1000);
});

// ===== PROJECT FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                // Re-trigger animation
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = '';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== PROJECT MODALS =====
const projectModal = document.getElementById('projectModal');
const closeProjectModal = document.getElementById('closeProjectModal');
const projectCardsModal = document.querySelectorAll('.project-card');

// Updated project data with media types
const projects = [
    {
        id: 1,
        title: "Vital-Go Health Monitoring System",
        fullDescription: "Vital-Go is a full-stack health platform that streams real-time patient vitals, performs AI-based health risk analysis, and allows doctors to manage patients through live dashboards and video consultations. The system integrates wearable data, AI insights, and doctor-patient communication to support timely medical intervention.",
        features: [
            "Real-time patient data streaming and visualization",
            "AI analysis that identifies potential health risks",
            "Doctor and patient dashboards with secure login",
            "Video consultation feature for remote healthcare",
            "Role-based access control and encrypted data storage",
            "Scalable API architecture and responsive web interface"
        ],
        tech: ["Python", "FastAPI", "PostgreSQL", "JavaScript", "AI"],
        github: "https://github.com/cephas/vitalgo",
        live: "https://vitalgo.demo.com",
        mediaType: "image",
        icon: null,
        image: "../asset/images/logo.png",
        video: null,
    },
    {
        id: 2,
        title: "PedraX - AI PDF Analyzer",
        fullDescription: "PedraX is an AI-powered PDF analyzer that enables users to upload PDF files, extract and process their contents with FastAPI, and send the extracted text to an AI API for summarization. The system then generates and returns a summarized PDF document, allowing quick review and comprehension of large files.",
        features: [
            "Upload and extract text from PDF documents",
            "Automatic AI-based summarization of extracted content",
            "FastAPI backend for text processing and API communication",
            "Instant generation of summarized PDF output",
            "Interactive and responsive web interface",
            "Secure file handling and temporary storage management"
        ],
        tech: ["Python", "FastAPI", "JavaScript", "AI", "PDF.js"],
        github: "https://github.com/cephas/pedrax-ai-pdf-analyzer",
        live: "https://pedrax.demo.com",
        mediaType: "image",
        icon: null,
        image: "../asset/images/pderax.png",
        video: null,
    },
    {
        id: 3,
        title: "ShopEase — E-Commerce Platform",
        fullDescription: "ShopEase is a fully functional e-commerce web application that allows users to explore, add to cart, and purchase items including electrical appliances, home equipment, phones, shoes, and more. The platform integrates Paystack for secure online payments, with user authentication and a connected database to manage user profiles, orders, and transaction history. Designed for speed, simplicity, and reliability, ShopEase offers a modern shopping experience built entirely from scratch using web technologies.",
        features: [
            "User-friendly e-commerce interface for browsing and purchasing products",
            "Dynamic product listing with categories for electronics, phones, and home appliances",
            "Secure payment handling via Paystack integration",
            "User registration, authentication, and session management",
            "Database integration for storing users, products, and orders",
            "Responsive design optimized for both desktop and mobile screens",
            "Real-time cart updates and transaction feedback"
        ],
        tech: ["HTML", "CSS", "JavaScript", "Paystack", "Authentication", "Database"],
        github: null,
        live: null,
        mediaType: "image",
        icon: null,
        image: "../asset/images/shopease.png",
        video: null
    },

    {
        id: 4,
        title: "WorldPath Foundation — Website",
        fullDescription: "A responsive website built for WorldPath Foundation to present and manage their services across education, travel, and care. The site provides information on college application support, travel consultation (flights & hotels), and foundation programs that support orphans with housing and care. Implemented using semantic HTML, CSS, and vanilla JavaScript for a lightweight, accessible experience.",
        features: [
            "Responsive multi-section website (Education, Travel, Foundation/Care)",
            "Pages for college-application support, admission guidance, and funding resources",
            "Travel consultation pages handling flights, hotels, and itinerary guidance",
            "Foundation section highlighting sponsorship, orphan care programs, and donation info",
            "Lightweight interactive elements using vanilla JavaScript",
            "Accessible markup and responsive CSS for mobile and desktop"
        ],
        tech: ["HTML", "CSS", "JavaScript", "Responsive"],
        github: null,
        live: null,
        mediaType: "image",
        icon: null,
        image: "../asset/images/worldpath.png",
        video: null
    },
    {
        id: 5,
        title: "Adventist Hymnal App",
        fullDescription: "The Adventist Hymnal App is a digital hymnbook application designed to provide Adventist hymns with lyrics and audio playback. It was developed using HTML, CSS, and JavaScript, with Capacitor used to wrap it into a mobile APK for Android devices. All hymn data, including lyrics and audio, is stored locally using JSON for fast offline access.",
        features: [
            "Full offline hymnbook experience — no internet required",
            "JSON-based storage for hymn metadata, lyrics, and audio sources",
            "Clean and responsive UI built with HTML, CSS, and JavaScript",
            "Audio playback for each hymn using local media files",
            "Capacitor integration for packaging as an Android APK",
            "Fast search and navigation through hymn titles and numbers"
        ],
        tech: ["HTML", "CSS", "JavaScript", "Capacitor", "JSON"],
        github: null,
        live: null,
        mediaType: "image",
        icon: null,
        image: "../asset/images/hymnal.png",
        video: null
    },
    {
        id: 6,
        title: "Learning Platform",
        fullDescription: "The Learning Platform is a web-based application designed to make it easy for users to explore and watch top-rated technology tutorials without leaving the site. It integrates YouTube iframes and links to over 300 curated courses covering topics like web development, AI, GitHub, hosting, and programming languages such as Python and JavaScript. The platform also uses Firebase authentication, allowing users to log in and track their learning progress — or access content freely as guests.",
        features: [
            "Curated library of 300+ YouTube tech tutorials with millions of views",
            "Embedded YouTube iframes for seamless video playback",
            "JSON-based course database for dynamic content loading",
            "Firebase authentication for user login and progress tracking",
            "Option for both guest and authenticated access",
            "Responsive and intuitive UI for browsing courses by category",
            "Covers topics like Web Development, AI, Machine Learning, GitHub, Hosting, and Programming Languages"
        ],
        tech: ["HTML", "CSS", "JavaScript", "JSON", "Firebase", "YouTube API"],
        github: null,
        live: null,
        mediaType: "image",
        icon: null,
        image: "../asset/images/easylearn.png",
        video: null
    },
    {
        id: 7,
        title: "Automatic Water Dispenser",
        fullDescription: "During the COVID-19 pandemic, I developed an automatic, touchless water dispenser to enhance hygiene and safety at my school. The device uses sensor-based activation to eliminate the need for physical tap contact, significantly reducing the risk of virus transmission. It provided students and staff with a safe handwashing solution and demonstrated the practical use of embedded systems for community health benefits.",
        features: [
            "Touchless, sensor-based water dispensing system",
            "Designed to reduce virus transmission through shared taps",
            "Automatic activation using motion/proximity sensors",
            "Built with Arduino microcontroller and simple electronic components",
            "Efficient water control system to prevent wastage",
            "Practical use during the COVID-19 pandemic in a real environment"
        ],
        tech: ["Arduino", "Sensors", "Embedded Systems", "Hardware"],
        github: null,
        live: "https://vimeo.com/994299968?fl=pl&fe=sh",
        mediaType: "video",
        icon: null,
        image: null,
        video: "994299968"
    },
    {
        id: 8,
        title: "Smart Smoke Detector",
        fullDescription: "I developed this project to address frequent fire outbreaks in my community. The Smart Smoke Detector system integrates Arduino, a smoke sensor, a GSM module, and an LCD display to detect smoke and instantly notify users via SMS alerts. This ensures early detection, rapid response, and enhanced safety for both homes and public facilities. The device has proven effective in preventing property loss and saving lives.",
        features: [
            "Smoke detection using high-sensitivity smoke sensors",
            "Instant SMS alert system via GSM module",
            "Real-time LCD display showing system status and alerts",
            "Arduino-based control and communication logic",
            "Helps prevent fire damage through early warning detection",
            "Proven reliability in real-world community tests"
        ],
        tech: ["Arduino", "Smoke Sensor", "GSM Module", "LCD Display", "Embedded Systems"],
        github: null,
        live: null,
        mediaType: "video",
        icon: null,
        image: null,
        video: "985361158"
    },
    {
        id: 9,
        title: "Smart Door System",
        fullDescription: "The Smart Door System is an Arduino-powered access control solution designed to improve home and facility security. It uses an RFID reader to authenticate users and a servo motor to open the door automatically after successful card scanning. If an unauthorized card or forced entry is detected, the system immediately triggers a buzzer alarm to alert occupants. This project demonstrates practical use of sensors, motors, and embedded logic for security automation.",
        features: [
            "Automatic door opening via authorized RFID card scan",
            "Instant audible alert during unauthorized or forced entry attempts",
            "Servo motor control for precise door movement",
            "Arduino-based RFID authentication and system logic",
            "LCD or LED status indicators for access feedback",
            "Ideal for smart home and institutional access control applications"
        ],
        tech: ["Arduino", "RFID", "Servo Motor", "Buzzer", "Embedded Systems"],
        github: null,
        live: null,
        mediaType: "video",
        icon: null,
        image: null,
        video: "994304190"
    }




];

// Open project modal
projectCardsModal.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projects.find(p => p.id == projectId);

        if (project) {
            document.getElementById('modalProjectTitle').textContent = project.title;
            document.getElementById('modalProjectDescription').textContent = project.fullDescription;

            // Set project media based on type
            const modalProjectImage = document.getElementById('modalProjectImage');
            let mediaHTML = '';

            switch (project.mediaType) {
                case 'icon':
                    mediaHTML = `<div class="modal-media">
                        <i class="${project.icon}"></i>
                    </div>`;
                    break;
                case 'image':
                    mediaHTML = `<div class="modal-media">
                        <img src="${project.image}" alt="${project.title}" class="modal-image-display">
                    </div>`;
                    break;
                case 'video':
                    mediaHTML = `<div class="modal-media modal-video">
                        <iframe src="https://player.vimeo.com/video/${project.video}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                                frameborder="0" 
                                allow="autoplay; fullscreen; picture-in-picture" target="_blank"
                                allowfullscreen>
                        </iframe>
                    </div>`;
                    break;
                default:
                    mediaHTML = `<div class="modal-media">
                        <i class="fas fa-project-diagram"></i>
                    </div>`;
            }

            modalProjectImage.innerHTML = mediaHTML;

            // Set features
            const featuresList = document.getElementById('modalProjectFeatures');
            featuresList.innerHTML = '';
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });

            // Set tech tags
            const techContainer = document.getElementById('modalProjectTech');
            techContainer.innerHTML = '';
            project.tech.forEach(tech => {
                const span = document.createElement('span');
                span.classList.add('tech-tag');
                span.textContent = tech;
                techContainer.appendChild(span);
            });

            // Set links
            document.getElementById('modalGithubLink').href = project.github;
            document.getElementById('modalLiveLink').href = project.live;

            // Show modal
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close project modal
closeProjectModal.addEventListener('click', () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== CERTIFICATE MODALS =====
const certificateModal = document.getElementById('certificateModal');
const closeCertificateModal = document.getElementById('closeCertificateModal');
const honorButtons = document.querySelectorAll('.honor-btn');

// Certificate data
const certificates = {

    'nasa-innovator': {
        name: 'NASA SPACE APP CHALLENGE',
        description: 'Recognized by NASA for providing innovative and impactful solutions using NASA\'s open data to address global challenges through technology and AI-driven problem-solving.',
        date: 'October 2024',
        issuer: 'NASA',
        image: '../asset/images/nasa.jpeg'
    },

    'math-olympiad': {
        name: 'American Maths Olympiad',
        description: 'Achieved top honors in the American Mathematics Olympiad, demonstrating exceptional problem-solving skills. Global Ranking: 10th, National Ranking: 3rd. Ranked 1st out of 1,700 students in high school and placed in the top 1% out of 30,000 participants globally.',
        date: 'November 2024',
        issuer: 'American Mathematical Society',
        image: '../asset/images/american.jpeg'
    },

    'mit-innovator': {
        name: 'MIT Technology Review Innovator',
        description: 'Featured in MIT Technology Review\'s "35 Innovators Under 35" for contributions to AI in healthcare diagnostics. In recognition of providing innovative and impactful solutions using NASA\'s open data.',
        date: 'October 2024',
        issuer: 'MIT Technology Review',
        image: '../asset/images/mit.png'
    },
    'accenture': {
        name: 'Development and Advanced Engineering',
        description: 'Course completion and job-simulation recognition in Object-Oriented Programming (OOP), Continuous Integration (CI), and Agile planning methodologies.',
        date: 'August 2024',
        issuer: 'Accenture',
        image: '../asset/images/eng.jpeg'
    }



};

// Open certificate modal
honorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const certificateId = button.getAttribute('data-certificate');
        const certificate = certificates[certificateId];

        if (certificate) {
            document.getElementById('modalCertificateTitle').textContent = certificate.name;
            document.getElementById('certificateName').textContent = certificate.name;
            document.getElementById('certificateDescription').textContent = certificate.description;
            document.getElementById('certificateDate').innerHTML = `<strong>Issued:</strong> ${certificate.date}`;
            document.getElementById('certificateIssuer').innerHTML = `<strong>Issued by:</strong> ${certificate.issuer}`;
            document.getElementById('certificateImage').src = certificate.image;

            // Show modal
            certificateModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close certificate modal
closeCertificateModal.addEventListener('click', () => {
    certificateModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
certificateModal.addEventListener('click', (e) => {
    if (e.target === certificateModal) {
        certificateModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== GITHUB CARD =====
const githubCard = document.getElementById('githubCard');
githubCard.addEventListener('click', () => {
    window.open('https://github.com/cephas-osei-bonsu', '_blank');
});

// ===== SKILL BARS ANIMATION WITH INTERSECTION OBSERVER - FIXED FOR MOBILE =====
const skillBars = document.querySelectorAll('.skill-progress');
let skillAnimationTriggered = false;

// FIX: Lower threshold for mobile to ensure animation triggers
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillAnimationTriggered) {
            skillAnimationTriggered = true;
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
            });
        } else if (!entry.isIntersecting && skillAnimationTriggered) {
            skillAnimationTriggered = false;
            skillBars.forEach(bar => {
                bar.style.width = '0';
            });
        }
    });
}, { threshold: 0.3 }); // Reduced threshold for better mobile detection

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Send email using EmailJS
    emailjs.send('service_jnet60c', 'template_uaublek', {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    })
        .then(() => {
            // Success
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            formMessage.classList.remove('error');
            formMessage.classList.add('success');
            contactForm.reset();
        })
        .catch((error) => {
            // Error
            formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
            formMessage.classList.remove('success');
            formMessage.classList.add('error');
            console.error('EmailJS Error:', error);
        })
        .finally(() => {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('active');
    } else {
        scrollToTopBtn.classList.remove('active');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== AI ASSISTANT =====
const aiToggle = document.getElementById('aiToggle');
const aiChat = document.getElementById('aiChat');
const closeAi = document.getElementById('closeAi');
const aiMessages = document.getElementById('aiMessages');
const aiInput = document.getElementById('aiInput');
const aiSend = document.getElementById('aiSend');

// Toggle AI chat
aiToggle.addEventListener('click', () => {
    aiChat.classList.toggle('active');
});

// Close AI chat
closeAi.addEventListener('click', () => {
    aiChat.classList.remove('active');
});

// AI responses
const aiResponses = {
    'hello': 'Hello! How can I help you learn more about Cephas and his work?',
    'hi': 'Hi there! I\'m Cephas\'s AI assistant. What would you like to know?',
    'skills': 'Cephas has expertise in full-stack development, AI/ML, IoT, and more. Check out the Skills section for details!',
    'projects': 'Cephas has worked on various projects including AI Health Diagnostics, E-Commerce Platforms, and Smart Home Systems. See the Projects section!',
    'contact': 'You can reach Cephas through the contact form or via email at cephas@example.com.',
    'experience': 'Cephas has over 5 years of experience in software engineering and AI research.',
    'default': 'I\'m not sure I understand. You can ask me about Cephas\'s skills, projects, experience, or how to contact him.'
};

// Send message function
function sendMessage() {
    const message = aiInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage(message, 'user');
    aiInput.value = '';

    // Generate AI response
    setTimeout(() => {
        let response = aiResponses.default;
        const lowerMessage = message.toLowerCase();

        for (const key in aiResponses) {
            if (lowerMessage.includes(key)) {
                response = aiResponses[key];
                break;
            }
        }

        addMessage(response, 'bot');
    }, 1000);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('ai-message', sender);
    messageDiv.textContent = text;
    aiMessages.appendChild(messageDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

// Send message on button click
aiSend.addEventListener('click', sendMessage);

// Send message on Enter key
aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// ===== GSAP ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

// Animate hero content
gsap.from('.hero-content h1', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.hero-content .role-title', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.5,
    ease: 'power3.out'
});

gsap.from('.hero-content p', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.8,
    ease: 'power3.out'
});

gsap.from('.cta-button', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 1.1,
    ease: 'power3.out'
});


// Animate sections on scroll
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});


// Code Playground JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const codeInput = document.getElementById('code-input');
    const syntaxHighlighting = document.getElementById('syntax-highlighting');
    const runButton = document.getElementById('run-code');
    const resetButton = document.getElementById('reset-code');
    const clearConsoleButton = document.getElementById('clear-console');
    const formatButton = document.getElementById('format-code');
    const themeSelect = document.getElementById('theme-select');
    const outputContent = document.getElementById('output-content');
    const exampleButtons = document.querySelectorAll('.example-btn');
    const playgroundContainer = document.querySelector('.code-playground-container');

    // Default code template
    const defaultCode = `// Welcome to the Interactive Code Playground!
// Write your JavaScript code here and click "Run Code"

// Example: Calculate Fibonacci sequence
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example: Find prime numbers
function isPrime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

// Example usage
console.log("🚀 Code Playground is running!");
console.log("Fibonacci of 10:", fibonacci(10));
console.log("Prime numbers up to 20:", 
    Array.from({length: 20}, (_, i) => i + 1).filter(isPrime)
);

// Try writing your own code below!`;

    // Code examples
    const examples = {
        fibonacci: `// Fibonacci Sequence with Memoization
function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

console.log("🔢 Fibonacci Sequence (with memoization):");
for (let i = 0; i <= 15; i++) {
    console.log(\`Fibonacci(\${i}) = \${fibonacci(i)}\`);
}`,

        sorting: `// Sorting Algorithms Comparison
const numbers = [64, 34, 25, 12, 22, 11, 90, 5, 77, 30];

function bubbleSort(arr) {
    const sorted = [...arr];
    for (let i = 0; i < sorted.length; i++) {
        for (let j = 0; j < sorted.length - i - 1; j++) {
            if (sorted[j] > sorted[j + 1]) {
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
            }
        }
    }
    return sorted;
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[0];
    const left = arr.slice(1).filter(x => x < pivot);
    const right = arr.slice(1).filter(x => x >= pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log("📊 Sorting Algorithms:");
console.log("Original array:", numbers);
console.log("Bubble Sort:", bubbleSort(numbers));
console.log("Quick Sort:", quickSort(numbers));`,

        promises: `// Async/Await with Error Handling
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ 
                    id: userId, 
                    name: "User " + userId, 
                    role: "developer",
                    joined: new Date().toISOString()
                });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "My First Post", likes: 15 },
                { id: 2, title: "Learning JavaScript", likes: 32 }
            ]);
        }, 800);
    });
}

async function getUserDashboard(userId) {
    try {
        console.log("🔄 Loading user dashboard...");
        
        const [user, posts] = await Promise.all([
            fetchUserData(userId),
            fetchUserPosts(userId)
        ]);
        
        console.log("✅ Dashboard loaded successfully!");
        console.log("User Profile:", user);
        console.log("Recent Posts:", posts);
        
        return { user, posts };
    } catch (error) {
        console.error("❌ Error loading dashboard:", error.message);
        throw error;
    }
}

// Usage
getUserDashboard(123);`,

        classes: `// Modern JavaScript Classes
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return \`Hello, my name is \${this.name} and I'm \${this.age} years old!\`;
    }
    
    static createAdult(name) {
        return new Person(name, 18);
    }
}

class Developer extends Person {
    constructor(name, age, skills = []) {
        super(name, age);
        this.skills = skills;
    }
    
    addSkill(skill) {
        this.skills.push(skill);
        return this; // Enable method chaining
    }
    
    displaySkills() {
        console.log(\`\${this.name}'s skills:\`, this.skills.join(", "));
    }
}

// Usage
const john = new Developer("John", 25, ["JavaScript", "React"]);
console.log(john.greet());
john.addSkill("Node.js").addSkill("TypeScript");
john.displaySkills();

const adult = Person.createAdult("Jane");
console.log(adult.greet());`,

        algorithms: `// Common Algorithm Problems
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}

function findDuplicates(arr) {
    const seen = new Set();
    const duplicates = new Set();
    
    for (const item of arr) {
        if (seen.has(item)) {
            duplicates.add(item);
        }
        seen.add(item);
    }
    
    return Array.from(duplicates);
}

// Test algorithms
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const testArray = [1, 2, 3, 4, 2, 5, 3, 6, 7, 7];

console.log("🔍 Binary Search Results:");
console.log("Array:", sortedArray);
console.log("Search for 9:", binarySearch(sortedArray, 9));
console.log("Search for 8:", binarySearch(sortedArray, 8));

console.log("\\n🔄 Duplicate Detection:");
console.log("Array:", testArray);
console.log("Duplicates:", findDuplicates(testArray));`
    };

    // Initialize the playground
    function initializePlayground() {
        codeInput.value = defaultCode;
        updateSyntaxHighlighting();
        setupEventListeners();
        loadTheme();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Code execution
        runButton.addEventListener('click', executeCode);

        // Reset functionality
        resetButton.addEventListener('click', resetCode);

        // Console management
        clearConsoleButton.addEventListener('click', clearConsole);

        // Code formatting
        formatButton.addEventListener('click', formatCode);

        // Theme switching
        themeSelect.addEventListener('change', switchTheme);

        // Code input events
        codeInput.addEventListener('input', updateSyntaxHighlighting);
        codeInput.addEventListener('scroll', syncScroll);
        codeInput.addEventListener('keydown', handleTabKey);

        // Example loading
        exampleButtons.forEach(button => {
            button.addEventListener('click', function () {
                const example = this.getAttribute('data-example');
                loadExample(example);
            });
        });
    }

    // Syntax highlighting function
    function updateSyntaxHighlighting() {
        const code = codeInput.value;

        // Basic syntax highlighting rules
        let highlightedCode = code
            // Comments
            .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
            .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
            // Strings
            .replace(/("([^"\\]|\\.)*"|'([^'\\]|\\.)*')/g, '<span class="string">$&</span>')
            // Keywords
            .replace(/\b(function|return|if|else|for|while|switch|case|break|continue|var|let|const|class|extends|static|async|await|try|catch|finally|throw|new|this|typeof|instanceof|in|of|import|export|default)\b/g, '<span class="keyword">$&</span>')
            // Built-in objects and functions
            .replace(/\b(console|log|warn|error|info|Math|Date|Array|Object|String|Number|Boolean|Promise|Set|Map|JSON)\b/g, '<span class="builtin">$&</span>')
            // Functions
            .replace(/(\w+)\s*\(/g, '<span class="function">$1</span>(')
            // Numbers
            .replace(/\b(\d+\.?\d*|\.\d+)\b/g, '<span class="number">$&</span>')
            // Operators
            .replace(/([=+\-*/%&|^~!<>?:]+)/g, '<span class="operator">$1</span>')
            // Punctuation
            .replace(/([{}()[\].,;])/g, '<span class="punctuation">$1</span>');

        syntaxHighlighting.innerHTML = highlightedCode;
    }

    // Sync scrolling between textarea and syntax highlighting
    function syncScroll() {
        syntaxHighlighting.scrollTop = codeInput.scrollTop;
        syntaxHighlighting.scrollLeft = codeInput.scrollLeft;
    }

    // Handle tab key for indentation
    function handleTabKey(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = codeInput.selectionStart;
            const end = codeInput.selectionEnd;

            // Insert tab character
            codeInput.value = codeInput.value.substring(0, start) + '    ' + codeInput.value.substring(end);

            // Move cursor
            codeInput.selectionStart = codeInput.selectionEnd = start + 4;

            updateSyntaxHighlighting();
        }
    }

    // Execute the code
    function executeCode() {
        const code = codeInput.value;
        outputContent.innerHTML = '';

        // Store original console methods
        const originalConsole = {
            log: console.log,
            error: console.error,
            warn: console.warn,
            info: console.info
        };

        // Override console methods to capture output
        console.log = function (...args) {
            addOutput(args, 'log');
            originalConsole.log.apply(console, args);
        };

        console.error = function (...args) {
            addOutput(args, 'error');
            originalConsole.error.apply(console, args);
        };

        console.warn = function (...args) {
            addOutput(args, 'warning');
            originalConsole.warn.apply(console, args);
        };

        console.info = function (...args) {
            addOutput(args, 'info');
            originalConsole.info.apply(console, args);
        };

        try {
            // Execute the code
            const result = eval(code);

            // If the code returns a value (not undefined), display it
            if (result !== undefined) {
                addOutput([`Return: ${String(result)}`], 'success');
            }

        } catch (error) {
            addOutput([`Error: ${error.message}`], 'error');
        } finally {
            // Restore original console methods
            console.log = originalConsole.log;
            console.error = originalConsole.error;
            console.warn = originalConsole.warn;
            console.info = originalConsole.info;
        }

        // Scroll to bottom of output
        outputContent.scrollTop = outputContent.scrollHeight;
    }

    // Add output to console
    function addOutput(args, type = 'log') {
        const outputLine = document.createElement('div');
        outputLine.className = `output-line ${type}`;

        const formattedArgs = args.map(arg => {
            if (typeof arg === 'object') {
                try {
                    return JSON.stringify(arg, null, 2);
                } catch {
                    return String(arg);
                }
            }
            return String(arg);
        }).join(' ');

        outputLine.textContent = formattedArgs;
        outputContent.appendChild(outputLine);
    }

    // Reset code to default
    function resetCode() {
        codeInput.value = defaultCode;
        updateSyntaxHighlighting();
        clearConsole();
        addOutput(['Code has been reset to default'], 'info');
    }

    // Clear console output
    function clearConsole() {
        outputContent.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">🚀</div>
                <h4>Welcome to the Code Playground!</h4>
                <p>Write JavaScript code in the editor and click "Run Code" to see the output here.</p>
                <p>Try the examples below or write your own code!</p>
            </div>
        `;
    }

    // Format code (basic indentation)
    function formatCode() {
        let code = codeInput.value;

        // Basic formatting rules
        code = code
            // Ensure proper spacing around operators
            .replace(/([=+\-*/%&|^~!<>?:]+)/g, ' $1 ')
            // Fix multiple spaces
            .replace(/\s+/g, ' ')
            // Basic indentation for braces
            .replace(/\{/g, ' {\n    ')
            .replace(/\}/g, '\n}\n')
            .replace(/;\s*/g, ';\n');

        codeInput.value = code;
        updateSyntaxHighlighting();
        addOutput(['Code formatted successfully'], 'success');
    }

    // Switch between dark and light themes
    function switchTheme() {
        const theme = themeSelect.value;
        if (theme === 'light') {
            playgroundContainer.classList.add('light-theme');
        } else {
            playgroundContainer.classList.remove('light-theme');
        }
        localStorage.setItem('code-playground-theme', theme);
    }

    // Load saved theme preference
    function loadTheme() {
        const savedTheme = localStorage.getItem('code-playground-theme') || 'dark';
        themeSelect.value = savedTheme;
        switchTheme();
    }

    // Load code example
    function loadExample(exampleKey) {
        if (examples[exampleKey]) {
            codeInput.value = examples[exampleKey];
            updateSyntaxHighlighting();
            clearConsole();
            addOutput([`Example "${exampleKey}" loaded. Click "Run Code" to see it in action!`], 'info');
        }
    }

    // Initialize the playground when the page loads
    initializePlayground();
});
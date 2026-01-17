import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

let app;

function randomColors(count) {
    return new Array(count)
        .fill(0)
        .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
}

export function initBackground() {
    const canvas = document.getElementById("canvas");
    if (!canvas) {
        return;
    }
    try {
        app = TubesCursor(canvas, {
            tubes: {
                colors: ["#8b5cf6", "#667eea", "#764ba2"],
                lights: {
                    intensity: 200,
                    colors: ["#667eea", "#8b5cf6", "#764ba2", "#a78bfa"]
                }
            }
        });

        document.body.addEventListener("click", () => {
            const colors = randomColors(3);
            const lightsColors = randomColors(4);
            if (app?.tubes) {
                app.tubes.setColors(colors);
                app.tubes.setLightsColors(lightsColors);
            }
        });
    } catch (error) {
        console.error("Error initializing background:", error);
    }
}

function addGlowEffect(element) {
    element.addEventListener("mousemove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        element.style.setProperty("--x", `${x}px`);
        element.style.setProperty("--y", `${y}px`);
    });

    element.addEventListener("mouseleave", () => {
        element.style.setProperty("--x", "50%");
        element.style.setProperty("--y", "50%");
    });
}

function add3DTilt(element, intensity = 5) {
    element.addEventListener("mousemove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * intensity;
        const rotateY = ((x - centerX) / centerX) * -intensity;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    element.addEventListener("mouseleave", () => {
        element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
}

export function initStaticEffects() {
    const profilePanel = document.querySelector(".profile-panel");
    if (profilePanel) {
        addGlowEffect(profilePanel);
        add3DTilt(profilePanel, 8);
    }

    const updatesPanel = document.querySelector(".updates-panel");
    if (updatesPanel) {
        addGlowEffect(updatesPanel);
        add3DTilt(updatesPanel, 8);
    }

    const navButtons = document.querySelectorAll(".nav-button");
    navButtons.forEach((button) => {
        addGlowEffect(button);
        add3DTilt(button, 6);
    });

    const headerCard = document.querySelector(".section-header-card");
    if (headerCard) {
        addGlowEffect(headerCard);
        add3DTilt(headerCard, 8);
    }

    const contentCard = document.querySelector(".section-content-card");
    if (contentCard) {
        addGlowEffect(contentCard);
        add3DTilt(contentCard, 6);
    }
}

export function initSectionAnimations(container) {
    if (!container) {
        return;
    }
    const cards = container.querySelectorAll(
        ".job, .degree, .project, .publication, .interest-card, .skill-category, .certificate"
    );
    if (!cards.length) {
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    });
    cards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(card);
    });
}

export function initSkillTags(container) {
    if (!container) {
        return;
    }
    const skillTags = container.querySelectorAll(".skill-tag, .tech-tag");
    skillTags.forEach((tag) => {
        tag.addEventListener("mouseenter", () => {
            tag.style.transform = "scale(1.05)";
        });
        tag.addEventListener("mouseleave", () => {
            tag.style.transform = "scale(1)";
        });
        tag.style.transition = "transform 0.2s ease";
    });
}

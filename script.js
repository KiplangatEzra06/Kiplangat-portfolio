const CONFIG = {
    name: "Kiplangat Ezra",
    email: "tonuiezra06@gmail.com",
    location: "Nairobi, Kenya",
    timezone: "Africa/Nairobi",
    roles: ["useful web experiences", "AI-powered tools", "thoughtful digital products"],
    skills: ["HTML", "CSS", "JavaScript", "Python", "Node.js", "Express", "Flask", "SQLite", "Firebase", "Git", "GitHub"],
    projects: [
        {
            title: "VEX", category: "AI assistant", mark: "VEX", color: "#dfe8ff", ink: "#354c91",
            screenshot: "assets/images/VEX.jpg",
            description: "A personal AI chat assistant that brings Gemini-powered conversation together with saved chats and voice interaction.",
            features: ["Chat with Gemini", "Saved conversations and history search", "Voice input and spoken replies", "Stop generation and resume the conversation"],
            tech: ["Node.js", "Express", "Google Gemini API", "JavaScript", "HTML", "CSS"],
            github: "https://github.com/KiplangatEzra06/VEX", demo: "https://acts-eloquent-botch.ngrok-free.dev/", status: "Personal AI assistant"
        },
        {
            title: "Parking Management System", category: "Operations", mark: "PARK", color: "#dff1ed", ink: "#315e58",
            screenshot: "assets/images/Parking%20System.jpg",
            description: "A small-lot parking system that tracks vehicles and spaces from arrival through exit, with a browser dashboard and command-line workflow.",
            features: ["Vehicle registration and entry records", "Live available and occupied bay status", "Exit records and elapsed parking time", "Proportional billing at KSh 50 per hour", "Persistent active and completed records", "Input validation and duplicate checks"],
            tech: ["Python", "Flask", "SQLite", "HTML", "CSS"],
            github: "https://github.com/KiplangatEzra06/parking-system", demo: "", status: "Operations workflow"
        },
        {
            title: "EverythingOnline", category: "Commerce", mark: "everyday", color: "#f5e9d9", ink: "#805b34",
            screenshot: "assets/images/EverythingOnline.jpg",
            description: "A Kenyan online marketplace for everyday essentials, currently featuring fresh groceries, dairy, and plant-based products.",
            features: ["Search and browse products", "Product details and cart", "Secure M-Pesa checkout", "Order tracking through fulfilment"],
            tech: ["E-commerce", "M-Pesa", "Kenya"], github: "", demo: "https://everythingonline.co.ke/", status: "Online marketplace"
        },
        {
            title: "Lilpoet Ezra", category: "Creative publishing", mark: "poetry", color: "#eee5fa", ink: "#654b80",
            screenshot: "assets/images/Lilpoet.jpg",
            description: "A personal poetry platform built around expressive presentation and a searchable collection of writing.",
            features: ["Account-based poem publishing", "Categories, archive search, and focus reading", "Likes, favorites, comments, and reading progress", "Responsive reading experience"],
            tech: ["HTML", "CSS", "JavaScript", "Firebase Auth", "Cloud Firestore"],
            github: "https://github.com/KiplangatEzra06/lilpoet-ezra-site", demo: "https://kiplangatezra06.github.io/lilpoet-ezra-site/", status: "Creative publishing platform"
        },
        {
            title: "StudyBuddy", category: "Study tool", mark: "STUDY", color: "#e5eefb", ink: "#3c5e91",
            screenshot: "assets/images/StudyBuddy.jpg",
            description: "A study tool designed to help learners stay organized and focused on their coursework.",
            features: ["Study-focused workspace", "Tools for organizing coursework"],
            tech: ["Web application", "Study tool"], github: "", demo: "", status: "Study tool"
        }
    ]
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const menuOverlay = document.getElementById("menu-overlay");
const menuClose = document.getElementById("menu-close");
const projectDialog = document.getElementById("project-dialog");
let menuReturnFocus = null;
let dialogReturnFocus = null;

function safeStorageGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
}

function safeStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch { /* Storage can be unavailable in private contexts. */ }
}

function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#15172a" : "#edf2ff";
    safeStorageSet("ezra-portfolio-theme", theme);
}

setTheme(safeStorageGet("ezra-portfolio-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeToggle.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));

function setMenuOpen(open) {
    if (open) {
        menuReturnFocus = document.activeElement;
        menuOverlay.hidden = false;
        menuOverlay.setAttribute("aria-hidden", "false");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
        document.body.classList.add("menu-open");
        menuClose.focus();
        return;
    }
    menuOverlay.hidden = true;
    menuOverlay.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
    if (menuReturnFocus instanceof HTMLElement) menuReturnFocus.focus();
}

menuToggle.addEventListener("click", () => setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true"));
menuClose.addEventListener("click", () => setMenuOpen(false));
menuOverlay.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
menuOverlay.addEventListener("click", (event) => { if (event.target === menuOverlay) setMenuOpen(false); });

function setImageFallback(image, frame) {
    if (image.complete && image.naturalWidth > 0) frame.classList.add("image-loaded");
    image.addEventListener("load", () => frame.classList.add("image-loaded"));
    image.addEventListener("error", () => image.remove());
}

document.querySelectorAll(".profile-image").forEach((image) => setImageFallback(image, image.closest(".profile-frame")));
document.querySelectorAll(".about-image").forEach((image) => setImageFallback(image, image.closest(".about-photo-card")));

const skillsMarquee = document.getElementById("skills-marquee");
function renderSkills() {
    [...CONFIG.skills, ...CONFIG.skills].forEach((skill, index) => {
        const chip = document.createElement("span");
        chip.className = "skill-chip";
        chip.textContent = skill;
        if (index >= CONFIG.skills.length) chip.setAttribute("aria-hidden", "true");
        skillsMarquee.append(chip);
    });
}

function renderProjects() {
    const grid = document.getElementById("project-grid");
    CONFIG.projects.forEach((project, index) => {
        const card = document.createElement("button");
        card.className = "project-card reveal";
        card.type = "button";
        card.setAttribute("aria-label", `View ${project.title} project details`);
        card.innerHTML = `<div class="project-art" style="background:${project.color};color:${project.ink}"><span class="project-art-word"></span><div class="project-art-caption"><span></span><span>View project ↗</span></div></div><div class="project-card-info"><div class="project-card-meta"><span></span><span aria-hidden="true">↗</span></div><h3></h3><p></p><div class="project-card-tags"></div></div>`;
        const art = card.querySelector(".project-art");
        if (project.screenshot) {
            art.classList.add("has-screenshot");
            const image = document.createElement("img");
            image.className = "project-screenshot";
            image.src = project.screenshot;
            image.alt = "";
            image.setAttribute("aria-hidden", "true");
            art.prepend(image);
        } else {
            card.querySelector(".project-art-word").textContent = project.mark;
        }
        card.querySelector(".project-art-caption span").textContent = project.category;
        card.querySelector(".project-card-meta span").textContent = `${String(index + 1).padStart(2, "0")} / ${project.category}`;
        card.querySelector("h3").textContent = project.title;
        card.querySelector(".project-card-info p").textContent = project.description;
        project.tech.slice(0, 3).forEach((name) => {
            const tag = document.createElement("span");
            tag.textContent = name;
            card.querySelector(".project-card-tags").append(tag);
        });
        card.addEventListener("click", () => openProject(project, card));
        grid.append(card);
    });
}

function makeAction(label, url, primary = false) {
    const link = document.createElement("a");
    link.className = `button ${primary ? "button-primary" : "button-outline"}`;
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = " ↗";
    link.append(arrow);
    return link;
}

function openProject(project, trigger) {
    dialogReturnFocus = trigger;
    const art = document.getElementById("dialog-art");
    art.style.background = project.color;
    art.style.color = project.ink;
    art.classList.toggle("has-screenshot", Boolean(project.screenshot));
    art.querySelector(".dialog-screenshot")?.remove();
    const dialogMark = document.getElementById("dialog-mark");
    dialogMark.hidden = Boolean(project.screenshot);
    dialogMark.textContent = project.screenshot ? "" : project.mark;
    if (project.screenshot) {
        const image = document.createElement("img");
        image.className = "dialog-screenshot";
        image.src = project.screenshot;
        image.alt = "";
        image.setAttribute("aria-hidden", "true");
        art.prepend(image);
    }
    document.getElementById("dialog-category").textContent = project.category;
    document.getElementById("dialog-title").textContent = project.title;
    document.getElementById("dialog-description").textContent = project.description;
    document.getElementById("dialog-status").textContent = project.status;
    document.getElementById("dialog-features").replaceChildren(...project.features.map((feature) => {
        const item = document.createElement("li");
        item.textContent = feature;
        return item;
    }));
    document.getElementById("dialog-tech").replaceChildren(...project.tech.map((name) => {
        const chip = document.createElement("span");
        chip.className = "tech-chip";
        chip.textContent = name;
        return chip;
    }));
    const actions = document.getElementById("dialog-actions");
    actions.replaceChildren();
    if (project.github) actions.append(makeAction("GitHub", project.github));
    if (project.demo) actions.append(makeAction("Live Demo", project.demo, true));
    projectDialog.showModal();
    document.getElementById("dialog-close").focus();
}

document.getElementById("dialog-close").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", (event) => { if (event.target === projectDialog) projectDialog.close(); });
projectDialog.addEventListener("close", () => {
    if (dialogReturnFocus instanceof HTMLElement) dialogReturnFocus.focus();
});

function updateClock() {
    const now = new Date();
    document.getElementById("location-name").textContent = CONFIG.location;
    document.getElementById("contact-location").textContent = CONFIG.location;
    document.getElementById("local-clock").textContent = new Intl.DateTimeFormat("en-GB", {
        timeZone: CONFIG.timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
    }).format(now);
    document.getElementById("local-date").textContent = new Intl.DateTimeFormat("en", {
        timeZone: CONFIG.timezone, weekday: "long", month: "short", day: "numeric", year: "numeric"
    }).format(now);
}

function startTyping() {
    const role = document.getElementById("typed-role");
    if (reducedMotion || CONFIG.roles.length < 2) {
        role.textContent = CONFIG.roles[0];
        return;
    }
    let roleIndex = 0;
    let characterIndex = CONFIG.roles[0].length;
    let deleting = true;
    function tick() {
        const current = CONFIG.roles[roleIndex];
        characterIndex += deleting ? -1 : 1;
        role.textContent = current.slice(0, characterIndex);
        let delay = deleting ? 38 : 66;
        if (deleting && characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % CONFIG.roles.length;
            delay = 280;
        } else if (!deleting && characterIndex === CONFIG.roles[roleIndex].length) {
            deleting = true;
            delay = 1550;
        }
        window.setTimeout(tick, delay);
    }
    window.setTimeout(tick, 1700);
}

document.getElementById("contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(data.get("subject").trim());
    const body = encodeURIComponent(`Hi Ezra,\n\n${data.get("message").trim()}\n\nFrom, ${data.get("name").trim()}`);
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
});

document.getElementById("email-link").href = `mailto:${CONFIG.email}`;
document.getElementById("email-address").textContent = CONFIG.email;
renderSkills();
renderProjects();
updateClock();
window.setInterval(updateClock, 1000);
startTyping();

if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
} else {
    document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
}

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!menuOverlay.hidden) {
        setMenuOpen(false);
        return;
    }
    if (projectDialog.open) projectDialog.close();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target && !menuOverlay.hidden) setMenuOpen(false);
        if (!target) event.preventDefault();
    });
});
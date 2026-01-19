import { loadSiteData } from "./core/data.js";
import TabRouter from "./core/router.js";
import { initBackground, initSectionAnimations, initSkillTags, initStaticEffects } from "./core/effects.js";
import SummarySection from "./sections/summary/section.js";
import SkillsSection from "./sections/skills/section.js";
import ExperienceSection from "./sections/experience/section.js";
import ProjectsSection from "./sections/projects/section.js";
import EducationSection from "./sections/education/section.js";
import CertificatesSection from "./sections/certificates/section.js";
import LanguagesSection from "./sections/languages/section.js";
import InterestsSection from "./sections/interests/section.js";

const sectionFactory = {
    about: SummarySection,
    skills: SkillsSection,
    experience: ExperienceSection,
    projects: ProjectsSection,
    education: EducationSection,
    certificates: CertificatesSection,
    languages: LanguagesSection,
    interests: InterestsSection
};

function buildSections(data) {
    const defaultOrder = ["about", "experience", "projects", "education", "skills", "certificates", "interests", "languages"];
    const order = data.sectionsOrder?.length ? data.sectionsOrder : defaultOrder;
    return order
        .map((id) => {
            const SectionClass = sectionFactory[id];
            if (!SectionClass) {
                return null;
            }
            return new SectionClass({ title: data.sections?.[id]?.title });
        })
        .filter(Boolean);
}

function renderProfile(profile) {
    const nameEl = document.getElementById("profile-name");
    const roleEl = document.getElementById("profile-role");
    const contactsEl = document.getElementById("profile-contacts");
    const photoEl = document.getElementById("profile-photo");

    const fullName = profile.fullName || [profile.firstName, profile.lastName].filter(Boolean).join(" ");
    if (nameEl) {
        nameEl.textContent = fullName;
    }
    if (roleEl) {
        roleEl.textContent = profile.role || "";
    }
    if (photoEl && fullName) {
        photoEl.alt = fullName;
    }
    if (contactsEl) {
        contactsEl.innerHTML = "";
        const icons = {
            email: "fas fa-envelope",
            phone: "fas fa-phone",
            github: "fab fa-github",
            linkedin: "fab fa-linkedin",
            website: "fas fa-globe"
        };
        (profile.contacts || []).forEach((contact) => {
            const link = document.createElement("a");
            link.className = "contact-item";
            link.href = contact.url || "#";
            if (contact.url?.startsWith("http")) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
            const icon = document.createElement("i");
            icon.className = icons[contact.type] || "fas fa-link";
            const label = document.createElement("span");
            label.textContent = contact.label || contact.value || "";
            link.appendChild(icon);
            link.appendChild(label);
            contactsEl.appendChild(link);
        });
    }

    if (fullName) {
        document.title = `${fullName} - CV`;
    }
}

function renderHighlights(highlights) {
    const container = document.getElementById("updates-content");
    if (!container) {
        return;
    }
    container.innerHTML = "";

    if (!highlights?.length) {
        const empty = document.createElement("div");
        empty.className = "update-item empty-state";
        empty.textContent = "Highlights will appear here.";
        container.appendChild(empty);
        return;
    }

    highlights.forEach((item) => {
        const wrapper = document.createElement("div");
        wrapper.className = "update-item";

        const dateEl = document.createElement("div");
        dateEl.className = "update-date";
        dateEl.textContent = item.date || "";

        const textEl = document.createElement("div");
        textEl.className = "update-text";
        if (item.title) {
            const strong = document.createElement("strong");
            strong.textContent = item.title;
            textEl.appendChild(strong);
            textEl.appendChild(document.createTextNode(" "));
        }
        textEl.appendChild(document.createTextNode(item.text || ""));

        wrapper.appendChild(dateEl);
        wrapper.appendChild(textEl);
        container.appendChild(wrapper);
    });
}

function onSectionRendered(_section, container) {
    initSectionAnimations(container);
    initSkillTags(container);
}

async function init() {
    try {
        const siteData = await loadSiteData();
        renderProfile(siteData.profile || {});
        renderHighlights(siteData.highlights || []);

        const sectionList = buildSections(siteData);
        const tabContents = document.getElementById("tab-contents");
        sectionList.forEach((section) => section.mount(tabContents));

        const router = new TabRouter({
            navContainer: document.getElementById("section-nav"),
            titleElement: document.getElementById("section-title"),
            sections: sectionList,
            data: siteData,
            onSectionRendered
        });
        router.init();

        initBackground();
        initStaticEffects();
    } catch (error) {
        console.error("Failed to initialize app:", error);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

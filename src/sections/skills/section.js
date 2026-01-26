import Section from "../../core/section.js";
import { createEmptyState } from "../../core/dom.js";

export default class SkillsSection extends Section {
    constructor({ title } = {}) {
        super({
            id: "skills",
            navLabel: "Skills",
            title,
            icon: "fas fa-screwdriver-wrench",
            templateUrl: new URL("./template.html", import.meta.url),
            styleUrl: new URL("./section.css", import.meta.url)
        });
    }

    afterRender(container, data) {
        const grid = container.querySelector("[data-skills-grid]");
        if (!grid) {
            return;
        }
        grid.innerHTML = "";
        const categories = data?.categories || [];
        if (!categories.length) {
            grid.appendChild(createEmptyState("Skills will appear here."));
            return;
        }

        categories.forEach((category) => {
            const card = document.createElement("div");
            card.className = "skill-category";

            const titleEl = document.createElement("h4");
            titleEl.textContent = category.category || "";

            const tags = document.createElement("div");
            tags.className = "skill-tags";
            (category.skills || []).forEach((skill) => {
                const tag = document.createElement("span");
                tag.className = "skill-tag";
                tag.textContent = skill;
                tags.appendChild(tag);
            });

            card.appendChild(titleEl);
            card.appendChild(tags);
            grid.appendChild(card);
        });
    }
}

import Section from "../../core/section.js";
import { createEmptyState } from "../../core/dom.js";

export default class LanguagesSection extends Section {
    constructor({ title } = {}) {
        super({
            id: "languages",
            navLabel: "Languages",
            title,
            icon: "fas fa-language",
            templateUrl: new URL("./template.html", import.meta.url),
            styleUrl: new URL("./section.css", import.meta.url)
        });
    }

    afterRender(container, data) {
        const grid = container.querySelector("[data-languages-grid]");
        if (!grid) {
            return;
        }
        grid.innerHTML = "";
        const items = data?.items || [];
        if (!items.length) {
            grid.appendChild(createEmptyState("Languages will appear here."));
            return;
        }

        items.forEach((item) => {
            const card = document.createElement("div");
            card.className = "skill-category language-card";

            const titleEl = document.createElement("h4");
            titleEl.textContent = item.language || "";

            const tags = document.createElement("div");
            tags.className = "skill-tags";

            const tag = document.createElement("span");
            tag.className = "skill-tag";
            tag.textContent = item.level || "";

            tags.appendChild(tag);
            card.appendChild(titleEl);
            card.appendChild(tags);
            grid.appendChild(card);
        });
    }
}

import Section from "../../core/section.js";
import { createEmptyState } from "../../core/dom.js";

export default class InterestsSection extends Section {
    constructor({ title } = {}) {
        super({
            id: "interests",
            navLabel: "Interests",
            title,
            icon: "fas fa-heart",
            templateUrl: new URL("./template.html", import.meta.url),
            styleUrl: new URL("./section.css", import.meta.url)
        });
    }

    afterRender(container, data) {
        const grid = container.querySelector("[data-interests-grid]");
        if (!grid) {
            return;
        }
        grid.innerHTML = "";
        const items = data?.items || [];
        if (!items.length) {
            grid.appendChild(createEmptyState("Interests will appear here."));
            return;
        }

        items.forEach((item) => {
            const card = document.createElement("div");
            card.className = "interest-card";

            const icon = document.createElement("div");
            icon.className = "interest-icon";
            icon.innerHTML = `<i class="${item.icon || "fas fa-heart"}"></i>`;

            const title = document.createElement("h4");
            title.textContent = item.title || "";

            const description = document.createElement("p");
            description.textContent = item.description || "";

            card.appendChild(icon);
            card.appendChild(title);
            card.appendChild(description);
            grid.appendChild(card);
        });
    }
}

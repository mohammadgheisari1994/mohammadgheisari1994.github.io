import Section from "../../core/section.js";
import { createEmptyState, createIconLabel, createList } from "../../core/dom.js";

export default class ProjectsSection extends Section {
    constructor({ title } = {}) {
        super({
            id: "projects",
            navLabel: "Projects",
            title,
            icon: "fas fa-folder-open",
            templateUrl: new URL("./template.html", import.meta.url),
            styleUrl: new URL("./section.css", import.meta.url)
        });
    }

    afterRender(container, data) {
        const list = container.querySelector("[data-projects-list]");
        if (!list) {
            return;
        }
        list.innerHTML = "";
        const items = data?.items || [];
        if (!items.length) {
            list.appendChild(createEmptyState("Projects will appear here."));
            return;
        }

        items.forEach((item) => {
            const card = document.createElement("div");
            card.className = "project";

            const header = document.createElement("div");
            header.className = "project-header";

            const titleEl = document.createElement("h4");
            titleEl.textContent = item.title || "";
            header.appendChild(titleEl);

            const meta = item.date
                ? createIconLabel({
                      icon: "fas fa-calendar",
                      text: item.date,
                      className: "project-meta"
                  })
                : null;
            if (meta) {
                header.appendChild(meta);
            }

            const org = item.organization
                ? createIconLabel({
                      icon: "fas fa-university",
                      text: item.organization,
                      className: "project-org"
                  })
                : null;

            const subtitle = document.createElement("div");
            subtitle.className = "project-subtitle";
            subtitle.textContent = item.subtitle || "";

            card.appendChild(header);
            if (org) {
                card.appendChild(org);
            }
            if (item.subtitle) {
                card.appendChild(subtitle);
            }
            if (item.bullets?.length) {
                card.appendChild(createList(item.bullets, "project-description"));
            }
            list.appendChild(card);
        });
    }
}

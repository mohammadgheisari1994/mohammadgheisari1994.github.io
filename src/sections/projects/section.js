import Section from "../../core/section.js";

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
            const empty = document.createElement("div");
            empty.className = "empty-state";
            empty.textContent = "Projects will appear here.";
            list.appendChild(empty);
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

            const meta = document.createElement("div");
            meta.className = "project-meta";
            meta.textContent = item.date || "";
            header.appendChild(meta);

            const org = document.createElement("div");
            org.className = "project-org";
            org.textContent = item.organization || "";

            const subtitle = document.createElement("div");
            subtitle.className = "project-subtitle";
            subtitle.textContent = item.subtitle || "";

            const bullets = document.createElement("ul");
            bullets.className = "project-description";
            (item.bullets || []).forEach((bullet) => {
                const li = document.createElement("li");
                li.textContent = bullet;
                bullets.appendChild(li);
            });

            card.appendChild(header);
            if (item.organization) {
                card.appendChild(org);
            }
            if (item.subtitle) {
                card.appendChild(subtitle);
            }
            if (item.bullets?.length) {
                card.appendChild(bullets);
            }
            list.appendChild(card);
        });
    }
}

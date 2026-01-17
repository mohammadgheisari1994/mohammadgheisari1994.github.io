import Section from "../../core/section.js";

export default class ExperienceSection extends Section {
    constructor({ title } = {}) {
        super({
            id: "experience",
            navLabel: "Experience",
            title,
            icon: "fas fa-briefcase",
            templateUrl: new URL("./template.html", import.meta.url),
            styleUrl: new URL("./section.css", import.meta.url)
        });
    }

    afterRender(container, data) {
        const list = container.querySelector("[data-experience-list]");
        if (!list) {
            return;
        }
        list.innerHTML = "";
        const items = data?.items || [];
        if (!items.length) {
            const empty = document.createElement("div");
            empty.className = "empty-state";
            empty.textContent = "Experience will appear here.";
            list.appendChild(empty);
            return;
        }

        items.forEach((item) => {
            const card = document.createElement("div");
            card.className = "job";

            const header = document.createElement("div");
            header.className = "job-header";

            const titleEl = document.createElement("h4");
            titleEl.textContent = item.title || "";

            const meta = document.createElement("div");
            meta.className = "company-location";

            const companyEl = document.createElement("span");
            companyEl.className = "company";
            companyEl.textContent = item.company || "";

            const locationEl = document.createElement("span");
            locationEl.className = "location";
            locationEl.textContent = item.location || "";

            const duration = document.createElement("span");
            duration.className = "duration";
            duration.textContent = item.date || "";

            meta.appendChild(companyEl);
            meta.appendChild(locationEl);
            header.appendChild(titleEl);
            header.appendChild(meta);
            header.appendChild(duration);

            const bullets = document.createElement("ul");
            bullets.className = "job-description";
            (item.bullets || []).forEach((bullet) => {
                const li = document.createElement("li");
                li.textContent = bullet;
                bullets.appendChild(li);
            });

            card.appendChild(header);
            if (item.bullets?.length) {
                card.appendChild(bullets);
            }
            list.appendChild(card);
        });
    }
}

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
            meta.className = "meta-row job-meta";

            if (item.company) {
                const companyEl = document.createElement("span");
                companyEl.className = "meta-pill";
                companyEl.innerHTML = `<i class="fas fa-building meta-icon"></i><span>${item.company}</span>`;
                meta.appendChild(companyEl);
            }

            if (item.location) {
                const locationEl = document.createElement("span");
                locationEl.className = "meta-pill";
                locationEl.innerHTML = `<i class="fas fa-location-dot meta-icon"></i><span>${item.location}</span>`;
                meta.appendChild(locationEl);
            }

            if (item.date) {
                const duration = document.createElement("span");
                duration.className = "meta-pill";
                duration.innerHTML = `<i class="fas fa-calendar meta-icon"></i><span>${item.date}</span>`;
                meta.appendChild(duration);
            }

            header.appendChild(titleEl);
            header.appendChild(meta);

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

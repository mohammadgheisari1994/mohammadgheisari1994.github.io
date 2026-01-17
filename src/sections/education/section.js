import Section from "../../core/section.js";

export default class EducationSection extends Section {
    constructor({ title } = {}) {
        super({
            id: "education",
            navLabel: "Education",
            title,
            icon: "fas fa-graduation-cap",
            templateUrl: new URL("./template.html", import.meta.url),
            styleUrl: new URL("./section.css", import.meta.url)
        });
    }

    afterRender(container, data) {
        const list = container.querySelector("[data-education-list]");
        if (!list) {
            return;
        }
        list.innerHTML = "";
        const items = data?.items || [];
        if (!items.length) {
            const empty = document.createElement("div");
            empty.className = "empty-state";
            empty.textContent = "Education will appear here.";
            list.appendChild(empty);
            return;
        }

        items.forEach((item) => {
            const card = document.createElement("div");
            card.className = "degree";

            const header = document.createElement("div");
            header.className = "degree-header";

            const titleEl = document.createElement("h4");
            titleEl.textContent = item.degree || "";

            header.appendChild(titleEl);

            const meta = document.createElement("div");
            meta.className = "meta-row degree-meta";

            if (item.institution) {
                const institution = document.createElement("span");
                institution.className = "meta-pill";
                institution.innerHTML = `<i class="fas fa-university meta-icon"></i><span>${item.institution}</span>`;
                meta.appendChild(institution);
            }

            if (item.location) {
                const location = document.createElement("span");
                location.className = "meta-pill";
                location.innerHTML = `<i class="fas fa-location-dot meta-icon"></i><span>${item.location}</span>`;
                meta.appendChild(location);
            }

            if (item.date) {
                const duration = document.createElement("span");
                duration.className = "meta-pill";
                duration.innerHTML = `<i class="fas fa-calendar meta-icon"></i><span>${item.date}</span>`;
                meta.appendChild(duration);
            }

            card.appendChild(header);
            card.appendChild(meta);

            if (item.highlights?.length) {
                const label = document.createElement("div");
                label.className = "degree-highlights-title";
                label.textContent = "Key Courses";
                card.appendChild(label);

                const highlights = document.createElement("ul");
                highlights.className = "degree-details degree-highlights";
                item.highlights.forEach((highlight) => {
                    const li = document.createElement("li");
                    li.textContent = highlight;
                    highlights.appendChild(li);
                });
                card.appendChild(highlights);
            }
            list.appendChild(card);
        });
    }
}

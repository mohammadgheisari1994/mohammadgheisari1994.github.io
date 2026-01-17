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

            const duration = document.createElement("span");
            duration.className = "duration";
            duration.textContent = item.date || "";

            header.appendChild(titleEl);
            header.appendChild(duration);

            const details = document.createElement("ul");
            details.className = "degree-details";

            const institution = document.createElement("li");
            institution.textContent = item.institution || "";
            details.appendChild(institution);

            if (item.location) {
                const location = document.createElement("li");
                location.textContent = item.location;
                details.appendChild(location);
            }

            card.appendChild(header);
            card.appendChild(details);
            list.appendChild(card);
        });
    }
}

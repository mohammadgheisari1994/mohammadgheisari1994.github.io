import Section from "../../core/section.js";
import { createEmptyState, createList, createMetaPill, createMetaRow } from "../../core/dom.js";

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
            list.appendChild(createEmptyState("Education will appear here."));
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

            const meta = createMetaRow(
                [
                    item.institution ? createMetaPill("fas fa-university", item.institution) : null,
                    item.location ? createMetaPill("fas fa-location-dot", item.location) : null,
                    item.date ? createMetaPill("fas fa-calendar", item.date) : null
                ],
                "degree-meta"
            );

            card.appendChild(header);
            card.appendChild(meta);

            if (item.highlights?.length) {
                const label = document.createElement("div");
                label.className = "degree-highlights-title";
                label.textContent = "Key Courses";
                card.appendChild(label);

                card.appendChild(createList(item.highlights, "degree-details degree-highlights"));
            }
            list.appendChild(card);
        });
    }
}

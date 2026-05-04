import Section from "../../core/section.js";
import { createEmptyState, createIconLabel, createList, createMetaPill, createMetaRow } from "../../core/dom.js";

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
            list.appendChild(createEmptyState("Experience will appear here."));
            return;
        }

        items.forEach((item) => {
            const card = document.createElement("div");
            card.className = "job";

            const header = document.createElement("div");
            header.className = "job-header";

            const titleEl = document.createElement("h4");
            titleEl.textContent = item.title || "";

            const companyMeta = item.company
                ? (item.companyUrl
                    ? createIconLabel({
                        icon: "fas fa-building",
                        text: item.company,
                        className: "meta-pill",
                        tag: "a",
                        href: item.companyUrl,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    })
                    : createMetaPill("fas fa-building", item.company))
                : null;

            const meta = createMetaRow(
                [
                    companyMeta,
                    item.location ? createMetaPill("fas fa-location-dot", item.location) : null,
                    item.date ? createMetaPill("fas fa-calendar", item.date) : null
                ],
                "job-meta"
            );

            header.appendChild(titleEl);
            header.appendChild(meta);

            card.appendChild(header);
            if (item.bullets?.length) {
                card.appendChild(createList(item.bullets, "job-description"));
            }
            list.appendChild(card);
        });
    }
}

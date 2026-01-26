import Section from "../../core/section.js";
import { createEmptyState, createList, createMetaPill, createMetaRow } from "../../core/dom.js";

export default class CertificatesSection extends Section {
    constructor({ title } = {}) {
        super({
            id: "certificates",
            navLabel: "Certificates",
            title,
            icon: "fas fa-award",
            templateUrl: new URL("./template.html", import.meta.url),
            styleUrl: new URL("./section.css", import.meta.url)
        });
    }

    afterRender(container, data) {
        const list = container.querySelector("[data-certificates-list]");
        if (!list) {
            return;
        }
        list.innerHTML = "";
        const items = data?.items || [];
        if (!items.length) {
            list.appendChild(createEmptyState("Certificates will appear here."));
            return;
        }

        items.forEach((item) => {
            const card = document.createElement("div");
            card.className = "certificate";

            const header = document.createElement("div");
            header.className = "certificate-header";

            const titleEl = document.createElement("h4");
            titleEl.textContent = item.title || "";

            header.appendChild(titleEl);

            const meta = createMetaRow(
                [
                    item.issuer ? createMetaPill("fas fa-award", item.issuer) : null,
                    item.location ? createMetaPill("fas fa-graduation-cap", item.location) : null,
                    item.date ? createMetaPill("fas fa-calendar", item.date) : null
                ],
                "certificate-meta-row"
            );

            card.appendChild(header);
            card.appendChild(meta);

            if (item.courses?.length) {
                const label = document.createElement("div");
                label.className = "certificate-courses-title";
                label.textContent = "Courses";
                card.appendChild(label);

                card.appendChild(createList(item.courses, "certificate-courses"));
            }
            list.appendChild(card);
        });
    }
}

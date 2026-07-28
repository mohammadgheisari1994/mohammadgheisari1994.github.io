import Section from "../../core/section.js";
import { createEmptyState, createIconLabel, createList } from "../../core/dom.js";

function createNarrativeBlock(block) {
    const wrapper = document.createElement("div");
    wrapper.className = "project-narrative-block";

    if (block.heading) {
        const heading = document.createElement("h5");
        heading.textContent = block.heading;
        wrapper.appendChild(heading);
    }

    (block.body || []).forEach((paragraph) => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        wrapper.appendChild(p);
    });

    if (block.points?.length) {
        const dl = document.createElement("dl");
        dl.className = "project-points";
        block.points.forEach((point) => {
            const dt = document.createElement("dt");
            dt.textContent = point.label || "";
            const dd = document.createElement("dd");
            dd.textContent = point.text || "";
            dl.appendChild(dt);
            dl.appendChild(dd);
        });
        wrapper.appendChild(dl);
    }

    return wrapper;
}

function createProjectCard(item) {
    const card = document.createElement("div");
    card.className = "project";

    const header = document.createElement("div");
    header.className = "project-header";

    const titleEl = document.createElement("h4");
    titleEl.textContent = item.title || "";
    header.appendChild(titleEl);

    if (item.date || item.status) {
        const metaRow = document.createElement("div");
        metaRow.className = "project-meta-row";
        if (item.date) {
            metaRow.appendChild(
                createIconLabel({ icon: "fas fa-calendar", text: item.date, className: "project-meta" })
            );
        }
        if (item.status) {
            metaRow.appendChild(
                createIconLabel({ icon: "fas fa-circle-check", text: item.status, className: "project-meta" })
            );
        }
        header.appendChild(metaRow);
    }

    card.appendChild(header);

    if (item.organization) {
        card.appendChild(
            createIconLabel({ icon: "fas fa-university", text: item.organization, className: "project-org" })
        );
    }

    if (item.subtitle) {
        const subtitle = document.createElement("div");
        subtitle.className = "project-subtitle";
        subtitle.textContent = item.subtitle;
        card.appendChild(subtitle);
    }

    if (item.tagline) {
        const tagline = document.createElement("p");
        tagline.className = "project-tagline";
        tagline.textContent = item.tagline;
        card.appendChild(tagline);
    }

    if (item.stack) {
        card.appendChild(
            createIconLabel({ icon: "fas fa-layer-group", text: item.stack, className: "meta-pill project-stack" })
        );
    }

    if (item.links?.length) {
        const linksRow = document.createElement("div");
        linksRow.className = "project-links";
        item.links.forEach((link) => {
            linksRow.appendChild(
                createIconLabel({
                    icon: link.icon || "fas fa-arrow-up-right-from-square",
                    text: link.label || link.url,
                    className: "project-link",
                    tag: "a",
                    href: link.url,
                    target: "_blank",
                    rel: "noopener noreferrer"
                })
            );
        });
        card.appendChild(linksRow);
    }

    if (item.confidentialNote) {
        const note = document.createElement("div");
        note.className = "project-confidential-note";
        note.textContent = item.confidentialNote;
        card.appendChild(note);
    }

    if (item.narrative?.length) {
        const narrative = document.createElement("div");
        narrative.className = "project-narrative";
        item.narrative.forEach((block) => narrative.appendChild(createNarrativeBlock(block)));
        card.appendChild(narrative);
    } else if (item.bullets?.length) {
        card.appendChild(createList(item.bullets, "project-description"));
    }

    return card;
}

function createCompactItem(item) {
    const row = document.createElement("div");
    row.className = "project-compact-item";

    const header = document.createElement("div");
    header.className = "project-compact-header";

    const titleEl = document.createElement("span");
    titleEl.className = "project-compact-title";
    titleEl.textContent = item.title || "";
    header.appendChild(titleEl);

    if (item.date) {
        const dateEl = document.createElement("span");
        dateEl.className = "project-compact-date";
        dateEl.textContent = item.date;
        header.appendChild(dateEl);
    }

    row.appendChild(header);

    if (item.description) {
        const description = document.createElement("p");
        description.className = "project-compact-description";
        description.textContent = item.description;
        row.appendChild(description);
    }

    return row;
}

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
        const additionalContainer = container.querySelector("[data-projects-additional]");
        if (!list) {
            return;
        }
        list.innerHTML = "";
        if (additionalContainer) {
            additionalContainer.innerHTML = "";
        }

        const items = data?.items || [];
        const additional = data?.additional || [];

        if (!items.length && !additional.length) {
            list.appendChild(createEmptyState("Projects will appear here."));
            return;
        }

        items.forEach((item) => list.appendChild(createProjectCard(item)));

        if (additional.length && additionalContainer) {
            const heading = document.createElement("h5");
            heading.className = "project-additional-heading";
            heading.textContent = data?.additionalTitle || "Additional academic work";
            additionalContainer.appendChild(heading);

            const listWrap = document.createElement("div");
            listWrap.className = "project-compact-list";
            additional.forEach((item) => listWrap.appendChild(createCompactItem(item)));
            additionalContainer.appendChild(listWrap);
        }
    }
}

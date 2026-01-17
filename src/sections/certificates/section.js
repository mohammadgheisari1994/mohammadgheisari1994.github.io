import Section from "../../core/section.js";

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
            const empty = document.createElement("div");
            empty.className = "empty-state";
            empty.textContent = "Certificates will appear here.";
            list.appendChild(empty);
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

            const meta = document.createElement("div");
            meta.className = "meta-row certificate-meta-row";

            if (item.issuer) {
                const issuer = document.createElement("span");
                issuer.className = "meta-pill";
                issuer.innerHTML = `<i class="fas fa-award meta-icon"></i><span>${item.issuer}</span>`;
                meta.appendChild(issuer);
            }

            if (item.location) {
                const platform = document.createElement("span");
                platform.className = "meta-pill";
                platform.innerHTML = `<i class="fas fa-graduation-cap meta-icon"></i><span>${item.location}</span>`;
                meta.appendChild(platform);
            }

            if (item.date) {
                const date = document.createElement("span");
                date.className = "meta-pill";
                date.innerHTML = `<i class="fas fa-calendar meta-icon"></i><span>${item.date}</span>`;
                meta.appendChild(date);
            }

            card.appendChild(header);
            card.appendChild(meta);

            if (item.courses?.length) {
                const label = document.createElement("div");
                label.className = "certificate-courses-title";
                label.textContent = "Courses";
                card.appendChild(label);

                const list = document.createElement("ul");
                list.className = "certificate-courses";
                item.courses.forEach((course) => {
                    const li = document.createElement("li");
                    li.textContent = course;
                    list.appendChild(li);
                });
                card.appendChild(list);
            }
            list.appendChild(card);
        });
    }
}

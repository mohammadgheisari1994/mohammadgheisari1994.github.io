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

            const dateEl = document.createElement("span");
            dateEl.className = "certificate-date";
            dateEl.textContent = item.date || "";

            header.appendChild(titleEl);
            header.appendChild(dateEl);

            const meta = document.createElement("div");
            meta.className = "certificate-meta";

            const issuer = document.createElement("span");
            issuer.className = "certificate-issuer";
            issuer.textContent = item.issuer || "";

            const platform = document.createElement("span");
            platform.className = "certificate-platform";
            platform.textContent = item.location || "";

            meta.appendChild(issuer);
            if (item.location) {
                meta.appendChild(platform);
            }

            card.appendChild(header);
            card.appendChild(meta);
            list.appendChild(card);
        });
    }
}

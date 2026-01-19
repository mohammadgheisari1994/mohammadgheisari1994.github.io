import Section from "../../core/section.js";

export default class SummarySection extends Section {
    constructor({ title } = {}) {
        super({
            id: "about",
            navLabel: "About",
            title,
            icon: "fas fa-user",
            templateUrl: new URL("./template.html", import.meta.url),
            styleUrl: new URL("./section.css", import.meta.url)
        });
    }

    afterRender(container, data) {
        const introEl = container.querySelector("[data-about-intro]");
        const moreEl = container.querySelector("[data-about-more]");
        const toggle = container.querySelector("[data-about-toggle]");
        if (!introEl || !moreEl || !toggle) {
            return;
        }
        const intro = data?.intro || [];
        const sections = data?.sections || [];

        introEl.innerHTML = "";
        moreEl.innerHTML = "";

        if (!intro.length && !sections.length) {
            introEl.textContent = "About content will appear here.";
            toggle.hidden = true;
            return;
        }

        intro.forEach((paragraph) => {
            const p = document.createElement("p");
            p.textContent = paragraph;
            introEl.appendChild(p);
        });

        sections.forEach((section) => {
            const header = document.createElement("h3");
            header.textContent = section.heading || "";
            moreEl.appendChild(header);

            (section.body || []).forEach((paragraph) => {
                const p = document.createElement("p");
                p.textContent = paragraph;
                moreEl.appendChild(p);
            });

            if (section.list?.length) {
                const ul = document.createElement("ul");
                ul.className = "about-list";
                section.list.forEach((item) => {
                    const li = document.createElement("li");
                    li.textContent = item;
                    ul.appendChild(li);
                });
                moreEl.appendChild(ul);
            }
        });

        toggle.addEventListener("click", () => {
            const isOpen = moreEl.classList.toggle("is-open");
            toggle.textContent = isOpen ? "Show less" : "Read more";
        });
    }
}

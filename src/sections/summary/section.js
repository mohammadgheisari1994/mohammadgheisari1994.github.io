import Section from "../../core/section.js";

export default class SummarySection extends Section {
    constructor({ title } = {}) {
        super({
            id: "summary",
            navLabel: "About",
            title,
            icon: "fas fa-user",
            templateUrl: new URL("./template.html", import.meta.url),
            styleUrl: new URL("./section.css", import.meta.url)
        });
    }

    afterRender(container, data) {
        const textEl = container.querySelector("[data-summary]");
        if (!textEl) {
            return;
        }
        const summary = data?.text || "";
        if (!summary) {
            textEl.textContent = "Summary content will appear here.";
            return;
        }
        textEl.textContent = summary;
    }
}

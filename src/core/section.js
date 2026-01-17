export default class Section {
    constructor({ id, navLabel, title, icon, templateUrl, styleUrl }) {
        this.id = id;
        this.navLabel = navLabel || title || id;
        this.title = title || navLabel || id;
        this.icon = icon;
        this.templateUrl = templateUrl;
        this.styleUrl = styleUrl;
        this.container = null;
        this.rendered = false;
    }

    mount(parent) {
        if (!this.container) {
            const container = document.createElement("div");
            container.id = this.id;
            container.className = "tab-content";
            this.container = container;
            parent.appendChild(container);
        }
    }

    async ensureStyle() {
        if (!this.styleUrl) {
            return;
        }
        const id = `section-style-${this.id}`;
        if (document.getElementById(id)) {
            return;
        }
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = this.styleUrl.toString();
        document.head.appendChild(link);
    }

    async loadTemplate() {
        if (!this.templateUrl) {
            return "";
        }
        const response = await fetch(this.templateUrl);
        if (!response.ok) {
            throw new Error(`Failed to load template for ${this.id}: ${response.status}`);
        }
        return response.text();
    }

    async render(data) {
        if (!this.container) {
            throw new Error(`Section ${this.id} is not mounted.`);
        }
        await this.ensureStyle();
        if (!this.rendered) {
            const template = await this.loadTemplate();
            this.container.innerHTML = template;
            this.afterRender(this.container, data);
            this.rendered = true;
        } else {
            this.afterRender(this.container, data);
        }
    }

    afterRender(_container, _data) {}

    setActive(active) {
        if (!this.container) {
            return;
        }
        this.container.classList.toggle("active", active);
        if (!active) {
            this.container.classList.remove("fade-out");
        }
    }
}

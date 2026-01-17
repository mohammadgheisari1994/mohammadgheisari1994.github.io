export default class TabRouter {
    constructor({ navContainer, titleElement, sections, data, onSectionRendered, transitionMs = 300 }) {
        this.navContainer = navContainer;
        this.titleElement = titleElement;
        this.sections = sections;
        this.data = data;
        this.onSectionRendered = onSectionRendered;
        this.transitionMs = transitionMs;
        this.activeSection = null;
        this.navButtons = new Map();
        this.sectionMap = new Map(sections.map((section) => [section.id, section]));
        this.pendingTimeout = null;
    }

    init() {
        this.renderNav();
        this.bindEvents();
        const initialId = this.getInitialSectionId();
        if (initialId) {
            this.openSection(initialId, { updateHash: false });
        }
    }

    renderNav() {
        this.navContainer.innerHTML = "";
        this.sections.forEach((section) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "nav-button";
            button.dataset.tab = section.id;
            button.innerHTML = `${section.icon ? `<i class="${section.icon}"></i>` : ""}<span>${section.navLabel}</span>`;
            this.navContainer.appendChild(button);
            this.navButtons.set(section.id, button);
        });
    }

    bindEvents() {
        this.navContainer.addEventListener("click", (event) => {
            const target = event.target.closest(".nav-button");
            if (!target) {
                return;
            }
            event.preventDefault();
            const tabName = target.dataset.tab;
            this.openSection(tabName);
        });

        window.addEventListener("hashchange", () => {
            const hash = window.location.hash.replace("#", "");
            if (hash) {
                this.openSection(hash, { updateHash: false });
            }
        });
    }

    getInitialSectionId() {
        const hash = window.location.hash.replace("#", "");
        if (hash && this.sectionMap.has(hash)) {
            return hash;
        }
        return this.sections[0]?.id || null;
    }

    async openSection(id, { updateHash = true } = {}) {
        const next = this.sectionMap.get(id);
        if (!next || (this.activeSection && this.activeSection.id === id)) {
            return;
        }

        const previous = this.activeSection;
        this.setActiveButton(id);

        if (this.titleElement) {
            this.titleElement.classList.add("fade-out");
        }
        if (previous?.container) {
            previous.container.classList.add("fade-out");
        }

        if (this.pendingTimeout) {
            window.clearTimeout(this.pendingTimeout);
        }

        const runSwitch = async () => {
            if (previous) {
                previous.setActive(false);
            }
            await next.render(this.data.sections?.[id]);
            next.setActive(true);
            if (this.titleElement) {
                this.titleElement.textContent = this.getSectionTitle(next);
                this.titleElement.classList.remove("fade-out");
            }
            if (this.onSectionRendered) {
                this.onSectionRendered(next, next.container);
            }
        };

        const delay = previous ? this.transitionMs : 0;
        this.activeSection = next;
        this.pendingTimeout = window.setTimeout(runSwitch, delay);

        if (updateHash) {
            window.location.hash = id;
        }
    }

    getSectionTitle(section) {
        return this.data.sections?.[section.id]?.title || section.title || section.navLabel || section.id;
    }

    setActiveButton(id) {
        this.navButtons.forEach((button) => button.classList.remove("active"));
        const active = this.navButtons.get(id);
        if (active) {
            active.classList.add("active");
        }
    }
}

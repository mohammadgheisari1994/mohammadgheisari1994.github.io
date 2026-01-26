export function createEmptyState(message) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = message;
    return empty;
}

export function createIconLabel({ icon, text, className, tag = "div" }) {
    const wrapper = document.createElement(tag);
    if (className) {
        wrapper.className = className;
    }
    if (icon) {
        const iconEl = document.createElement("i");
        iconEl.className = `${icon} meta-icon`;
        wrapper.appendChild(iconEl);
    }
    const label = document.createElement("span");
    label.textContent = text || "";
    wrapper.appendChild(label);
    return wrapper;
}

export function createMetaPill(icon, text) {
    return createIconLabel({ icon, text, className: "meta-pill", tag: "span" });
}

export function createMetaRow(items, className = "") {
    const row = document.createElement("div");
    row.className = className ? `meta-row ${className}` : "meta-row";
    items.filter(Boolean).forEach((item) => row.appendChild(item));
    return row;
}

export function createList(items, className, itemClass) {
    const list = document.createElement("ul");
    if (className) {
        list.className = className;
    }
    (items || []).forEach((item) => {
        const li = document.createElement("li");
        if (itemClass) {
            li.className = itemClass;
        }
        li.textContent = item;
        list.appendChild(li);
    });
    return list;
}

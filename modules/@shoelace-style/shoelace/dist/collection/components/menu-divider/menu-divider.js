import { Component, h } from '@stencil/core';
/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */
export class MenuDivider {
    render() {
        return h("div", { part: "base", class: "menu-divider", role: "separator" });
    }
    static get is() { return "sl-menu-divider"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["menu-divider.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["menu-divider.css"]
    }; }
}

import { Component, Element, Host, Method, Prop, h } from '@stencil/core';
let id = 0;
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The tab's label.
 *
 * @part base - The component's base wrapper.
 */
export class Tab {
    constructor() {
        this.componentId = `tab-${++id}`;
        /** The name of the tab panel the tab will control. The panel must be located in the same tab group. */
        this.panel = '';
        /** Set to true to draw the tab in an active state. */
        this.active = false;
        /** Set to true to draw the tab in a disabled state. */
        this.disabled = false;
    }
    /** Sets focus to the tab. */
    async setFocus() {
        this.tab.focus({ preventScroll: true });
    }
    /** Removes focus from the tab. */
    async removeFocus() {
        this.tab.blur();
    }
    render() {
        return (
        // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
        h(Host, { id: this.host.id || this.componentId },
            h("div", { part: "base", ref: el => (this.tab = el), class: {
                    tab: true,
                    // States
                    'tab--active': this.active,
                    'tab--disabled': this.disabled
                }, role: "tab", "aria-disabled": this.disabled, "aria-selected": this.active, tabindex: this.disabled || !this.active ? '-1' : '0' },
                h("slot", null))));
    }
    static get is() { return "sl-tab"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["tab.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["tab.css"]
    }; }
    static get properties() { return {
        "panel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The name of the tab panel the tab will control. The panel must be located in the same tab group."
            },
            "attribute": "panel",
            "reflect": false,
            "defaultValue": "''"
        },
        "active": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set to true to draw the tab in an active state."
            },
            "attribute": "active",
            "reflect": false,
            "defaultValue": "false"
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set to true to draw the tab in a disabled state."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get methods() { return {
        "setFocus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Sets focus to the tab.",
                "tags": []
            }
        },
        "removeFocus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Removes focus from the tab.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "host"; }
}

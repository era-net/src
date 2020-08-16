import { Component, Event, Prop, Watch, h } from '@stencil/core';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The menu item's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 *
 * @part base - The component's base wrapper.
 * @part checked-icon - The container that wraps the checked icon.
 * @part prefix - The prefix container.
 * @part label - The menu item label.
 * @part suffix - The suffix container.
 */
export class MenuItem {
    constructor() {
        /** Set to true to draw the item in a checked state. */
        this.checked = false;
        /** Set to true to draw the menu item in an active state. */
        this.active = false;
        /** A unique value to store in the menu item. */
        this.value = '';
        /** Set to true to draw the menu item in a disabled state. */
        this.disabled = false;
    }
    handleActiveChange() {
        this.active ? this.slActivate.emit() : this.slDeactivate.emit();
    }
    render() {
        return (h("div", { part: "base", class: {
                'menu-item': true,
                'menu-item--checked': this.checked,
                'menu-item--active': this.active,
                'menu-item--disabled': this.disabled
            }, role: "menuitem", "aria-checked": this.checked, "aria-disabled": this.disabled, "aria-selected": this.active },
            h("span", { part: "checked-icon", class: "menu-item__check" },
                h("sl-icon", { name: "check2" })),
            h("span", { part: "prefix", class: "menu-item__prefix" },
                h("slot", { name: "prefix" })),
            h("span", { part: "label", class: "menu-item__label" },
                h("slot", null)),
            h("span", { part: "suffix", class: "menu-item__suffix" },
                h("slot", { name: "suffix" }))));
    }
    static get is() { return "sl-menu-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["menu-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["menu-item.css"]
    }; }
    static get properties() { return {
        "checked": {
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
                "text": "Set to true to draw the item in a checked state."
            },
            "attribute": "checked",
            "reflect": false,
            "defaultValue": "false"
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
                "text": "Set to true to draw the menu item in an active state."
            },
            "attribute": "active",
            "reflect": false,
            "defaultValue": "false"
        },
        "value": {
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
                "text": "A unique value to store in the menu item."
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "''"
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
                "text": "Set to true to draw the menu item in a disabled state."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get events() { return [{
            "method": "slActivate",
            "name": "slActivate",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the menu item becomes active."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slDeactivate",
            "name": "slDeactivate",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the menu item becomes inactive."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get watchers() { return [{
            "propName": "active",
            "methodName": "handleActiveChange"
        }]; }
}

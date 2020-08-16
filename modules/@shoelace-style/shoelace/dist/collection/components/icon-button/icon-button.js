import { Component, Prop, h } from '@stencil/core';
import { focusVisible } from '../../utilities/focus-visible';
/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */
export class IconButton {
    constructor() {
        /** Set to true to disable the button. */
        this.disabled = false;
    }
    componentDidLoad() {
        focusVisible.observe(this.button);
    }
    disconnectedCallback() {
        focusVisible.unobserve(this.button);
    }
    render() {
        return (h("button", { ref: el => (this.button = el), part: "base", class: {
                'icon-button': true,
                'icon-button--disabled': this.disabled
            }, type: "button" },
            h("sl-icon", { name: this.name, src: this.src, label: this.label })));
    }
    static get is() { return "sl-icon-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["icon-button.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["icon-button.css"]
    }; }
    static get properties() { return {
        "name": {
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
                "text": "The name of the icon to draw. See the icon component for a full list of icons."
            },
            "attribute": "name",
            "reflect": false
        },
        "src": {
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
                "text": "An external URL of an SVG file."
            },
            "attribute": "src",
            "reflect": false
        },
        "label": {
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
                "text": "An alternative description to use for accessibility. If omitted, the name or src will be used to generate it."
            },
            "attribute": "label",
            "reflect": false
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
                "text": "Set to true to disable the button."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
}

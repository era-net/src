import { Component, Prop, h } from '@stencil/core';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - A label to show inside the indicator.
 *
 * @part base - The component's base wrapper.
 * @part indicator - The progress bar indicator.
 * @part label - The progress bar label.
 */
export class ProgressBar {
    constructor() {
        /** The progress bar's percentage, 0 to 100. */
        this.percentage = 0;
    }
    render() {
        return (h("div", { part: "base", class: "progress-bar", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": this.percentage },
            h("div", { part: "base", class: "progress-bar__indicator", style: {
                    width: `${this.percentage}%`
                } },
                h("span", { part: "label", class: "progress-bar__label" },
                    h("slot", null)))));
    }
    static get is() { return "sl-progress-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["progress-bar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["progress-bar.css"]
    }; }
    static get properties() { return {
        "percentage": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The progress bar's percentage, 0 to 100."
            },
            "attribute": "percentage",
            "reflect": false,
            "defaultValue": "0"
        }
    }; }
}

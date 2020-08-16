import { Component, Event, Method, Prop, State, Watch, h } from '@stencil/core';
let id = 0;
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The checkbox's label.
 *
 * @part base - The component's base wrapper.
 * @part control - The checkbox control.
 * @part checked-icon - The container the wraps the checked icon.
 * @part indeterminate-icon - The container that wraps the indeterminate icon.
 * @part label - The checkbox label.
 */
export class Checkbox {
    constructor() {
        this.inputId = `checkbox-${++id}`;
        this.labelId = `checkbox-label-${id}`;
        this.hasFocus = false;
        /** Set to true to disable the checkbox. */
        this.disabled = false;
        /** Set to true to draw the checkbox in a checked state. */
        this.checked = false;
        /** Set to true to draw the checkbox in an indeterminate state. */
        this.indeterminate = false;
    }
    handleCheckedChange() {
        this.input.checked = this.checked;
        this.input.indeterminate = this.indeterminate;
        this.slChange.emit();
    }
    connectedCallback() {
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }
    componentDidLoad() {
        this.input.indeterminate = this.indeterminate;
    }
    /** Sets focus on the checkbox. */
    async setFocus() {
        this.input.focus();
    }
    /** Removes focus from the checkbox. */
    async removeFocus() {
        this.input.blur();
    }
    handleClick() {
        this.checked = this.input.checked;
        this.indeterminate = this.input.indeterminate;
    }
    handleBlur() {
        this.hasFocus = false;
        this.slBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.slFocus.emit();
    }
    handleMouseDown(event) {
        // Prevent clicks on the label from briefly blurring the input
        event.preventDefault();
        this.input.focus();
    }
    render() {
        return (h("label", { part: "base", class: {
                checkbox: true,
                'checkbox--checked': this.checked,
                'checkbox--disabled': this.disabled,
                'checkbox--focused': this.hasFocus,
                'checkbox--indeterminate': this.indeterminate
            }, htmlFor: this.inputId, role: "checkbox", onMouseDown: this.handleMouseDown },
            h("span", { part: "control", class: "checkbox__control" },
                this.checked && (h("span", { part: "checked-icon", class: "checkbox__icon" },
                    h("svg", { viewBox: "0 0 16 16" },
                        h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd", "stroke-linecap": "round" },
                            h("g", { stroke: "currentColor", "stroke-width": "2" },
                                h("g", { transform: "translate(3.428571, 3.428571)" },
                                    h("path", { d: "M0,5.71428571 L3.42857143,9.14285714" }),
                                    h("path", { d: "M9.14285714,0 L3.42857143,9.14285714" }))))))),
                !this.checked && this.indeterminate && (h("span", { part: "indeterminate-icon", class: "checkbox__icon" },
                    h("svg", { viewBox: "0 0 16 16" },
                        h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd", "stroke-linecap": "round" },
                            h("g", { stroke: "currentColor", "stroke-width": "2" },
                                h("g", { transform: "translate(2.285714, 6.857143)" },
                                    h("path", { d: "M10.2857143,1.14285714 L1.14285714,1.14285714" }))))))),
                h("input", { ref: el => (this.input = el), id: this.inputId, type: "checkbox", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, "aria-labeledby": this.labelId, onClick: this.handleClick, onBlur: this.handleBlur, onFocus: this.handleFocus })),
            h("span", { part: "label", id: this.labelId, class: "checkbox__label" },
                h("slot", null))));
    }
    static get is() { return "sl-checkbox"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["checkbox.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["checkbox.css"]
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
                "text": "The checkbox's name attribute."
            },
            "attribute": "name",
            "reflect": false
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
                "text": "The checkbox's value attribute."
            },
            "attribute": "value",
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
                "text": "Set to true to disable the checkbox."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "checked": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set to true to draw the checkbox in a checked state."
            },
            "attribute": "checked",
            "reflect": false,
            "defaultValue": "false"
        },
        "indeterminate": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set to true to draw the checkbox in an indeterminate state."
            },
            "attribute": "indeterminate",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "hasFocus": {}
    }; }
    static get events() { return [{
            "method": "slBlur",
            "name": "slBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the control loses focus."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slChange",
            "name": "slChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the control's checked state changes."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slFocus",
            "name": "slFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the control gains focus."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
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
                "text": "Sets focus on the checkbox.",
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
                "text": "Removes focus from the checkbox.",
                "tags": []
            }
        }
    }; }
    static get watchers() { return [{
            "propName": "checked",
            "methodName": "handleCheckedChange"
        }, {
            "propName": "indeterminate",
            "methodName": "handleCheckedChange"
        }]; }
}

import { Component, Element, Event, Method, Prop, State, Watch, h } from '@stencil/core';
let id = 0;
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The radio's label.
 *
 * @part base - The component's base wrapper.
 * @part control - The radio control.
 * @part checked-icon - The container the wraps the checked icon.
 * @part label - The radio label.
 */
export class Radio {
    constructor() {
        this.inputId = `radio-${++id}`;
        this.labelId = `radio-label-${id}`;
        this.hasFocus = false;
        /** Set to true to disable the radio. */
        this.disabled = false;
        /** Set to true to draw the radio in a checked state. */
        this.checked = false;
    }
    handleCheckedChange() {
        if (this.checked) {
            this.getSiblingRadios().map(radio => (radio.checked = false));
        }
        this.input.checked = this.checked;
        this.slChange.emit();
    }
    connectedCallback() {
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }
    /** Sets focus on the radio. */
    async setFocus() {
        this.input.focus();
    }
    /** Removes focus from the radio. */
    async removeFocus() {
        this.input.blur();
    }
    getAllRadios() {
        const form = this.host.closest('sl-form, form') || document.body;
        if (!this.name)
            return [];
        return [...form.querySelectorAll('sl-radio')].filter((radio) => radio.name === this.name);
    }
    getSiblingRadios() {
        return this.getAllRadios().filter(radio => radio !== this.host);
    }
    handleClick() {
        this.checked = this.input.checked;
    }
    handleBlur() {
        this.hasFocus = false;
        this.slBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.slFocus.emit();
    }
    handleKeyDown(event) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            const radios = this.getAllRadios().filter(radio => !radio.disabled);
            const incr = ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
            let index = radios.indexOf(this.host) + incr;
            if (index < 0)
                index = radios.length - 1;
            if (index > radios.length - 1)
                index = 0;
            this.getAllRadios().map(radio => (radio.checked = false));
            radios[index].setFocus();
            radios[index].checked = true;
            event.preventDefault();
        }
    }
    handleMouseDown(event) {
        // Prevent clicks on the label from briefly blurring the input
        event.preventDefault();
        this.input.focus();
    }
    render() {
        return (h("label", { part: "base", class: {
                radio: true,
                'radio--checked': this.checked,
                'radio--disabled': this.disabled,
                'radio--focused': this.hasFocus
            }, htmlFor: this.inputId, role: "radio", onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown },
            h("span", { part: "control", class: "radio__control" },
                h("span", { part: "checked-icon", class: "radio__icon" },
                    h("svg", { viewBox: "0 0 16 16" },
                        h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
                            h("g", { fill: "currentColor" },
                                h("circle", { cx: "8", cy: "8", r: "3.42857143" }))))),
                h("input", { ref: el => (this.input = el), id: this.inputId, type: "radio", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, "aria-labeledby": this.labelId, onClick: this.handleClick, onBlur: this.handleBlur, onFocus: this.handleFocus })),
            h("span", { part: "label", id: this.labelId, class: "radio__label" },
                h("slot", null))));
    }
    static get is() { return "sl-radio"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["radio.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["radio.css"]
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
                "text": "The radio's name attribute."
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
                "text": "The radio's value attribute."
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
                "text": "Set to true to disable the radio."
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
                "text": "Set to true to draw the radio in a checked state."
            },
            "attribute": "checked",
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
                "text": "Sets focus on the radio.",
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
                "text": "Removes focus from the radio.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "checked",
            "methodName": "handleCheckedChange"
        }]; }
}

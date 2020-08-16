import { Component, Event, Method, Prop, State, Watch, h } from '@stencil/core';
let id = 0;
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The switch's label.
 *
 * @part base - The component's base wrapper.
 * @part control - The switch control.
 * @part thumb - The switch position indicator.
 * @part label - The switch label.
 */
export class Switch {
    constructor() {
        this.switchId = `switch-${++id}`;
        this.labelId = `switch-label-${id}`;
        this.hasFocus = false;
        /** Set to true to disable the switch. */
        this.disabled = false;
        /** Set to true to draw the switch in a checked state. */
        this.checked = false;
    }
    handleCheckedChange() {
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
    /** Sets focus on the switch. */
    async setFocus() {
        this.input.focus();
    }
    /** Removes focus from the switch. */
    async removeFocus() {
        this.input.blur();
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
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this.checked = false;
        }
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.checked = true;
        }
    }
    handleMouseDown(event) {
        // Prevent clicks on the label from briefly blurring the input
        event.preventDefault();
        this.input.focus();
    }
    render() {
        return (h("label", { part: "base", htmlFor: this.switchId, role: "switch", class: {
                switch: true,
                'switch--checked': this.checked,
                'switch--disabled': this.disabled,
                'switch--focused': this.hasFocus
            }, onMouseDown: this.handleMouseDown },
            h("span", { part: "control", class: "switch__control" },
                h("span", { part: "thumb", class: "switch__thumb" }),
                h("input", { ref: el => (this.input = el), id: this.switchId, type: "checkbox", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, "aria-labeledby": this.labelId, onClick: this.handleClick, onBlur: this.handleBlur, onFocus: this.handleFocus, onKeyDown: this.handleKeyDown })),
            h("span", { part: "label", id: this.labelId, class: "switch__label" },
                h("slot", null))));
    }
    static get is() { return "sl-switch"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["switch.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["switch.css"]
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
                "text": "The switch's name attribute."
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
                "text": "The switch's value attribute."
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
                "text": "Set to true to disable the switch."
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
                "text": "Set to true to draw the switch in a checked state."
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
                "text": "Sets focus on the switch.",
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
                "text": "Removes focus from the switch.",
                "tags": []
            }
        }
    }; }
    static get watchers() { return [{
            "propName": "checked",
            "methodName": "handleCheckedChange"
        }]; }
}

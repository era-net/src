import { Component, Element, Event, Method, Prop, State, h } from '@stencil/core';
let id = 0;
/**
 * @since 2.0
 * @status stable
 *
 * @slot prefix - Used to prepend an icon or similar element to the input.
 * @slot suffix - Used to append an icon or similar element to the input.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot show-password-icon - An icon to use in lieu of the default show password icon.
 * @slot hide-password-icon - An icon to use in lieu of the default hide password icon.
 * @slot help-text - Help text that describes how to use the input.
 *
 * @part base - The component's base wrapper.
 * @part form-control - The form control that wraps the label and the input.
 * @part label - The input label.
 * @part input - The synthetic input container.
 * @part prefix - The input prefix container.
 * @part clear-button - The clear button.
 * @part password-toggle-button - The password toggle button.
 * @part suffix - The input suffix container.
 * @part help-text - The input help text.
 */
export class Input {
    constructor() {
        this.inputId = `input-${++id}`;
        this.labelId = `input-label-${id}`;
        this.helpTextId = `input-help-text-${id}`;
        this.hasFocus = false;
        this.isPasswordVisible = false;
        /** The input's type. */
        this.type = 'text';
        /** The input's size. */
        this.size = 'medium';
        /** The input's name attribute. */
        this.name = '';
        /** The input's value attribute. */
        this.value = '';
        /** Set to true to draw a pill-style input with rounded edges. */
        this.pill = false;
        /** The input's label. */
        this.label = '';
        /** Set to true to disable the input. */
        this.disabled = false;
        /** Set to true for a readonly input. */
        this.readonly = false;
        /** Set to true to add a clear button when the input is populated. */
        this.clearable = false;
        /** Set to true to add a password toggle button for password inputs. */
        this.togglePassword = false;
        /** Set to true to indicate that the user input is valid. */
        this.valid = false;
        /** Set to true to indicate that the user input is invalid. */
        this.invalid = false;
    }
    connectedCallback() {
        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handlePasswordToggle = this.handlePasswordToggle.bind(this);
    }
    /** Sets focus on the input. */
    async setFocus() {
        this.input.focus();
    }
    /** Removes focus from the input. */
    async removeFocus() {
        this.input.blur();
    }
    /** Selects all the text in the input. */
    async select() {
        return this.input.select();
    }
    /** Sets the start and end positions of the text selection (0-based). */
    async setSelectionRange(selectionStart, selectionEnd, selectionDirection = 'none') {
        return this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
    }
    /** Replaces a range of text with a new string. */
    async setRangeText(replacement, start, end, selectMode = 'preserve') {
        return this.input.setRangeText(replacement, start, end, selectMode);
    }
    handleChange() {
        this.slChange.emit();
    }
    handleInput() {
        this.value = this.input.value;
        this.slInput.emit();
    }
    handleBlur() {
        this.hasFocus = false;
        this.slBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.slFocus.emit();
    }
    handleClearClick() {
        if (this.input.value !== '') {
            this.input.value = '';
            this.input.dispatchEvent(new window.Event('input', { bubbles: true }));
            this.input.dispatchEvent(new window.Event('change', { bubbles: true }));
        }
        this.input.focus();
    }
    handleMouseDown(event) {
        const target = event.target;
        if (target !== this.input) {
            event.preventDefault();
            this.input.focus();
        }
    }
    handlePasswordToggle() {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
    render() {
        return (h("div", { part: "form-control", class: {
                'form-control': true,
                'form-control--has-label': this.label.length > 0,
                'form-control--valid': this.valid,
                'form-control--invalid': this.invalid
            } },
            h("label", { part: "label", class: {
                    label: true,
                    'label--small': this.size === 'small',
                    'label--medium': this.size === 'medium',
                    'label--large': this.size === 'large',
                    'label--valid': this.valid,
                    'label--invalid': this.invalid
                }, htmlFor: this.inputId }, this.label),
            h("div", { part: "base", class: {
                    input: true,
                    // Sizes
                    'input--small': this.size === 'small',
                    'input--medium': this.size === 'medium',
                    'input--large': this.size === 'large',
                    // States
                    'input--pill': this.pill,
                    'input--disabled': this.disabled,
                    'input--focused': this.hasFocus,
                    'input--empty': this.value.length === 0,
                    'input--valid': this.valid,
                    'input--invalid': this.invalid
                }, onMouseDown: this.handleMouseDown },
                h("span", { part: "prefix", class: "input__prefix" },
                    h("slot", { name: "prefix" })),
                h("input", { part: "input", ref: el => (this.input = el), id: this.inputId, class: "input__control", type: this.type === 'password' && this.isPasswordVisible ? 'text' : this.type, name: this.name, placeholder: this.placeholder, disabled: this.disabled, readonly: this.readonly, minLength: this.minlength, maxLength: this.maxlength, min: this.min, max: this.max, step: this.step, value: this.value, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, autoFocus: this.autofocus, pattern: this.pattern, required: this.required, inputMode: this.inputmode, "aria-labelledby": this.labelId, "aria-describedby": this.helpTextId, onChange: this.handleChange, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur }),
                this.clearable && (h("button", { part: "clear-button", class: "input__clear", type: "button", onClick: this.handleClearClick, tabindex: "-1" },
                    h("slot", { name: "clear-icon" },
                        h("sl-icon", { name: "x-circle" })))),
                this.togglePassword && (h("button", { part: "password-toggle-button", class: "input__password-toggle", type: "button", onClick: this.handlePasswordToggle, tabindex: "-1" }, this.isPasswordVisible ? (h("slot", { name: "show-password-icon" },
                    h("sl-icon", { name: "eye-slash" }))) : (h("slot", { name: "hide-password-icon" },
                    ' ',
                    h("sl-icon", { name: "eye" }))))),
                h("span", { part: "suffix", class: "input__suffix" },
                    h("slot", { name: "suffix" }))),
            h("div", { part: "help-text", id: this.helpTextId, class: {
                    'help-text': true,
                    'help-text--small': this.size === 'small',
                    'help-text--medium': this.size === 'medium',
                    'help-text--large': this.size === 'large',
                    'help-text--valid': this.valid,
                    'help-text--invalid': this.invalid
                } },
                h("slot", { name: "help-text" }))));
    }
    static get is() { return "sl-input"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["input.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["input.css"]
    }; }
    static get properties() { return {
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url'",
                "resolved": "\"email\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"url\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The input's type."
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'text'"
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'small' | 'medium' | 'large'",
                "resolved": "\"large\" | \"medium\" | \"small\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The input's size."
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "'medium'"
        },
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
                "text": "The input's name attribute."
            },
            "attribute": "name",
            "reflect": false,
            "defaultValue": "''"
        },
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The input's value attribute."
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "''"
        },
        "pill": {
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
                "text": "Set to true to draw a pill-style input with rounded edges."
            },
            "attribute": "pill",
            "reflect": false,
            "defaultValue": "false"
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
                "text": "The input's label."
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "''"
        },
        "placeholder": {
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
                "text": "The input's placeholder text."
            },
            "attribute": "placeholder",
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
                "text": "Set to true to disable the input."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "readonly": {
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
                "text": "Set to true for a readonly input."
            },
            "attribute": "readonly",
            "reflect": false,
            "defaultValue": "false"
        },
        "minlength": {
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
                "text": "The input's minlength attribute."
            },
            "attribute": "minlength",
            "reflect": false
        },
        "maxlength": {
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
                "text": "The input's maxlength attribute."
            },
            "attribute": "maxlength",
            "reflect": false
        },
        "min": {
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
                "text": "The input's min attribute."
            },
            "attribute": "min",
            "reflect": false
        },
        "max": {
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
                "text": "The input's max attribute."
            },
            "attribute": "max",
            "reflect": false
        },
        "step": {
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
                "text": "The input's step attribute."
            },
            "attribute": "step",
            "reflect": false
        },
        "autocapitalize": {
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
                "text": "The input's autocaptialize attribute."
            },
            "attribute": "autocapitalize",
            "reflect": false
        },
        "autocorrect": {
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
                "text": "The input's autocorrect attribute."
            },
            "attribute": "autocorrect",
            "reflect": false
        },
        "autocomplete": {
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
                "text": "The input's autocomplete attribute."
            },
            "attribute": "autocomplete",
            "reflect": false
        },
        "autofocus": {
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
                "text": "The input's autofocus attribute."
            },
            "attribute": "autofocus",
            "reflect": false
        },
        "pattern": {
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
                "text": "The input's pattern attribute."
            },
            "attribute": "pattern",
            "reflect": false
        },
        "required": {
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
                "text": "The input's required attribute."
            },
            "attribute": "required",
            "reflect": false
        },
        "clearable": {
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
                "text": "Set to true to add a clear button when the input is populated."
            },
            "attribute": "clearable",
            "reflect": false,
            "defaultValue": "false"
        },
        "togglePassword": {
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
                "text": "Set to true to add a password toggle button for password inputs."
            },
            "attribute": "toggle-password",
            "reflect": false,
            "defaultValue": "false"
        },
        "inputmode": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'",
                "resolved": "\"decimal\" | \"email\" | \"none\" | \"numeric\" | \"search\" | \"tel\" | \"text\" | \"url\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The input's inputmode attribute."
            },
            "attribute": "inputmode",
            "reflect": false
        },
        "valid": {
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
                "text": "Set to true to indicate that the user input is valid."
            },
            "attribute": "valid",
            "reflect": false,
            "defaultValue": "false"
        },
        "invalid": {
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
                "text": "Set to true to indicate that the user input is invalid."
            },
            "attribute": "invalid",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "hasFocus": {},
        "isPasswordVisible": {}
    }; }
    static get events() { return [{
            "method": "slChange",
            "name": "slChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the control's value changes."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slInput",
            "name": "slInput",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the control receives input."
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
        }, {
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
                "text": "Sets focus on the input.",
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
                "text": "Removes focus from the input.",
                "tags": []
            }
        },
        "select": {
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
                "text": "Selects all the text in the input.",
                "tags": []
            }
        },
        "setSelectionRange": {
            "complexType": {
                "signature": "(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none') => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Sets the start and end positions of the text selection (0-based).",
                "tags": []
            }
        },
        "setRangeText": {
            "complexType": {
                "signature": "(replacement: string, start: number, end: number, selectMode?: 'select' | 'start' | 'end' | 'preserve') => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Replaces a range of text with a new string.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "host"; }
}

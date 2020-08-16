import { Component, Event, Method, Prop, State, Watch, h } from '@stencil/core';
import ResizeObserver from 'resize-observer-polyfill';
let id = 0;
/**
 * @since 2.0
 * @status stable
 *
 * @slot help-text - Help text that describes how to use the input.
 *
 * @part base - The component's base wrapper.
 * @part form-control - The form control that wraps the textarea and label.
 * @part label - The textarea label.
 * @part textarea - The textarea control.
 * @part help-text - The textarea help text.
 */
export class Textarea {
    constructor() {
        this.textareaId = `textarea-${++id}`;
        this.labelId = `textarea-label-${id}`;
        this.helpTextId = `textarea-help-text-${id}`;
        this.hasFocus = false;
        /** The textarea's size. */
        this.size = 'medium';
        /** The textarea's name attribute. */
        this.name = '';
        /** The textarea's value attribute. */
        this.value = '';
        /** The textarea's label. */
        this.label = '';
        /** Set to true to disable the textarea. */
        this.disabled = false;
        /** Set to true for a readonly textarea. */
        this.readonly = false;
        /** Controls how the textarea can be resized. */
        this.resize = 'vertical';
        /** Set to true to indicate that the user input is valid. */
        this.valid = false;
        /** Set to true to indicate that the user input is invalid. */
        this.invalid = false;
        /** The number of rows to display by default. */
        this.rows = 4;
    }
    handleRowsChange() {
        this.setTextareaHeight();
    }
    connectedCallback() {
        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }
    componentDidLoad() {
        this.setTextareaHeight();
        this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
        this.resizeObserver.observe(this.textarea);
    }
    disconnectedCallback() {
        this.resizeObserver.unobserve(this.textarea);
    }
    /** Sets focus on the textarea. */
    async setFocus() {
        this.textarea.focus();
    }
    /** Removes focus fromt the textarea. */
    async removeFocus() {
        this.textarea.blur();
    }
    /** Selects all the text in the input. */
    async select() {
        return this.textarea.select();
    }
    /** Sets the start and end positions of the text selection (0-based). */
    async setSelectionRange(selectionStart, selectionEnd, selectionDirection = 'none') {
        return this.textarea.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
    }
    /** Replaces a range of text with a new string. */
    async setRangeText(replacement, start, end, selectMode = 'preserve') {
        return this.textarea.setRangeText(replacement, start, end, selectMode);
    }
    handleChange() {
        this.slChange.emit();
    }
    handleInput() {
        this.value = this.textarea.value;
        this.setTextareaHeight();
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
    setTextareaHeight() {
        if (this.resize === 'auto') {
            this.textarea.style.height = 'auto';
            this.textarea.style.height = this.textarea.scrollHeight + 'px';
        }
        else {
            this.textarea.style.height = undefined;
        }
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
                }, htmlFor: this.textareaId }, this.label),
            h("div", { part: "base", class: {
                    textarea: true,
                    // Sizes
                    'textarea--small': this.size === 'small',
                    'textarea--medium': this.size === 'medium',
                    'textarea--large': this.size === 'large',
                    // States
                    'textarea--disabled': this.disabled,
                    'textarea--focused': this.hasFocus,
                    'textarea--empty': this.value.length === 0,
                    'textarea--valid': this.valid,
                    'textarea--invalid': this.invalid,
                    // Modifiers
                    'textarea--resize-none': this.resize === 'none',
                    'textarea--resize-vertical': this.resize === 'vertical',
                    'textarea--resize-auto': this.resize === 'auto'
                } },
                h("textarea", { part: "textarea", ref: el => (this.textarea = el), id: this.textareaId, class: "textarea__control", name: this.name, placeholder: this.placeholder, disabled: this.disabled, readOnly: this.readonly, rows: this.rows, maxLength: this.maxlength, value: this.value, autoCapitalize: this.autocapitalize, autoCorrect: this.autocorrect, autoFocus: this.autofocus, required: this.required, inputMode: this.inputmode, "aria-labelledby": this.labelId, onChange: this.handleChange, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur })),
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
    static get is() { return "sl-textarea"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["textarea.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["textarea.css"]
    }; }
    static get properties() { return {
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
                "text": "The textarea's size."
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
                "text": "The textarea's name attribute."
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
                "text": "The textarea's value attribute."
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "''"
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
                "text": "The textarea's label."
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
                "text": "The textarea's placeholder text."
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
                "text": "Set to true to disable the textarea."
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
                "text": "Set to true for a readonly textarea."
            },
            "attribute": "readonly",
            "reflect": false,
            "defaultValue": "false"
        },
        "resize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'none' | 'vertical' | 'auto'",
                "resolved": "\"auto\" | \"none\" | \"vertical\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Controls how the textarea can be resized."
            },
            "attribute": "resize",
            "reflect": false,
            "defaultValue": "'vertical'"
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
                "text": "The textarea's maxlength attribute."
            },
            "attribute": "maxlength",
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
                "text": "The textarea's autocaptialize attribute."
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
                "text": "The textarea's autocorrect attribute."
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
                "text": "The textarea's autocomplete attribute."
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
                "text": "The textarea's autofocus attribute."
            },
            "attribute": "autofocus",
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
                "text": "The textarea's required attribute."
            },
            "attribute": "required",
            "reflect": false
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
                "text": "The textarea's inputmode attribute."
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
        },
        "rows": {
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
                "text": "The number of rows to display by default."
            },
            "attribute": "rows",
            "reflect": false,
            "defaultValue": "4"
        }
    }; }
    static get states() { return {
        "hasFocus": {}
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
                "text": "Sets focus on the textarea.",
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
                "text": "Removes focus fromt the textarea.",
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
    static get watchers() { return [{
            "propName": "rows",
            "methodName": "handleRowsChange"
        }]; }
}

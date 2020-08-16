import { r as registerInstance, c as createEvent, h } from './index-d587ef97.js';
import { i as index } from './ResizeObserver.es-e35e1ee3.js';

const textareaCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.form-control .label{display:none}.form-control--has-label .label{display:inline-block;color:var(--sl-input-label-color);margin-bottom:var(--sl-spacing-xxx-small)}.form-control--has-label .label.label--small{font-size:var(--sl-input-label-font-size-small)}.form-control--has-label .label.label--medium{font-size:var(--sl-input-label-font-size-medium)}.form-control--has-label .label.label--large{font-size:var(--sl-input-label-font-size-large)}.form-control--has-label .label.label--valid{color:var(--sl-input-label-color-valid)}.form-control--has-label .label.label--invalid{color:var(--sl-input-label-color-invalid)}.help-text{color:var(--sl-input-help-text-color)}.help-text.help-text--small{font-size:var(--sl-input-help-text-font-size-small)}.help-text.help-text--medium{font-size:var(--sl-input-help-text-font-size-medium)}.help-text.help-text--large{font-size:var(--sl-input-help-text-font-size-large)}.help-text.help-text--valid{color:var(--sl-input-help-text-color-valid)}.help-text.help-text--invalid{color:var(--sl-input-help-text-color-invalid)}.help-text ::slotted(*){margin-top:var(--sl-spacing-xxx-small)}:host{display:block}.textarea{display:flex;align-items:center;position:relative;width:100%;font-family:var(--sl-input-font-family);font-weight:var(--sl-input-font-weight);line-height:var(--sl-line-height-normal);letter-spacing:var(--sl-input-letter-spacing);background-color:var(--sl-input-background-color);border:solid var(--sl-input-border-width) var(--sl-input-border-color);vertical-align:middle;transition:var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;cursor:text}.textarea:hover:not(.textarea--disabled){background-color:var(--sl-input-background-color-hover);border-color:var(--sl-input-border-color-hover);color:var(--sl-input-color-hover)}.textarea.textarea--focused:not(.textarea--disabled){background-color:var(--sl-input-background-color-focus);border-color:var(--sl-input-border-color-focus);box-shadow:var(--sl-focus-ring-box-shadow);color:var(--sl-input-color-focus)}.textarea.textarea--disabled{background-color:var(--sl-input-background-color-disabled);border-color:var(--sl-input-border-color-disabled);color:var(--sl-input-color-disabled);opacity:0.5;cursor:not-allowed}.textarea.textarea--disabled .textarea__control::placeholder{color:var(--sl-input-placeholder-color-disabled)}.textarea.textarea--valid:not(.textarea--disabled){color:var(--sl-input-color-valid);border-color:var(--sl-input-border-color-valid)}.textarea.textarea--valid:not(.textarea--disabled).textarea--focused{box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-success-hue), var(--sl-color-success-saturation), 50%, var(--sl-focus-ring-alpha));border-color:var(--sl-input-border-color-valid)}.textarea.textarea--invalid:not(.textarea--disabled){border-color:var(--sl-color-danger-50)}.textarea.textarea--invalid:not(.textarea--disabled).textarea--focused{box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-danger-hue), var(--sl-color-danger-saturation), 50%, var(--sl-focus-ring-alpha))}.textarea__control{flex:1 1 auto;font-family:inherit;font-size:inherit;font-weight:inherit;line-height:1.4;color:var(--sl-input-color);border:none;background:none;box-shadow:none;cursor:inherit;-webkit-appearance:none}.textarea__control::-webkit-search-decoration,.textarea__control::-webkit-search-cancel-button,.textarea__control::-webkit-search-results-button,.textarea__control::-webkit-search-results-decoration{-webkit-appearance:none}.textarea__control::placeholder{color:var(--sl-input-placeholder-color);user-select:none}.textarea__control:focus{outline:none}.textarea--small{border-radius:var(--sl-input-border-radius-small);font-size:var(--sl-input-font-size-small)}.textarea--small .textarea__control{padding:0.5em var(--sl-input-spacing-small)}.textarea--medium{border-radius:var(--sl-input-border-radius-medium);font-size:var(--sl-input-font-size-medium)}.textarea--medium .textarea__control{padding:0.5em var(--sl-input-spacing-medium)}.textarea--large{border-radius:var(--sl-input-border-radius-large);font-size:var(--sl-input-font-size-large)}.textarea--large .textarea__control{padding:0.5em var(--sl-input-spacing-large)}.textarea--resize-none .textarea__control{resize:none}.textarea--resize-vertical .textarea__control{resize:vertical}.textarea--resize-auto .textarea__control{height:auto;resize:none}";

let id = 0;
const Textarea = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.slChange = createEvent(this, "slChange", 7);
        this.slInput = createEvent(this, "slInput", 7);
        this.slFocus = createEvent(this, "slFocus", 7);
        this.slBlur = createEvent(this, "slBlur", 7);
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
        this.resizeObserver = new index(() => this.setTextareaHeight());
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
            } }, h("label", { part: "label", class: {
                label: true,
                'label--small': this.size === 'small',
                'label--medium': this.size === 'medium',
                'label--large': this.size === 'large',
                'label--valid': this.valid,
                'label--invalid': this.invalid
            }, htmlFor: this.textareaId }, this.label), h("div", { part: "base", class: {
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
            } }, h("textarea", { part: "textarea", ref: el => (this.textarea = el), id: this.textareaId, class: "textarea__control", name: this.name, placeholder: this.placeholder, disabled: this.disabled, readOnly: this.readonly, rows: this.rows, maxLength: this.maxlength, value: this.value, autoCapitalize: this.autocapitalize, autoCorrect: this.autocorrect, autoFocus: this.autofocus, required: this.required, inputMode: this.inputmode, "aria-labelledby": this.labelId, onChange: this.handleChange, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur })), h("div", { part: "help-text", id: this.helpTextId, class: {
                'help-text': true,
                'help-text--small': this.size === 'small',
                'help-text--medium': this.size === 'medium',
                'help-text--large': this.size === 'large',
                'help-text--valid': this.valid,
                'help-text--invalid': this.invalid
            } }, h("slot", { name: "help-text" }))));
    }
    static get watchers() { return {
        "rows": ["handleRowsChange"]
    }; }
};
Textarea.style = textareaCss;

export { Textarea as sl_textarea };

import { r as registerInstance, c as createEvent, h, g as getElement } from './index-d587ef97.js';

const radioCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block}.radio{display:inline-flex;align-items:center;font-family:var(--sl-input-font-family);font-size:var(--sl-input-font-size-medium);font-weight:var(--sl-input-font-weight);color:var(--sl-input-color);vertical-align:middle;cursor:pointer}.radio__icon{display:inline-flex;width:var(--sl-toggle-size);height:var(--sl-toggle-size)}.radio__icon svg{width:100%;height:100%}.radio__control{position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--sl-toggle-size);height:var(--sl-toggle-size);border:solid var(--sl-input-border-width) var(--sl-input-border-color);border-radius:50%;background-color:var(--sl-input-background-color);color:var(--sl-color-white);transition:var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color, var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow}.radio__control input[type=radio]{position:absolute;opacity:0;padding:0;margin:0;pointer-events:none;-webkit-appearance:none}.radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover{border-color:var(--sl-input-border-color-hover);background-color:var(--sl-input-background-color-hover)}.radio.radio--focused:not(.radio--checked):not(.radio--disabled) .radio__control{border-color:var(--sl-input-border-color-focus);background-color:var(--sl-input-background-color-focus);box-shadow:var(--sl-focus-ring-box-shadow)}.radio--checked .radio__control{border-color:var(--sl-color-primary-50);background-color:var(--sl-color-primary-50)}.radio.radio--checked:not(.radio--disabled) .radio__control:hover{border-color:var(--sl-color-primary-60);background-color:var(--sl-color-primary-60)}.radio.radio--checked:not(.radio--disabled).radio--focused .radio__control{border-color:var(--sl-color-primary-60);background-color:var(--sl-color-primary-60);box-shadow:var(--sl-focus-ring-box-shadow)}.radio--disabled{opacity:0.5;cursor:not-allowed}.radio__label{line-height:var(--sl-toggle-size);margin-left:0.5em;user-select:none}";

let id = 0;
const Radio = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.slBlur = createEvent(this, "slBlur", 7);
        this.slChange = createEvent(this, "slChange", 7);
        this.slFocus = createEvent(this, "slFocus", 7);
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
            }, htmlFor: this.inputId, role: "radio", onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown }, h("span", { part: "control", class: "radio__control" }, h("span", { part: "checked-icon", class: "radio__icon" }, h("svg", { viewBox: "0 0 16 16" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, h("g", { fill: "currentColor" }, h("circle", { cx: "8", cy: "8", r: "3.42857143" }))))), h("input", { ref: el => (this.input = el), id: this.inputId, type: "radio", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, "aria-labeledby": this.labelId, onClick: this.handleClick, onBlur: this.handleBlur, onFocus: this.handleFocus })), h("span", { part: "label", id: this.labelId, class: "radio__label" }, h("slot", null))));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
};
Radio.style = radioCss;

export { Radio as sl_radio };

import { r as registerInstance, c as createEvent, h } from './index-d587ef97.js';

const switchCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--height:var(--sl-toggle-size);--thumb-size:calc(var(--sl-toggle-size) + 4px);--track-border-radius:var(--height);--width:calc(var(--height) * 2);display:inline-block}.switch{display:inline-flex;align-items:center;font-family:var(--sl-input-font-family);font-size:var(--sl-input-font-size-medium);font-weight:var(--sl-input-font-weight);color:var(--sl-input-color);vertical-align:middle;cursor:pointer}.switch__control{position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--width);height:var(--height);background-color:var(--sl-color-gray-80);border:solid var(--sl-input-border-width) var(--sl-color-gray-80);border-radius:var(--track-border-radius);transition:var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color}.switch__control .switch__thumb{width:var(--thumb-size);height:var(--thumb-size);background-color:var(--sl-color-white);border-radius:50%;border:solid var(--sl-input-border-width) var(--sl-input-border-color);transform:translateX(calc(var(--width) / -2 + var(--thumb-size) / 2 - (var(--thumb-size) - var(--height)) / 2));transition:var(--sl-transition-fast) transform ease, var(--sl-transition-fast) background-color, var(--sl-transition-fast) border-color, var(--sl-transition-fast) box-shadow}.switch__control input[type=checkbox]{position:absolute;opacity:0;padding:0;margin:0;pointer-events:none;-webkit-appearance:none}.switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover{background-color:var(--sl-color-gray-90);border-color:var(--sl-color-gray-90)}.switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb{background-color:var(--sl-color-white);border-color:var(--sl-input-border-color)}.switch.switch--focused:not(.switch--checked):not(.switch--disabled) .switch__control{background-color:var(--sl-color-gray-90);border-color:var(--sl-color-gray-90)}.switch.switch--focused:not(.switch--checked):not(.switch--disabled) .switch__control .switch__thumb{background-color:var(--sl-color-white);border-color:var(--sl-color-primary-50);box-shadow:var(--sl-focus-ring-box-shadow)}.switch--checked .switch__control{background-color:var(--sl-color-primary-50);border-color:var(--sl-color-primary-50)}.switch--checked .switch__control .switch__thumb{background-color:var(--sl-color-white);border-color:var(--sl-color-primary-50);transform:translateX(calc(var(--width) / 2 - var(--thumb-size) / 2 + (var(--thumb-size) - var(--height)) / 2))}.switch.switch--checked:not(.switch--disabled) .switch__control:hover{background-color:var(--sl-color-primary-60);border-color:var(--sl-color-primary-60)}.switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb{background-color:var(--sl-color-white);border-color:var(--sl-color-primary-50)}.switch.switch--checked:not(.switch--disabled).switch--focused .switch__control{background-color:var(--sl-color-primary-60);border-color:var(--sl-color-primary-60)}.switch.switch--checked:not(.switch--disabled).switch--focused .switch__control .switch__thumb{background-color:var(--sl-color-white);border-color:var(--sl-color-primary-50);box-shadow:var(--sl-focus-ring-box-shadow)}.switch--disabled{opacity:0.5;cursor:not-allowed}.switch__label{line-height:var(--height);margin-left:0.5em;user-select:none}";

let id = 0;
const Switch = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.slBlur = createEvent(this, "slBlur", 7);
        this.slChange = createEvent(this, "slChange", 7);
        this.slFocus = createEvent(this, "slFocus", 7);
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
            }, onMouseDown: this.handleMouseDown }, h("span", { part: "control", class: "switch__control" }, h("span", { part: "thumb", class: "switch__thumb" }), h("input", { ref: el => (this.input = el), id: this.switchId, type: "checkbox", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, "aria-labeledby": this.labelId, onClick: this.handleClick, onBlur: this.handleBlur, onFocus: this.handleFocus, onKeyDown: this.handleKeyDown })), h("span", { part: "label", id: this.labelId, class: "switch__label" }, h("slot", null))));
    }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
};
Switch.style = switchCss;

export { Switch as sl_switch };

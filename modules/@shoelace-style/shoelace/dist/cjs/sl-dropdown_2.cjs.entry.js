'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9b0ec98d.js');
const scroll = require('./scroll-8ad00e0e.js');
const popover = require('./popover-010c043e.js');

const dropdownCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block}.dropdown{position:relative}.dropdown__trigger{display:block}.dropdown__panel{position:absolute;z-index:var(--sl-z-index-dropdown);max-height:50vh;font-family:var(--sl-font-sans);font-size:var(--sl-font-size-medium);font-weight:var(--sl-font-weight-normal);color:var(--color);background-color:var(--sl-color-white);border:solid 1px var(--sl-color-gray-90);border-radius:var(--sl-border-radius-medium);box-shadow:var(--sl-shadow-large);opacity:0;overflow:auto;overscroll-behavior:none;transition:var(--sl-transition-fast) opacity}.dropdown__panel.popover-visible{opacity:1}";

let id = 0;
const Dropdown = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.slShow = index.createEvent(this, "slShow", 7);
        this.slAfterShow = index.createEvent(this, "slAfterShow", 7);
        this.slHide = index.createEvent(this, "slHide", 7);
        this.slAfterHide = index.createEvent(this, "slAfterHide", 7);
        this.componentId = `dropdown-${++id}`;
        this.ignoreMouseEvents = false;
        this.ignoreOpenWatcher = false;
        /** Indicates whether or not the dropdown is open. You can use this in lieu of the show/hide methods. */
        this.open = false;
        /**
         * The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel
         * inside of the viewport.
         */
        this.placement = 'bottom-start';
        /** Determines whether the dropdown should hide when a menu item is selected. */
        this.closeOnSelect = true;
        /** The dropdown will close when the user interacts outside of this element (e.g. clicking). */
        this.containingElement = this.host;
        /** The distance in pixels from which to offset the panel away from its trigger. */
        this.distance = 2;
        /** The distance in pixels from which to offset the panel along its trigger. */
        this.skidding = 0;
    }
    handleOpenChange() {
        if (!this.ignoreOpenWatcher) {
            this.open ? this.show() : this.hide();
        }
    }
    handlePopoverOptionsChange() {
        this.popover.setOptions({ placement: this.placement });
    }
    connectedCallback() {
        this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
        this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
        this.handleMenuItemActivate = this.handleMenuItemActivate.bind(this);
        this.handlePanelSelect = this.handlePanelSelect.bind(this);
        this.handleTriggerKeyDown = this.handleTriggerKeyDown.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
    }
    componentDidLoad() {
        this.popover = new popover.Popover(this.trigger, this.panel, {
            placement: this.placement,
            skidding: this.skidding,
            distance: this.distance,
            onAfterHide: () => this.slAfterHide.emit(),
            onAfterShow: () => this.slAfterShow.emit(),
            onTransitionEnd: () => {
                if (!this.open) {
                    this.panel.scrollTop = 0;
                }
            }
        });
        // Show on init if open
        if (this.open) {
            this.show();
        }
    }
    disconnectedCallback() {
        this.hide();
        this.popover.destroy();
    }
    /** Shows the dropdown panel */
    async show() {
        this.ignoreOpenWatcher = true;
        this.open = true;
        const slShow = this.slShow.emit();
        if (slShow.defaultPrevented) {
            this.open = false;
            this.ignoreOpenWatcher = false;
            return;
        }
        this.popover.show();
        this.ignoreOpenWatcher = false;
        this.panel.addEventListener('slActivate', this.handleMenuItemActivate);
        this.panel.addEventListener('slSelect', this.handlePanelSelect);
        document.addEventListener('mousedown', this.handleDocumentMouseDown);
        document.addEventListener('keydown', this.handleDocumentKeyDown);
    }
    /** Hides the dropdown panel */
    async hide() {
        this.ignoreOpenWatcher = true;
        this.open = false;
        const slHide = this.slHide.emit();
        if (slHide.defaultPrevented) {
            this.open = true;
            this.ignoreOpenWatcher = false;
            return;
        }
        this.popover.hide();
        this.ignoreOpenWatcher = false;
        this.panel.removeEventListener('slActivate', this.handleMenuItemActivate);
        this.panel.removeEventListener('slSelect', this.handlePanelSelect);
        document.removeEventListener('mousedown', this.handleDocumentMouseDown);
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
    }
    focusOnTrigger() {
        const slot = this.trigger.querySelector('slot');
        const trigger = slot.assignedElements({ flatten: true })[0];
        if (trigger) {
            if (typeof trigger.setFocus === 'function') {
                trigger.setFocus();
            }
            else if (typeof trigger.focus === 'function') {
                trigger.focus();
            }
        }
    }
    getMenu() {
        return this.panel
            .querySelector('slot')
            .assignedElements({ flatten: true })
            .filter(el => el.tagName.toLowerCase() === 'sl-menu')[0];
    }
    handleDocumentKeyDown(event) {
        const menu = this.getMenu();
        // Close when escape is pressed
        if (event.key === 'Escape') {
            this.hide();
            this.focusOnTrigger();
            return;
        }
        // Close when tabbing results in the focus leaving the containing element
        if (event.key === 'Tab') {
            setTimeout(() => {
                if (document.activeElement &&
                    document.activeElement.closest(this.containingElement.tagName.toLowerCase()) !== this.containingElement) {
                    this.hide();
                    return;
                }
            });
        }
        // Prevent the page from scrolling when certain keys are pressed
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
        }
        // If a menu is present, focus on it when certain keys are pressed
        if (menu && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
            event.preventDefault();
            menu.setFocus();
        }
    }
    handleDocumentMouseDown(event) {
        // Close when clicking outside of the close element
        const path = event.composedPath();
        if (!path.includes(this.containingElement)) {
            this.hide();
            return;
        }
    }
    handleMenuItemActivate(event) {
        const item = event.target;
        scroll.scrollIntoView(item, this.panel);
    }
    handlePanelSelect(event) {
        const target = event.target;
        // Hide the dropdown when a menu item is selected
        if (this.closeOnSelect && target.tagName.toLowerCase() === 'sl-menu') {
            this.hide();
            this.focusOnTrigger();
        }
    }
    handleTriggerKeyDown(event) {
        // Open the panel when pressing down or up while focused on the trigger
        if (!this.open && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
            this.show();
            event.preventDefault();
            event.stopPropagation();
        }
        // All other keys focus the menu and initiate type-to-select
        const menu = this.getMenu();
        if (menu && event.target !== menu) {
            menu.setFocus();
            menu.typeToSelect(event.key);
            return;
        }
    }
    togglePanel() {
        this.open ? this.hide() : this.show();
    }
    render() {
        return (index.h("div", { part: "base", id: this.componentId, class: {
                dropdown: true,
                'dropdown--open': this.open
            }, "aria-expanded": this.open, "aria-haspopup": "true" }, index.h("span", { part: "trigger", class: "dropdown__trigger", ref: el => (this.trigger = el), onKeyDown: this.handleTriggerKeyDown, onClick: this.togglePanel }, index.h("slot", { name: "trigger" })), index.h("div", { ref: el => (this.panel = el), part: "panel", class: "dropdown__panel", role: "menu", "aria-hidden": !this.open, "aria-labeledby": this.componentId, hidden: true }, index.h("slot", null))));
    }
    get host() { return index.getElement(this); }
    static get watchers() { return {
        "open": ["handleOpenChange"],
        "placement": ["handlePopoverOptionsChange"],
        "distance": ["handlePopoverOptionsChange"],
        "skidding": ["handlePopoverOptionsChange"]
    }; }
};
Dropdown.style = dropdownCss;

const inputCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.form-control .label{display:none}.form-control--has-label .label{display:inline-block;color:var(--sl-input-label-color);margin-bottom:var(--sl-spacing-xxx-small)}.form-control--has-label .label.label--small{font-size:var(--sl-input-label-font-size-small)}.form-control--has-label .label.label--medium{font-size:var(--sl-input-label-font-size-medium)}.form-control--has-label .label.label--large{font-size:var(--sl-input-label-font-size-large)}.form-control--has-label .label.label--valid{color:var(--sl-input-label-color-valid)}.form-control--has-label .label.label--invalid{color:var(--sl-input-label-color-invalid)}.help-text{color:var(--sl-input-help-text-color)}.help-text.help-text--small{font-size:var(--sl-input-help-text-font-size-small)}.help-text.help-text--medium{font-size:var(--sl-input-help-text-font-size-medium)}.help-text.help-text--large{font-size:var(--sl-input-help-text-font-size-large)}.help-text.help-text--valid{color:var(--sl-input-help-text-color-valid)}.help-text.help-text--invalid{color:var(--sl-input-help-text-color-invalid)}.help-text ::slotted(*){margin-top:var(--sl-spacing-xxx-small)}:host{display:block}.input{flex:1 1 auto;display:inline-flex;align-items:stretch;justify-content:center;position:relative;width:100%;font-family:var(--sl-input-font-family);font-weight:var(--sl-input-font-weight);letter-spacing:var(--sl-input-letter-spacing);background-color:var(--sl-input-background-color);border:solid var(--sl-input-border-width) var(--sl-input-border-color);vertical-align:middle;overflow:hidden;transition:var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;cursor:text}.input:hover:not(.input--disabled){background-color:var(--sl-input-background-color-hover);border-color:var(--sl-input-border-color-hover);color:var(--sl-input-color-hover)}.input.input--focused:not(.input--disabled){background-color:var(--sl-input-background-color-focus);border-color:var(--sl-input-border-color-focus);box-shadow:var(--sl-focus-ring-box-shadow);color:var(--sl-input-color-focus)}.input.input--disabled{background-color:var(--sl-input-background-color-disabled);border-color:var(--sl-input-border-color-disabled);opacity:0.5;cursor:not-allowed}.input.input--disabled .input__control{color:var(--sl-input-color-disabled)}.input.input--disabled .input__control::placeholder{color:var(--sl-input-placeholder-color-disabled)}.input.input--valid:not(.input--disabled){color:var(--sl-input-color-valid);border-color:var(--sl-input-border-color-valid)}.input.input--valid:not(.input--disabled).input--focused{box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-success-hue), var(--sl-color-success-saturation), 50%, var(--sl-focus-ring-alpha));border-color:var(--sl-input-border-color-valid)}.input.input--invalid:not(.input--disabled){border-color:var(--sl-color-danger-50)}.input.input--invalid:not(.input--disabled).input--focused{box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-danger-hue), var(--sl-color-danger-saturation), 50%, var(--sl-focus-ring-alpha))}.input__control{flex:1 1 auto;font-family:inherit;font-size:inherit;font-weight:inherit;min-width:0;height:100%;color:var(--sl-input-color);border:none;background:none;box-shadow:none;padding:0;margin:0;cursor:inherit;-webkit-appearance:none}.input__control::-webkit-search-decoration,.input__control::-webkit-search-cancel-button,.input__control::-webkit-search-results-button,.input__control::-webkit-search-results-decoration{-webkit-appearance:none}.input__control::placeholder{color:var(--sl-input-placeholder-color);user-select:none}.input__control:focus{outline:none}.input__prefix,.input__suffix{display:inline-flex;flex:0 0 auto;align-items:center;color:var(--sl-input-icon-color)}.input--small{border-radius:var(--sl-input-border-radius-small);font-size:var(--sl-input-font-size-small);height:var(--sl-input-height-small)}.input--small .input__control{height:calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);margin:0 var(--sl-input-spacing-small)}.input--small .input__clear,.input--small .input__password-toggle{margin-right:var(--sl-input-spacing-small)}.input--small .input__prefix ::slotted(*){margin-left:var(--sl-input-spacing-small)}.input--small .input__suffix ::slotted(*){margin-right:var(--sl-input-spacing-small)}.input--medium{border-radius:var(--sl-input-border-radius-medium);font-size:var(--sl-input-font-size-medium);height:var(--sl-input-height-medium)}.input--medium .input__control{height:calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);margin:0 var(--sl-input-spacing-medium)}.input--medium .input__clear,.input--medium .input__password-toggle{margin-right:var(--sl-input-spacing-medium)}.input--medium .input__prefix ::slotted(*){margin-left:var(--sl-input-spacing-medium)}.input--medium .input__suffix ::slotted(*){margin-right:var(--sl-input-spacing-medium)}.input--large{border-radius:var(--sl-input-border-radius-large);font-size:var(--sl-input-font-size-large);height:var(--sl-input-height-large)}.input--large .input__control{height:calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);margin:0 var(--sl-input-spacing-large)}.input--large .input__clear,.input--large .input__password-toggle{margin-right:var(--sl-input-spacing-large)}.input--large .input__prefix ::slotted(*){margin-left:var(--sl-input-spacing-large)}.input--large .input__suffix ::slotted(*){margin-right:var(--sl-input-spacing-large)}.input--pill.input--small{border-radius:var(--sl-input-height-small)}.input--pill.input--medium{border-radius:var(--sl-input-height-medium)}.input--pill.input--large{border-radius:var(--sl-input-height-large)}.input__clear,.input__password-toggle{display:inline-flex;align-items:center;font-size:inherit;color:var(--sl-input-icon-color);border:none;background:none;padding:0;transition:var(--sl-transition-fast) color;cursor:pointer}.input__clear:hover,.input__password-toggle:hover{color:var(--sl-input-icon-color-hover)}.input__clear:focus,.input__password-toggle:focus{outline:none}.input--empty .input__clear{visibility:hidden}";

let id$1 = 0;
const Input = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.slChange = index.createEvent(this, "slChange", 7);
        this.slInput = index.createEvent(this, "slInput", 7);
        this.slFocus = index.createEvent(this, "slFocus", 7);
        this.slBlur = index.createEvent(this, "slBlur", 7);
        this.inputId = `input-${++id$1}`;
        this.labelId = `input-label-${id$1}`;
        this.helpTextId = `input-help-text-${id$1}`;
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
        return (index.h("div", { part: "form-control", class: {
                'form-control': true,
                'form-control--has-label': this.label.length > 0,
                'form-control--valid': this.valid,
                'form-control--invalid': this.invalid
            } }, index.h("label", { part: "label", class: {
                label: true,
                'label--small': this.size === 'small',
                'label--medium': this.size === 'medium',
                'label--large': this.size === 'large',
                'label--valid': this.valid,
                'label--invalid': this.invalid
            }, htmlFor: this.inputId }, this.label), index.h("div", { part: "base", class: {
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
            }, onMouseDown: this.handleMouseDown }, index.h("span", { part: "prefix", class: "input__prefix" }, index.h("slot", { name: "prefix" })), index.h("input", { part: "input", ref: el => (this.input = el), id: this.inputId, class: "input__control", type: this.type === 'password' && this.isPasswordVisible ? 'text' : this.type, name: this.name, placeholder: this.placeholder, disabled: this.disabled, readonly: this.readonly, minLength: this.minlength, maxLength: this.maxlength, min: this.min, max: this.max, step: this.step, value: this.value, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, autoFocus: this.autofocus, pattern: this.pattern, required: this.required, inputMode: this.inputmode, "aria-labelledby": this.labelId, "aria-describedby": this.helpTextId, onChange: this.handleChange, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur }), this.clearable && (index.h("button", { part: "clear-button", class: "input__clear", type: "button", onClick: this.handleClearClick, tabindex: "-1" }, index.h("slot", { name: "clear-icon" }, index.h("sl-icon", { name: "x-circle" })))), this.togglePassword && (index.h("button", { part: "password-toggle-button", class: "input__password-toggle", type: "button", onClick: this.handlePasswordToggle, tabindex: "-1" }, this.isPasswordVisible ? (index.h("slot", { name: "show-password-icon" }, index.h("sl-icon", { name: "eye-slash" }))) : (index.h("slot", { name: "hide-password-icon" }, ' ', index.h("sl-icon", { name: "eye" }))))), index.h("span", { part: "suffix", class: "input__suffix" }, index.h("slot", { name: "suffix" }))), index.h("div", { part: "help-text", id: this.helpTextId, class: {
                'help-text': true,
                'help-text--small': this.size === 'small',
                'help-text--medium': this.size === 'medium',
                'help-text--large': this.size === 'large',
                'help-text--valid': this.valid,
                'help-text--invalid': this.invalid
            } }, index.h("slot", { name: "help-text" }))));
    }
    get host() { return index.getElement(this); }
};
Input.style = inputCss;

exports.sl_dropdown = Dropdown;
exports.sl_input = Input;

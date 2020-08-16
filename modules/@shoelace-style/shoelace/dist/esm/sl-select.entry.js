import { r as registerInstance, c as createEvent, h, g as getElement } from './index-d587ef97.js';
import { g as getTextContent } from './slot-5efafe34.js';
import { i as index } from './ResizeObserver.es-e35e1ee3.js';

const selectCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.form-control .label{display:none}.form-control--has-label .label{display:inline-block;color:var(--sl-input-label-color);margin-bottom:var(--sl-spacing-xxx-small)}.form-control--has-label .label.label--small{font-size:var(--sl-input-label-font-size-small)}.form-control--has-label .label.label--medium{font-size:var(--sl-input-label-font-size-medium)}.form-control--has-label .label.label--large{font-size:var(--sl-input-label-font-size-large)}.form-control--has-label .label.label--valid{color:var(--sl-input-label-color-valid)}.form-control--has-label .label.label--invalid{color:var(--sl-input-label-color-invalid)}.help-text{color:var(--sl-input-help-text-color)}.help-text.help-text--small{font-size:var(--sl-input-help-text-font-size-small)}.help-text.help-text--medium{font-size:var(--sl-input-help-text-font-size-medium)}.help-text.help-text--large{font-size:var(--sl-input-help-text-font-size-large)}.help-text.help-text--valid{color:var(--sl-input-help-text-color-valid)}.help-text.help-text--invalid{color:var(--sl-input-help-text-color-invalid)}.help-text ::slotted(*){margin-top:var(--sl-spacing-xxx-small)}:host{display:block}.select{width:100%}.select__input{flex:1 1 auto;width:100%}.select__input::part(input){cursor:pointer}.select__input span[slot=prefix]{margin-left:var(--sl-spacing-xx-small)}.select__input span[slot=prefix] sl-tag:not(:last-of-type){margin-right:var(--sl-spacing-xx-small)}.select__icon{display:inline-flex}.select__icon sl-icon{transition:var(--sl-transition-medium) transform ease}.select--open .select__icon sl-icon{transform:rotate(-180deg)}";

let id = 0;
const Select = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.slChange = createEvent(this, "slChange", 7);
        this.slFocus = createEvent(this, "slFocus", 7);
        this.slBlur = createEvent(this, "slBlur", 7);
        this.inputId = `select-${++id}`;
        this.labelId = `select-label-${id}`;
        this.helpTextId = `select-help-text-${id}`;
        this.hasFocus = false;
        this.isOpen = false;
        this.items = [];
        this.displayLabel = '';
        this.displayTags = [];
        /** Set to true to enable multiselect. */
        this.multiple = false;
        /**
         * The maximum number of tags to show when `multiple` is true. After the maximum, "+n" will be shown to indicate the
         * number of additional items that are selected. Set to -1 to remove the limit.
         */
        this.maxTagsVisible = 3;
        /** Set to true to disable the select control. */
        this.disabled = false;
        /** The select's name. */
        this.name = '';
        /** The select's placeholder text. */
        this.placeholder = '';
        /** The select's size. */
        this.size = 'medium';
        /** The value of the control. This will be a string or an array depending on `multiple`. */
        this.value = '';
        /** Set to true to draw a pill-style select with rounded edges. */
        this.pill = false;
        /** The select's label. */
        this.label = '';
        /** Set to true to indicate that the user input is valid. */
        this.valid = false;
        /** Set to true to indicate that the user input is invalid. */
        this.invalid = false;
    }
    handleMultipleChange() {
        // Cast to array | string based on `this.multiple`
        const value = this.getValueAsArray();
        this.value = this.multiple ? value : value[0] || '';
        this.syncItemsFromValue();
    }
    handleValueChange() {
        this.syncItemsFromValue();
        this.slChange.emit();
    }
    connectedCallback() {
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleLabelClick = this.handleLabelClick.bind(this);
        this.handleMenuKeyDown = this.handleMenuKeyDown.bind(this);
        this.handleMenuHide = this.handleMenuHide.bind(this);
        this.handleMenuShow = this.handleMenuShow.bind(this);
        this.handleMenuSelect = this.handleMenuSelect.bind(this);
        this.handleSlotChange = this.handleSlotChange.bind(this);
    }
    componentDidLoad() {
        this.menu.querySelector('slot').addEventListener('slotchange', this.handleSlotChange);
        this.resizeObserver = new index(() => this.resizeMenu());
        this.reportDuplicateItemValues();
        // We need to do an initial sync after the component has rendered, so this will suppress the re-render warning
        requestAnimationFrame(() => this.syncItemsFromValue());
    }
    disconnectedCallback() {
        this.menu.querySelector('slot').removeEventListener('slotchange', this.handleSlotChange);
    }
    getItemLabel(item) {
        const slot = item.shadowRoot.querySelector('slot:not([name])');
        return getTextContent(slot);
    }
    getItems() {
        return [...this.host.querySelectorAll('sl-menu-item')];
    }
    getValueAsArray() {
        return Array.isArray(this.value) ? this.value : [this.value];
    }
    handleBlur() {
        this.hasFocus = false;
        this.slBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.slFocus.emit();
        this.input.setSelectionRange(0, 0);
    }
    handleKeyDown(event) {
        const target = event.target;
        // Open the dropdown when enter is pressed while the input is focused
        if (!this.isOpen && event.key === 'Enter' && target === this.input) {
            this.dropdown.show();
            event.preventDefault();
            return;
        }
    }
    handleLabelClick() {
        this.input.setFocus();
    }
    handleMenuKeyDown(event) {
        // Close when escape or tab pressed
        if (event.key === 'Escape' || event.key === 'Tab') {
            this.dropdown.hide();
            event.preventDefault();
            return;
        }
    }
    handleMenuSelect(event) {
        const item = event.detail.item;
        if (this.multiple) {
            this.value = this.value.includes(item.value)
                ? this.value.filter(v => v !== item.value)
                : [...this.value, item.value];
        }
        else {
            this.value = item.value;
        }
        this.syncItemsFromValue();
    }
    handleMenuShow(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        this.resizeMenu();
        this.resizeObserver.observe(this.host);
        this.isOpen = true;
    }
    handleMenuHide() {
        this.resizeObserver.unobserve(this.host);
        this.isOpen = false;
        this.input.setFocus();
    }
    handleSlotChange() {
        this.syncItemsFromValue();
        this.reportDuplicateItemValues();
    }
    reportDuplicateItemValues() {
        const items = this.getItems();
        // Report duplicate values since they can break selection logic
        const duplicateValues = items.map(item => item.value).filter((e, i, a) => a.indexOf(e) !== i);
        if (duplicateValues.length) {
            throw new Error('Duplicate value found on <sl-menu-item> in <sl-select>: "' + duplicateValues.join('", "') + '"');
        }
    }
    resizeMenu() {
        this.menu.style.width = `${this.input.clientWidth}px`;
    }
    syncItemsFromValue() {
        const items = this.getItems();
        const value = this.getValueAsArray();
        // Sync checked states
        items.map(item => (item.checked = value.includes(item.value)));
        // Sync display label
        if (this.multiple) {
            const checkedItems = [];
            value.map(val => items.map(item => (item.value === val ? checkedItems.push(item) : null)));
            this.displayTags = checkedItems.map(item => {
                return (h("sl-tag", { type: "info", size: this.size, pill: this.pill, clearable: true, onClick: event => event.stopPropagation(), onSlClear: () => {
                        item.checked = false;
                        this.syncValueFromItems();
                    } }, this.getItemLabel(item)));
            });
            if (this.maxTagsVisible > 0 && this.displayTags.length > this.maxTagsVisible) {
                const total = this.displayTags.length;
                this.displayTags = this.displayTags.slice(0, this.maxTagsVisible);
                this.displayTags.push(h("sl-tag", { type: "info", size: this.size }, "+", total - this.maxTagsVisible));
            }
            this.displayLabel = '';
        }
        else {
            const checkedItem = items.filter(item => item.value === value[0])[0];
            this.displayLabel = checkedItem ? this.getItemLabel(checkedItem) : '';
            this.displayTags = [];
        }
    }
    syncValueFromItems() {
        const items = this.getItems();
        const checkedItems = items.filter(item => item.checked);
        const checkedValues = checkedItems.map(item => item.value);
        if (this.multiple) {
            this.value = this.value.filter(val => checkedValues.includes(val));
        }
        else {
            this.value = checkedValues.length > 0 ? checkedValues[0] : '';
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
            }, htmlFor: this.inputId }, this.label), h("sl-dropdown", { part: "base", ref: el => (this.dropdown = el), closeOnSelect: !this.multiple, containingElement: this.host, class: {
                select: true,
                'select--open': this.isOpen,
                'select--focused': this.hasFocus,
                'select--disabled': this.disabled,
                'select--multiple': this.multiple,
                'select--small': this.size === 'small',
                'select--medium': this.size === 'medium',
                'select--large': this.size === 'large',
                'select--pill': this.pill
            }, onSlShow: this.handleMenuShow, onSlHide: this.handleMenuHide }, h("sl-input", { slot: "trigger", part: "input", ref: el => (this.input = el), id: this.inputId, class: "select__input", name: this.name, value: this.displayLabel, disabled: this.disabled, pill: this.pill, placeholder: this.displayLabel === '' && this.displayTags.length === 0 ? this.placeholder : null, readonly: true, size: this.size, valid: this.valid, invalid: this.invalid, "aria-labelledby": this.labelId, onSlFocus: this.handleFocus, onSlBlur: this.handleBlur, onKeyDown: this.handleKeyDown }, this.displayTags.length && (h("span", { part: "tags", slot: "prefix", class: "select__tags" }, this.displayTags)), h("span", { part: "icon", slot: "suffix", class: "select__icon" }, h("sl-icon", { name: "chevron-down" }))), h("sl-menu", { ref: el => (this.menu = el), class: "select__menu", onSlSelect: this.handleMenuSelect, onKeyDown: this.handleMenuKeyDown }, h("slot", null))), h("div", { part: "help-text", id: this.helpTextId, class: {
                'help-text': true,
                'help-text--small': this.size === 'small',
                'help-text--medium': this.size === 'medium',
                'help-text--large': this.size === 'large',
                'help-text--valid': this.valid,
                'help-text--invalid': this.invalid
            } }, h("slot", { name: "help-text" }))));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "multiple": ["handleMultipleChange"],
        "value": ["handleValueChange"]
    }; }
};
Select.style = selectCss;

export { Select as sl_select };

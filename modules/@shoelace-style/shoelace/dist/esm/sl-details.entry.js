import { r as registerInstance, c as createEvent, h } from './index-d587ef97.js';
import { f as focusVisible } from './focus-visible-54f27856.js';

const detailsCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--hide-duration:var(--sl-transition-medium);--hide-timing-function:ease;--show-duration:var(--sl-transition-medium);--show-timing-function:ease;display:block}.details{border:solid 1px var(--sl-color-gray-90);border-radius:var(--sl-border-radius-medium)}.details--disabled{opacity:0.5}.details__header{display:flex;align-items:center;border-radius:inherit;padding:var(--sl-spacing-medium);user-select:none;cursor:pointer}.details__header:focus{outline:none}.focus-visible .details__header:focus{box-shadow:var(--sl-focus-ring-box-shadow)}.details--disabled .details__header{cursor:not-allowed}.details--disabled .details__header:focus{outline:none;box-shadow:none}.details__summary{flex:1 1 auto;display:flex;align-items:center}.details__summary-icon{flex:0 0 auto;display:flex;align-items:center;transition:var(--sl-transition-medium) transform ease}.details--open .details__summary-icon{transform:rotate(90deg)}.details__body{height:0;overflow:hidden;transition-property:height;transition-duration:var(--hide-duration);transition-timing-function:var(--hide-timing-function)}.details--open .details__body{transition-duration:var(--show-duration);transition-timing-function:var(--show-timing-function)}.details__content{padding:var(--sl-spacing-medium)}";

let id = 0;
const Details = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.slShow = createEvent(this, "slShow", 7);
        this.slAfterShow = createEvent(this, "slAfterShow", 7);
        this.slHide = createEvent(this, "slHide", 7);
        this.slAfterHide = createEvent(this, "slAfterHide", 7);
        this.componentId = `details-${++id}`;
        /** Indicates whether or not the details is open. You can use this in lieu of the show/hide methods. */
        this.open = false;
        /** The summary to show in the details header. If you need to display HTML, use the `summary` slot instead. */
        this.summary = '';
        /** Set to true to prevent the user from toggling the details. */
        this.disabled = false;
    }
    handleOpenChange() {
        this.open ? this.show() : this.hide();
    }
    connectedCallback() {
        this.handleBodyTransitionEnd = this.handleBodyTransitionEnd.bind(this);
        this.handleSummaryClick = this.handleSummaryClick.bind(this);
        this.handleSummaryKeyDown = this.handleSummaryKeyDown.bind(this);
    }
    componentDidLoad() {
        focusVisible.observe(this.details);
        // Show on init if open
        if (this.open) {
            this.show();
        }
    }
    disconnectedCallback() {
        focusVisible.unobserve(this.details);
    }
    /** Shows the alert. */
    async show() {
        const slShow = this.slShow.emit();
        if (slShow.defaultPrevented) {
            return false;
        }
        if (this.body.scrollHeight === 0) {
            // When the scroll height can't be measured, use auto. This prevents a borked open state when the details is open
            // intiially, but not immediately visible (i.e. in a tab panel).
            this.body.style.height = 'auto';
            this.body.style.overflow = 'visible';
        }
        else {
            this.body.style.height = `${this.body.scrollHeight}px`;
            this.body.style.overflow = 'hidden';
        }
        this.open = true;
    }
    /** Hides the alert */
    async hide() {
        const slHide = this.slHide.emit();
        if (slHide.defaultPrevented) {
            return false;
        }
        // We can't transition out of `height: auto`, so let's set it to the current height first
        this.body.style.height = `${this.body.scrollHeight}px`;
        this.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            this.body.style.height = '0';
        });
        this.open = false;
    }
    handleBodyTransitionEnd(event) {
        const target = event.target;
        // Ensure we only emit one event when the target element is no longer visible
        if (event.propertyName === 'height' && target.classList.contains('details__body')) {
            this.body.style.overflow = this.open ? 'visible' : 'hidden';
            this.body.style.height = this.open ? 'auto' : '0';
            this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();
        }
    }
    handleSummaryClick() {
        if (!this.disabled) {
            this.open ? this.hide() : this.show();
            this.header.focus();
        }
    }
    handleSummaryKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.open ? this.hide() : this.show();
        }
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            event.preventDefault();
            this.hide();
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            event.preventDefault();
            this.show();
        }
    }
    render() {
        return (h("div", { ref: el => (this.details = el), part: "base", class: {
                details: true,
                'details--open': this.open,
                'details--disabled': this.disabled
            } }, h("header", { ref: el => (this.header = el), part: "header", id: `${this.componentId}-header`, class: "details__header", role: "button", "aria-expanded": this.open, "aria-controls": `${this.componentId}-content`, "aria-disabled": this.disabled, tabIndex: this.disabled ? -1 : 0, onClick: this.handleSummaryClick, onKeyDown: this.handleSummaryKeyDown }, h("div", { part: "summary", class: "details__summary" }, h("slot", { name: "summary" }, this.summary)), h("span", { part: "summary-icon", class: "details__summary-icon" }, h("sl-icon", { name: "chevron-right" }))), h("div", { ref: el => (this.body = el), class: "details__body", onTransitionEnd: this.handleBodyTransitionEnd }, h("div", { part: "content", id: `${this.componentId}-content`, class: "details__content", role: "region", "aria-labeledby": `${this.componentId}-header` }, h("slot", null)))));
    }
    static get watchers() { return {
        "open": ["handleOpenChange"]
    }; }
};
Details.style = detailsCss;

export { Details as sl_details };

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9b0ec98d.js');
const slot = require('./slot-e9b13625.js');
const scroll = require('./scroll-8ad00e0e.js');

const dialogCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--width:31rem;display:contents}.dialog{display:flex;align-items:center;justify-content:center;position:fixed;top:0;right:0;bottom:0;left:0;z-index:var(--sl-z-index-dialog)}.dialog[hidden]{display:none}.dialog__panel{display:flex;flex-direction:column;z-index:2;width:var(--width);max-width:calc(100vw - var(--sl-spacing-xx-large));max-height:calc(100vh - var(--sl-spacing-xx-large));background-color:var(--sl-color-white);border-radius:var(--sl-border-radius-medium);box-shadow:var(--sl-shadow-x-large);opacity:0;transform:scale(0.8);transition:var(--sl-transition-medium) opacity, var(--sl-transition-medium) transform}.dialog__panel:focus{outline:none}@media screen and (max-width: 420px){.dialog__panel{max-height:calc(80vh)}}.dialog--open .dialog__panel{display:flex;opacity:1;transform:scale(1)}.dialog__header{display:flex}.dialog__title{flex:1 1 auto;font-size:var(--sl-font-size-large);line-height:var(--sl-line-height-dense);padding:var(--sl-spacing-large)}.dialog__close{flex:0 0 auto;display:flex;align-items:center;font-size:var(--sl-font-size-x-large);padding:0 var(--sl-spacing-large)}.dialog__body{padding:var(--sl-spacing-large);overflow:auto;-webkit-overflow-scrolling:touch}.dialog__footer{text-align:right;padding:var(--sl-spacing-large)}.dialog__footer ::slotted(sl-button:not(:first-of-type)){margin-left:var(--sl-spacing-x-small)}.dialog:not(.dialog--has-footer) .dialog__footer{display:none}.dialog__overlay{position:fixed;top:0;right:0;bottom:0;left:0;background-color:var(--sl-overlay-background-color);opacity:0;transition:var(--sl-transition-medium) opacity}.dialog--open .dialog__overlay{opacity:1}";

let id = 0;
const Dialog = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.slShow = index.createEvent(this, "slShow", 7);
        this.slAfterShow = index.createEvent(this, "slAfterShow", 7);
        this.slHide = index.createEvent(this, "slHide", 7);
        this.slAfterHide = index.createEvent(this, "slAfterHide", 7);
        this.slOverlayDismiss = index.createEvent(this, "slOverlayDismiss", 7);
        this.componentId = `dialog-${++id}`;
        this.hasFooter = false;
        /** Indicates whether or not the dialog is open. You can use this in lieu of the show/hide methods. */
        this.open = false;
        /**
         * The dialog's label as displayed in the header. You should always include a relevant label even when using
         * `no-header`, as it is required for proper accessibility.
         */
        this.label = '';
        /**
         * Set to true to disable the header. This will also remove the default close button, so please ensure you provide an
         * easy, accessible way for users to dismiss the dialog.
         */
        this.noHeader = false;
    }
    handleOpenChange() {
        this.open ? this.show() : this.hide();
    }
    connectedCallback() {
        this.handleDocumentFocusIn = this.handleDocumentFocusIn.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
    }
    componentWillLoad() {
        this.updateSlots();
        this.host.shadowRoot.addEventListener('slotchange', this.updateSlots);
    }
    componentDidLoad() {
        // Show on init if open
        if (this.open) {
            this.show();
        }
    }
    disconnectedCallback() {
        scroll.unlockBodyScrolling(this.host);
        this.host.shadowRoot.removeEventListener('slotchange', this.updateSlots);
    }
    /** Shows the dialog */
    async show() {
        const slShow = this.slShow.emit();
        if (slShow.defaultPrevented) {
            return false;
        }
        this.dialog.hidden = false;
        requestAnimationFrame(() => (this.open = true));
        scroll.lockBodyScrolling(this.host);
        document.addEventListener('focusin', this.handleDocumentFocusIn);
    }
    /** Hides the dialog */
    async hide() {
        const slHide = this.slHide.emit();
        if (slHide.defaultPrevented) {
            return false;
        }
        this.open = false;
        scroll.unlockBodyScrolling(this.host);
        document.removeEventListener('focusin', this.handleDocumentFocusIn);
    }
    handleCloseClick() {
        this.hide();
    }
    handleDocumentFocusIn(event) {
        const target = event.target;
        if (target.closest('sl-dialog') !== this.host) {
            this.panel.focus();
        }
    }
    handleKeyDown(event) {
        if (event.key === 'Escape') {
            this.hide();
        }
    }
    handleOverlayClick() {
        const slOverlayDismiss = this.slOverlayDismiss.emit();
        if (!slOverlayDismiss.defaultPrevented) {
            this.hide();
        }
    }
    handleTransitionEnd(event) {
        const target = event.target;
        // Ensure we only emit one event when the target element is no longer visible
        if (event.propertyName === 'opacity' && target.classList.contains('dialog__panel')) {
            this.dialog.hidden = !this.open;
            this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();
            if (this.open) {
                this.panel.focus();
            }
        }
    }
    updateSlots() {
        this.hasFooter = slot.hasSlot(this.host, 'footer');
    }
    render() {
        return (index.h("div", { ref: el => (this.dialog = el), part: "base", class: {
                dialog: true,
                'dialog--open': this.open,
                'dialog--has-footer': this.hasFooter
            }, onKeyDown: this.handleKeyDown, onTransitionEnd: this.handleTransitionEnd, hidden: true }, index.h("div", { part: "overlay", class: "dialog__overlay", onClick: this.handleOverlayClick }), index.h("div", { ref: el => (this.panel = el), part: "panel", class: "dialog__panel", role: "dialog", "aria-modal": "true", "aria-hidden": !this.open, "aria-label": this.noHeader ? this.label : null, "aria-labeledby": !this.noHeader ? `${this.componentId}-title` : null, tabIndex: 0 }, !this.noHeader && (index.h("header", { part: "header", class: "dialog__header" }, index.h("span", { part: "title", class: "dialog__title", id: `${this.componentId}-title` }, this.label || String.fromCharCode(65279)), index.h("sl-icon-button", { part: "close-button", class: "dialog__close", name: "x", onClick: this.handleCloseClick }))), index.h("div", { part: "body", class: "dialog__body" }, index.h("slot", null)), index.h("footer", { part: "footer", class: "dialog__footer" }, index.h("slot", { name: "footer" })))));
    }
    get host() { return index.getElement(this); }
    static get watchers() { return {
        "open": ["handleOpenChange"]
    }; }
};
Dialog.style = dialogCss;

exports.sl_dialog = Dialog;

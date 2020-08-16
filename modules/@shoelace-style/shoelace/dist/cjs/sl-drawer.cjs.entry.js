'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9b0ec98d.js');
const slot = require('./slot-e9b13625.js');
const scroll = require('./scroll-8ad00e0e.js');

const drawerCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--size:25rem;display:contents}.drawer{top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden}.drawer[hidden]{display:none}.drawer--contained{position:absolute;z-index:initial}.drawer--fixed{position:fixed;z-index:var(--sl-z-index-drawer)}.drawer__panel{position:absolute;display:flex;flex-direction:column;z-index:2;max-width:100%;max-height:100%;background-color:var(--sl-color-white);box-shadow:var(--sl-shadow-x-large);transition:var(--sl-transition-medium) transform;overflow:auto;pointer-events:all}.drawer__panel:focus{outline:none}.drawer--top .drawer__panel{top:0;right:auto;bottom:auto;left:0;width:100%;height:var(--size);transform:translate(0, -100%)}.drawer--right .drawer__panel{top:0;right:0;bottom:auto;left:auto;width:var(--size);height:100%;transform:translate(100%, 0)}.drawer--bottom .drawer__panel{top:auto;right:auto;bottom:0;left:0;width:100%;height:var(--size);transform:translate(0, 100%)}.drawer--left .drawer__panel{top:0;right:auto;bottom:auto;left:0;width:var(--size);height:100%;transform:translate(-100%, 0)}.drawer--open .drawer__panel{transform:translate(0, 0)}.drawer__header{display:flex}.drawer__title{flex:1 1 auto;font-size:var(--sl-font-size-large);line-height:var(--sl-line-height-dense);padding:var(--sl-spacing-large)}.drawer__close{flex:0 0 auto;display:flex;align-items:center;font-size:var(--sl-font-size-x-large);padding:0 var(--sl-spacing-large)}.drawer__body{flex:1 1 auto;padding:var(--sl-spacing-large);overflow:auto;-webkit-overflow-scrolling:touch}.drawer__footer{text-align:right;padding:var(--sl-spacing-large)}.drawer__footer ::slotted(sl-button:not(:last-of-type)){margin-right:var(--sl-spacing-x-small)}.drawer:not(.drawer--has-footer) .drawer__footer{display:none}.drawer__overlay{display:block;position:fixed;top:0;right:0;bottom:0;left:0;background-color:var(--sl-overlay-background-color);opacity:0;transition:var(--sl-transition-medium) opacity;pointer-events:all}.drawer--contained .drawer__overlay{position:absolute}.drawer--open .drawer__overlay{opacity:1}";

let id = 0;
const Drawer = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.slShow = index.createEvent(this, "slShow", 7);
        this.slAfterShow = index.createEvent(this, "slAfterShow", 7);
        this.slHide = index.createEvent(this, "slHide", 7);
        this.slAfterHide = index.createEvent(this, "slAfterHide", 7);
        this.slOverlayDismiss = index.createEvent(this, "slOverlayDismiss", 7);
        this.componentId = `drawer-${++id}`;
        this.hasFooter = false;
        /** Indicates whether or not the drawer is open. You can use this in lieu of the show/hide methods. */
        this.open = false;
        /**
         * The drawer's label as displayed in the header. You should always include a relevant label even when using
         * `no-header`, as it is required for proper accessibility.
         */
        this.label = '';
        /** The direction from which the drawer will open. */
        this.placement = 'right';
        /**
         * By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of
         * its parent element, set this prop and add `position: relative` to the parent.
         */
        this.contained = false;
        /**
         * Removes the header. This will also remove the default close button, so please ensure you provide an easy,
         * accessible way for users to dismiss the drawer.
         */
        this.noHeader = false;
    }
    handleOpenChange() {
        this.open ? this.show() : this.hide();
    }
    connectedCallback() {
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
        this.handleDocumentFocusIn = this.handleDocumentFocusIn.bind(this);
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
    /** Shows the drawer */
    async show() {
        const slShow = this.slShow.emit();
        if (slShow.defaultPrevented) {
            return false;
        }
        this.drawer.hidden = false;
        requestAnimationFrame(() => (this.open = true));
        // Lock body scrolling only if the drawer isn't contained
        if (!this.contained) {
            scroll.lockBodyScrolling(this.host);
        }
        document.addEventListener('focusin', this.handleDocumentFocusIn);
    }
    /** Hides the drawer */
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
        // Trap focus only if the drawer is NOT contained
        if (!this.contained && target.closest('sl-drawer') !== this.host) {
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
        if (event.propertyName === 'transform' && target.classList.contains('drawer__panel')) {
            this.drawer.hidden = !this.open;
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
        return (index.h("div", { ref: el => (this.drawer = el), part: "base", class: {
                drawer: true,
                'drawer--open': this.open,
                'drawer--top': this.placement === 'top',
                'drawer--right': this.placement === 'right',
                'drawer--bottom': this.placement === 'bottom',
                'drawer--left': this.placement === 'left',
                'drawer--contained': this.contained,
                'drawer--fixed': !this.contained,
                'drawer--has-footer': this.hasFooter
            }, onKeyDown: this.handleKeyDown, onTransitionEnd: this.handleTransitionEnd, hidden: true }, index.h("div", { part: "overlay", class: "drawer__overlay", onClick: this.handleOverlayClick }), index.h("div", { ref: el => (this.panel = el), part: "panel", class: "drawer__panel", role: "dialog", "aria-modal": "true", "aria-hidden": !this.open, "aria-label": this.noHeader ? this.label : null, "aria-labeledby": !this.noHeader ? `${this.componentId}-title` : null, tabIndex: 0 }, !this.noHeader && (index.h("header", { part: "header", class: "drawer__header" }, index.h("span", { part: "title", class: "drawer__title", id: `${this.componentId}-title` }, this.label || String.fromCharCode(65279)), index.h("sl-icon-button", { part: "close-button", class: "drawer__close", name: "x", onClick: this.handleCloseClick }))), index.h("div", { part: "body", class: "drawer__body" }, index.h("slot", null)), index.h("footer", { part: "footer", class: "drawer__footer" }, index.h("slot", { name: "footer" })))));
    }
    get host() { return index.getElement(this); }
    static get watchers() { return {
        "open": ["handleOpenChange"]
    }; }
};
Drawer.style = drawerCss;

exports.sl_drawer = Drawer;

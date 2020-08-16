'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9b0ec98d.js');

const alertCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:block}:host[hidden]{display:none}.alert{position:relative;display:flex;align-items:stretch;background-color:var(--sl-color-white);border:solid 1px var(--sl-color-gray-90);border-top-width:3px;border-radius:var(--sl-border-radius-medium);font-family:var(--sl-font-sans);font-size:var(--sl-font-size-small);font-weight:var(--sl-font-weight-normal);line-height:1.6;color:var(--sl-color-gray-30);opacity:0;transition:var(--sl-transition-medium) opacity ease}.alert--open{opacity:1}.alert__icon{flex:0 0 auto;display:flex;align-items:center;font-size:var(--sl-font-size-large)}.alert__icon ::slotted(*){margin-left:var(--sl-spacing-large)}.alert--primary{border-top-color:var(--sl-color-primary-50)}.alert--primary .alert__icon{color:var(--sl-color-primary-50)}.alert--success{border-top-color:var(--sl-color-success-50)}.alert--success .alert__icon{color:var(--sl-color-success-50)}.alert--info{border-top-color:var(--sl-color-info-50)}.alert--info .alert__icon{color:var(--sl-color-info-50)}.alert--warning{border-top-color:var(--sl-color-warning-50)}.alert--warning .alert__icon{color:var(--sl-color-warning-50)}.alert--danger{border-top-color:var(--sl-color-danger-50)}.alert--danger .alert__icon{color:var(--sl-color-danger-50)}.alert__message{flex:1 1 auto;padding:var(--sl-spacing-large);overflow:hidden}.alert__close{flex:0 0 auto;display:flex;align-items:center;font-size:var(--sl-font-size-large);padding:0 var(--sl-spacing-medium)}";

const Tab = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.slShow = index.createEvent(this, "slShow", 7);
        this.slAfterShow = index.createEvent(this, "slAfterShow", 7);
        this.slHide = index.createEvent(this, "slHide", 7);
        this.slAfterHide = index.createEvent(this, "slAfterHide", 7);
        /** Indicates whether or not the alert is open. You can use this in lieu of the show/hide methods. */
        this.open = false;
        /** Set to true to make the alert closable. */
        this.closable = false;
        /** The type of alert. */
        this.type = 'primary';
    }
    handleOpenChange() {
        this.open ? this.show() : this.hide();
    }
    connectedCallback() {
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    }
    componentDidLoad() {
        // Show on init if open
        if (this.open) {
            this.show();
        }
    }
    /** Shows the alert. */
    async show() {
        const slShow = this.slShow.emit();
        if (slShow.defaultPrevented) {
            return false;
        }
        this.host.hidden = false;
        this.open = true;
    }
    /** Hides the alert */
    async hide() {
        const slHide = this.slHide.emit();
        if (slHide.defaultPrevented) {
            return false;
        }
        this.open = false;
    }
    handleCloseClick() {
        this.hide();
    }
    handleTransitionEnd(event) {
        const target = event.target;
        // Ensure we only emit one event when the target element is no longer visible
        if (event.propertyName === 'opacity' && target.classList.contains('alert')) {
            this.host.hidden = !this.open;
            this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();
        }
    }
    render() {
        return (index.h(index.Host, { hidden: true }, index.h("div", { ref: el => (this.alert = el), part: "base", class: {
                alert: true,
                'alert--open': this.open,
                'alert--closable': this.closable,
                // States
                'alert--primary': this.type === 'primary',
                'alert--success': this.type === 'success',
                'alert--info': this.type === 'info',
                'alert--warning': this.type === 'warning',
                'alert--danger': this.type === 'danger'
            }, role: "alert", "aria-hidden": !this.open, onTransitionEnd: this.handleTransitionEnd }, index.h("span", { part: "icon", class: "alert__icon" }, index.h("slot", { name: "icon" })), index.h("span", { part: "message", class: "alert__message" }, index.h("slot", null)), this.closable && (index.h("sl-icon-button", { part: "close-button", class: "alert__close", name: "x", onClick: this.handleCloseClick })))));
    }
    get host() { return index.getElement(this); }
    static get watchers() { return {
        "open": ["handleOpenChange"]
    }; }
};
Tab.style = alertCss;

exports.sl_alert = Tab;

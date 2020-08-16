import { Component, Element, Event, Method, Prop, State, Watch, h } from '@stencil/core';
import { lockBodyScrolling, unlockBodyScrolling } from '../../utilities/scroll';
import { hasSlot } from '../../utilities/slot';
let id = 0;
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The drawer's content.
 * @slot footer - The drawer's footer, usually one or more buttons representing various options.
 *
 * @part base - The component's base wrapper.
 * @part overlay - The overlay.
 * @part panel - The drawer panel (where the drawer and its is rendered).
 * @part header - The drawer header.
 * @part title - The drawer title.
 * @part close-button - The close button.
 * @part body - The drawer body.
 * @part footer - The drawer footer.
 */
export class Drawer {
    constructor() {
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
        unlockBodyScrolling(this.host);
        this.host.shadowRoot.removeEventListener('slotchange', this.updateSlots);
    }
    /** Shows the drawer */
    async show() {
        const slShow = this.slShow.emit();
        if (slShow.defaultPrevented) {
            return false;
        }
        this.drawer.hidden = false;
        this.host.clientWidth; // force a reflow
        requestAnimationFrame(() => (this.open = true));
        // Lock body scrolling only if the drawer isn't contained
        if (!this.contained) {
            lockBodyScrolling(this.host);
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
        unlockBodyScrolling(this.host);
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
        this.hasFooter = hasSlot(this.host, 'footer');
    }
    render() {
        return (h("div", { ref: el => (this.drawer = el), part: "base", class: {
                drawer: true,
                'drawer--open': this.open,
                'drawer--top': this.placement === 'top',
                'drawer--right': this.placement === 'right',
                'drawer--bottom': this.placement === 'bottom',
                'drawer--left': this.placement === 'left',
                'drawer--contained': this.contained,
                'drawer--fixed': !this.contained,
                'drawer--has-footer': this.hasFooter
            }, onKeyDown: this.handleKeyDown, onTransitionEnd: this.handleTransitionEnd, hidden: true },
            h("div", { part: "overlay", class: "drawer__overlay", onClick: this.handleOverlayClick }),
            h("div", { ref: el => (this.panel = el), part: "panel", class: "drawer__panel", role: "dialog", "aria-modal": "true", "aria-hidden": !this.open, "aria-label": this.noHeader ? this.label : null, "aria-labeledby": !this.noHeader ? `${this.componentId}-title` : null, tabIndex: 0 },
                !this.noHeader && (h("header", { part: "header", class: "drawer__header" },
                    h("span", { part: "title", class: "drawer__title", id: `${this.componentId}-title` }, this.label || String.fromCharCode(65279)),
                    h("sl-icon-button", { part: "close-button", class: "drawer__close", name: "x", onClick: this.handleCloseClick }))),
                h("div", { part: "body", class: "drawer__body" },
                    h("slot", null)),
                h("footer", { part: "footer", class: "drawer__footer" },
                    h("slot", { name: "footer" })))));
    }
    static get is() { return "sl-drawer"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["drawer.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["drawer.css"]
    }; }
    static get properties() { return {
        "open": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Indicates whether or not the drawer is open. You can use this in lieu of the show/hide methods."
            },
            "attribute": "open",
            "reflect": true,
            "defaultValue": "false"
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
                "text": "The drawer's label as displayed in the header. You should always include a relevant label even when using\n`no-header`, as it is required for proper accessibility."
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "''"
        },
        "placement": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'top' | 'right' | 'bottom' | 'left'",
                "resolved": "\"bottom\" | \"left\" | \"right\" | \"top\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The direction from which the drawer will open."
            },
            "attribute": "placement",
            "reflect": false,
            "defaultValue": "'right'"
        },
        "contained": {
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
                "text": "By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of\nits parent element, set this prop and add `position: relative` to the parent."
            },
            "attribute": "contained",
            "reflect": false,
            "defaultValue": "false"
        },
        "noHeader": {
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
                "text": "Removes the header. This will also remove the default close button, so please ensure you provide an easy,\naccessible way for users to dismiss the drawer."
            },
            "attribute": "no-header",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "hasFooter": {}
    }; }
    static get events() { return [{
            "method": "slShow",
            "name": "slShow",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the drawer opens. Calling `event.preventDefault()` will prevent it from being opened."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slAfterShow",
            "name": "slAfterShow",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted after the drawer opens and all transitions are complete."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slHide",
            "name": "slHide",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the drawer closes. Calling `event.preventDefault()` will prevent it from being closed."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slAfterHide",
            "name": "slAfterHide",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted after the drawer closes and all transitions are complete."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slOverlayDismiss",
            "name": "slOverlayDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the overlay is clicked. Calling `event.preventDefault()` will prevent the drawer from closing."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "show": {
            "complexType": {
                "signature": "() => Promise<boolean>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<boolean>"
            },
            "docs": {
                "text": "Shows the drawer",
                "tags": []
            }
        },
        "hide": {
            "complexType": {
                "signature": "() => Promise<boolean>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<boolean>"
            },
            "docs": {
                "text": "Hides the drawer",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "open",
            "methodName": "handleOpenChange"
        }]; }
}

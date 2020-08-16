import { Component, Element, Event, Method, Prop, State, Watch, h } from '@stencil/core';
import { lockBodyScrolling, unlockBodyScrolling } from '../../utilities/scroll';
import { hasSlot } from '../../utilities/slot';
let id = 0;
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The dialog's content.
 * @slot footer - The dialog's footer, usually one or more buttons representing various options.
 *
 * @part base - The component's base wrapper.
 * @part overlay - The overlay.
 * @part panel - The dialog panel (where the dialog and its is rendered).
 * @part header - The dialog header.
 * @part title - The dialog title.
 * @part close-button - The close button.
 * @part body - The dialog body.
 * @part footer - The dialog footer.
 *
 */
export class Dialog {
    constructor() {
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
        unlockBodyScrolling(this.host);
        this.host.shadowRoot.removeEventListener('slotchange', this.updateSlots);
    }
    /** Shows the dialog */
    async show() {
        const slShow = this.slShow.emit();
        if (slShow.defaultPrevented) {
            return false;
        }
        this.dialog.hidden = false;
        this.host.clientWidth; // force a reflow
        requestAnimationFrame(() => (this.open = true));
        lockBodyScrolling(this.host);
        document.addEventListener('focusin', this.handleDocumentFocusIn);
    }
    /** Hides the dialog */
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
        this.hasFooter = hasSlot(this.host, 'footer');
    }
    render() {
        return (h("div", { ref: el => (this.dialog = el), part: "base", class: {
                dialog: true,
                'dialog--open': this.open,
                'dialog--has-footer': this.hasFooter
            }, onKeyDown: this.handleKeyDown, onTransitionEnd: this.handleTransitionEnd, hidden: true },
            h("div", { part: "overlay", class: "dialog__overlay", onClick: this.handleOverlayClick }),
            h("div", { ref: el => (this.panel = el), part: "panel", class: "dialog__panel", role: "dialog", "aria-modal": "true", "aria-hidden": !this.open, "aria-label": this.noHeader ? this.label : null, "aria-labeledby": !this.noHeader ? `${this.componentId}-title` : null, tabIndex: 0 },
                !this.noHeader && (h("header", { part: "header", class: "dialog__header" },
                    h("span", { part: "title", class: "dialog__title", id: `${this.componentId}-title` }, this.label || String.fromCharCode(65279)),
                    h("sl-icon-button", { part: "close-button", class: "dialog__close", name: "x", onClick: this.handleCloseClick }))),
                h("div", { part: "body", class: "dialog__body" },
                    h("slot", null)),
                h("footer", { part: "footer", class: "dialog__footer" },
                    h("slot", { name: "footer" })))));
    }
    static get is() { return "sl-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["dialog.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dialog.css"]
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
                "text": "Indicates whether or not the dialog is open. You can use this in lieu of the show/hide methods."
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
                "text": "The dialog's label as displayed in the header. You should always include a relevant label even when using\n`no-header`, as it is required for proper accessibility."
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "''"
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
                "text": "Set to true to disable the header. This will also remove the default close button, so please ensure you provide an\neasy, accessible way for users to dismiss the dialog."
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
                "text": "Emitted when the dialog opens. Calling `event.preventDefault()` will prevent it from being opened."
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
                "text": "Emitted after the dialog opens and all transitions are complete."
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
                "text": "Emitted when the dialog closes. Calling `event.preventDefault()` will prevent it from being closed."
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
                "text": "Emitted after the dialog closes and all transitions are complete."
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
                "text": "Emitted when the overlay is clicked. Calling `event.preventDefault()` will prevent the dialog from closing."
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
                "text": "Shows the dialog",
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
                "text": "Hides the dialog",
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

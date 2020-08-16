import { Component, Element, Event, Host, Method, Prop, Watch, h } from '@stencil/core';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The alert's content.
 * @slot icon - An icon to show in the alert.
 *
 * @part base - The component's base wrapper.
 * @part icon - The container that wraps the alert icon.
 * @part message - The alert message.
 * @part close-button - The close button.
 */
export class Tab {
    constructor() {
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
        this.host.clientWidth; // force a reflow
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
        return (h(Host, { hidden: true },
            h("div", { ref: el => (this.alert = el), part: "base", class: {
                    alert: true,
                    'alert--open': this.open,
                    'alert--closable': this.closable,
                    // States
                    'alert--primary': this.type === 'primary',
                    'alert--success': this.type === 'success',
                    'alert--info': this.type === 'info',
                    'alert--warning': this.type === 'warning',
                    'alert--danger': this.type === 'danger'
                }, role: "alert", "aria-hidden": !this.open, onTransitionEnd: this.handleTransitionEnd },
                h("span", { part: "icon", class: "alert__icon" },
                    h("slot", { name: "icon" })),
                h("span", { part: "message", class: "alert__message" },
                    h("slot", null)),
                this.closable && (h("sl-icon-button", { part: "close-button", class: "alert__close", name: "x", onClick: this.handleCloseClick })))));
    }
    static get is() { return "sl-alert"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["alert.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["alert.css"]
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
                "text": "Indicates whether or not the alert is open. You can use this in lieu of the show/hide methods."
            },
            "attribute": "open",
            "reflect": true,
            "defaultValue": "false"
        },
        "closable": {
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
                "text": "Set to true to make the alert closable."
            },
            "attribute": "closable",
            "reflect": false,
            "defaultValue": "false"
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'primary' | 'success' | 'info' | 'warning' | 'danger'",
                "resolved": "\"danger\" | \"info\" | \"primary\" | \"success\" | \"warning\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The type of alert."
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'primary'"
        }
    }; }
    static get events() { return [{
            "method": "slShow",
            "name": "slShow",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the alert opens. Calling `event.preventDefault()` will prevent it from being opened."
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
                "text": "Emitted after the alert opens and all transitions are complete."
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
                "text": "Emitted when the alert closes. Calling `event.preventDefault()` will prevent it from being closed."
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
                "text": "Emitted after the alert closes and all transitions are complete."
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
                "text": "Shows the alert.",
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
                "text": "Hides the alert",
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

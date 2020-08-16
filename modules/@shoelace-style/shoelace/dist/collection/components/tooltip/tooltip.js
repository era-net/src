import { Component, Element, Event, Host, Method, Prop, Watch, h } from '@stencil/core';
import Popover from '../../utilities/popover';
let id = 0;
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The tooltip's target element. Only the first element will be used as the target.
 *
 * @part base - The component's base wrapper.
 */
export class Tooltip {
    constructor() {
        this.componentId = `tooltip-${++id}`;
        /** The tooltip's content. */
        this.content = '';
        /**
         * The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip
         * inside of the viewport.
         */
        this.placement = 'top';
        /** Set to true to disable the tooltip so it won't show when triggered. */
        this.disabled = false;
        /** The distance in pixels from which to offset the tooltip away from its target. */
        this.distance = 10;
        /** Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods. */
        this.open = false;
        /** The distance in pixels from which to offset the tooltip along its target. */
        this.skidding = 0;
        /**
         * Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
         * options can be passed by separating them with a space. When manual is used, the tooltip must be activated
         * programmatically.
         */
        this.trigger = 'hover focus';
    }
    handleOpenChange() {
        this.open ? this.show() : this.hide();
    }
    connectedCallback() {
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleSlotChange = this.handleSlotChange.bind(this);
    }
    componentDidLoad() {
        const slot = this.host.shadowRoot.querySelector('slot');
        this.target = this.getTarget();
        this.popover = new Popover(this.target, this.tooltip);
        this.syncOptions();
        this.host.addEventListener('blur', this.handleBlur, true);
        this.host.addEventListener('click', this.handleClick, true);
        this.host.addEventListener('focus', this.handleFocus, true);
        slot.addEventListener('slotchange', this.handleSlotChange);
        // Show on init if open
        this.tooltip.hidden = !this.open;
        if (this.open) {
            this.show();
        }
    }
    componentDidUpdate() {
        this.syncOptions();
    }
    disconnectedCallback() {
        this.popover.destroy();
        this.host.removeEventListener('blur', this.handleBlur, true);
        this.host.removeEventListener('click', this.handleClick, true);
        this.host.removeEventListener('focus', this.handleFocus, true);
        this.host.shadowRoot.querySelector('slot').removeEventListener('slotchange', this.handleSlotChange);
    }
    /** Shows the tooltip. */
    async show() {
        const slShow = this.slShow.emit();
        if (slShow.defaultPrevented) {
            return false;
        }
        this.popover.show();
        this.open = true;
    }
    /** Shows the tooltip. */
    async hide() {
        const slHide = this.slHide.emit();
        if (slHide.defaultPrevented) {
            return false;
        }
        this.popover.hide();
        this.open = false;
    }
    getTarget() {
        const target = this.host.querySelector('*:not(style)');
        if (!target) {
            throw new Error('Invalid tooltip target: no child element was found.');
        }
        return target;
    }
    handleBlur() {
        if (this.hasTrigger('focus')) {
            this.hide();
        }
    }
    handleClick() {
        if (this.hasTrigger('click')) {
            this.open ? this.hide() : this.show();
        }
    }
    handleFocus() {
        if (this.hasTrigger('focus')) {
            this.show();
        }
    }
    handleMouseOver() {
        if (this.hasTrigger('hover')) {
            this.show();
        }
    }
    handleMouseOut() {
        if (this.hasTrigger('hover')) {
            this.hide();
        }
    }
    handleSlotChange() {
        const oldTarget = this.target;
        const newTarget = this.getTarget();
        if (newTarget !== oldTarget) {
            oldTarget.removeAttribute('aria-describedby');
            newTarget.setAttribute('aria-describedby', this.componentId);
        }
    }
    hasTrigger(triggerType) {
        const triggers = this.trigger.split(' ');
        return triggers.includes(triggerType);
    }
    syncOptions() {
        this.popover.setOptions({
            placement: this.placement,
            skidding: this.skidding,
            distance: this.distance,
            onAfterHide: () => this.slAfterHide.emit(),
            onAfterShow: () => this.slAfterShow.emit()
        });
    }
    render() {
        return (h(Host, { onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut },
            h("slot", { "aria-describedby": this.componentId }),
            !this.disabled && (h("div", { part: "base", ref: el => (this.tooltip = el), id: this.componentId, class: {
                    tooltip: true,
                    'tooltip--open': this.open
                }, role: "tooltip", "aria-hidden": !this.open }, this.content))));
    }
    static get is() { return "sl-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["tooltip.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["tooltip.css"]
    }; }
    static get properties() { return {
        "content": {
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
                "text": "The tooltip's content."
            },
            "attribute": "content",
            "reflect": false,
            "defaultValue": "''"
        },
        "placement": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "| 'top'\n    | 'top-start'\n    | 'top-end'\n    | 'right'\n    | 'right-start'\n    | 'right-end'\n    | 'bottom'\n    | 'bottom-start'\n    | 'bottom-end'\n    | 'left'\n    | 'left-start'\n    | 'left-end'",
                "resolved": "\"bottom\" | \"bottom-end\" | \"bottom-start\" | \"left\" | \"left-end\" | \"left-start\" | \"right\" | \"right-end\" | \"right-start\" | \"top\" | \"top-end\" | \"top-start\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip\ninside of the viewport."
            },
            "attribute": "placement",
            "reflect": false,
            "defaultValue": "'top'"
        },
        "disabled": {
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
                "text": "Set to true to disable the tooltip so it won't show when triggered."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "distance": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The distance in pixels from which to offset the tooltip away from its target."
            },
            "attribute": "distance",
            "reflect": false,
            "defaultValue": "10"
        },
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
                "text": "Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods."
            },
            "attribute": "open",
            "reflect": true,
            "defaultValue": "false"
        },
        "skidding": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The distance in pixels from which to offset the tooltip along its target."
            },
            "attribute": "skidding",
            "reflect": false,
            "defaultValue": "0"
        },
        "trigger": {
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
                "text": "Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple\noptions can be passed by separating them with a space. When manual is used, the tooltip must be activated\nprogrammatically."
            },
            "attribute": "trigger",
            "reflect": false,
            "defaultValue": "'hover focus'"
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
                "text": "Emitted when the tooltip begins to show. Calling `event.preventDefault()` will prevent it from being shown."
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
                "text": "Emitted after the tooltip has shown and all transitions are complete."
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
                "text": "Emitted when the tooltip begins to hide. Calling `event.preventDefault()` will prevent it from being hidden."
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
                "text": "Emitted after the tooltip has hidden and all transitions are complete."
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
                "text": "Shows the tooltip.",
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
                "text": "Shows the tooltip.",
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

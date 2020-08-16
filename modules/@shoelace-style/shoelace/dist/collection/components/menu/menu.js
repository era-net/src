import { Component, Event, Method, State, h } from '@stencil/core';
import { getTextContent } from '../../utilities/slot';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The menu's content, including menu items, menu dividers, and menu labels.
 *
 * @part base - The component's base wrapper.
 */
export class Menu {
    constructor() {
        this.ignoreMouseEvents = false;
        this.typeToSelectString = '';
        this.hasFocus = false;
    }
    connectedCallback() {
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }
    /** Sets focus on the menu. */
    async setFocus() {
        this.hasFocus = true;
        this.menu.focus();
    }
    /** Removes focus from the menu. */
    async removeFocus() {
        this.hasFocus = false;
        this.menu.blur();
    }
    /**
     * Initiates type-to-select logic, which automatically selects an option based on what the user is currently typing.
     * The key passed will be appended to the internal query and the selection will be updated. After a brief period, the
     * internal query is cleared automatically. This method is intended to be used with the keydown event. Useful for
     * enabling type-to-select when the menu doesn't have focus.
     */
    async typeToSelect(key) {
        clearTimeout(this.typeToSelectTimeout);
        this.typeToSelectTimeout = setTimeout(() => (this.typeToSelectString = ''), 750);
        this.typeToSelectString += key.toLowerCase();
        const items = this.getItems();
        for (const item of items) {
            const slot = item.shadowRoot.querySelector('slot:not([name])');
            const label = getTextContent(slot).toLowerCase().trim();
            if (label.substring(0, this.typeToSelectString.length) === this.typeToSelectString) {
                items.map(i => (i.active = i === item));
                break;
            }
        }
    }
    getItems() {
        const slot = this.menu.querySelector('slot');
        return [...slot.assignedElements({ flatten: true })].filter((el) => el.tagName.toLowerCase() === 'sl-menu-item' && !el.disabled);
    }
    getActiveItem() {
        return this.getItems().find(i => i.active);
    }
    setActiveItem(item) {
        this.getItems().map(i => (i.active = i === item));
    }
    handleFocus() {
        const item = this.getActiveItem();
        if (!item) {
            this.setActiveItem(this.getItems()[0]);
        }
        this.slFocus.emit();
    }
    handleBlur() {
        this.setActiveItem();
        this.slBlur.emit();
    }
    handleClick(event) {
        const target = event.target;
        const item = target.closest('sl-menu-item');
        if (item && !item.disabled) {
            this.slSelect.emit({ item });
        }
    }
    handleKeyDown(event) {
        // When keying through the menu, if the mouse happens to be hovering over a menu item and the menu scrolls, the
        // mouseout/mouseover event will fire causing the selection to be different than what the user expects. This gives
        // us a way to temporarily ignore mouse events while the user is interacting with a keyboard.
        clearTimeout(this.ignoreMouseTimeout);
        this.ignoreMouseTimeout = setTimeout(() => (this.ignoreMouseEvents = false), 500);
        this.ignoreMouseEvents = true;
        // Make a selection when pressing enter
        if (event.key === 'Enter') {
            const item = this.getActiveItem();
            event.preventDefault();
            if (item) {
                this.slSelect.emit({ item });
            }
        }
        // Prevent scrolling when space is pressed
        if (event.key === ' ') {
            event.preventDefault();
        }
        // Move the selection when pressing down or up
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            const items = this.getItems();
            const selectedItem = this.getActiveItem();
            let index = items.indexOf(selectedItem);
            if (items.length) {
                event.preventDefault();
                if (event.key === 'ArrowDown') {
                    index++;
                }
                else if (event.key === 'ArrowUp') {
                    index--;
                }
                else if (event.key === 'Home') {
                    index = 0;
                }
                else if (event.key === 'End') {
                    index = items.length - 1;
                }
                if (index < 0)
                    index = 0;
                if (index > items.length - 1)
                    index = items.length - 1;
                this.setActiveItem(items[index]);
                return;
            }
        }
        this.typeToSelect(event.key);
    }
    handleMouseDown(event) {
        event.preventDefault();
    }
    handleMouseOver(event) {
        const target = event.target;
        const item = target.closest('sl-menu-item');
        if (item && !this.ignoreMouseEvents) {
            this.setActiveItem(item);
        }
    }
    handleMouseOut(event) {
        const target = event.target;
        const item = target.closest('sl-menu-item');
        if (item && !this.ignoreMouseEvents) {
            this.setActiveItem(null);
        }
    }
    render() {
        return (h("div", { ref: el => (this.menu = el), part: "base", class: {
                menu: true,
                'menu--has-focus': this.hasFocus
            }, tabIndex: 0, role: "menu", onClick: this.handleClick, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut },
            h("slot", null)));
    }
    static get is() { return "sl-menu"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["menu.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["menu.css"]
    }; }
    static get states() { return {
        "hasFocus": {}
    }; }
    static get events() { return [{
            "method": "slFocus",
            "name": "slFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the menu gains focus."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slBlur",
            "name": "slBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the menu loses focus."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slSelect",
            "name": "slSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when a menu item is selected."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "setFocus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Sets focus on the menu.",
                "tags": []
            }
        },
        "removeFocus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Removes focus from the menu.",
                "tags": []
            }
        },
        "typeToSelect": {
            "complexType": {
                "signature": "(key: string) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLSlotElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Initiates type-to-select logic, which automatically selects an option based on what the user is currently typing.\nThe key passed will be appended to the internal query and the selection will be updated. After a brief period, the\ninternal query is cleared automatically. This method is intended to be used with the keydown event. Useful for\nenabling type-to-select when the menu doesn't have focus.",
                "tags": []
            }
        }
    }; }
}

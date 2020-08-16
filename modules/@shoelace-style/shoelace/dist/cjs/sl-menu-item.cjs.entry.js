'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9b0ec98d.js');

const menuItemCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:block}.menu-item{position:relative;display:flex;align-items:stretch;background-color:var(--sl-color-white);font-family:var(--sl-font-sans);font-size:var(--sl-font-size-medium);font-weight:var(--sl-font-weight-normal);line-height:var(--sl-line-height-normal);letter-spacing:var(--sl-letter-spacing-normal);text-align:left;color:var(--color-gray-40);padding:var(--sl-spacing-xx-small) var(--sl-spacing-x-large);transition:var(--sl-transition-fast) fill;user-select:none;white-space:nowrap;cursor:pointer}.menu-item.menu-item--active:not(.menu-item--disabled){background-color:var(--sl-color-primary-95);color:var(--sl-color-primary-50)}.menu-item.menu-item--disabled{color:var(--sl-color-gray-70);cursor:not-allowed}.menu-item .menu-item__label{flex:1 1 auto}.menu-item .menu-item__prefix{flex:0 0 auto;display:flex;align-items:center}.menu-item .menu-item__prefix ::slotted(:last-child){margin-right:0.5em}.menu-item .menu-item__suffix{flex:0 0 auto;display:flex;align-items:center}.menu-item .menu-item__suffix ::slotted(:first-child){margin-left:0.5em}.menu-item .menu-item__check{display:flex;position:absolute;left:0.5em;top:calc(50% - 0.5em);visibility:hidden;align-items:center;font-size:inherit}.menu-item--checked .menu-item__check{visibility:visible}";

const MenuItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.slActivate = index.createEvent(this, "slActivate", 7);
        this.slDeactivate = index.createEvent(this, "slDeactivate", 7);
        /** Set to true to draw the item in a checked state. */
        this.checked = false;
        /** Set to true to draw the menu item in an active state. */
        this.active = false;
        /** A unique value to store in the menu item. */
        this.value = '';
        /** Set to true to draw the menu item in a disabled state. */
        this.disabled = false;
    }
    handleActiveChange() {
        this.active ? this.slActivate.emit() : this.slDeactivate.emit();
    }
    render() {
        return (index.h("div", { part: "base", class: {
                'menu-item': true,
                'menu-item--checked': this.checked,
                'menu-item--active': this.active,
                'menu-item--disabled': this.disabled
            }, role: "menuitem", "aria-checked": this.checked, "aria-disabled": this.disabled, "aria-selected": this.active }, index.h("span", { part: "checked-icon", class: "menu-item__check" }, index.h("sl-icon", { name: "check2" })), index.h("span", { part: "prefix", class: "menu-item__prefix" }, index.h("slot", { name: "prefix" })), index.h("span", { part: "label", class: "menu-item__label" }, index.h("slot", null)), index.h("span", { part: "suffix", class: "menu-item__suffix" }, index.h("slot", { name: "suffix" }))));
    }
    static get watchers() { return {
        "active": ["handleActiveChange"]
    }; }
};
MenuItem.style = menuItemCss;

exports.sl_menu_item = MenuItem;

import { r as registerInstance, h } from './index-d587ef97.js';

const menuDividerCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:block}.menu-divider{border-top:solid 1px var(--sl-color-gray-90);margin:var(--sl-spacing-x-small) 0}";

const MenuDivider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return h("div", { part: "base", class: "menu-divider", role: "separator" });
    }
};
MenuDivider.style = menuDividerCss;

export { MenuDivider as sl_menu_divider };

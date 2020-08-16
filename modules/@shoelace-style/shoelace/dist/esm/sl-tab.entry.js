import { r as registerInstance, h, H as Host, g as getElement } from './index-d587ef97.js';

const tabCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--focus-ring:var(--sl-focus-ring-box-shadow-inset);display:inline-block}.tab{font-family:var(--sl-font-sans);font-size:var(--sl-font-size-small);font-weight:var(--sl-font-weight-semibold);border-radius:4px;color:var(--sl-color-gray-40);padding:16px 20px;white-space:nowrap;user-select:none;cursor:pointer;transition:var(--transition-speed) box-shadow, var(--transition-speed) color}.tab:hover:not(.tab--disabled){color:var(--sl-color-primary-50)}.tab:focus{outline:none}.tab:focus:not(.tab--disabled){color:var(--sl-color-primary-50);box-shadow:var(--focus-ring)}.tab.tab--active:not(.tab--disabled){color:var(--sl-color-primary-50)}.tab.tab--disabled{opacity:0.5;cursor:not-allowed}";

let id = 0;
const Tab = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.componentId = `tab-${++id}`;
        /** The name of the tab panel the tab will control. The panel must be located in the same tab group. */
        this.panel = '';
        /** Set to true to draw the tab in an active state. */
        this.active = false;
        /** Set to true to draw the tab in a disabled state. */
        this.disabled = false;
    }
    /** Sets focus to the tab. */
    async setFocus() {
        this.tab.focus({ preventScroll: true });
    }
    /** Removes focus from the tab. */
    async removeFocus() {
        this.tab.blur();
    }
    render() {
        return (
        // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
        h(Host, { id: this.host.id || this.componentId }, h("div", { part: "base", ref: el => (this.tab = el), class: {
                tab: true,
                // States
                'tab--active': this.active,
                'tab--disabled': this.disabled
            }, role: "tab", "aria-disabled": this.disabled, "aria-selected": this.active, tabindex: this.disabled || !this.active ? '-1' : '0' }, h("slot", null))));
    }
    get host() { return getElement(this); }
};
Tab.style = tabCss;

export { Tab as sl_tab };

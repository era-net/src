import { r as registerInstance, h } from './index-d587ef97.js';

const spinnerCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--track-color:transparent;--indicator-color:var(--sl-color-primary-50);--stroke-width:2px;display:inline-flex}.spinner{display:inline-block;width:1em;height:1em;border-radius:50%;border:solid var(--stroke-width) var(--indicator-color);border-bottom-color:var(--track-color);animation:1s linear infinite spin}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const Spinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return h("span", { part: "base", class: "spinner", "aria-busy": "true", "aria-live": "polite" });
    }
};
Spinner.style = spinnerCss;

export { Spinner as sl_spinner };

import { r as registerInstance, h } from './index-d587ef97.js';

const progressBarCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--height:16px;display:block}.progress-bar{position:relative;background:var(--sl-color-gray-90);height:var(--height);border-radius:var(--sl-border-radius-pill);overflow:hidden}.progress-bar__indicator{height:100%;font-family:var(--sl-font-sans);font-size:12px;font-weight:var(--sl-font-weight-normal);background-color:var(--sl-color-primary-50);color:var(--sl-color-white);text-align:center;line-height:var(--height);white-space:nowrap;overflow:hidden;transition:400ms width, 400ms background-color;user-select:none}";

const ProgressBar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** The progress bar's percentage, 0 to 100. */
        this.percentage = 0;
    }
    render() {
        return (h("div", { part: "base", class: "progress-bar", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": this.percentage }, h("div", { part: "base", class: "progress-bar__indicator", style: {
                width: `${this.percentage}%`
            } }, h("span", { part: "label", class: "progress-bar__label" }, h("slot", null)))));
    }
};
ProgressBar.style = progressBarCss;

export { ProgressBar as sl_progress_bar };

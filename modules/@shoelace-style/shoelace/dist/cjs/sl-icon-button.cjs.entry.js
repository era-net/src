'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9b0ec98d.js');
const focusVisible = require('./focus-visible-535ddbb6.js');

const iconButtonCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block}.icon-button{flex:0 0 auto;display:flex;align-items:center;background:none;border:none;border-radius:var(--sl-border-radius-medium);font-size:inherit;color:var(--sl-color-gray-50);padding:var(--sl-spacing-x-small);cursor:pointer;transition:var(--sl-transition-medium) color;-webkit-appearance:none}.icon-button:hover:not(.icon-button--disabled),.icon-button:focus:not(.icon-button--disabled){color:var(--sl-color-primary-50)}.icon-button:active:not(.icon-button--disabled){color:var(--sl-color-primary-40)}.icon-button:focus{outline:none}.icon-button--disabled{opacity:0.5;cursor:not-allowed}.focus-visible.icon-button:focus{box-shadow:var(--sl-focus-ring-box-shadow)}";

const IconButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /** Set to true to disable the button. */
        this.disabled = false;
    }
    componentDidLoad() {
        focusVisible.focusVisible.observe(this.button);
    }
    disconnectedCallback() {
        focusVisible.focusVisible.unobserve(this.button);
    }
    render() {
        return (index.h("button", { ref: el => (this.button = el), part: "base", class: {
                'icon-button': true,
                'icon-button--disabled': this.disabled
            }, type: "button" }, index.h("sl-icon", { name: this.name, src: this.src, label: this.label })));
    }
};
IconButton.style = iconButtonCss;

exports.sl_icon_button = IconButton;

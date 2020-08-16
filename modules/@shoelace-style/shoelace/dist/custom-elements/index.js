import { attachShadow, createEvent, h, Host, getAssetPath, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath } from '@stencil/core/internal/client';

const alertCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:block}:host[hidden]{display:none}.alert{position:relative;display:flex;align-items:stretch;background-color:var(--sl-color-white);border:solid 1px var(--sl-color-gray-90);border-top-width:3px;border-radius:var(--sl-border-radius-medium);font-family:var(--sl-font-sans);font-size:var(--sl-font-size-small);font-weight:var(--sl-font-weight-normal);line-height:1.6;color:var(--sl-color-gray-30);opacity:0;transition:var(--sl-transition-medium) opacity ease}.alert--open{opacity:1}.alert__icon{flex:0 0 auto;display:flex;align-items:center;font-size:var(--sl-font-size-large)}.alert__icon ::slotted(*){margin-left:var(--sl-spacing-large)}.alert--primary{border-top-color:var(--sl-color-primary-50)}.alert--primary .alert__icon{color:var(--sl-color-primary-50)}.alert--success{border-top-color:var(--sl-color-success-50)}.alert--success .alert__icon{color:var(--sl-color-success-50)}.alert--info{border-top-color:var(--sl-color-info-50)}.alert--info .alert__icon{color:var(--sl-color-info-50)}.alert--warning{border-top-color:var(--sl-color-warning-50)}.alert--warning .alert__icon{color:var(--sl-color-warning-50)}.alert--danger{border-top-color:var(--sl-color-danger-50)}.alert--danger .alert__icon{color:var(--sl-color-danger-50)}.alert__message{flex:1 1 auto;padding:var(--sl-spacing-large);overflow:hidden}.alert__close{flex:0 0 auto;display:flex;align-items:center;font-size:var(--sl-font-size-large);padding:0 var(--sl-spacing-medium)}";

const Tab = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slShow = createEvent(this, "slShow", 7);
        this.slAfterShow = createEvent(this, "slAfterShow", 7);
        this.slHide = createEvent(this, "slHide", 7);
        this.slAfterHide = createEvent(this, "slAfterHide", 7);
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
        return (h(Host, { hidden: true }, h("div", { ref: el => (this.alert = el), part: "base", class: {
                alert: true,
                'alert--open': this.open,
                'alert--closable': this.closable,
                // States
                'alert--primary': this.type === 'primary',
                'alert--success': this.type === 'success',
                'alert--info': this.type === 'info',
                'alert--warning': this.type === 'warning',
                'alert--danger': this.type === 'danger'
            }, role: "alert", "aria-hidden": !this.open, onTransitionEnd: this.handleTransitionEnd }, h("span", { part: "icon", class: "alert__icon" }, h("slot", { name: "icon" })), h("span", { part: "message", class: "alert__message" }, h("slot", null)), this.closable && (h("sl-icon-button", { part: "close-button", class: "alert__close", name: "x", onClick: this.handleCloseClick })))));
    }
    get host() { return this; }
    static get watchers() { return {
        "open": ["handleOpenChange"]
    }; }
    static get style() { return alertCss; }
};

/*
The animations herein were forked from Animate.css (https://animate.style/) and are subject to the following license.

---

The MIT License (MIT)

Copyright (c) 2020 Daniel Eden

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const animatecss = {
    bounce: [
        {
            offset: 0,
            transform: 'translate(0)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.2,
            transform: 'translate(0)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.4,
            transform: 'translateY(-30px)',
            easing: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)'
        },
        {
            offset: 0.43,
            transform: 'translateY(-30px)',
            easing: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)'
        },
        {
            offset: 0.53,
            transform: 'translate(0)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.7,
            transform: 'translateY(-15px)',
            easing: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)'
        },
        {
            offset: 0.8,
            transform: 'translate(0)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.9,
            transform: 'translateY(-4px)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 1,
            transform: 'translate(0)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        }
    ],
    flash: [
        {
            offset: 0,
            opacity: 1
        },
        {
            offset: 0.25,
            opacity: 0
        },
        {
            offset: 0.5,
            opacity: 1
        },
        {
            offset: 0.75,
            opacity: 0
        },
        {
            offset: 1,
            opacity: 1
        }
    ],
    jello: [
        {
            offset: 0,
            transform: 'skewX(0deg) skewY(0deg)',
            transformOrigin: 'center'
        },
        {
            offset: 0.111,
            transform: 'skewX(0deg) skewY(0deg)',
            transformOrigin: 'center'
        },
        {
            offset: 0.222,
            transform: 'skewX(-12.5deg) skewY(-12.5deg)',
            transformOrigin: 'center'
        },
        {
            offset: 0.333,
            transform: 'skewX(6.25deg) skewY(6.25deg)',
            transformOrigin: 'center'
        },
        {
            offset: 0.444,
            transform: 'skewX(-3.125deg) skewY(-3.125deg)',
            transformOrigin: 'center'
        },
        {
            offset: 0.555,
            transform: 'skewX(1.5625deg) skewY(1.5625deg)',
            transformOrigin: 'center'
        },
        {
            offset: 0.666,
            transform: 'skewX(-0.78125deg) skewY(-0.78125deg)',
            transformOrigin: 'center'
        },
        {
            offset: 0.777,
            transform: 'skewX(0.390625deg) skewY(0.390625deg)',
            transformOrigin: 'center'
        },
        {
            offset: 0.888,
            transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)',
            transformOrigin: 'center'
        },
        {
            offset: 1,
            transform: 'skewX(0deg) skewY(0deg)',
            transformOrigin: 'center'
        }
    ],
    pulse: [
        {
            offset: 0,
            transform: 'scale(1)'
        },
        {
            offset: 0.5,
            transform: 'scale(1.05)'
        },
        {
            offset: 1,
            transform: 'scale(1)'
        }
    ],
    rotate: [
        {
            offset: 0,
            transform: 'rotate(0deg)'
        },
        {
            offset: 0.25,
            transform: 'rotate(90deg)'
        },
        {
            offset: 0.5,
            transform: 'rotate(180deg)'
        },
        {
            offset: 0.75,
            transform: 'rotate(270deg)'
        },
        {
            offset: 1,
            transform: 'rotate(360deg)'
        }
    ],
    shake: [
        {
            offset: 0,
            transform: 'translateX(0px)'
        },
        {
            offset: 0.1,
            transform: 'translateX(-10px)'
        },
        {
            offset: 0.2,
            transform: 'translateX(10px)'
        },
        {
            offset: 0.3,
            transform: 'translateX(-10px)'
        },
        {
            offset: 0.4,
            transform: 'translateX(10px)'
        },
        {
            offset: 0.5,
            transform: 'translateX(-10px)'
        },
        {
            offset: 0.6,
            transform: 'translateX(10px)'
        },
        {
            offset: 0.7,
            transform: 'translateX(-10px)'
        },
        {
            offset: 0.8,
            transform: 'translateX(10px)'
        },
        {
            offset: 0.9,
            transform: 'translateX(-10px)'
        },
        {
            offset: 1,
            transform: 'translateX(0px)'
        }
    ],
    swing: [
        {
            offset: 0,
            transform: 'rotate(0deg)',
            transformOrigin: 'top center'
        },
        {
            offset: 0.2,
            transform: 'rotate(15deg)',
            transformOrigin: 'top center'
        },
        {
            offset: 0.4,
            transform: 'rotate(-10deg)',
            transformOrigin: 'top center'
        },
        {
            offset: 0.6,
            transform: 'rotate(5deg)',
            transformOrigin: 'top center'
        },
        {
            offset: 0.8,
            transform: 'rotate(-5deg)',
            transformOrigin: 'top center'
        },
        {
            offset: 1,
            transform: 'rotate(0deg)',
            transformOrigin: 'top center'
        }
    ],
    'rubber-band': [
        {
            offset: 0,
            transform: 'scale(1, 1)'
        },
        {
            offset: 0.3,
            transform: 'scale(1.25, 0.75)'
        },
        {
            offset: 0.4,
            transform: 'scale(0.75, 1.25)'
        },
        {
            offset: 0.5,
            transform: 'scale(1.15, 0.85)'
        },
        {
            offset: 0.65,
            transform: 'scale(0.95, 1.05)'
        },
        {
            offset: 0.75,
            transform: 'scale(1.05, 0.95)'
        },
        {
            offset: 1,
            transform: 'scale(1, 1)'
        }
    ],
    tada: [
        {
            offset: 0,
            transform: 'scale(1) rotate(0deg)'
        },
        {
            offset: 0.1,
            transform: 'scale(0.9) rotate(-3deg)'
        },
        {
            offset: 0.2,
            transform: 'scale(0.9) rotate(-3deg)'
        },
        {
            offset: 0.3,
            transform: 'scale(1.1) rotate(-3deg)'
        },
        {
            offset: 0.4,
            transform: 'scale(1.1) rotate(3deg)'
        },
        {
            offset: 0.5,
            transform: 'scale(1.1) rotate(-3deg)'
        },
        {
            offset: 0.6,
            transform: 'scale(1.1) rotate(3deg)'
        },
        {
            offset: 0.7,
            transform: 'scale(1.1) rotate(-3deg)'
        },
        {
            offset: 0.8,
            transform: 'scale(1.1) rotate(3deg)'
        },
        {
            offset: 0.9,
            transform: 'scale(1.1) rotate(3deg)'
        },
        {
            offset: 1,
            transform: 'scale(1) rotate(0deg)'
        }
    ],
    wobble: [
        {
            offset: 0,
            transform: 'translate(0) rotate(0deg)'
        },
        {
            offset: 0.15,
            transform: 'translateX(-25%) rotate(-5deg)'
        },
        {
            offset: 0.3,
            transform: 'translateX(20%) rotate(3deg)'
        },
        {
            offset: 0.45,
            transform: 'translateX(-15%) rotate(-3deg)'
        },
        {
            offset: 0.6,
            transform: 'translateX(10%) rotate(2deg)'
        },
        {
            offset: 0.75,
            transform: 'translateX(-5%) rotate(-1deg)'
        },
        {
            offset: 1,
            transform: 'translate(0) rotate(0deg)'
        }
    ],
    'heart-beat': [
        {
            offset: 0,
            transform: 'scale(1)',
            easing: 'ease-in-out'
        },
        {
            offset: 0.14,
            transform: 'scale(1.3)',
            easing: 'ease-in-out'
        },
        {
            offset: 0.28,
            transform: 'scale(1)',
            easing: 'ease-in-out'
        },
        {
            offset: 0.42,
            transform: 'scale(1.3)',
            easing: 'ease-in-out'
        },
        {
            offset: 0.7,
            transform: 'scale(1)',
            easing: 'ease-in-out'
        },
        {
            offset: 1,
            transform: 'scale(1)',
            easing: 'ease-in-out'
        }
    ],
    'bounce-in': [
        {
            offset: 0,
            opacity: 0,
            transform: 'scale(0.3)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.2,
            opacity: 0,
            transform: 'scale(1.1)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.4,
            opacity: 0,
            transform: 'scale(0.9)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'scale(1.03)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.8,
            opacity: 1,
            transform: 'scale(0.97)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'scale(1)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        }
    ],
    'bounce-in-up': [
        {
            offset: 0,
            opacity: 0,
            transform: 'translateY(3000px)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'translateY(-20px)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.75,
            opacity: 1,
            transform: 'translateY(10px)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.9,
            opacity: 1,
            transform: 'translateY(-5px)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'translateY(0px)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        }
    ],
    'bounce-in-down': [
        {
            offset: 0,
            opacity: 0,
            transform: 'translateY(-3000px)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'translateY(25px)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.75,
            opacity: 1,
            transform: 'translateY(-10px)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 0.9,
            opacity: 1,
            transform: 'translateY(5px)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'translateY(0px)',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        }
    ],
    'bounce-in-right': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'translateX(600px)',
            easing: 'ease-in',
            opacity: 0
        },
        {
            offset: 0.38,
            fillMode: 'both',
            transform: 'translateX(0)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.55,
            fillMode: 'both',
            transform: 'translateX(68px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.72,
            fillMode: 'both',
            transform: 'translateX(0)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.81,
            fillMode: 'both',
            transform: 'translateX(32px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.9,
            fillMode: 'both',
            transform: 'translateX(0)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.95,
            fillMode: 'both',
            transform: 'translateX(8px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'translateX(0)',
            easing: 'ease-out',
            opacity: 1
        }
    ],
    'bounce-in-left': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'translateX(-600px)',
            easing: 'ease-in',
            opacity: 0
        },
        {
            offset: 0.38,
            fillMode: 'both',
            transform: 'translateX(0)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.55,
            fillMode: 'both',
            transform: 'translateX(-68px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.72,
            fillMode: 'both',
            transform: 'translateX(0)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.81,
            fillMode: 'both',
            transform: 'translateX(-28px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.9,
            fillMode: 'both',
            transform: 'translateX(0)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.95,
            fillMode: 'both',
            transform: 'translateX(-8px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'translateX(0)',
            easing: 'ease-out',
            opacity: 1
        }
    ],
    'bounce-out': [
        {
            offset: 0,
            opacity: 1,
            transform: 'scale(1)'
        },
        {
            offset: 0.2,
            opacity: 1,
            transform: 'scale(0.9)'
        },
        {
            offset: 0.5,
            opacity: 1,
            transform: 'scale(1.11)'
        },
        {
            offset: 0.55,
            opacity: 1,
            transform: 'scale(1.11)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'scale(1)'
        }
    ],
    'bounce-out-up': [
        {
            offset: 0,
            opacity: 1,
            transform: 'translateY(0px)'
        },
        {
            offset: 0.2,
            opacity: 1,
            transform: 'translateY(-10px)'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'translateY(20px)'
        },
        {
            offset: 0.45,
            opacity: 1,
            transform: 'translateY(20px)'
        },
        {
            offset: 0.55,
            opacity: 1,
            transform: 'translateY(20px)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translateY(-100vh)'
        }
    ],
    'bounce-out-down': [
        {
            offset: 0,
            opacity: 1,
            transform: 'translateY(0px)'
        },
        {
            offset: 0.2,
            opacity: 1,
            transform: 'translateY(10px)'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'translateY(-20px)'
        },
        {
            offset: 0.45,
            opacity: 1,
            transform: 'translateY(-20px)'
        },
        {
            offset: 0.55,
            opacity: 1,
            transform: 'translateY(-20px)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translateY(100vh)'
        }
    ],
    'bounce-out-right': [
        {
            offset: 0,
            opacity: 1,
            transform: 'translateX(0px)'
        },
        {
            offset: 0.2,
            opacity: 1,
            transform: 'translateX(10px)'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'translateX(-20px)'
        },
        {
            offset: 0.45,
            opacity: 1,
            transform: 'translateX(-20px)'
        },
        {
            offset: 0.55,
            opacity: 1,
            transform: 'translateX(-20px)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translateX(100vw)'
        }
    ],
    'bounce-out-left': [
        {
            offset: 0,
            opacity: 1,
            transform: 'translateX(0px)'
        },
        {
            offset: 0.2,
            opacity: 1,
            transform: 'translateX(-10px)'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'translateX(20px)'
        },
        {
            offset: 0.45,
            opacity: 1,
            transform: 'translateX(20px)'
        },
        {
            offset: 0.55,
            opacity: 1,
            transform: 'translateX(20px)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translateX(-100vw)'
        }
    ],
    'fade-in': [
        {
            offset: 0,
            opacity: 0
        },
        {
            offset: 1,
            opacity: 1
        }
    ],
    'fade-in-up': [
        {
            offset: 0,
            opacity: 0,
            transform: 'translateY(100%)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'translateY(0)'
        }
    ],
    'fade-in-up-big': [
        {
            offset: 0,
            opacity: 0,
            transform: 'translateY(100vh)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'translateY(0px)'
        }
    ],
    'fade-in-down': [
        {
            offset: 0,
            opacity: 0,
            transform: 'translateY(-100%)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'translateY(0)'
        }
    ],
    'fade-in-down-big': [
        {
            offset: 0,
            opacity: 0,
            transform: 'translateY(-100vh)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'translateY(0px)'
        }
    ],
    'fade-in-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateX(50px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateX(0)',
            opacity: 1
        }
    ],
    'fade-in-right-big': [
        {
            offset: 0,
            opacity: 0,
            transform: 'translateX(100vw)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'translateX(0px)'
        }
    ],
    'fade-in-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateX(-50px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateX(0)',
            opacity: 1
        }
    ],
    'fade-in-left-big': [
        {
            offset: 0,
            opacity: 0,
            transform: 'translateX(-100vw)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'translateX(0px)'
        }
    ],
    'fade-out': [
        {
            offset: 0,
            opacity: 1
        },
        {
            offset: 1,
            opacity: 0
        }
    ],
    'fade-out-up': [
        {
            offset: 0,
            opacity: 1,
            transform: 'translateY(0)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translateY(-100%)'
        }
    ],
    'fade-out-up-big': [
        {
            offset: 0,
            opacity: 1,
            transform: 'translateY(0px)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translateY(-100vh)'
        }
    ],
    'fade-out-down': [
        {
            offset: 0,
            opacity: 1,
            transform: 'translateY(0)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translateY(100%)'
        }
    ],
    'fade-out-down-big': [
        {
            offset: 0,
            opacity: 1,
            transform: 'translateY(0px)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translateY(100vh)'
        }
    ],
    'fade-out-right': [
        {
            offset: 0,
            opacity: 1,
            transform: 'translateX(0)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translateX(100%)'
        }
    ],
    'fade-out-right-big': [
        {
            offset: 0,
            opacity: 1,
            transform: 'translateX(0px)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translateX(100vw)'
        }
    ],
    'fade-out-left': [
        {
            offset: 0,
            opacity: 1,
            transform: 'translateX(0)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translateX(-100%)'
        }
    ],
    'fade-out-left-big': [
        {
            offset: 0,
            opacity: 1,
            transform: 'translateX(0px)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translateX(-100vw)'
        }
    ],
    flip: [
        {
            offset: 0,
            backfaceVisibility: 'visible',
            easing: 'ease-out',
            transform: 'perspective(400px) scale(1) translateZ(0) rotateY(-360deg)'
        },
        {
            offset: 0.4,
            backfaceVisibility: 'visible',
            easing: 'ease-out',
            transform: 'perspective(400px) scale(1) translateZ(150px) rotateY(-190deg)'
        },
        {
            offset: 0.5,
            backfaceVisibility: 'visible',
            easing: 'ease-in',
            transform: 'perspective(400px) scale(1) translateZ(150px) rotateY(-170deg)'
        },
        {
            offset: 0.8,
            backfaceVisibility: 'visible',
            easing: 'ease-in',
            transform: 'perspective(400px) scale(0.95) translateZ(0) rotateY(0deg)'
        },
        {
            offset: 1,
            backfaceVisibility: 'visible',
            easing: 'ease-in',
            transform: 'perspective(400px) scale(1) translateZ(0) rotateY(0deg)'
        }
    ],
    'flip-in-x': [
        {
            offset: 0,
            backfaceVisibility: 'visible',
            opacity: 0,
            easing: 'ease-in',
            transform: 'perspective(400px) rotateX(90deg)'
        },
        {
            offset: 0.4,
            backfaceVisibility: 'visible',
            opacity: 0.5,
            easing: 'ease-in',
            transform: 'perspective(400px) rotateX(-20deg)'
        },
        {
            offset: 0.6,
            backfaceVisibility: 'visible',
            opacity: 1,
            easing: 'ease-in',
            transform: 'perspective(400px) rotateX(10deg)'
        },
        {
            offset: 0.8,
            backfaceVisibility: 'visible',
            opacity: 1,
            easing: 'ease-in',
            transform: 'perspective(400px) rotateX(-5deg)'
        },
        {
            offset: 1,
            backfaceVisibility: 'visible',
            opacity: 1,
            easing: 'ease-in',
            transform: 'perspective(400px) rotateX(0deg)'
        }
    ],
    'flip-in-y': [
        {
            offset: 0,
            backfaceVisibility: 'visible',
            opacity: 0,
            easing: 'ease-in',
            transform: 'perspective(400px) rotateY(90deg)'
        },
        {
            offset: 0.4,
            backfaceVisibility: 'visible',
            opacity: 0.5,
            easing: 'ease-in',
            transform: 'perspective(400px) rotateY(-20deg)'
        },
        {
            offset: 0.6,
            backfaceVisibility: 'visible',
            opacity: 1,
            easing: 'ease-in',
            transform: 'perspective(400px) rotateY(10deg)'
        },
        {
            offset: 0.8,
            backfaceVisibility: 'visible',
            opacity: 1,
            easing: 'ease-in',
            transform: 'perspective(400px) rotateY(-5deg)'
        },
        {
            offset: 1,
            backfaceVisibility: 'visible',
            opacity: 1,
            easing: 'ease-in',
            transform: 'perspective(400px) rotateY(0deg)'
        }
    ],
    'flip-out-x': [
        {
            offset: 0,
            backfaceVisibility: 'visible',
            opacity: 1,
            transform: 'perspective(400px) rotateX(0deg)'
        },
        {
            offset: 0.3,
            backfaceVisibility: 'visible',
            opacity: 1,
            transform: 'perspective(400px) rotateX(-15deg)'
        },
        {
            offset: 1,
            backfaceVisibility: 'visible',
            opacity: 0,
            transform: 'perspective(400px) rotateX(90deg)'
        }
    ],
    'flip-out-y': [
        {
            offset: 0,
            backfaceVisibility: 'visible',
            opacity: 1,
            transform: 'perspective(400px) rotateY(0deg)'
        },
        {
            offset: 0.3,
            backfaceVisibility: 'visible',
            opacity: 1,
            transform: 'perspective(400px) rotateY(-15deg)'
        },
        {
            offset: 1,
            backfaceVisibility: 'visible',
            opacity: 0,
            transform: 'perspective(400px) rotateY(90deg)'
        }
    ],
    'light-speed-in': [
        {
            offset: 0,
            easing: 'ease-out',
            opacity: 0,
            transform: 'translateX(200px) skewX(-30deg)'
        },
        {
            offset: 0.6,
            easing: 'ease-out',
            opacity: 1,
            transform: 'translateX(0px) skewX(20deg)'
        },
        {
            offset: 0.8,
            easing: 'ease-out',
            opacity: 1,
            transform: 'translateX(0px) skewX(-5deg)'
        },
        {
            offset: 1,
            easing: 'ease-out',
            opacity: 1,
            transform: 'translateX(0px) skewX(0deg)'
        }
    ],
    'light-speed-out': [
        {
            offset: 0,
            easing: 'ease-in',
            opacity: 1,
            transform: 'translateX(0px) skewX(0deg)'
        },
        {
            offset: 1,
            easing: 'ease-in',
            opacity: 0,
            transform: 'translateX(200px) skewX(30deg)'
        }
    ],
    'rotate-in': [
        {
            offset: 0,
            opacity: 0,
            transform: 'rotateZ(180deg)',
            transformOrigin: 'center'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'rotateZ(0deg)',
            transformOrigin: 'center'
        }
    ],
    'rotate-in-clockwise': [
        {
            offset: 0,
            opacity: 0,
            transform: 'rotateZ(-180deg)',
            transformOrigin: 'center'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'rotateZ(0deg)',
            transformOrigin: 'center'
        }
    ],
    'rotate-in-down-left': [
        {
            offset: 0,
            opacity: 0,
            transform: 'rotateZ(-45deg)',
            transformOrigin: 'left bottom'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'rotateZ(0deg)',
            transformOrigin: 'left bottom'
        }
    ],
    'rotate-in-down-right': [
        {
            offset: 0,
            opacity: 0,
            transform: 'rotateZ(45deg)',
            transformOrigin: 'right bottom'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'rotateZ(0deg)',
            transformOrigin: 'right bottom'
        }
    ],
    'rotate-in-up-left': [
        {
            offset: 0,
            opacity: 0,
            transform: 'rotateZ(45deg)',
            transformOrigin: 'left bottom'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'rotateZ(0deg)',
            transformOrigin: 'left bottom'
        }
    ],
    'rotate-in-up-right': [
        {
            offset: 0,
            opacity: 0,
            transform: 'rotateZ(-45deg)',
            transformOrigin: 'right bottom'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'rotateZ(0deg)',
            transformOrigin: 'right bottom'
        }
    ],
    'rotate-out': [
        {
            offset: 0,
            opacity: 1,
            transform: 'rotateZ(0deg)',
            transformOrigin: 'center'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'rotateZ(180deg)',
            transformOrigin: 'center'
        }
    ],
    'rotate-out-clockwise': [
        {
            offset: 0,
            opacity: 1,
            transform: 'rotateZ(0deg)',
            transformOrigin: 'center'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'rotateZ(-180deg)',
            transformOrigin: 'center'
        }
    ],
    'rotate-out-down-left': [
        {
            offset: 0,
            opacity: 1,
            transform: 'rotateZ(0deg)',
            transformOrigin: 'left bottom'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'rotateZ(45deg)',
            transformOrigin: 'left bottom'
        }
    ],
    'rotate-out-down-right': [
        {
            offset: 0,
            opacity: 1,
            transform: 'rotateZ(0deg)',
            transformOrigin: 'right bottom'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'rotateZ(-45deg)',
            transformOrigin: 'right bottom'
        }
    ],
    'rotate-out-up-left': [
        {
            offset: 0,
            opacity: 1,
            transform: 'rotateZ(0deg)',
            transformOrigin: 'left bottom'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'rotateZ(-45deg)',
            transformOrigin: 'left bottom'
        }
    ],
    'rotate-out-up-right': [
        {
            offset: 0,
            opacity: 1,
            transform: 'rotateZ(0deg)',
            transformOrigin: 'right bottom'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'rotateZ(45deg)',
            transformOrigin: 'right bottom'
        }
    ],
    'slide-in-up': [
        {
            offset: 0,
            transform: 'translateY(100%)',
            visibility: 'hidden'
        },
        {
            offset: 1,
            transform: 'translateY(0)',
            visibility: 'visible'
        }
    ],
    'slide-in-down': [
        {
            offset: 0,
            transform: 'translateY(-100%)',
            visibility: 'hidden'
        },
        {
            offset: 1,
            transform: 'translateY(0)',
            visibility: 'visible'
        }
    ],
    'slide-in-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(-100vw)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(100vw)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0)',
            opacity: 1
        }
    ],
    'slide-out-up': [
        {
            offset: 0,
            transform: 'translateY(0)',
            visibility: 'visible'
        },
        {
            offset: 1,
            transform: 'translateY(-100%)',
            visibility: 'hidden'
        }
    ],
    'slide-out-down': [
        {
            offset: 0,
            transform: 'translateY(0)',
            visibility: 'visible'
        },
        {
            offset: 1,
            transform: 'translateY(100%)',
            visibility: 'hidden'
        }
    ],
    'slide-out-left': [
        {
            offset: 0,
            transform: 'translateX(0)',
            visibility: 'visible'
        },
        {
            offset: 1,
            transform: 'translateX(-100%)',
            visibility: 'hidden'
        }
    ],
    'slide-out-right': [
        {
            offset: 0,
            transform: 'translateX(0)',
            visibility: 'visible'
        },
        {
            offset: 1,
            transform: 'translateX(100%)',
            visibility: 'hidden'
        }
    ],
    'zoom-in': [
        {
            offset: 0,
            opacity: 0,
            transform: 'scale(1)'
        },
        {
            offset: 0.5,
            opacity: 0,
            transform: 'scale(0.3)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'scale(1)'
        }
    ],
    'zoom-in-up': [
        {
            offset: 0,
            opacity: 0,
            transform: 'scale(0.1) translateY(-100vh)',
            easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'scale(0.475) translateY(60px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'scale(1) translateY(0px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
        }
    ],
    'zoom-in-down': [
        {
            offset: 0,
            opacity: 0,
            transform: 'scale(0.1) translateY(100vh)',
            easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'scale(0.475) translateY(-60px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'scale(1) translateY(0px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
        }
    ],
    'zoom-in-left': [
        {
            offset: 0,
            opacity: 0,
            transform: 'scale(0.1) translateX(-100vw)',
            easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'scale(0.475) translateX(10px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'scale(1) translateX(0px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
        }
    ],
    'zoom-in-right': [
        {
            offset: 0,
            opacity: 0,
            transform: 'scale(0.1) translateX(100vw)',
            easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
        },
        {
            offset: 0.6,
            opacity: 1,
            transform: 'scale(0.475) translateX(-10px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'scale(1) translateX(0px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
        }
    ],
    'zoom-out': [
        {
            offset: 0,
            opacity: 1,
            transform: 'scale(1)'
        },
        {
            offset: 0.5,
            opacity: 0,
            transform: 'scale(0.3)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'scale(0)'
        }
    ],
    'zoom-out-up': [
        {
            offset: 0,
            opacity: 1,
            transform: 'scale(1) translateY(0px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
            transformOrigin: 'center'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'scale(0.475) translateY(60px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
            transformOrigin: 'center'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'scale(0.1) translateY(-100vh)',
            easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
            transformOrigin: 'center bottom'
        }
    ],
    'zoom-out-down': [
        {
            offset: 0,
            opacity: 1,
            transform: 'scale(1) translateY(0px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
            transformOrigin: 'center'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'scale(0.475) translateY(-60px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
            transformOrigin: 'center'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'scale(0.1) translateY(100vh)',
            easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
            transformOrigin: 'center bottom'
        }
    ],
    'zoom-out-left': [
        {
            offset: 0,
            opacity: 1,
            transform: 'scale(1) translateX(0px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'scale(0.475) translateX(10px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'scale(0.1) translateX(-100vw)',
            easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
        }
    ],
    'zoom-out-right': [
        {
            offset: 0,
            opacity: 1,
            transform: 'scale(1) translateX(0px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
        },
        {
            offset: 0.4,
            opacity: 1,
            transform: 'scale(0.475) translateX(-10px)',
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'scale(0.1) translateX(100vw)',
            easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
        }
    ],
    hinge: [
        {
            offset: 0,
            transform: 'rotate(0)',
            opacity: 1,
            transformOrigin: 'top left',
            easing: 'ease-in-out'
        },
        {
            offset: 0.2,
            transform: 'rotateZ(80deg)',
            opacity: 1,
            transformOrigin: 'top left',
            easing: 'ease-in-out'
        },
        {
            offset: 0.4,
            transform: 'rotateZ(60deg)',
            opacity: 1,
            transformOrigin: 'top left',
            easing: 'ease-in-out'
        },
        {
            offset: 0.6,
            transform: 'rotateZ(80deg)',
            opacity: 1,
            transformOrigin: 'top left',
            easing: 'ease-in-out'
        },
        {
            offset: 0.8,
            transform: 'rotateZ(60deg)',
            opacity: 1,
            transformOrigin: 'top left',
            easing: 'ease-in-out'
        },
        {
            offset: 1,
            opacity: 0,
            transformOrigin: 'top left',
            easing: 'ease-in-out',
            transform: 'translateY(700px)'
        }
    ],
    'jack-in-the-box': [
        {
            offset: 0,
            opacity: 0,
            transform: 'scale(0.1) rotate(30deg)',
            transformOrigin: 'center bottom'
        },
        {
            offset: 0.5,
            opacity: 0.3,
            transform: 'rotate(-10deg)',
            transformOrigin: '50% 50% 0'
        },
        {
            offset: 0.7,
            opacity: 0.6,
            transform: 'rotate(3deg)',
            transformOrigin: '50% 50% 0'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'scale(1)',
            transformOrigin: '50% 50% 0'
        }
    ],
    'roll-in': [
        {
            offset: 0,
            opacity: 0,
            transform: 'translateX(-100%) rotateZ(-120deg)'
        },
        {
            offset: 1,
            opacity: 1,
            transform: 'translateX(0%)'
        }
    ],
    'roll-out': [
        {
            offset: 0,
            opacity: 1,
            transform: 'translateX(0%)'
        },
        {
            offset: 1,
            opacity: 0,
            transform: 'translateX(100%) rotateZ(120deg)'
        }
    ]
};

/*
The animations herein were forked from Animista (https://animista.net/) and are subject to the following license.

---

FreeBSD License

COPYRIGHT 2017 ANA TRAVAS

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
const animista = {
    'scale-up-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'scale(0.5)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'scale(1)'
        }
    ],
    'scale-up-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '50% 0%',
            transform: 'scale(0.5)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '50% 0%',
            transform: 'scale(1)'
        }
    ],
    'scale-up-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'scale(0.5)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'scale(1)'
        }
    ],
    'scale-up-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '100% 50%',
            transform: 'scale(0.5)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '100% 50%',
            transform: 'scale(1)'
        }
    ],
    'scale-up-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'scale(0.5)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'scale(1)'
        }
    ],
    'scale-up-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '50% 100%',
            transform: 'scale(0.5)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '50% 100%',
            transform: 'scale(1)'
        }
    ],
    'scale-up-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'scale(0.5)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'scale(1)'
        }
    ],
    'scale-up-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '0% 50%',
            transform: 'scale(0.5)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '0% 50%',
            transform: 'scale(1)'
        }
    ],
    'scale-up-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'scale(0.5)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'scale(1)'
        }
    ],
    'scale-up-hor-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'scaleX(0.4)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'scaleX(1)'
        }
    ],
    'scale-up-hor-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'scaleX(0.4)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'scaleX(1)'
        }
    ],
    'scale-up-hor-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'scaleX(0.4)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'scaleX(1)'
        }
    ],
    'scale-up-ver-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'scaleY(0.4)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'scaleY(1)'
        }
    ],
    'scale-up-ver-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'scaleY(0.4)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'scaleY(1)'
        }
    ],
    'scale-up-ver-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'scaleY(0.4)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'scaleY(1)'
        }
    ],
    'scale-down-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'scale(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'scale(0.5)'
        }
    ],
    'scale-down-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '50% 0%',
            transform: 'scale(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '50% 0%',
            transform: 'scale(0.5)'
        }
    ],
    'scale-down-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'scale(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'scale(0.5)'
        }
    ],
    'scale-down-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 50%',
            transform: 'scale(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 50%',
            transform: 'scale(0.5)'
        }
    ],
    'scale-down-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'scale(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'scale(0.5)'
        }
    ],
    'scale-down-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '50% 100%',
            transform: 'scale(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '50% 100%',
            transform: 'scale(0.5)'
        }
    ],
    'scale-down-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'scale(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'scale(0.5)'
        }
    ],
    'scale-down-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 50%',
            transform: 'scale(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 50%',
            transform: 'scale(0.5)'
        }
    ],
    'scale-down-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'scale(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'scale(0.5)'
        }
    ],
    'scale-down-hor-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'scaleX(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'scaleX(0.3)'
        }
    ],
    'scale-down-hor-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'scaleX(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'scaleX(0.3)'
        }
    ],
    'scale-down-hor-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'scaleX(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'scaleX(0.3)'
        }
    ],
    'scale-down-ver-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'scaleY(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'scaleY(0.3)'
        }
    ],
    'scale-down-ver-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'scaleY(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'scaleY(0.3)'
        }
    ],
    'scale-down-ver-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'scaleY(1)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'scaleY(0.3)'
        }
    ],
    'rotate-center': [
        {
            offset: 0,
            easing: 'ease-in-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'ease-in-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(360deg)'
        }
    ],
    'rotate-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'top',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'top',
            transform: 'rotate(360deg)'
        }
    ],
    'rotate-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'top right',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'top right',
            transform: 'rotate(360deg)'
        }
    ],
    'rotate-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'right',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'right',
            transform: 'rotate(360deg)'
        }
    ],
    'rotate-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'bottom right',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'bottom right',
            transform: 'rotate(360deg)'
        }
    ],
    'rotate-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'bottom',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'bottom',
            transform: 'rotate(360deg)'
        }
    ],
    'rotate-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'bottom left',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'bottom left',
            transform: 'rotate(360deg)'
        }
    ],
    'rotate-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'left',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'left',
            transform: 'rotate(360deg)'
        }
    ],
    'rotate-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'top left',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'top left',
            transform: 'rotate(360deg)'
        }
    ],
    'rotate-hor-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateX(-360deg)'
        }
    ],
    'rotate-hor-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
            fillMode: 'both',
            transformOrigin: 'top',
            transform: 'rotateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
            fillMode: 'both',
            transformOrigin: 'top',
            transform: 'rotateX(-360deg)'
        }
    ],
    'rotate-hor-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
            fillMode: 'both',
            transformOrigin: 'bottom',
            transform: 'rotateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
            fillMode: 'both',
            transformOrigin: 'bottom',
            transform: 'rotateX(360deg)'
        }
    ],
    'rotate-vert-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateY(360deg)'
        }
    ],
    'rotate-vert-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
            fillMode: 'both',
            transformOrigin: 'left',
            transform: 'rotateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
            fillMode: 'both',
            transformOrigin: 'left',
            transform: 'rotateY(360deg)'
        }
    ],
    'rotate-vert-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
            fillMode: 'both',
            transformOrigin: 'right',
            transform: 'rotateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
            fillMode: 'both',
            transformOrigin: 'right',
            transform: 'rotateY(-360deg)'
        }
    ],
    'rotate-diagonal-1': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(1, 1, 0, -180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(1, 1, 0, -360deg)'
        }
    ],
    'rotate-diagonal-2': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(-1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(-1, 1, 0, 180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(-1, 1, 0, 360deg)'
        }
    ],
    'rotate-diagonal-tr': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'rotate3d(1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'rotate3d(1, 1, 0, -180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'rotate3d(1, 1, 0, -360deg)'
        }
    ],
    'rotate-diagonal-br': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate3d(-1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate3d(-1, 1, 0, -180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate3d(-1, 1, 0, -360deg)'
        }
    ],
    'rotate-diagonal-bl': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'rotate3d(1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'rotate3d(1, 1, 0, 180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'rotate3d(1, 1, 0, 360deg)'
        }
    ],
    'rotate-diagonal-tl': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'rotate3d(-1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'rotate3d(-1, 1, 0, 180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'rotate3d(-1, 1, 0, 360deg)'
        }
    ],
    'rotate-scale-up': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateZ(0)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(2) rotateZ(180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateZ(360deg)'
        }
    ],
    'rotate-scale-down': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateZ(0)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(0.5) rotateZ(180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateZ(360deg)'
        }
    ],
    'rotate-scale-up-hor': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateX(0)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(2) rotateX(-180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateX(-360deg)'
        }
    ],
    'rotate-scale-down-hor': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateX(0)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(0.5) rotateX(-180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateX(-360deg)'
        }
    ],
    'rotate-scale-up-ver': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateY(0)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(2) rotateY(180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateY(360deg)'
        }
    ],
    'rotate-scale-down-ver': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateY(0)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(0.5) rotateY(180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateY(360deg)'
        }
    ],
    'rotate-scale-up-diag-1': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(2) rotate3d(1, 1, 0, -180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(1, 1, 0, -360deg)'
        }
    ],
    'rotate-scale-down-diag-1': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(0.5) rotate3d(1, 1, 0, -180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(1, 1, 0, -360deg)'
        }
    ],
    'rotate-scale-up-diag-2': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(-1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(2) rotate3d(-1, 1, 0, 180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(-1, 1, 0, 360deg)'
        }
    ],
    'rotate-scale-down-diag-2': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(-1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(0.5) rotate3d(-1, 1, 0, 180deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(-1, 1, 0, 360deg)'
        }
    ],
    'rotate-90-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(90deg)'
        }
    ],
    'rotate-90-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(-90deg)'
        }
    ],
    'rotate-90-top-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top',
            transform: 'rotate(90deg)'
        }
    ],
    'rotate-90-top-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top',
            transform: 'rotate(-90deg)'
        }
    ],
    'rotate-90-tr-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top right',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top right',
            transform: 'rotate(90deg)'
        }
    ],
    'rotate-90-tr-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top right',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top right',
            transform: 'rotate(-90deg)'
        }
    ],
    'rotate-90-right-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'right',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'right',
            transform: 'rotate(90deg)'
        }
    ],
    'rotate-90-right-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'right',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'right',
            transform: 'rotate(-90deg)'
        }
    ],
    'rotate-90-br-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate(90deg)'
        }
    ],
    'rotate-90-br-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate(-90deg)'
        }
    ],
    'rotate-90-bottom-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'bottom',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'bottom',
            transform: 'rotate(90deg)'
        }
    ],
    'rotate-90-bottom-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'bottom',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'bottom',
            transform: 'rotate(-90deg)'
        }
    ],
    'rotate-90-bl-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'rotate(90deg)'
        }
    ],
    'rotate-90-bl-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'rotate(-90deg)'
        }
    ],
    'rotate-90-left-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'left',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'left',
            transform: 'rotate(90deg)'
        }
    ],
    'rotate-90-left-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'left',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'left',
            transform: 'rotate(-90deg)'
        }
    ],
    'rotate-90-tl-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'rotate(90deg)'
        }
    ],
    'rotate-90-tl-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'rotate(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0% 0%',
            transform: 'rotate(-90deg)'
        }
    ],
    'rotate-90-horizontal-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateX(90deg)'
        }
    ],
    'rotate-90-horizontal-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateX(-90deg)'
        }
    ],
    'rotate-90-vertical-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateY(90deg)'
        }
    ],
    'rotate-90-vertical-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateY(-90deg)'
        }
    ],
    'flip-horizontal-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotateX(-180deg)'
        }
    ],
    'flip-horizontal-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotateX(180deg)'
        }
    ],
    'flip-horizontal-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(0) rotateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(-260px) rotateX(180deg)'
        }
    ],
    'flip-horizontal-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(0) rotateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(160px) rotateX(-180deg)'
        }
    ],
    'flip-vertical-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotateY(180deg)'
        }
    ],
    'flip-vertical-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotateY(-180deg)'
        }
    ],
    'flip-vertical-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(0) rotateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(-260px) rotateY(-180deg)'
        }
    ],
    'flip-vertical-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(0) rotateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(160px) rotateY(180deg)'
        }
    ],
    'flip-diagonal-1-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate3d(1, 1, 0, 0deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate3d(1, 1, 0, 180deg)'
        }
    ],
    'flip-diagonal-1-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate3d(1, 1, 0, 0deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate3d(1, 1, 0, -180deg)'
        }
    ],
    'flip-diagonal-1-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(0) rotate3d(1, 1, 0, 0deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(-260px) rotate3d(1, 1, 0, -180deg)'
        }
    ],
    'flip-diagonal-1-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(0) rotate3d(1, 1, 0, 0deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(160px) rotate3d(1, 1, 0, 180deg)'
        }
    ],
    'flip-diagonal-2-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate3d(-1, 1, 0, 0deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate3d(-1, 1, 0, 180deg)'
        }
    ],
    'flip-diagonal-2-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate3d(-1, 1, 0, 0deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate3d(-1, 1, 0, -180deg)'
        }
    ],
    'flip-diagonal-2-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(0) rotate3d(-1, 1, 0, 0deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(-260px) rotate3d(-1, 1, 0, -180deg)'
        }
    ],
    'flip-diagonal-2-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(0) rotate3d(-1, 1, 0, 0deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateZ(160px) rotate3d(-1, 1, 0, 180deg)'
        }
    ],
    'flip-2-hor-top-1': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(0) rotateX(0)',
            transformOrigin: '50% 0%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(-100%) rotateX(-180deg)',
            transformOrigin: '50% 100%'
        }
    ],
    'flip-2-hor-top-2': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(0) rotateX(0)',
            transformOrigin: '50% 0%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(-100%) rotateX(180deg)',
            transformOrigin: '50% 100%'
        }
    ],
    'flip-2-hor-top-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(0) translateZ(0) rotateX(0)',
            transformOrigin: '50% 0%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(-100%) translateZ(-260px) rotateX(180deg)',
            transformOrigin: '50% 100%'
        }
    ],
    'flip-2-hor-top-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(0) translateZ(0) rotateX(0)',
            transformOrigin: '50% 0%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(-100%) translateZ(160px) rotateX(-180deg)',
            transformOrigin: '50% 100%'
        }
    ],
    'flip-2-ver-right-1': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(0) rotateY(0)',
            transformOrigin: '100% 50%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(100%) rotateY(-180deg)',
            transformOrigin: '0% 50%'
        }
    ],
    'flip-2-ver-right-2': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(0) rotateY(0)',
            transformOrigin: '100% 50%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(100%) rotateY(180deg)',
            transformOrigin: '0% 50%'
        }
    ],
    'flip-2-ver-right-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(0) translateZ(0) rotateY(0)',
            transformOrigin: '100% 50%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(100%) translateZ(-260px) rotateY(180deg)',
            transformOrigin: '0% 50%'
        }
    ],
    'flip-2-ver-right-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(0) translateZ(0) rotateY(0)',
            transformOrigin: '100% 50%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(100%) translateZ(160px) rotateY(-180deg)',
            transformOrigin: '0% 50%'
        }
    ],
    'flip-2-hor-bottom-1': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(0) rotateX(0)',
            transformOrigin: '50% 100%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(100%) rotateX(180deg)',
            transformOrigin: '50% 0%'
        }
    ],
    'flip-2-hor-bottom-2': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(0) rotateX(0)',
            transformOrigin: '50% 100%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(100%) rotateX(-180deg)',
            transformOrigin: '50% 0%'
        }
    ],
    'flip-2-hor-bottom-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(0) translateZ(0) rotateX(0)',
            transformOrigin: '50% 100%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(100%) translateZ(-260px) rotateX(-180deg)',
            transformOrigin: '50% 0%'
        }
    ],
    'flip-2-hor-bottom-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(0) translateZ(0) rotateX(0)',
            transformOrigin: '50% 100%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(100%) translateZ(160px) rotateX(180deg)',
            transformOrigin: '50% 0%'
        }
    ],
    'flip-2-ver-left-1': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(0) rotateY(0)',
            transformOrigin: '0% 50%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(-100%) rotateY(180deg)',
            transformOrigin: '100% 0%'
        }
    ],
    'flip-2-ver-left-2': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(0) rotateY(0)',
            transformOrigin: '0% 50%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(-100%) rotateY(-180deg)',
            transformOrigin: '100% 0%'
        }
    ],
    'flip-2-ver-left-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(0) translateZ(0) rotateY(0)',
            transformOrigin: '0% 50%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(-100%) translateZ(-260px) rotateY(-180deg)',
            transformOrigin: '100% 0%'
        }
    ],
    'flip-2-ver-left-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(0) translateZ(0) rotateY(0)',
            transformOrigin: '0% 50%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(-100%) translateZ(160px) rotateY(180deg)',
            transformOrigin: '100% 0%'
        }
    ],
    'flip-scale-up-hor': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateX(0)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(2.5) rotateX(-90deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateX(-180deg)'
        }
    ],
    'flip-scale-down-hor': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateX(0)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(0.4) rotateX(90deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateX(180deg)'
        }
    ],
    'flip-scale-up-ver': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateY(0)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(2.5) rotateY(90deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateY(180deg)'
        }
    ],
    'flip-scale-down-ver': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateY(0)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(0.4) rotateY(-90deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotateY(-180deg)'
        }
    ],
    'flip-scale-up-diag-1': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(2.5) rotate3d(1, 1, 0, 90deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(1, 1, 0, 180deg)'
        }
    ],
    'flip-scale-down-diag-1': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(0.4) rotate3d(1, 1, 0, -90deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(1, 1, 0, -180deg)'
        }
    ],
    'flip-scale-up-diag-2': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(-1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(2.5) rotate3d(-1, 1, 0, 90deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(-1, 1, 0, 180deg)'
        }
    ],
    'flip-scale-down-diag-2': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(-1, 1, 0, 0deg)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(0.4) rotate3d(-1, 1, 0, -90deg)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'scale(1) rotate3d(-1, 1, 0, -180deg)'
        }
    ],
    'flip-scale-2-hor-top': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translateY(0) rotateX(0) scale(1)',
            transformOrigin: '50% 0%'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translateY(-50%) rotateX(-90deg) scale(2)',
            transformOrigin: '50% 50%'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translateY(-100%) rotateX(-180deg) scale(1)',
            transformOrigin: '50% 100%'
        }
    ],
    'flip-scale-2-ver-right': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translateX(0) rotateY(0) scale(1)',
            transformOrigin: '100% 50%'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translateX(50%) rotateY(-90deg) scale(2)',
            transformOrigin: '50% 50%'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translateX(100%) rotateY(-180deg) scale(1)',
            transformOrigin: '0% 50%'
        }
    ],
    'flip-scale-2-hor-bottom': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translateY(0) rotateX(0) scale(1)',
            transformOrigin: '50% 100%'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translateY(50%) rotateX(90deg) scale(2)',
            transformOrigin: '50% 50%'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translateY(100%) rotateX(180deg) scale(1)',
            transformOrigin: '50% 0%'
        }
    ],
    'flip-scale-2-ver-left': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translateX(0) rotateY(0) scale(1)',
            transformOrigin: '0% 50%'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translateX(-50%) rotateY(90deg) scale(2)',
            transformOrigin: '50% 50%'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translateX(-100%) rotateY(180deg) scale(1)',
            transformOrigin: '100% 50%'
        }
    ],
    'swing-top-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(0)',
            transformOrigin: 'top'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(180deg)',
            transformOrigin: 'top'
        }
    ],
    'swing-top-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(0)',
            transformOrigin: 'top'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(-180deg)',
            transformOrigin: 'top'
        }
    ],
    'swing-top-right-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(1, 1, 0, 0deg)',
            transformOrigin: '100% 0%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(1, 1, 0, 180deg)',
            transformOrigin: '100% 0%'
        }
    ],
    'swing-top-right-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(1, 1, 0, 0deg)',
            transformOrigin: '100% 0%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(1, 1, 0, -180deg)',
            transformOrigin: '100% 0%'
        }
    ],
    'swing-right-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0)',
            transformOrigin: 'right'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(180deg)',
            transformOrigin: 'right'
        }
    ],
    'swing-right-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0)',
            transformOrigin: 'right'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(-180deg)',
            transformOrigin: 'right'
        }
    ],
    'swing-bottom-right-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(-1, 1, 0, 0deg)',
            transformOrigin: '100% 100%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(-1, 1, 0, 180deg)',
            transformOrigin: '100% 100%'
        }
    ],
    'swing-bottom-right-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(-1, 1, 0, 0deg)',
            transformOrigin: '100% 100%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(-1, 1, 0, -180deg)',
            transformOrigin: '100% 100%'
        }
    ],
    'swing-bottom-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(0)',
            transformOrigin: 'bottom'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(-180deg)',
            transformOrigin: 'bottom'
        }
    ],
    'swing-bottom-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(0)',
            transformOrigin: 'bottom'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(180deg)',
            transformOrigin: 'bottom'
        }
    ],
    'swing-bottom-left-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(1, 1, 0, 0deg)',
            transformOrigin: '0% 100%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(1, 1, 0, -180deg)',
            transformOrigin: '0% 100%'
        }
    ],
    'swing-bottom-left-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(1, 1, 0, 0deg)',
            transformOrigin: '0% 100%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(1, 1, 0, 180deg)',
            transformOrigin: '0% 100%'
        }
    ],
    'swing-left-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0)',
            transformOrigin: 'left bottom'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(-180deg)',
            transformOrigin: 'left bottom'
        }
    ],
    'swing-left-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0)',
            transformOrigin: 'left bottom'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(180deg)',
            transformOrigin: 'left bottom'
        }
    ],
    'swing-top-left-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(-1, 1, 0, 0deg)',
            transformOrigin: '0% 0%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(-1, 1, 0, -180deg)',
            transformOrigin: '0% 0%'
        }
    ],
    'swing-top-left-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(-1, 1, 0, 0deg)',
            transformOrigin: '0% 0%'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotate3d(-1, 1, 0, 180deg)',
            transformOrigin: '0% 0%'
        }
    ],
    'slide-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(-100px)'
        }
    ],
    'slide-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(-100px) translateX(100px)'
        }
    ],
    'slide-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(100px)'
        }
    ],
    'slide-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(100px) translateX(100px)'
        }
    ],
    'slide-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(100px)'
        }
    ],
    'slide-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(100px) translateX(-100px)'
        }
    ],
    'slide-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(-100px)'
        }
    ],
    'slide-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(-100px) translateX(-100px)'
        }
    ],
    'slide-bck-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(-400px)'
        }
    ],
    'slide-bck-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(-400px) translateY(-200px)'
        }
    ],
    'slide-bck-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(-400px) translateY(-200px) translateX(200px)'
        }
    ],
    'slide-bck-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(-400px) translateX(200px)'
        }
    ],
    'slide-bck-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(-400px) translateY(200px) translateX(200px)'
        }
    ],
    'slide-bck-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(-400px) translateY(200px)'
        }
    ],
    'slide-bck-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(-400px) translateY(200px) translateX(-200px)'
        }
    ],
    'slide-bck-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(-400px) translateX(-200px)'
        }
    ],
    'slide-bck-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'translateZ(-400px) translateY(-200px) translateX(-200px)'
        }
    ],
    'slide-fwd-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(160px)'
        }
    ],
    'slide-fwd-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(160px) translateY(-100px)'
        }
    ],
    'slide-fwd-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(160px) translateY(-100px) translateX(100px)'
        }
    ],
    'slide-fwd-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(160px) translateX(100px)'
        }
    ],
    'slide-fwd-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(160px) translateY(100px) translateX(100px)'
        }
    ],
    'slide-fwd-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(160px) translateY(100px)'
        }
    ],
    'slide-fwd-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(160px) translateY(100px) translateX(-100px)'
        }
    ],
    'slide-fwd-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(160px) translateX(-100px)'
        }
    ],
    'slide-fwd-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(160px) translateY(-100px) translateX(-100px)'
        }
    ],
    'slide-rotate-hor-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) rotateX(0deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(-150px) rotateX(-90deg)'
        }
    ],
    'slide-rotate-hor-t-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) translateZ(0) rotateX(0deg)',
            transformOrigin: 'top center'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(-150px) translateZ(-230px) rotateX(-90deg)',
            transformOrigin: 'top center'
        }
    ],
    'slide-rotate-hor-t-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) translateZ(0) rotateX(0deg)',
            transformOrigin: 'bottom center'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(-150px) translateZ(130px) rotateX(-90deg)',
            transformOrigin: 'bottom center'
        }
    ],
    'slide-rotate-ver-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0) rotateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(150px) rotateY(-90deg)'
        }
    ],
    'slide-rotate-ver-r-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0) translateZ(0) rotateY(0)',
            transformOrigin: 'center right'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(150px) translateZ(-230px) rotateY(-90deg)',
            transformOrigin: 'center right'
        }
    ],
    'slide-rotate-ver-r-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0) translateZ(0) rotateY(0)',
            transformOrigin: 'center left'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(150px) translateZ(130px) rotateY(-90deg)',
            transformOrigin: 'center left'
        }
    ],
    'slide-rotate-hor-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) rotateX(0deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(150px) rotateX(90deg)'
        }
    ],
    'slide-rotate-hor-b-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) translateZ(0) rotateX(0deg)',
            transformOrigin: 'bottom center'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(150px) translateZ(-230px) rotateX(90deg)',
            transformOrigin: 'bottom center'
        }
    ],
    'slide-rotate-hor-b-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) translateZ(0) rotateX(0deg)',
            transformOrigin: 'top center'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(150px) translateZ(130px) rotateX(90deg)',
            transformOrigin: 'top center'
        }
    ],
    'slide-rotate-ver-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0) rotateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(-150px) rotateY(90deg)'
        }
    ],
    'slide-rotate-ver-l-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0) translateZ(0) rotateY(0)',
            transformOrigin: 'center left'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(-150px) translateZ(-230px) rotateY(90deg)',
            transformOrigin: 'center left'
        }
    ],
    'slide-rotate-ver-l-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0) translateZ(0) rotateY(0)',
            transformOrigin: 'center right'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(-150px) translateZ(130px) rotateY(90deg)',
            transformOrigin: 'center right'
        }
    ],
    'shadow-drop-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 20px 0px rgba(0, 0, 0, 0.35)'
        }
    ],
    'shadow-drop-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 -12px 20px -12px rgba(0, 0, 0, 0.35)'
        }
    ],
    'shadow-drop-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '12px 0 20px -12px rgba(0, 0, 0, 0.35)'
        }
    ],
    'shadow-drop-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 12px 20px -12px rgba(0, 0, 0, 0.35)'
        }
    ],
    'shadow-drop-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '-12px 0 20px -12px rgba(0, 0, 0, 0.35)'
        }
    ],
    'shadow-drop-lr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '-12px 0 20px -12px rgba(0, 0, 0, 0.35), 12px 0 20px -12px rgba(0, 0, 0, 0.35)'
        }
    ],
    'shadow-drop-tb': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 -12px 20px -12px rgba(0, 0, 0, 0.35), 0 12px 20px -12px rgba(0, 0, 0, 0.35)'
        }
    ],
    'shadow-drop-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '12px -12px 20px -12px rgba(0, 0, 0, 0.35)'
        }
    ],
    'shadow-drop-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '12px 12px 20px -12px rgba(0, 0, 0, 0.35)'
        }
    ],
    'shadow-drop-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '-12px 12px 20px -12px rgba(0, 0, 0, 0.35)'
        }
    ],
    'shadow-drop-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '-12px -12px 20px -12px rgba(0, 0, 0, 0.35)'
        }
    ],
    'shadow-drop-2-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            transform: 'translateZ(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 20px 0px rgba(0, 0, 0, 0.35)',
            transform: 'translateZ(50px)'
        }
    ],
    'shadow-drop-2-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            transform: 'translateZ(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 -12px 20px -12px rgba(0, 0, 0, 0.35)',
            transform: 'translateZ(50px) translateY(12px)'
        }
    ],
    'shadow-drop-2-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            transform: 'translateZ(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '12px 0 20px -12px rgba(0, 0, 0, 0.35)',
            transform: 'translateZ(50px) translateX(-12px)'
        }
    ],
    'shadow-drop-2-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            transform: 'translateZ(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 12px 20px -12px rgba(0, 0, 0, 0.35)',
            transform: 'translateZ(50px) translateY(-12px)'
        }
    ],
    'shadow-drop-2-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            transform: 'translateZ(0) translateX(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '-12px 0 20px -12px rgba(0, 0, 0, 0.35)',
            transform: 'translateZ(50px) translateX(12px)'
        }
    ],
    'shadow-drop-2-lr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0)',
            transform: 'translateZ(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '-12px 0 20px -12px rgba(0, 0, 0, 0.35), 12px 0 20px -12px rgba(0, 0, 0, 0.35)',
            transform: 'translateZ(50px)'
        }
    ],
    'shadow-drop-2-tb': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0)',
            transform: 'translateZ(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 -12px 20px -12px rgba(0, 0, 0, 0.35), 0 12px 20px -12px rgba(0, 0, 0, 0.35)',
            transform: 'translateZ(50px)'
        }
    ],
    'shadow-drop-2-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            transform: 'translateZ(0) translateX(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '12px -12px 20px -12px rgba(0, 0, 0, 0.35)',
            transform: 'translateZ(50px) translateX(-12px) translateY(12px)'
        }
    ],
    'shadow-drop-2-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            transform: 'translateZ(0) translateX(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '12px 12px 20px -12px rgba(0, 0, 0, 0.35)',
            transform: 'translateZ(50px) translateX(-12px) translateY(-12px)'
        }
    ],
    'shadow-drop-2-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            transform: 'translateZ(0) translateX(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '-12px 12px 20px -12px rgba(0, 0, 0, 0.35)',
            transform: 'translateZ(50px) translateX(12px) translateY(-12px)'
        }
    ],
    'shadow-drop-2-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            transform: 'translateZ(0) translateX(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: '-12px -12px 20px -12px rgba(0, 0, 0, 0.35)',
            transform: 'translateZ(50px) translateX(12px) translateY(12px)'
        }
    ],
    'shadow-pop-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            boxShadow: '0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e',
            transform: 'translateX(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            boxShadow: '1px -1px #3e3e3e, 2px -2px #3e3e3e, 3px -3px #3e3e3e, 4px -4px #3e3e3e, 5px -5px #3e3e3e, 6px -6px #3e3e3e, 7px -7px #3e3e3e, 8px -8px #3e3e3e',
            transform: 'translateX(-8px) translateY(8px)'
        }
    ],
    'shadow-pop-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            boxShadow: '0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e',
            transform: 'translateX(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            boxShadow: '1px 1px #3e3e3e, 2px 2px #3e3e3e, 3px 3px #3e3e3e, 4px 4px #3e3e3e, 5px 5px #3e3e3e, 6px 6px #3e3e3e, 7px 7px #3e3e3e, 8px 8px #3e3e3e',
            transform: 'translateX(-8px) translateY(-8px)'
        }
    ],
    'shadow-pop-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            boxShadow: '0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e',
            transform: 'translateX(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            boxShadow: '-1px 1px #3e3e3e, -2px 2px #3e3e3e, -3px 3px #3e3e3e, -4px 4px #3e3e3e, -5px 5px #3e3e3e, -6px 6px #3e3e3e, -7px 7px #3e3e3e, -8px 8px #3e3e3e',
            transform: 'translateX(8px) translateY(-8px)'
        }
    ],
    'shadow-pop-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            boxShadow: '0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e',
            transform: 'translateX(0) translateY(0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            boxShadow: '-1px -1px #3e3e3e, -2px -2px #3e3e3e, -3px -3px #3e3e3e, -4px -4px #3e3e3e, -5px -5px #3e3e3e, -6px -6px #3e3e3e, -7px -7px #3e3e3e, -8px -8px #3e3e3e',
            transform: 'translateX(8px) translateY(8px)'
        }
    ],
    'shadow-inset-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 0 14px 0px rgba(0, 0, 0, 0.5)'
        }
    ],
    'shadow-inset-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 6px 14px -6px rgba(0, 0, 0, 0.5)'
        }
    ],
    'shadow-inset-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset -6px 0 14px -6px rgba(0, 0, 0, 0.5)'
        }
    ],
    'shadow-inset-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 -6px 14px -6px rgba(0, 0, 0, 0.5)'
        }
    ],
    'shadow-inset-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 6px 0 14px -6px rgba(0, 0, 0, 0.5)'
        }
    ],
    'shadow-inset-lr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset -6px 0 14px -6px rgba(0, 0, 0, 0.5), inset 6px 0 14px -6px rgba(0, 0, 0, 0.5)'
        }
    ],
    'shadow-inset-tb': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 -6px 14px -6px rgba(0, 0, 0, 0.5), inset 0 6px 14px -6px rgba(0, 0, 0, 0.5)'
        }
    ],
    'shadow-inset-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset -6px 6px 14px -6px rgba(0, 0, 0, 0.5)'
        }
    ],
    'shadow-inset-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset -6px -6px 14px -6px rgba(0, 0, 0, 0.5)'
        }
    ],
    'shadow-inset-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 6px -6px 14px -6px rgba(0, 0, 0, 0.5)'
        }
    ],
    'shadow-inset-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            boxShadow: 'inset 6px 6px 14px -6px rgba(0, 0, 0, 0.5)'
        }
    ],
    'scale-in-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(0)',
            transformOrigin: 'center center',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: 'center center',
            opacity: 1
        }
    ],
    'scale-in-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(0)',
            transformOrigin: '50% 0%',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '50% 0%',
            opacity: 1
        }
    ],
    'scale-in-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(0)',
            transformOrigin: '100% 0%',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '100% 0%',
            opacity: 1
        }
    ],
    'scale-in-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(0)',
            transformOrigin: '100% 50%',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '100% 50%',
            opacity: 1
        }
    ],
    'scale-in-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(0)',
            transformOrigin: '100% 100%',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '100% 100%',
            opacity: 1
        }
    ],
    'scale-in-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(0)',
            transformOrigin: '50% 100%',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '50% 100%',
            opacity: 1
        }
    ],
    'scale-in-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(0)',
            transformOrigin: '0% 100%',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '0% 100%',
            opacity: 1
        }
    ],
    'scale-in-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(0)',
            transformOrigin: '0% 50%',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '0% 50%',
            opacity: 1
        }
    ],
    'scale-in-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(0)',
            transformOrigin: '0% 0%',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '0% 0%',
            opacity: 1
        }
    ],
    'scale-in-hor-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scaleX(0)',
            transformOrigin: 'center center',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scaleX(1)',
            transformOrigin: 'center center',
            opacity: 1
        }
    ],
    'scale-in-hor-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scaleX(0)',
            transformOrigin: '0% 0%',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scaleX(1)',
            transformOrigin: '0% 0%',
            opacity: 1
        }
    ],
    'scale-in-hor-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scaleX(0)',
            transformOrigin: '100% 100%',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scaleX(1)',
            transformOrigin: '100% 100%',
            opacity: 1
        }
    ],
    'scale-in-ver-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scaleY(0)',
            transformOrigin: 'center center',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scaleY(1)',
            transformOrigin: 'center center',
            opacity: 1
        }
    ],
    'scale-in-ver-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scaleY(0)',
            transformOrigin: '100% 0%',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scaleY(1)',
            transformOrigin: '100% 0%',
            opacity: 1
        }
    ],
    'scale-in-ver-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scaleY(0)',
            transformOrigin: '0% 100%',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'scaleY(1)',
            transformOrigin: '0% 100%',
            opacity: 1
        }
    ],
    'rotate-in-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(-360deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top',
            transform: 'rotate(-360deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top right',
            transform: 'rotate(-360deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top right',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'right',
            transform: 'rotate(-360deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'right',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'bottom right',
            transform: 'rotate(-360deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'bottom right',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'bottom',
            transform: 'rotate(-360deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'bottom',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'bottom left',
            transform: 'rotate(-360deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'bottom left',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'left',
            transform: 'rotate(-360deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'left',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top left',
            transform: 'rotate(-360deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'top left',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-hor': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(360deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-ver': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(-360deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-diag-1': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(1, 1, 0, -360deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(1, 1, 0, 0deg)',
            opacity: 1
        }
    ],
    'rotate-in-diag-2': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(-1, 1, 0, -360deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(-1, 1, 0, 0deg)',
            opacity: 1
        }
    ],
    'rotate-in-2-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(-45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-2-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-2-fwd-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(-200px) rotate(-45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(0) rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-2-fwd-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(-200px) rotate(45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(0) rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-2-bck-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(200px) rotate(-45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(0) rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-2-bck-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(200px) rotate(45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(0) rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-2-tr-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'rotate(-45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-2-tr-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'rotate(45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-2-br-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate(-45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-2-br-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate(45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-2-bl-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0 100%',
            transform: 'rotate(-45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0 100%',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-2-bl-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0 100%',
            transform: 'rotate(45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0 100%',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-2-tl-cw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0 0',
            transform: 'rotate(-45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0 0',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'rotate-in-2-tl-ccw': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0 0',
            transform: 'rotate(45deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: '0 0',
            transform: 'rotate(0)',
            opacity: 1
        }
    ],
    'swirl-in-fwd': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(-540deg) scale(0)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-bck': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(540deg) scale(5)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-top-fwd': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '50% 0',
            transform: 'rotate(-540deg) scale(0)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '50% 0',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-top-bck': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '50% 0',
            transform: 'rotate(540deg) scale(5)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '50% 0',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-tr-fwd': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'rotate(-540deg) scale(0)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-tr-bck': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'rotate(540deg) scale(5)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '100% 0%',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-right-fwd': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '100% 50%',
            transform: 'rotate(-540deg) scale(0)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '100% 50%',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-right-bck': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '100% 50%',
            transform: 'rotate(540deg) scale(5)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '100% 50%',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-br-fwd': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate(-540deg) scale(0)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-br-bck': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate(540deg) scale(5)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '100% 100%',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-bottom-fwd': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '50% 100%',
            transform: 'rotate(-540deg) scale(0)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '50% 100%',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-bottom-bck': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '50% 100%',
            transform: 'rotate(540deg) scale(5)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '50% 100%',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-bl-fwd': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'rotate(-540deg) scale(0)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-bl-bck': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'rotate(540deg) scale(5)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '0% 100%',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-left-fwd': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '0 50%',
            transform: 'rotate(-540deg) scale(0)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '0 50%',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-left-bck': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '0 50%',
            transform: 'rotate(540deg) scale(5)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '0 50%',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-tl-fwd': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '0 0',
            transform: 'rotate(-540deg) scale(0)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '0 0',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'swirl-in-tl-bck': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '0 0',
            transform: 'rotate(540deg) scale(5)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: '0 0',
            transform: 'rotate(0) scale(1)',
            opacity: 1
        }
    ],
    'flip-in-hor-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateX(80deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateX(0)',
            opacity: 1
        }
    ],
    'flip-in-hor-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateX(-80deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateX(0)',
            opacity: 1
        }
    ],
    'flip-in-ver-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateY(-80deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateY(0)',
            opacity: 1
        }
    ],
    'flip-in-ver-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateY(80deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotateY(0)',
            opacity: 1
        }
    ],
    'flip-in-diag-1-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(1, 1, 0, -80deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(1, 1, 0, 0deg)',
            opacity: 1
        }
    ],
    'flip-in-diag-1-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(1, 1, 0, 80deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(1, 1, 0, 0deg)',
            opacity: 1
        }
    ],
    'flip-in-diag-2-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(-1, 1, 0, 80deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(1, 1, 0, 0deg)',
            opacity: 1
        }
    ],
    'flip-in-diag-2-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(-1, 1, 0, -80deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'rotate3d(1, 1, 0, 0deg)',
            opacity: 1
        }
    ],
    'slit-in-vertical': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(-800px) rotateY(90deg)',
            opacity: 0
        },
        {
            offset: 0.54,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(-160px) rotateY(87deg)',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(0) rotateY(0)',
            opacity: 1
        }
    ],
    'slit-in-horizontal': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(-800px) rotateX(90deg)',
            opacity: 0
        },
        {
            offset: 0.54,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(-160px) rotateX(87deg)',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(0) rotateX(0)',
            opacity: 1
        }
    ],
    'slit-in-diagonal-1': [
        {
            offset: 0,
            easing: 'ease-in',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(-800px) rotate3d(1, 1, 0, 90deg)',
            opacity: 0
        },
        {
            offset: 0.54,
            easing: 'ease-in-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(-160px) rotate3d(1, 1, 0, 87deg)',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(0) rotate3d(1, 1, 0, 0)',
            opacity: 1
        }
    ],
    'slit-in-diagonal-2': [
        {
            offset: 0,
            easing: 'ease-in',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(-800px) rotate3d(-1, 1, 0, -90deg)',
            opacity: 0
        },
        {
            offset: 0.54,
            easing: 'ease-in-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(-160px) rotate3d(-1, 1, 0, -87deg)',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transformOrigin: 'center center',
            transform: 'translateZ(0) rotate3d(-1, 1, 0, 0)',
            opacity: 1
        }
    ],
    'slide-in-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(-100vh)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0)',
            opacity: 1
        }
    ],
    'slide-in-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(-100vh) translateX(100vw)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(100vh) translateX(100vw)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(100vh)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0)',
            opacity: 1
        }
    ],
    'slide-in-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(100vh) translateX(-100vw)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(-100vh) translateX(-100vw)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-fwd-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(-1400px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0)',
            opacity: 1
        }
    ],
    'slide-in-fwd-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(-1400px) translateY(-100vh)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0)',
            opacity: 1
        }
    ],
    'slide-in-fwd-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(-1400px) translateY(-100vh) translateX(100vw)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-fwd-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(-1400px) translateX(100vw)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-fwd-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(-1400px) translateY(100vh) translateX(100vw)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-fwd-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(-1400px) translateY(100vh)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0)',
            opacity: 1
        }
    ],
    'slide-in-fwd-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(-1400px) translateY(100vh) translateX(-100vw)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-fwd-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(-1400px) translateX(-100vw)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-fwd-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(-1400px) translateY(-100vh) translateX(-100vw)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-bck-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(600px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0)',
            opacity: 1
        }
    ],
    'slide-in-bck-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(700px) translateY(-300px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0)',
            opacity: 1
        }
    ],
    'slide-in-bck-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(700px) translateY(-300px) translateX(400px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-bck-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(700px) translateX(400px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-bck-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(700px) translateY(300px) translateX(400px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-bck-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(700px) translateY(300px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0)',
            opacity: 1
        }
    ],
    'slide-in-bck-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(700px) translateY(300px) translateX(-400px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-bck-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(700px) translateX(-400px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-bck-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(700px) translateY(-300px) translateX(-400px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateZ(0) translateY(0) translateX(0)',
            opacity: 1
        }
    ],
    'slide-in-blurred-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateY(-100vh) scaleY(2.5) scaleX(0.2)',
            transformOrigin: '50% 0%',
            filter: 'blur(40px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateY(0) scaleY(1) scaleX(1)',
            transformOrigin: '50% 50%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'slide-in-blurred-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translate(100vw, -100vh) skew(-80deg, -10deg)',
            transformOrigin: '0% 0%',
            filter: 'blur(40px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translate(0, 0) skew(0deg, 0deg)',
            transformOrigin: '50% 50%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'slide-in-blurred-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateX(100vw) scaleX(2.5) scaleY(0.2)',
            transformOrigin: '0% 50%',
            filter: 'blur(40px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateX(0) scaleY(1) scaleX(1)',
            transformOrigin: '50% 50%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'slide-in-blurred-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translate(100vw, 100vh) skew(80deg, 10deg)',
            transformOrigin: '0% 100%',
            filter: 'blur(40px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translate(0, 0) skew(0deg, 0deg)',
            transformOrigin: '50% 50%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'slide-in-blurred-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateY(100vh) scaleY(2.5) scaleX(0.2)',
            transformOrigin: '50% 100%',
            filter: 'blur(40px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateY(0) scaleY(1) scaleX(1)',
            transformOrigin: '50% 50%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'slide-in-blurred-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translate(-100vw, 100vh) skew(-80deg, -10deg)',
            transformOrigin: '100% 100%',
            filter: 'blur(40px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translate(0, 0) skew(0deg, 0deg)',
            transformOrigin: '50% 50%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'slide-in-blurred-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateX(-100vw) scaleX(2.5) scaleY(0.2)',
            transformOrigin: '100% 50%',
            filter: 'blur(40px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateX(0) scaleY(1) scaleX(1)',
            transformOrigin: '50% 50%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'slide-in-blurred-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translate(-100vw, -100vh) skew(80deg, 10deg)',
            transformOrigin: '100% 0%',
            filter: 'blur(40px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translate(0, 0) skew(0deg, 0deg)',
            transformOrigin: '50% 50%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'slide-in-elliptic-top-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(-600px) rotateX(-30deg) scale(0)',
            transformOrigin: '50% 100%',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) rotateX(0) scale(1)',
            transformOrigin: '50% 100vh',
            opacity: 1
        }
    ],
    'slide-in-elliptic-top-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(-600px) rotateX(30deg) scale(6.5)',
            transformOrigin: '50% 200%',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) rotateX(0) scale(1)',
            transformOrigin: '50% -500px',
            opacity: 1
        }
    ],
    'slide-in-elliptic-right-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(800px) rotateY(-30deg) scale(0)',
            transformOrigin: '100% 50%',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0) rotateY(0) scale(1)',
            transformOrigin: '-100vw 50%',
            opacity: 1
        }
    ],
    'slide-in-elliptic-right-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(800px) rotateY(30deg) scale(6.5)',
            transformOrigin: '-100% 50%',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0) rotateY(0) scale(1)',
            transformOrigin: '600px 50%',
            opacity: 1
        }
    ],
    'slide-in-elliptic-bottom-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(600px) rotateX(30deg) scale(0)',
            transformOrigin: '50% 100%',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) rotateX(0) scale(1)',
            transformOrigin: '50% -100vh',
            opacity: 1
        }
    ],
    'slide-in-elliptic-bottom-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(600px) rotateX(-30deg) scale(6.5)',
            transformOrigin: '50% -100%',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateY(0) rotateX(0) scale(1)',
            transformOrigin: '50% 500px',
            opacity: 1
        }
    ],
    'slide-in-elliptic-left-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(-800px) rotateY(30deg) scale(0)',
            transformOrigin: '-100% 50%',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0) rotateY(0) scale(1)',
            transformOrigin: '100vw 50%',
            opacity: 1
        }
    ],
    'slide-in-elliptic-left-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(-800px) rotateY(-30deg) scale(6.5)',
            transformOrigin: '200% 50%',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'translateX(0) rotateY(0) scale(1)',
            transformOrigin: '-600px 50%',
            opacity: 1
        }
    ],
    'bounce-in-top': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'translateY(-500px)',
            easing: 'ease-in',
            opacity: 0
        },
        {
            offset: 0.38,
            fillMode: 'both',
            transform: 'translateY(0)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.55,
            fillMode: 'both',
            transform: 'translateY(-65px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.72,
            fillMode: 'both',
            transform: 'translateY(0)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.81,
            fillMode: 'both',
            transform: 'translateY(-28px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.9,
            fillMode: 'both',
            transform: 'translateY(0)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.95,
            fillMode: 'both',
            transform: 'translateY(-8px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'translateY(0)',
            easing: 'ease-out',
            opacity: 1
        }
    ],
    'bounce-in-bottom': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'translateY(500px)',
            easing: 'ease-in',
            opacity: 0
        },
        {
            offset: 0.38,
            fillMode: 'both',
            transform: 'translateY(0)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.55,
            fillMode: 'both',
            transform: 'translateY(65px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.72,
            fillMode: 'both',
            transform: 'translateY(0)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.81,
            fillMode: 'both',
            transform: 'translateY(28px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.9,
            fillMode: 'both',
            transform: 'translateY(0)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.95,
            fillMode: 'both',
            transform: 'translateY(8px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'translateY(0)',
            easing: 'ease-out',
            opacity: 1
        }
    ],
    'bounce-in-fwd': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'scale(0)',
            easing: 'ease-in',
            opacity: 0
        },
        {
            offset: 0.38,
            fillMode: 'both',
            transform: 'scale(1)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.55,
            fillMode: 'both',
            transform: 'scale(0.7)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.72,
            fillMode: 'both',
            transform: 'scale(1)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.81,
            fillMode: 'both',
            transform: 'scale(0.84)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.89,
            fillMode: 'both',
            transform: 'scale(1)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.95,
            fillMode: 'both',
            transform: 'scale(0.95)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'scale(1)',
            easing: 'ease-out',
            opacity: 1
        }
    ],
    'bounce-in-bck': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'scale(7)',
            easing: 'ease-in',
            opacity: 0
        },
        {
            offset: 0.38,
            fillMode: 'both',
            transform: 'scale(1)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.55,
            fillMode: 'both',
            transform: 'scale(1.5)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.72,
            fillMode: 'both',
            transform: 'scale(1)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.81,
            fillMode: 'both',
            transform: 'scale(1.24)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.89,
            fillMode: 'both',
            transform: 'scale(1)',
            easing: 'ease-out',
            opacity: 1
        },
        {
            offset: 0.95,
            fillMode: 'both',
            transform: 'scale(1.04)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'scale(1)',
            easing: 'ease-out',
            opacity: 1
        }
    ],
    'roll-in-left': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'translateX(-800px) rotate(-540deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'translateX(0) rotate(0deg)',
            opacity: 1
        }
    ],
    'roll-in-top': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'translateY(-800px) rotate(-540deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'translateY(0) rotate(0deg)',
            opacity: 1
        }
    ],
    'roll-in-right': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'translateX(800px) rotate(540deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'translateX(0) rotate(0deg)',
            opacity: 1
        }
    ],
    'roll-in-bottom': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'translateY(800px) rotate(540deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'translateY(0) rotate(0deg)',
            opacity: 1
        }
    ],
    'roll-in-blurred-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateX(-100vw) rotate(-540deg)',
            filter: 'blur(50px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateX(0) rotate(0deg)',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'roll-in-blurred-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateY(-100vh) rotate(-720deg)',
            filter: 'blur(50px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateY(0) rotate(0deg)',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'roll-in-blurred-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateX(100vw) rotate(720deg)',
            filter: 'blur(50px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateX(0) rotate(0deg)',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'roll-in-blurred-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateY(800px) rotate(720deg)',
            filter: 'blur(50px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            fillMode: 'both',
            transform: 'translateY(0) rotate(0deg)',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'tilt-in-top-1': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(30deg) translateY(-300px) skewY(-30deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0deg) translateY(0) skewY(0deg)',
            opacity: 1
        }
    ],
    'tilt-in-top-2': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(-30deg) translateY(-300px) skewY(30deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0deg) translateY(0) skewY(0deg)',
            opacity: 1
        }
    ],
    'tilt-in-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(-35deg) rotateX(20deg) translate(250px, -250px) skew(-12deg, -15deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
            opacity: 1
        }
    ],
    'tilt-in-right-1': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(-30deg) translateX(300px) skewX(30deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(0deg) translateX(0) skewX(0deg)',
            opacity: 1
        }
    ],
    'tilt-in-right-2': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(30deg) translateX(300px) skewX(-30deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(0deg) translateX(0) skewX(0deg)',
            opacity: 1
        }
    ],
    'tilt-in-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(-35deg) rotateX(-20deg) translate(250px, 250px) skew(12deg, 15deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
            opacity: 1
        }
    ],
    'tilt-in-bottom-1': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(30deg) translateY(300px) skewY(-30deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0deg) translateY(0) skewY(0deg)',
            opacity: 1
        }
    ],
    'tilt-in-bottom-2': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(-30deg) translateY(300px) skewY(30deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0deg) translateY(0) skewY(0deg)',
            opacity: 1
        }
    ],
    'tilt-in-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(35deg) rotateX(-20deg) translate(-250px, 250px) skew(-12deg, -15deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
            opacity: 1
        }
    ],
    'tilt-in-left-1': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(-30deg) translateX(-300px) skewX(-30deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(0deg) translateX(0) skewX(0deg)',
            opacity: 1
        }
    ],
    'tilt-in-left-2': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(30deg) translateX(-300px) skewX(30deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateX(0deg) translateX(0) skewX(0deg)',
            opacity: 1
        }
    ],
    'tilt-in-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(35deg) rotateX(20deg) translate(-250px, -250px) skew(12deg, 15deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
            opacity: 1
        }
    ],
    'tilt-in-fwd-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(20deg) rotateX(35deg) translate(300px, -300px) skew(-35deg, 10deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
            opacity: 1
        }
    ],
    'tilt-in-fwd-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(20deg) rotateX(-35deg) translate(300px, 300px) skew(35deg, -10deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
            opacity: 1
        }
    ],
    'tilt-in-fwd-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(-20deg) rotateX(-35deg) translate(-300px, 300px) skew(-35deg, 10deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
            opacity: 1
        }
    ],
    'tilt-in-fwd-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(-20deg) rotateX(35deg) translate(-300px, -300px) skew(35deg, -10deg)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            transform: 'rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)',
            opacity: 1
        }
    ],
    'swing-in-top-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateX(-100deg)',
            transformOrigin: 'top',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateX(0deg)',
            transformOrigin: 'top',
            opacity: 1
        }
    ],
    'swing-in-top-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateX(70deg)',
            transformOrigin: 'top',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateX(0deg)',
            transformOrigin: 'top',
            opacity: 1
        }
    ],
    'swing-in-right-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateY(-100deg)',
            transformOrigin: 'right',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateY(0)',
            transformOrigin: 'right',
            opacity: 1
        }
    ],
    'swing-in-right-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateY(70deg)',
            transformOrigin: 'right',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateY(0)',
            transformOrigin: 'right',
            opacity: 1
        }
    ],
    'swing-in-bottom-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateX(100deg)',
            transformOrigin: 'bottom',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateX(0)',
            transformOrigin: 'bottom',
            opacity: 1
        }
    ],
    'swing-in-bottom-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateX(-70deg)',
            transformOrigin: 'bottom',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateX(0)',
            transformOrigin: 'bottom',
            opacity: 1
        }
    ],
    'swing-in-left-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateY(100deg)',
            transformOrigin: 'left',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateY(0)',
            transformOrigin: 'left',
            opacity: 1
        }
    ],
    'swing-in-left-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateY(-70deg)',
            transformOrigin: 'left',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
            fillMode: 'both',
            transform: 'rotateY(0)',
            transformOrigin: 'left',
            opacity: 1
        }
    ],
    'fade-in-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateZ(-80px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateZ(0)',
            opacity: 1
        }
    ],
    'fade-in-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateZ(80px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateZ(0)',
            opacity: 1
        }
    ],
    'fade-in-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateY(-50px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateY(0)',
            opacity: 1
        }
    ],
    'fade-in-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateX(50px) translateY(-50px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateX(0) translateY(0)',
            opacity: 1
        }
    ],
    'fade-in-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateX(50px) translateY(50px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateX(0) translateY(0)',
            opacity: 1
        }
    ],
    'fade-in-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateY(50px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateY(0)',
            opacity: 1
        }
    ],
    'fade-in-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateX(-50px) translateY(50px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateX(0) translateY(0)',
            opacity: 1
        }
    ],
    'fade-in-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateX(-50px) translateY(-50px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            fillMode: 'both',
            transform: 'translateX(0) translateY(0)',
            opacity: 1
        }
    ],
    'puff-in-center': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(2)',
            filter: 'blur(4px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(1)',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'puff-in-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(2)',
            transformOrigin: '50% 0%',
            filter: 'blur(4px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '50% 0%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'puff-in-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(2)',
            transformOrigin: '100% 0%',
            filter: 'blur(4px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '100% 0%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'puff-in-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(2)',
            transformOrigin: '100% 50%',
            filter: 'blur(4px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '100% 50%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'puff-in-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(2)',
            transformOrigin: '100% 100%',
            filter: 'blur(4px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '100% 100%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'puff-in-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(2)',
            transformOrigin: '50% 100%',
            filter: 'blur(4px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '50% 100%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'puff-in-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(2)',
            transformOrigin: '0% 100%',
            filter: 'blur(4px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '0% 100%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'puff-in-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(2)',
            transformOrigin: '0% 50%',
            filter: 'blur(4px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '0% 50%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'puff-in-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(2)',
            transformOrigin: '0% 0%',
            filter: 'blur(4px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scale(1)',
            transformOrigin: '0% 0%',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'puff-in-hor': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scaleX(2)',
            transformOrigin: 'center center',
            filter: 'blur(4px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scaleX(1)',
            transformOrigin: 'center center',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'puff-in-ver': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scaleY(2)',
            transformOrigin: 'center center',
            filter: 'blur(4px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
            fillMode: 'both',
            transform: 'scaleY(1)',
            transformOrigin: 'center center',
            filter: 'blur(0)',
            opacity: 1
        }
    ],
    'flicker-in-1': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.1,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.101,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.102,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.2,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.201,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.206,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.3,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.301,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.305,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.306,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.45,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.451,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.55,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.551,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.57,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.571,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.6,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.601,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.65,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.651,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.75,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.751,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.77,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.771,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.85,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.851,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.86,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0
        },
        {
            offset: 0.861,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1
        }
    ],
    'flicker-in-2': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'initial'
        },
        {
            offset: 0.1,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.101,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: 'none'
        },
        {
            offset: 0.102,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.2,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.201,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.25)'
        },
        {
            offset: 0.206,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.3,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.301,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25)'
        },
        {
            offset: 0.305,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25)'
        },
        {
            offset: 0.306,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.45,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.451,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25)'
        },
        {
            offset: 0.55,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25)'
        },
        {
            offset: 0.551,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.57,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.571,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.3)'
        },
        {
            offset: 0.6,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.3)'
        },
        {
            offset: 0.601,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.65,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.651,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.3), 0 0 100px rgba(255, 255, 255, 0.1)'
        },
        {
            offset: 0.75,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.3), 0 0 100px rgba(255, 255, 255, 0.1)'
        },
        {
            offset: 0.751,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.77,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.771,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2), 0 0 100px rgba(255, 255, 255, 0.1)'
        },
        {
            offset: 0.85,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2), 0 0 100px rgba(255, 255, 255, 0.1)'
        },
        {
            offset: 0.851,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.86,
            easing: 'linear',
            fillMode: 'both',
            opacity: 0,
            boxShadow: 'none'
        },
        {
            offset: 0.861,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25), 0 0 100px rgba(255, 255, 255, 0.1)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            opacity: 1,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25), 0 0 100px rgba(255, 255, 255, 0.1)'
        }
    ],
    'tracking-in-expand': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: '-0.5em',
            opacity: 0
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            opacity: 0.6
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            opacity: 1
        }
    ],
    'tracking-in-expand-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: '-0.5em',
            transform: 'translateZ(-700px)',
            opacity: 0
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            opacity: 0.6
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            transform: 'translateZ(0)',
            opacity: 1
        }
    ],
    'tracking-in-expand-fwd-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: '-0.5em',
            transform: 'translateZ(-700px) translateY(-500px)',
            opacity: 0
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            opacity: 0.6
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            transform: 'translateZ(0) translateY(0)',
            opacity: 1
        }
    ],
    'tracking-in-expand-fwd-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: '-0.5em',
            transform: 'translateZ(-700px) translateY(500px)',
            opacity: 0
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            opacity: 0.6
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            transform: 'translateZ(0) translateY(0)',
            opacity: 1
        }
    ],
    'tracking-in-contract': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: '1em',
            opacity: 0
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            opacity: 0.6
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            opacity: 1
        }
    ],
    'tracking-in-contract-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: '1em',
            transform: 'translateZ(400px)',
            opacity: 0
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            opacity: 0.6
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            transform: 'translateZ(0)',
            opacity: 1
        }
    ],
    'tracking-in-contract-bck-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: '1em',
            transform: 'translateZ(400px) translateY(-300px)',
            opacity: 0
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            opacity: 0.6
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            transform: 'translateZ(0) translateY(0)',
            opacity: 1
        }
    ],
    'tracking-in-contract-bck-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: '1em',
            transform: 'translateZ(400px) translateY(300px)',
            opacity: 0
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            opacity: 0.6
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            fillMode: 'both',
            letterSpacing: 'normal',
            transform: 'translateZ(0) translateY(0)',
            opacity: 1
        }
    ],
    'focus-in-expand': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            letterSpacing: '-0.5em',
            filter: 'blur(12px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            letterSpacing: 'normal',
            filter: 'blur(0px)',
            opacity: 1
        }
    ],
    'focus-in-expand-fwd': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            letterSpacing: '-0.5em',
            transform: 'translateZ(-800px)',
            filter: 'blur(12px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            letterSpacing: 'normal',
            transform: 'translateZ(0)',
            filter: 'blur(0px)',
            opacity: 1
        }
    ],
    'focus-in-contract': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            letterSpacing: '1em',
            filter: 'blur(12px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            letterSpacing: 'normal',
            filter: 'blur(0px)',
            opacity: 1
        }
    ],
    'focus-in-contract-bck': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            letterSpacing: '1em',
            transform: 'translateZ(300px)',
            filter: 'blur(12px)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            fillMode: 'both',
            letterSpacing: 'normal',
            transform: 'translateZ(12px)',
            filter: 'blur(0px)',
            opacity: 1
        }
    ],
    'vibrate-1': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(0)'
        },
        {
            offset: 0.2,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(-2px, 2px)'
        },
        {
            offset: 0.4,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(-2px, -2px)'
        },
        {
            offset: 0.6,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(2px, 2px)'
        },
        {
            offset: 0.8,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(2px, -2px)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(0)'
        }
    ],
    'vibrate-2': [
        {
            offset: 0,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(0)'
        },
        {
            offset: 0.1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(-2px, -2px)'
        },
        {
            offset: 0.2,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(2px, -2px)'
        },
        {
            offset: 0.3,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(-2px, 2px)'
        },
        {
            offset: 0.4,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(2px, 2px)'
        },
        {
            offset: 0.5,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(-2px, -2px)'
        },
        {
            offset: 0.6,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(2px, -2px)'
        },
        {
            offset: 0.7,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(-2px, 2px)'
        },
        {
            offset: 0.8,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(-2px, -2px)'
        },
        {
            offset: 0.9,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(2px, -2px)'
        },
        {
            offset: 1,
            easing: 'linear',
            fillMode: 'both',
            transform: 'translate(0)'
        }
    ],
    'shake-horizontal': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(0)'
        },
        {
            offset: 0.1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(-10px)'
        },
        {
            offset: 0.2,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(10px)'
        },
        {
            offset: 0.3,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(-10px)'
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(10px)'
        },
        {
            offset: 0.5,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(-10px)'
        },
        {
            offset: 0.6,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(10px)'
        },
        {
            offset: 0.7,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(-10px)'
        },
        {
            offset: 0.8,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(8px)'
        },
        {
            offset: 0.9,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(-8px)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateX(0)'
        }
    ],
    'shake-vertical': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(0)'
        },
        {
            offset: 0.1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(-8px)'
        },
        {
            offset: 0.2,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(8px)'
        },
        {
            offset: 0.3,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(-8px)'
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(8px)'
        },
        {
            offset: 0.5,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(-8px)'
        },
        {
            offset: 0.6,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(8px)'
        },
        {
            offset: 0.7,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(-8px)'
        },
        {
            offset: 0.8,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(6.4px)'
        },
        {
            offset: 0.9,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(-6.4px)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'translateY(0)'
        }
    ],
    'shake-lr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '50% 50%'
        },
        {
            offset: 0.1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(8deg)'
        },
        {
            offset: 0.2,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-10deg)'
        },
        {
            offset: 0.3,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(10deg)'
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-10deg)'
        },
        {
            offset: 0.5,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(10deg)'
        },
        {
            offset: 0.6,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-10deg)'
        },
        {
            offset: 0.7,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(10deg)'
        },
        {
            offset: 0.8,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-8deg)'
        },
        {
            offset: 0.9,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(8deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '50% 50%'
        }
    ],
    'shake-top': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '50% 0'
        },
        {
            offset: 0.1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 0.2,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.3,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.5,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.6,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.7,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.8,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-2deg)'
        },
        {
            offset: 0.9,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '50% 0'
        }
    ],
    'shake-tr': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '100% 0'
        },
        {
            offset: 0.1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 0.2,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.3,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.5,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.6,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.7,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.8,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-2deg)'
        },
        {
            offset: 0.9,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '100% 0'
        }
    ],
    'shake-right': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '100% 50%'
        },
        {
            offset: 0.1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 0.2,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.3,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.5,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.6,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.7,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.8,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-2deg)'
        },
        {
            offset: 0.9,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '100% 50%'
        }
    ],
    'shake-br': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '100% 100%'
        },
        {
            offset: 0.1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 0.2,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.3,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.5,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.6,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.7,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.8,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-2deg)'
        },
        {
            offset: 0.9,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '100% 100%'
        }
    ],
    'shake-bottom': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '50% 100%'
        },
        {
            offset: 0.1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 0.2,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.3,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.5,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.6,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.7,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.8,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-2deg)'
        },
        {
            offset: 0.9,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '50% 100%'
        }
    ],
    'shake-bl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '0% 100%'
        },
        {
            offset: 0.1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 0.2,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.3,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.5,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.6,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.7,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.8,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-2deg)'
        },
        {
            offset: 0.9,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '0% 100%'
        }
    ],
    'shake-left': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '0% 50%'
        },
        {
            offset: 0.1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 0.2,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.3,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.5,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.6,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.7,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.8,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-2deg)'
        },
        {
            offset: 0.9,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '0% 50%'
        }
    ],
    'shake-tl': [
        {
            offset: 0,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '0% 0%'
        },
        {
            offset: 0.1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 0.2,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.3,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.4,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.5,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.6,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-4deg)'
        },
        {
            offset: 0.7,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(4deg)'
        },
        {
            offset: 0.8,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(-2deg)'
        },
        {
            offset: 0.9,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(2deg)'
        },
        {
            offset: 1,
            easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
            fillMode: 'both',
            transform: 'rotate(0deg)',
            transformOrigin: '0% 0%'
        }
    ],
    'jello-horizontal': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'scale3d(1, 1, 1)'
        },
        {
            offset: 0.3,
            fillMode: 'both',
            transform: 'scale3d(1.25, 0.75, 1)'
        },
        {
            offset: 0.4,
            fillMode: 'both',
            transform: 'scale3d(0.75, 1.25, 1)'
        },
        {
            offset: 0.5,
            fillMode: 'both',
            transform: 'scale3d(1.15, 0.85, 1)'
        },
        {
            offset: 0.65,
            fillMode: 'both',
            transform: 'scale3d(0.95, 1.05, 1)'
        },
        {
            offset: 0.75,
            fillMode: 'both',
            transform: 'scale3d(1.05, 0.95, 1)'
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'scale3d(1, 1, 1)'
        }
    ],
    'jello-vertical': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'scale3d(1, 1, 1)'
        },
        {
            offset: 0.3,
            fillMode: 'both',
            transform: 'scale3d(0.75, 1.25, 1)'
        },
        {
            offset: 0.4,
            fillMode: 'both',
            transform: 'scale3d(1.25, 0.75, 1)'
        },
        {
            offset: 0.5,
            fillMode: 'both',
            transform: 'scale3d(0.85, 1.15, 1)'
        },
        {
            offset: 0.65,
            fillMode: 'both',
            transform: 'scale3d(1.05, 0.95, 1)'
        },
        {
            offset: 0.75,
            fillMode: 'both',
            transform: 'scale3d(0.95, 1.05, 1)'
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'scale3d(1, 1, 1)'
        }
    ],
    'jello-diagonal-1': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'skew(0deg, 0deg)'
        },
        {
            offset: 0.3,
            fillMode: 'both',
            transform: ' skew(25deg, 25deg)'
        },
        {
            offset: 0.4,
            fillMode: 'both',
            transform: 'skew(-15deg, -15deg)'
        },
        {
            offset: 0.5,
            fillMode: 'both',
            transform: 'skew(15deg, 15deg)'
        },
        {
            offset: 0.65,
            fillMode: 'both',
            transform: 'skew(-5deg, -5deg)'
        },
        {
            offset: 0.75,
            fillMode: 'both',
            transform: 'skew(5deg, 5deg)'
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'skew(0deg, 0deg)'
        }
    ],
    'jello-diagonal-2': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'skew(0deg, 0deg)'
        },
        {
            offset: 0.3,
            fillMode: 'both',
            transform: 'skew(-25deg, -25deg)'
        },
        {
            offset: 0.4,
            fillMode: 'both',
            transform: 'skew(15deg, 15deg)'
        },
        {
            offset: 0.5,
            fillMode: 'both',
            transform: 'skew(-15deg, -15deg)'
        },
        {
            offset: 0.65,
            fillMode: 'both',
            transform: 'skew(5deg, 5deg)'
        },
        {
            offset: 0.75,
            fillMode: 'both',
            transform: 'skew(-5deg, -5deg)'
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'skew(0deg, 0deg)'
        }
    ],
    'wobble-hor-bottom': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'translateX(0)',
            transformOrigin: '50% 50%'
        },
        {
            offset: 0.15,
            fillMode: 'both',
            transform: 'translateX(-30px) rotate(-6deg)'
        },
        {
            offset: 0.3,
            fillMode: 'both',
            transform: 'translateX(15px) rotate(6deg)'
        },
        {
            offset: 0.45,
            fillMode: 'both',
            transform: 'translateX(-15px) rotate(-3.6deg)'
        },
        {
            offset: 0.6,
            fillMode: 'both',
            transform: 'translateX(9px) rotate(2.4deg)'
        },
        {
            offset: 0.75,
            fillMode: 'both',
            transform: 'translateX(-6px) rotate(-1.2deg)'
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'translateX(0)',
            transformOrigin: '50% 50%'
        }
    ],
    'wobble-hor-top': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'translateX(0)',
            transformOrigin: '50% 50%'
        },
        {
            offset: 0.15,
            fillMode: 'both',
            transform: 'translateX(-30px) rotate(6deg)'
        },
        {
            offset: 0.3,
            fillMode: 'both',
            transform: 'translateX(15px) rotate(-6deg)'
        },
        {
            offset: 0.45,
            fillMode: 'both',
            transform: 'translateX(-15px) rotate(3.6deg)'
        },
        {
            offset: 0.6,
            fillMode: 'both',
            transform: 'translateX(9px) rotate(-2.4deg)'
        },
        {
            offset: 0.75,
            fillMode: 'both',
            transform: 'translateX(-6px) rotate(1.2deg)'
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'translateX(0)',
            transformOrigin: '50% 50%'
        }
    ],
    'wobble-ver-left': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'translateY(0) rotate(0)',
            transformOrigin: '50% 50%'
        },
        {
            offset: 0.15,
            fillMode: 'both',
            transform: 'translateY(-30px) rotate(-6deg)'
        },
        {
            offset: 0.3,
            fillMode: 'both',
            transform: 'translateY(15px) rotate(6deg)'
        },
        {
            offset: 0.45,
            fillMode: 'both',
            transform: 'translateY(-15px) rotate(-3.6deg)'
        },
        {
            offset: 0.6,
            fillMode: 'both',
            transform: 'translateY(9px) rotate(2.4deg)'
        },
        {
            offset: 0.75,
            fillMode: 'both',
            transform: 'translateY(-6px) rotate(-1.2deg)'
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'translateY(0) rotate(0)',
            transformOrigin: '50% 50%'
        }
    ],
    'wobble-ver-right': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'translateY(0) rotate(0)',
            transformOrigin: '50% 50%'
        },
        {
            offset: 0.15,
            fillMode: 'both',
            transform: 'translateY(-30px) rotate(6deg)'
        },
        {
            offset: 0.3,
            fillMode: 'both',
            transform: 'translateY(15px) rotate(-6deg)'
        },
        {
            offset: 0.45,
            fillMode: 'both',
            transform: 'translateY(-15px) rotate(3.6deg)'
        },
        {
            offset: 0.6,
            fillMode: 'both',
            transform: 'translateY(9px) rotate(-2.4deg)'
        },
        {
            offset: 0.75,
            fillMode: 'both',
            transform: 'translateY(-6px) rotate(1.2deg)'
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'translateY(0) rotate(0)',
            transformOrigin: '50% 50%'
        }
    ],
    'bounce-top': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'translateY(-45px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.24,
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.25,
            fillMode: 'both',
            transform: 'translateY(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.4,
            fillMode: 'both',
            transform: 'translateY(-24px)',
            easing: 'ease-in'
        },
        {
            offset: 0.55,
            fillMode: 'both',
            transform: 'translateY(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.65,
            fillMode: 'both',
            transform: 'translateY(-12px)',
            easing: 'ease-in'
        },
        {
            offset: 0.75,
            fillMode: 'both',
            transform: 'translateY(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.82,
            fillMode: 'both',
            transform: 'translateY(-6px)',
            easing: 'ease-in'
        },
        {
            offset: 0.87,
            fillMode: 'both',
            transform: 'translateY(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.93,
            fillMode: 'both',
            transform: 'translateY(-4px)',
            easing: 'ease-in'
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'translateY(0px)',
            easing: 'ease-out',
            opacity: 1
        }
    ],
    'bounce-bottom': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'translateY(45px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.24,
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.25,
            fillMode: 'both',
            transform: 'translateY(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.4,
            fillMode: 'both',
            transform: 'translateY(24px)',
            easing: 'ease-in'
        },
        {
            offset: 0.55,
            fillMode: 'both',
            transform: 'translateY(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.65,
            fillMode: 'both',
            transform: 'translateY(12px)',
            easing: 'ease-in'
        },
        {
            offset: 0.75,
            fillMode: 'both',
            transform: 'translateY(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.82,
            fillMode: 'both',
            transform: 'translateY(6px)',
            easing: 'ease-in'
        },
        {
            offset: 0.87,
            fillMode: 'both',
            transform: 'translateY(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.93,
            fillMode: 'both',
            transform: 'translateY(4px)',
            easing: 'ease-in'
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'translateY(0px)',
            easing: 'ease-out',
            opacity: 1
        }
    ],
    'bounce-left': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'translateX(-48px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.24,
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.25,
            fillMode: 'both',
            transform: 'translateX(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.4,
            fillMode: 'both',
            transform: 'translateX(-26px)',
            easing: 'ease-in'
        },
        {
            offset: 0.55,
            fillMode: 'both',
            transform: 'translateX(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.65,
            fillMode: 'both',
            transform: 'translateX(-13px)',
            easing: 'ease-in'
        },
        {
            offset: 0.75,
            fillMode: 'both',
            transform: 'translateX(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.82,
            fillMode: 'both',
            transform: 'translateX(-6.5px)',
            easing: 'ease-in'
        },
        {
            offset: 0.87,
            fillMode: 'both',
            transform: 'translateX(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.93,
            fillMode: 'both',
            transform: 'translateX(-4px)',
            easing: 'ease-in'
        },
        {
            offset: 0.98,
            fillMode: 'both',
            transform: 'translateX(0px)',
            easing: 'ease-out'
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'translateX(0px)',
            easing: 'ease-out',
            opacity: 1
        }
    ],
    'bounce-right': [
        {
            offset: 0,
            fillMode: 'both',
            transform: 'translateX(48px)',
            easing: 'ease-in',
            opacity: 1
        },
        {
            offset: 0.24,
            fillMode: 'both',
            opacity: 1
        },
        {
            offset: 0.25,
            fillMode: 'both',
            transform: 'translateX(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.4,
            fillMode: 'both',
            transform: 'translateX(26px)',
            easing: 'ease-in'
        },
        {
            offset: 0.55,
            fillMode: 'both',
            transform: 'translateX(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.65,
            fillMode: 'both',
            transform: 'translateX(13px)',
            easing: 'ease-in'
        },
        {
            offset: 0.75,
            fillMode: 'both',
            transform: 'translateX(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.82,
            fillMode: 'both',
            transform: 'translateX(6.5px)',
            easing: 'ease-in'
        },
        {
            offset: 0.87,
            fillMode: 'both',
            transform: 'translateX(0px)',
            easing: 'ease-out'
        },
        {
            offset: 0.93,
            fillMode: 'both',
            transform: 'translateX(4px)',
            easing: 'ease-in'
        },
        {
            offset: 0.98,
            fillMode: 'both',
            transform: 'translateX(0px)',
            easing: 'ease-out'
        },
        {
            offset: 1,
            fillMode: 'both',
            transform: 'translateX(0px)',
            easing: 'ease-out',
            opacity: 1
        }
    ],
    'pulsate-bck': [
        {
            offset: 0,
            easing: 'ease-in-out',
            fillMode: 'both',
            transform: 'scale(1)'
        },
        {
            offset: 0.5,
            easing: 'ease-in-out',
            fillMode: 'both',
            transform: 'scale(0.9)'
        },
        {
            offset: 1,
            easing: 'ease-in-out',
            fillMode: 'both',
            transform: 'scale(1)'
        }
    ],
    'pulsate-fwd': [
        {
            offset: 0,
            easing: 'ease-in-out',
            fillMode: 'both',
            transform: 'scale(1)'
        },
        {
            offset: 0.5,
            easing: 'ease-in-out',
            fillMode: 'both',
            transform: 'scale(1.1)'
        },
        {
            offset: 1,
            easing: 'ease-in-out',
            fillMode: 'both',
            transform: 'scale(1)'
        }
    ],
    ping: [
        {
            offset: 0,
            easing: 'ease-in-out',
            fillMode: 'both',
            transform: 'scale(0.2)',
            opacity: 0.8
        },
        {
            offset: 0.8,
            easing: 'ease-in-out',
            fillMode: 'both',
            transform: 'scale(1.2)',
            opacity: 0
        },
        {
            offset: 1,
            easing: 'ease-in-out',
            fillMode: 'both',
            transform: 'scale(2.2)',
            opacity: 0
        }
    ],
    'ken-burns-top': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1) translateY(0)',
            transformOrigin: '50% 16%'
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1.25) translateY(-15px)',
            transformOrigin: 'top'
        }
    ],
    'ken-burns-top-right': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1) translate(0, 0)',
            transformOrigin: '84% 16%'
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1.25) translate(20px, -15px)',
            transformOrigin: 'right top'
        }
    ],
    'ken-burns-right': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1) translate(0, 0)',
            transformOrigin: '84% 50%'
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1.25) translateX(20px)',
            transformOrigin: 'right'
        }
    ],
    'ken-burns-bottom-right': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1) translate(0, 0)',
            transformOrigin: '84% 84%'
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1.25) translate(20px, 15px)',
            transformOrigin: 'right bottom'
        }
    ],
    'ken-burns-bottom': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1) translateY(0)',
            transformOrigin: '50% 84%'
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1.25) translateY(15px)',
            transformOrigin: 'bottom'
        }
    ],
    'ken-burns-bottom-left': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1) translate(0, 0)',
            transformOrigin: '16% 84%'
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1.25) translate(-20px, 15px)',
            transformOrigin: 'left bottom'
        }
    ],
    'ken-burns-left': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1) translate(0, 0)',
            transformOrigin: '16% 50%'
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1.25) translateX(-20px)',
            transformOrigin: 'left'
        }
    ],
    'ken-burns-top-left': [
        {
            offset: 0,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1) translate(0, 0)',
            transformOrigin: '16% 16%'
        },
        {
            offset: 1,
            easing: 'ease-out',
            fillMode: 'both',
            transform: 'scale(1.25) translate(-20px, -15px)',
            transformOrigin: 'left top'
        }
    ]
};

const sortObject = (o) => Object.keys(o)
    .sort()
    .reduce((r, k) => ((r[k] = o[k]), r), {});
const animations = Object.assign({ none: [] }, sortObject(Object.assign(Object.assign({}, animatecss), animista)));

const easings = {
    linear: 'linear',
    ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
    'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
    'ease-in-cubic': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    'ease-out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1.0)',
    'ease-in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1.0)',
    'ease-in-circ': 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
    'ease-out-circ': 'cubic-bezier(0.075, 0.82, 0.165, 1.0)',
    'ease-in-out-circ': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    'ease-in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
    'ease-out-expo': 'cubic-bezier(0.19, 1.0, 0.22, 1.0)',
    'ease-in-out-expo': 'cubic-bezier(1.0, 0.0, 0.0, 1.0)',
    'ease-in-quad': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    'ease-out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    'ease-in-out-quad': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    'ease-in-quart': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
    'ease-out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1.0)',
    'ease-in-out-quart': 'cubic-bezier(0.77, 0.0, 0.175, 1.0)',
    'ease-in-quint': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    'ease-out-quint': 'cubic-bezier(0.23, 1.0, 0.32, 1.0)',
    'ease-in-out-quint': 'cubic-bezier(0.86, 0.0, 0.07, 1.0)',
    'ease-in-sine': 'cubic-bezier(0.47, 0.0, 0.745, 0.715)',
    'ease-out-sine': 'cubic-bezier(0.39, 0.575, 0.565, 1.0)',
    'ease-in-out-sine': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
    'ease-in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    'ease-out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    'ease-in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

const animationCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:contents}";

const Animate = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slCancel = createEvent(this, "slCancel", 7);
        this.slFinish = createEvent(this, "slFinish", 7);
        this.slStart = createEvent(this, "slStart", 7);
        this.hasStarted = false;
        /** The name of the animation to use. */
        this.name = 'none';
        /** The number of milliseconds to delay the start of the animation. */
        this.delay = 0;
        /** Determines the direction of playback as well as the behavior when reaching the end of an iteration. */
        this.direction = 'normal';
        /** The number of milliseconds each iteration of the animation takes to complete. */
        this.duration = 1000;
        /** The rate of the animation's change over time. */
        this.easing = 'linear';
        /** The number of milliseconds to delay after the active period of an animation sequence. */
        this.endDelay = 0;
        /** Sets how the animation applies styles to its target before and after its execution. */
        this.fill = 'auto';
        /** The number of iterations to run before the animation completes. Defaults to `Infinity`, which loops. */
        this.iterations = Infinity;
        /** The offset at which to start the animation, usually between 0 (start) and 1 (end). */
        this.iterationStart = 0;
        /**
         * Sets the animation's playback rate. The default is `1`, which plays the animation at a normal speed. Setting this
         * to `2`, for example, will double the animation's speed. A negative value can be used to reverse the animation. This
         * value can be changed without causing the animation to restart.
         */
        this.playbackRate = 1;
        /** Pauses the animation. The animation will resume when this prop is removed. */
        this.pause = false;
    }
    get element() {
        const slot = this.host.shadowRoot.querySelector('slot');
        return slot.assignedElements({ flatten: true })[0];
    }
    // Restart the animation when any of these properties change
    handleRestartAnimation() {
        this.createAnimation();
    }
    handlePauseChange() {
        this.pause ? this.animation.pause() : this.animation.play();
        if (!this.pause && !this.hasStarted) {
            this.hasStarted = true;
            this.slStart.emit();
        }
    }
    handlePlaybackRateChange() {
        this.animation.playbackRate = this.playbackRate;
    }
    connectedCallback() {
        this.handleAnimationFinish = this.handleAnimationFinish.bind(this);
        this.handleAnimationCancel = this.handleAnimationCancel.bind(this);
    }
    componentDidLoad() {
        this.createAnimation();
    }
    disconnectedCallback() {
        this.destroyAnimation();
    }
    handleAnimationFinish() {
        this.slFinish.emit();
    }
    handleAnimationCancel() {
        this.slCancel.emit();
    }
    createAnimation() {
        const easing = easings.hasOwnProperty(this.easing) ? easings[this.easing] : this.easing;
        const keyframes = this.keyframes ? this.keyframes : animations[this.name];
        this.destroyAnimation();
        this.animation = this.element.animate(keyframes, {
            delay: this.delay,
            direction: this.direction,
            duration: this.duration,
            easing,
            endDelay: this.endDelay,
            fill: this.fill,
            iterationStart: this.iterationStart,
            iterations: this.iterations
        });
        this.animation.playbackRate = this.playbackRate;
        this.animation.addEventListener('cancel', this.handleAnimationCancel);
        this.animation.addEventListener('finish', this.handleAnimationFinish);
        if (this.pause) {
            this.animation.pause();
        }
        else {
            this.hasStarted = true;
            this.slStart.emit();
        }
    }
    destroyAnimation() {
        if (this.animation) {
            this.animation.cancel();
            this.animation.removeEventListener('cancel', this.handleAnimationCancel);
            this.animation.removeEventListener('finish', this.handleAnimationFinish);
            this.animation = null;
            this.hasStarted = false;
        }
    }
    /** Clears all KeyframeEffects caused by this animation and aborts its playback. */
    async cancel() {
        try {
            this.animation.cancel();
        }
        catch (_a) { }
    }
    /** Sets the playback time to the end of the animation corresponding to the current playback direction. */
    async finish() {
        try {
            this.animation.finish();
        }
        catch (_a) { }
    }
    /** Gets a list of all supported animation names. */
    async getAnimationNames() {
        return Object.entries(animations).map(([name]) => name);
    }
    /** Gets a list of all supported easing function names. */
    async getEasingNames() {
        return Object.entries(easings).map(([name]) => name);
    }
    /** Gets the current time of the animation in milliseconds. */
    async getCurrentTime() {
        return this.animation.currentTime;
    }
    /** Sets the current time of the animation in milliseconds. */
    async setCurrentTime(time) {
        this.animation.currentTime = time;
    }
    render() {
        return h("slot", null);
    }
    get host() { return this; }
    static get watchers() { return {
        "delay": ["handleRestartAnimation"],
        "direction": ["handleRestartAnimation"],
        "easing": ["handleRestartAnimation"],
        "endDelay": ["handleRestartAnimation"],
        "fill": ["handleRestartAnimation"],
        "iterations": ["handleRestartAnimation"],
        "iterationStart": ["handleRestartAnimation"],
        "keyframes": ["handleRestartAnimation"],
        "name": ["handleRestartAnimation"],
        "pause": ["handlePauseChange"],
        "playbackRate": ["handlePlaybackRateChange"]
    }; }
    static get style() { return animationCss; }
};

const avatarCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block;--size:3rem}.avatar{display:inline-flex;align-items:center;justify-content:center;position:relative;width:var(--size);height:var(--size);background-color:var(--sl-color-gray-80);font-family:var(--sl-font-sans);font-size:calc(var(--size) * 0.5);font-weight:var(--sl-font-weight-normal);color:var(--sl-color-white);overflow:hidden;user-select:none;vertical-align:middle}.avatar--circle{border-radius:var(--sl-border-radius-circle)}.avatar--rounded{border-radius:var(--sl-border-radius-medium)}.avatar--square{border-radius:0}.avatar__icon{display:flex;align-items:center;justify-content:center;position:absolute;top:0;left:0;width:100%;height:100%}.avatar__initials{line-height:1;text-transform:uppercase}.avatar__image{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover}";

const Avatar = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.hasError = false;
        /** The image source to use for the avatar. */
        this.image = '';
        /** Alternative text for the image. */
        this.alt = '';
        /** Initials to use as a fallback when no image is available (1-2 characters max recommended). */
        this.initials = '';
        /** The shape of the avatar. */
        this.shape = 'circle';
    }
    connectedCallback() {
        this.handleImageError = this.handleImageError.bind(this);
    }
    handleImageError() {
        this.hasError = true;
    }
    render() {
        return (h("div", { part: "base", class: {
                avatar: true,
                'avatar--circle': this.shape === 'circle',
                'avatar--rounded': this.shape === 'rounded',
                'avatar--square': this.shape === 'square'
            }, role: "image", "aria-label": this.alt }, !this.initials && (h("div", { part: "icon", class: "avatar__icon" }, h("slot", { name: "icon" }, h("sl-icon", { name: "person-fill" })))), this.initials && (h("div", { part: "initials", class: "avatar__initials" }, this.initials)), this.image && !this.hasError && (h("img", { part: "image", class: "avatar__image", src: this.image, onError: this.handleImageError }))));
    }
    static get style() { return avatarCss; }
};

const badgeCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-flex}.badge{display:inline-flex;align-items:center;justify-content:center;font-size:var(--sl-font-size-x-small);font-weight:var(--sl-font-weight-semibold);letter-spacing:var(--sl-letter-spacing-normal);line-height:1;border-radius:var(--sl-border-radius-small);white-space:nowrap;padding:3px 6px;user-select:none;cursor:inherit}.badge--primary{background-color:var(--sl-color-primary-50);color:var(--sl-color-white)}.badge--success{background-color:var(--sl-color-success-50);color:var(--sl-color-white)}.badge--info{background-color:var(--sl-color-info-50);color:var(--sl-color-white)}.badge--warning{background-color:var(--sl-color-warning-50);color:var(--sl-color-white)}.badge--danger{background-color:var(--sl-color-danger-50);color:var(--sl-color-white)}.badge--pill{border-radius:var(--sl-border-radius-pill)}.badge--pulse{animation:pulse 1.5s infinite}.badge--pulse.badge--primary{--pulse-hue:var(--sl-color-primary-hue);--pulse-saturation:var(--sl-color-primary-saturation)}.badge--pulse.badge--success{--pulse-hue:var(--sl-color-success-hue);--pulse-saturation:var(--sl-color-success-saturation)}.badge--pulse.badge--info{--pulse-hue:var(--sl-color-info-hue);--pulse-saturation:var(--sl-color-info-saturation)}.badge--pulse.badge--warning{--pulse-hue:var(--sl-color-warning-hue);--pulse-saturation:var(--sl-color-warning-saturation)}.badge--pulse.badge--danger{--pulse-hue:var(--sl-color-danger-hue);--pulse-saturation:var(--sl-color-danger-saturation)}@keyframes pulse{0%{box-shadow:0 0 0 0 hsla(var(--pulse-hue), var(--pulse-saturation), 50%, 0.75)}70%{box-shadow:0 0 0 0.5rem hsla(var(--pulse-hue), var(--pulse-saturation), 50%, 0)}100%{box-shadow:0 0 0 0 hsla(var(--pulse-hue), var(--pulse-saturation), 50%, 0)}}";

const Badge = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** The badge's type. */
        this.type = 'primary';
        /** Set to true to draw a pill-style badge with rounded edges. */
        this.pill = false;
        /** Set to true to make the badge pulsate to draw attention. */
        this.pulse = false;
    }
    render() {
        return (h("span", { ref: el => (this.badge = el), part: "base", class: {
                badge: true,
                // Types
                'badge--primary': this.type === 'primary',
                'badge--success': this.type === 'success',
                'badge--info': this.type === 'info',
                'badge--warning': this.type === 'warning',
                'badge--danger': this.type === 'danger',
                'badge--text': this.type === 'text',
                'badge--pill': this.pill,
                'badge--pulse': this.pulse
            }, role: "status" }, h("slot", null)));
    }
    static get style() { return badgeCss; }
};

const buttonCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block;width:auto;cursor:pointer}.button{display:inline-flex;align-items:stretch;justify-content:center;width:100%;border-style:solid;border-width:var(--sl-input-border-width);font-family:var(--sl-input-font-family);font-weight:var(--sl-font-weight-semibold);text-decoration:none;user-select:none;white-space:nowrap;vertical-align:middle;transition:var(--sl-transition-fast) background-color, var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;cursor:inherit}.button::-moz-focus-inner{border:0}.button:focus{outline:none}.button[disabled]{opacity:0.5;cursor:not-allowed}.button ::slotted(sl-icon){pointer-events:none}.button__prefix,.button__suffix{flex:0 0 auto;display:flex;align-items:center}.button__prefix ::slotted(:first-child){margin-left:calc(-1 * var(--sl-spacing-x-small));margin-right:var(--sl-spacing-x-small)}.button__suffix ::slotted(:last-child){margin-left:var(--sl-spacing-x-small);margin-right:calc(-1 * var(--sl-spacing-x-small))}.button__label ::slotted(sl-icon){vertical-align:-2px}.button.button--default{background-color:var(--sl-color-white);border-color:var(--sl-color-gray-80);color:var(--sl-color-gray-40)}.button.button--default:hover:not(.button--disabled){background-color:var(--sl-color-primary-95);border-color:var(--sl-color-primary-80);color:var(--sl-color-primary-40)}.button.button--default:focus:not(.button--disabled){background-color:var(--sl-color-primary-95);border-color:var(--sl-color-primary-70);color:var(--sl-color-primary-40);box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-primary-hue), var(--sl-color-primary-saturation), 50%, var(--sl-focus-ring-alpha))}.button.button--default:active:not(.button--disabled){background-color:var(--sl-color-primary-95);border-color:var(--sl-color-primary-50);color:var(--sl-color-primary-30)}.button.button--primary{background-color:var(--sl-color-primary-50);border-color:var(--sl-color-primary-50);color:var(--sl-color-primary-text)}.button.button--primary:hover:not(.button--disabled){background-color:var(--sl-color-primary-60);border-color:var(--sl-color-primary-60);color:var(--sl-color-primary-text)}.button.button--primary:focus:not(.button--disabled){background-color:var(--sl-color-primary-60);border-color:var(--sl-color-primary-60);color:var(--sl-color-primary-text);box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-primary-hue), var(--sl-color-primary-saturation), 50%, var(--sl-focus-ring-alpha))}.button.button--primary:active:not(.button--disabled){background-color:var(--sl-color-primary-50);border-color:var(--sl-color-primary-50);color:var(--sl-color-primary-text)}.button.button--success{background-color:var(--sl-color-success-50);border-color:var(--sl-color-success-50);color:var(--sl-color-success-text)}.button.button--success:hover:not(.button--disabled){background-color:var(--sl-color-success-60);border-color:var(--sl-color-success-60);color:var(--sl-color-success-text)}.button.button--success:focus:not(.button--disabled){background-color:var(--sl-color-success-60);border-color:var(--sl-color-success-60);color:var(--sl-color-success-text);box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-success-hue), var(--sl-color-success-saturation), 50%, var(--sl-focus-ring-alpha))}.button.button--success:active:not(.button--disabled){background-color:var(--sl-color-success-50);border-color:var(--sl-color-success-50);color:var(--sl-color-success-text)}.button.button--info{background-color:var(--sl-color-info-50);border-color:var(--sl-color-info-50);color:var(--sl-color-info-text)}.button.button--info:hover:not(.button--disabled){background-color:var(--sl-color-info-60);border-color:var(--sl-color-info-60);color:var(--sl-color-info-text)}.button.button--info:focus:not(.button--disabled){background-color:var(--sl-color-info-60);border-color:var(--sl-color-info-60);color:var(--sl-color-info-text);box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-info-hue), var(--sl-color-info-saturation), 50%, var(--sl-focus-ring-alpha))}.button.button--info:active:not(.button--disabled){background-color:var(--sl-color-info-50);border-color:var(--sl-color-info-50);color:var(--sl-color-info-text)}.button.button--warning{background-color:var(--sl-color-warning-50);border-color:var(--sl-color-warning-50);color:var(--sl-color-warning-text)}.button.button--warning:hover:not(.button--disabled){background-color:var(--sl-color-warning-60);border-color:var(--sl-color-warning-60);color:var(--sl-color-warning-text)}.button.button--warning:focus:not(.button--disabled){background-color:var(--sl-color-warning-60);border-color:var(--sl-color-warning-60);color:var(--sl-color-warning-text);box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-warning-hue), var(--sl-color-warning-saturation), 50%, var(--sl-focus-ring-alpha))}.button.button--warning:active:not(.button--disabled){background-color:var(--sl-color-warning-50);border-color:var(--sl-color-warning-50);color:var(--sl-color-warning-text)}.button.button--danger{background-color:var(--sl-color-danger-50);border-color:var(--sl-color-danger-50);color:var(--sl-color-danger-text)}.button.button--danger:hover:not(.button--disabled){background-color:var(--sl-color-danger-60);border-color:var(--sl-color-danger-60);color:var(--sl-color-danger-text)}.button.button--danger:focus:not(.button--disabled){background-color:var(--sl-color-danger-60);border-color:var(--sl-color-danger-60);color:var(--sl-color-danger-text);box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-danger-hue), var(--sl-color-danger-saturation), 50%, var(--sl-focus-ring-alpha))}.button.button--danger:active:not(.button--disabled){background-color:var(--sl-color-danger-50);border-color:var(--sl-color-danger-50);color:var(--sl-color-danger-text)}.button--text{background-color:transparent;border-color:transparent;color:var(--sl-color-primary-50)}.button--text:hover:not(.button--disabled){background-color:transparent;border-color:transparent;color:var(--sl-color-primary-60)}.button--text:focus:not(.button--disabled){background-color:transparent;border-color:transparent;color:var(--sl-color-primary-60);box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-primary-hue), var(--sl-color-primary-saturation), 50%, var(--sl-focus-ring-alpha))}.button--text:active:not(.button--disabled){background-color:transparent;border-color:transparent;color:var(--sl-color-primary-40)}.button--small{font-size:var(--sl-button-font-size-small);height:var(--sl-input-height-small);line-height:calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);border-radius:var(--sl-input-border-radius-small);padding:0 var(--sl-spacing-medium)}.button--medium{font-size:var(--sl-button-font-size-medium);height:var(--sl-input-height-medium);line-height:calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);border-radius:var(--sl-input-border-radius-medium);padding:0 var(--sl-spacing-large)}.button--large{font-size:var(--sl-button-font-size-large);height:var(--sl-input-height-large);line-height:calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);border-radius:var(--sl-input-border-radius-large);padding:0 var(--sl-spacing-x-large)}.button--pill.button--small{border-radius:var(--sl-input-height-small)}.button--pill.button--medium{border-radius:var(--sl-input-height-medium)}.button--pill.button--large{border-radius:var(--sl-input-height-large)}.button--circle{padding-left:0;padding-right:0}.button--circle.button--small{width:var(--sl-input-height-small);border-radius:50%}.button--circle.button--medium{width:var(--sl-input-height-medium);border-radius:50%}.button--circle.button--large{width:var(--sl-input-height-large);border-radius:50%}.button--circle .button__prefix,.button--circle .button__suffix,.button--circle .button__caret{display:none}.button--caret .button__suffix{display:none}.button--caret .button__caret{display:flex;align-items:center;margin-left:var(--sl-spacing-xx-small);margin-right:calc(-1 * var(--sl-spacing-xx-small))}.button--caret .button__caret svg{width:1em;height:1em}.button--loading{position:relative;cursor:wait}.button--loading .button__prefix,.button--loading .button__label,.button--loading .button__suffix,.button--loading .button__caret{visibility:hidden}.button--loading sl-spinner{--indicator-color:currentColor;--stroke-width:1px;position:absolute;height:1em;width:1em;top:calc(50% - 0.5em);left:calc(50% - 0.5em)}.button ::slotted(sl-badge){position:absolute;top:0;right:0;transform:translateY(-50%) translateX(50%);pointer-events:none}";

const Button = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slBlur = createEvent(this, "slBlur", 7);
        this.slFocus = createEvent(this, "slFocus", 7);
        this.hasFocus = false;
        /** The button's type. */
        this.type = 'default';
        /** The button's size. */
        this.size = 'medium';
        /** Set to true to draw the button with a caret for use with dropdowns, popovers, etc. */
        this.caret = false;
        /** Set to true to disable the button. */
        this.disabled = false;
        /** Set to true to draw the button in a loading state. */
        this.loading = false;
        /** Set to true to draw a pill-style button with rounded edges. */
        this.pill = false;
        /** Set to true to draw a circle button. */
        this.circle = false;
        /** Indicates if activating the button should submit the form. Ignored when `href` is set. */
        this.submit = false;
    }
    connectedCallback() {
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    /** Sets focus on the button. */
    async setFocus() {
        this.button.focus();
    }
    /** Removes focus from the button. */
    async removeFocus() {
        this.button.blur();
    }
    handleBlur() {
        this.hasFocus = false;
        this.slBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.slFocus.emit();
    }
    handleClick(event) {
        if (this.disabled || this.loading) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    render() {
        const isLink = this.href ? true : false;
        const isButton = !isLink;
        const Button = isLink ? 'a' : 'button';
        return (h(Button, { ref: el => (this.button = el), part: "base", class: {
                button: true,
                // Types
                'button--default': this.type === 'default',
                'button--primary': this.type === 'primary',
                'button--success': this.type === 'success',
                'button--info': this.type === 'info',
                'button--warning': this.type === 'warning',
                'button--danger': this.type === 'danger',
                'button--text': this.type === 'text',
                // Sizes
                'button--small': this.size === 'small',
                'button--medium': this.size === 'medium',
                'button--large': this.size === 'large',
                // Modifiers
                'button--caret': this.caret,
                'button--circle': this.circle,
                'button--disabled': this.disabled,
                'button--focused': this.hasFocus,
                'button--loading': this.loading,
                'button--pill': this.pill
            }, disabled: this.disabled, type: isButton ? (this.submit ? 'submit' : 'button') : null, name: isButton ? this.name : null, value: isButton ? this.value : null, href: isLink && this.href, target: isLink && this.target ? this.target : null, download: isLink && this.download ? this.download : null, rel: isLink && this.target ? 'noreferrer noopener' : null, onBlur: this.handleBlur, onFocus: this.handleFocus, onClick: this.handleClick }, h("span", { part: "prefix", class: "button__prefix" }, h("slot", { name: "prefix" })), h("span", { part: "label", class: "button__label" }, h("slot", null)), h("span", { part: "suffix", class: "button__suffix" }, h("slot", { name: "suffix" })), this.caret && (h("span", { part: "caret", class: "button__caret" }, h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("polyline", { points: "6 9 12 15 18 9" })))), this.loading && h("sl-spinner", null)));
    }
    static get style() { return buttonCss; }
};

const buttonGroupCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block}.button-group{display:flex;flex-wrap:nowrap;position:relative}::slotted(.sl-hover){z-index:1}::slotted(.sl-focus){z-index:2}";

const ButtonGroup = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** A label to use for the button groups `aria-label` attribute. */
        this.label = '';
    }
    connectedCallback() {
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    componentDidLoad() {
        this.buttonGroup.addEventListener('slFocus', this.handleFocus);
        this.buttonGroup.addEventListener('slBlur', this.handleBlur);
    }
    disconnectedCallback() {
        this.buttonGroup.removeEventListener('slFocus', this.handleFocus);
        this.buttonGroup.removeEventListener('slBlur', this.handleBlur);
    }
    handleFocus(event) {
        const button = event.target;
        button.classList.add('sl-focus');
    }
    handleBlur(event) {
        const button = event.target;
        button.classList.remove('sl-focus');
    }
    render() {
        return (h("div", { ref: el => (this.buttonGroup = el), part: "base", class: "button-group", "aria-label": this.label }, h("slot", null)));
    }
    static get style() { return buttonGroupCss; }
};

//
//
// Given a slot, this function iterates over all of its assigned text nodes and returns the concatenated text as a
// string. This is useful because we can't use slot.textContent as an alternative.
//
function getTextContent(slot) {
    const nodes = slot.assignedNodes({ flatten: true });
    let text = '';
    [...nodes].map(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            text += node.textContent;
        }
    });
    return text;
}
//
// Determines whether a slot with the given name exists in an element.
//
function hasSlot(el, name) {
    return [...el.querySelectorAll('[slot]')].filter((slottedEl) => slottedEl.slot === name).length > 0;
}

const cardCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--border-color:var(--sl-color-gray-90);--border-radius:var(--sl-border-radius-medium);--border-width:1px;--padding:var(--sl-spacing-large);display:inline-block}.card{display:flex;flex-direction:column;background-color:var(--sl-color-white);box-shadow:var(--sl-shadow-x-small);border:solid var(--border-width) var(--border-color);border-radius:var(--border-radius)}.card__image{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);margin:calc(-1 * var(--border-width));overflow:hidden}.card__image ::slotted(img){display:block;width:100%}.card:not(.card--has-image) .card__image{display:none}.card__header{border-bottom:solid var(--border-width) var(--border-color);padding:calc(var(--padding) / 2) var(--padding)}.card:not(.card--has-header) .card__header{display:none}.card__body{padding:var(--padding)}.card--has-footer .card__footer{border-top:solid var(--border-width) var(--border-color);padding:var(--padding)}.card:not(.card--has-footer) .card__footer{display:none}";

const Card = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.hasFooter = false;
        this.hasImage = false;
        this.hasHeader = false;
    }
    componentWillLoad() {
        this.updateSlots();
        this.host.shadowRoot.addEventListener('slotchange', this.updateSlots);
    }
    disconnectedCallback() {
        this.host.shadowRoot.removeEventListener('slotchange', this.updateSlots);
    }
    updateSlots() {
        this.hasFooter = hasSlot(this.host, 'footer');
        this.hasImage = hasSlot(this.host, 'image');
        this.hasHeader = hasSlot(this.host, 'header');
    }
    render() {
        return (h("div", { part: "base", class: {
                card: true,
                'card--has-footer': this.hasFooter,
                'card--has-image': this.hasImage,
                'card--has-header': this.hasHeader
            } }, h("div", { part: "image", class: "card__image" }, h("slot", { name: "image" })), h("div", { part: "header", class: "card__header" }, h("slot", { name: "header" })), h("div", { part: "body", class: "card__body" }, h("slot", null)), h("div", { part: "footer", class: "card__footer" }, h("slot", { name: "footer" }))));
    }
    get host() { return this; }
    static get style() { return cardCss; }
};

const checkboxCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block}.checkbox{display:inline-flex;align-items:center;font-family:var(--sl-input-font-family);font-size:var(--sl-input-font-size-medium);font-weight:var(--sl-input-font-weight);color:var(--sl-input-color);vertical-align:middle;cursor:pointer}.checkbox__control{position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--sl-toggle-size);height:var(--sl-toggle-size);border:solid var(--sl-input-border-width) var(--sl-input-border-color);border-radius:2px;background-color:var(--sl-input-background-color);color:var(--sl-color-white);transition:var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color, var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow}.checkbox__control input[type=checkbox]{position:absolute;opacity:0;padding:0;margin:0;pointer-events:none;-webkit-appearance:none}.checkbox__control .checkbox__icon{display:inline-flex;width:var(--sl-toggle-size);height:var(--sl-toggle-size)}.checkbox__control .checkbox__icon svg{width:100%;height:100%}.checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover{border-color:var(--sl-input-border-color-hover);background-color:var(--sl-input-background-color-hover)}.checkbox.checkbox--focused:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control{border-color:var(--sl-input-border-color-focus);background-color:var(--sl-input-background-color-focus);box-shadow:var(--sl-focus-ring-box-shadow)}.checkbox--checked .checkbox__control,.checkbox--indeterminate .checkbox__control{border-color:var(--sl-color-primary-50);background-color:var(--sl-color-primary-50)}.checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,.checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover{border-color:var(--sl-color-primary-60);background-color:var(--sl-color-primary-60)}.checkbox.checkbox--checked:not(.checkbox--disabled).checkbox--focused .checkbox__control,.checkbox.checkbox--indeterminate:not(.checkbox--disabled).checkbox--focused .checkbox__control{border-color:var(--sl-color-primary-60);background-color:var(--sl-color-primary-60);box-shadow:var(--sl-focus-ring-box-shadow)}.checkbox--disabled{opacity:0.5;cursor:not-allowed}.checkbox__label{line-height:var(--sl-toggle-size);margin-left:0.5em;user-select:none}";

let id = 0;
const Checkbox = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slBlur = createEvent(this, "slBlur", 7);
        this.slChange = createEvent(this, "slChange", 7);
        this.slFocus = createEvent(this, "slFocus", 7);
        this.inputId = `checkbox-${++id}`;
        this.labelId = `checkbox-label-${id}`;
        this.hasFocus = false;
        /** Set to true to disable the checkbox. */
        this.disabled = false;
        /** Set to true to draw the checkbox in a checked state. */
        this.checked = false;
        /** Set to true to draw the checkbox in an indeterminate state. */
        this.indeterminate = false;
    }
    handleCheckedChange() {
        this.input.checked = this.checked;
        this.input.indeterminate = this.indeterminate;
        this.slChange.emit();
    }
    connectedCallback() {
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }
    componentDidLoad() {
        this.input.indeterminate = this.indeterminate;
    }
    /** Sets focus on the checkbox. */
    async setFocus() {
        this.input.focus();
    }
    /** Removes focus from the checkbox. */
    async removeFocus() {
        this.input.blur();
    }
    handleClick() {
        this.checked = this.input.checked;
        this.indeterminate = this.input.indeterminate;
    }
    handleBlur() {
        this.hasFocus = false;
        this.slBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.slFocus.emit();
    }
    handleMouseDown(event) {
        // Prevent clicks on the label from briefly blurring the input
        event.preventDefault();
        this.input.focus();
    }
    render() {
        return (h("label", { part: "base", class: {
                checkbox: true,
                'checkbox--checked': this.checked,
                'checkbox--disabled': this.disabled,
                'checkbox--focused': this.hasFocus,
                'checkbox--indeterminate': this.indeterminate
            }, htmlFor: this.inputId, role: "checkbox", onMouseDown: this.handleMouseDown }, h("span", { part: "control", class: "checkbox__control" }, this.checked && (h("span", { part: "checked-icon", class: "checkbox__icon" }, h("svg", { viewBox: "0 0 16 16" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd", "stroke-linecap": "round" }, h("g", { stroke: "currentColor", "stroke-width": "2" }, h("g", { transform: "translate(3.428571, 3.428571)" }, h("path", { d: "M0,5.71428571 L3.42857143,9.14285714" }), h("path", { d: "M9.14285714,0 L3.42857143,9.14285714" }))))))), !this.checked && this.indeterminate && (h("span", { part: "indeterminate-icon", class: "checkbox__icon" }, h("svg", { viewBox: "0 0 16 16" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd", "stroke-linecap": "round" }, h("g", { stroke: "currentColor", "stroke-width": "2" }, h("g", { transform: "translate(2.285714, 6.857143)" }, h("path", { d: "M10.2857143,1.14285714 L1.14285714,1.14285714" }))))))), h("input", { ref: el => (this.input = el), id: this.inputId, type: "checkbox", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, "aria-labeledby": this.labelId, onClick: this.handleClick, onBlur: this.handleBlur, onFocus: this.handleFocus })), h("span", { part: "label", id: this.labelId, class: "checkbox__label" }, h("slot", null))));
    }
    static get watchers() { return {
        "checked": ["handleCheckedChange"],
        "indeterminate": ["handleCheckedChange"]
    }; }
    static get style() { return checkboxCss; }
};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
    return commonjsRequire();
  }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var colorName = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

var isArrayish = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};

var simpleSwizzle = createCommonjsModule(function (module) {



var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};
});

var colorString = createCommonjsModule(function (module) {
/* MIT license */



var reverseNames = {};

// create a list of reverse color names
for (var name in colorName) {
	if (colorName.hasOwnProperty(name)) {
		reverseNames[colorName[name]] = name;
	}
}

var cs = module.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorName[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = simpleSwizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = simpleSwizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = simpleSwizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = simpleSwizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = simpleSwizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}
});

var conversions = createCommonjsModule(function (module) {
/* MIT license */


// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in colorName) {
	if (colorName.hasOwnProperty(key)) {
		reverseKeywords[colorName[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in colorName) {
		if (colorName.hasOwnProperty(keyword)) {
			var value = colorName[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return colorName[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};
});

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

var route = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

var colorConvert = convert;

var _slice = [].slice;

var skippedModels = [
	// to be honest, I don't really feel like keyword belongs in color convert, but eh.
	'keyword',

	// gray conflicts with some method names, and has its own method defined.
	'gray',

	// shouldn't really be in color-convert either...
	'hex'
];

var hashedModelKeys = {};
Object.keys(colorConvert).forEach(function (model) {
	hashedModelKeys[_slice.call(colorConvert[model].labels).sort().join('')] = model;
});

var limiters = {};

function Color(obj, model) {
	if (!(this instanceof Color)) {
		return new Color(obj, model);
	}

	if (model && model in skippedModels) {
		model = null;
	}

	if (model && !(model in colorConvert)) {
		throw new Error('Unknown model: ' + model);
	}

	var i;
	var channels;

	if (obj == null) { // eslint-disable-line no-eq-null,eqeqeq
		this.model = 'rgb';
		this.color = [0, 0, 0];
		this.valpha = 1;
	} else if (obj instanceof Color) {
		this.model = obj.model;
		this.color = obj.color.slice();
		this.valpha = obj.valpha;
	} else if (typeof obj === 'string') {
		var result = colorString.get(obj);
		if (result === null) {
			throw new Error('Unable to parse color from string: ' + obj);
		}

		this.model = result.model;
		channels = colorConvert[this.model].channels;
		this.color = result.value.slice(0, channels);
		this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
	} else if (obj.length) {
		this.model = model || 'rgb';
		channels = colorConvert[this.model].channels;
		var newArr = _slice.call(obj, 0, channels);
		this.color = zeroArray(newArr, channels);
		this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
	} else if (typeof obj === 'number') {
		// this is always RGB - can be converted later on.
		obj &= 0xFFFFFF;
		this.model = 'rgb';
		this.color = [
			(obj >> 16) & 0xFF,
			(obj >> 8) & 0xFF,
			obj & 0xFF
		];
		this.valpha = 1;
	} else {
		this.valpha = 1;

		var keys = Object.keys(obj);
		if ('alpha' in obj) {
			keys.splice(keys.indexOf('alpha'), 1);
			this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
		}

		var hashedKeys = keys.sort().join('');
		if (!(hashedKeys in hashedModelKeys)) {
			throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
		}

		this.model = hashedModelKeys[hashedKeys];

		var labels = colorConvert[this.model].labels;
		var color = [];
		for (i = 0; i < labels.length; i++) {
			color.push(obj[labels[i]]);
		}

		this.color = zeroArray(color);
	}

	// perform limitations (clamping, etc.)
	if (limiters[this.model]) {
		channels = colorConvert[this.model].channels;
		for (i = 0; i < channels; i++) {
			var limit = limiters[this.model][i];
			if (limit) {
				this.color[i] = limit(this.color[i]);
			}
		}
	}

	this.valpha = Math.max(0, Math.min(1, this.valpha));

	if (Object.freeze) {
		Object.freeze(this);
	}
}

Color.prototype = {
	toString: function () {
		return this.string();
	},

	toJSON: function () {
		return this[this.model]();
	},

	string: function (places) {
		var self = this.model in colorString.to ? this : this.rgb();
		self = self.round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to[self.model](args);
	},

	percentString: function (places) {
		var self = this.rgb().round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to.rgb.percent(args);
	},

	array: function () {
		return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
	},

	object: function () {
		var result = {};
		var channels = colorConvert[this.model].channels;
		var labels = colorConvert[this.model].labels;

		for (var i = 0; i < channels; i++) {
			result[labels[i]] = this.color[i];
		}

		if (this.valpha !== 1) {
			result.alpha = this.valpha;
		}

		return result;
	},

	unitArray: function () {
		var rgb = this.rgb().color;
		rgb[0] /= 255;
		rgb[1] /= 255;
		rgb[2] /= 255;

		if (this.valpha !== 1) {
			rgb.push(this.valpha);
		}

		return rgb;
	},

	unitObject: function () {
		var rgb = this.rgb().object();
		rgb.r /= 255;
		rgb.g /= 255;
		rgb.b /= 255;

		if (this.valpha !== 1) {
			rgb.alpha = this.valpha;
		}

		return rgb;
	},

	round: function (places) {
		places = Math.max(places || 0, 0);
		return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
	},

	alpha: function (val) {
		if (arguments.length) {
			return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
		}

		return this.valpha;
	},

	// rgb
	red: getset('rgb', 0, maxfn(255)),
	green: getset('rgb', 1, maxfn(255)),
	blue: getset('rgb', 2, maxfn(255)),

	hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }), // eslint-disable-line brace-style

	saturationl: getset('hsl', 1, maxfn(100)),
	lightness: getset('hsl', 2, maxfn(100)),

	saturationv: getset('hsv', 1, maxfn(100)),
	value: getset('hsv', 2, maxfn(100)),

	chroma: getset('hcg', 1, maxfn(100)),
	gray: getset('hcg', 2, maxfn(100)),

	white: getset('hwb', 1, maxfn(100)),
	wblack: getset('hwb', 2, maxfn(100)),

	cyan: getset('cmyk', 0, maxfn(100)),
	magenta: getset('cmyk', 1, maxfn(100)),
	yellow: getset('cmyk', 2, maxfn(100)),
	black: getset('cmyk', 3, maxfn(100)),

	x: getset('xyz', 0, maxfn(100)),
	y: getset('xyz', 1, maxfn(100)),
	z: getset('xyz', 2, maxfn(100)),

	l: getset('lab', 0, maxfn(100)),
	a: getset('lab', 1),
	b: getset('lab', 2),

	keyword: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorConvert[this.model].keyword(this.color);
	},

	hex: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorString.to.hex(this.rgb().round().color);
	},

	rgbNumber: function () {
		var rgb = this.rgb().color;
		return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.rgb().color;

		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	isDark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.rgb().color;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	isLight: function () {
		return !this.isDark();
	},

	negate: function () {
		var rgb = this.rgb();
		for (var i = 0; i < 3; i++) {
			rgb.color[i] = 255 - rgb.color[i];
		}
		return rgb;
	},

	lighten: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] += hsl.color[2] * ratio;
		return hsl;
	},

	darken: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] -= hsl.color[2] * ratio;
		return hsl;
	},

	saturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] += hsl.color[1] * ratio;
		return hsl;
	},

	desaturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] -= hsl.color[1] * ratio;
		return hsl;
	},

	whiten: function (ratio) {
		var hwb = this.hwb();
		hwb.color[1] += hwb.color[1] * ratio;
		return hwb;
	},

	blacken: function (ratio) {
		var hwb = this.hwb();
		hwb.color[2] += hwb.color[2] * ratio;
		return hwb;
	},

	grayscale: function () {
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var rgb = this.rgb().color;
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return Color.rgb(val, val, val);
	},

	fade: function (ratio) {
		return this.alpha(this.valpha - (this.valpha * ratio));
	},

	opaquer: function (ratio) {
		return this.alpha(this.valpha + (this.valpha * ratio));
	},

	rotate: function (degrees) {
		var hsl = this.hsl();
		var hue = hsl.color[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		hsl.color[0] = hue;
		return hsl;
	},

	mix: function (mixinColor, weight) {
		// ported from sass implementation in C
		// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		if (!mixinColor || !mixinColor.rgb) {
			throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
		}
		var color1 = mixinColor.rgb();
		var color2 = this.rgb();
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return Color.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue(),
				color1.alpha() * p + color2.alpha() * (1 - p));
	}
};

// model conversion methods and static constructors
Object.keys(colorConvert).forEach(function (model) {
	if (skippedModels.indexOf(model) !== -1) {
		return;
	}

	var channels = colorConvert[model].channels;

	// conversion methods
	Color.prototype[model] = function () {
		if (this.model === model) {
			return new Color(this);
		}

		if (arguments.length) {
			return new Color(arguments, model);
		}

		var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
		return new Color(assertArray(colorConvert[this.model][model].raw(this.color)).concat(newAlpha), model);
	};

	// 'static' construction methods
	Color[model] = function (color) {
		if (typeof color === 'number') {
			color = zeroArray(_slice.call(arguments), channels);
		}
		return new Color(color, model);
	};
});

function roundTo(num, places) {
	return Number(num.toFixed(places));
}

function roundToPlace(places) {
	return function (num) {
		return roundTo(num, places);
	};
}

function getset(model, channel, modifier) {
	model = Array.isArray(model) ? model : [model];

	model.forEach(function (m) {
		(limiters[m] || (limiters[m] = []))[channel] = modifier;
	});

	model = model[0];

	return function (val) {
		var result;

		if (arguments.length) {
			if (modifier) {
				val = modifier(val);
			}

			result = this[model]();
			result.color[channel] = val;
			return result;
		}

		result = this[model]().color[channel];
		if (modifier) {
			result = modifier(result);
		}

		return result;
	};
}

function maxfn(max) {
	return function (v) {
		return Math.max(0, Math.min(max, v));
	};
}

function assertArray(val) {
	return Array.isArray(val) ? val : [val];
}

function zeroArray(arr, length) {
	for (var i = 0; i < length; i++) {
		if (typeof arr[i] !== 'number') {
			arr[i] = 0;
		}
	}

	return arr;
}

var color = Color;

//
// Ensures a number stays within a minimum and maximum value
//
function clamp(value, min, max) {
    if (value < min)
        return min;
    if (value > max)
        return max;
    return value;
}

const colorPickerCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--grid-width:260px;--grid-height:200px;--grid-handle-size:12px;--slider-height:10px;--slider-handle-size:12px;display:inline-block}.color-picker{width:var(--grid-width);font-family:var(--sl-font-sans);font-size:var(--sl-font-size-medium);font-weight:var(--sl-font-weight-normal);color:var(--color);background-color:var(--sl-color-white);border-radius:var(--sl-border-radius-medium);user-select:none}.color-picker--inline{border:solid 1px var(--sl-color-gray-90);box-shadow:var(--sl-shadow-small)}.color-picker__grid{position:relative;height:var(--grid-height);background-image:linear-gradient(to bottom, white 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0) 50%, black 100%), linear-gradient(to right, gray 0%, rgba(128, 128, 128, 0) 100%);border-top-left-radius:var(--sl-border-radius-medium);border-top-right-radius:var(--sl-border-radius-medium);cursor:crosshair}.color-picker__grid-handle{position:absolute;width:var(--grid-handle-size);height:var(--grid-handle-size);border-radius:50%;box-shadow:0 0 0 1px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25);border:solid 2px white;margin-top:calc(var(--grid-handle-size) / -2);margin-left:calc(var(--grid-handle-size) / -2)}.color-picker__grid-handle:focus{outline:none;box-shadow:0 0 0 1px hsl(var(--sl-focus-ring-hue), var(--sl-focus-ring-saturation), var(--sl-focus-ring-lightness)), inset 0 0 0 1px hsl(var(--sl-focus-ring-hue), var(--sl-focus-ring-saturation), var(--sl-focus-ring-lightness)), var(--sl-focus-ring-box-shadow)}.color-picker__controls{padding:var(--sl-spacing-small);display:flex;align-items:center}.color-picker__sliders{flex:1 1 auto}.color-picker__slider{position:relative;height:var(--slider-height);border-radius:var(--sl-border-radius-pill);box-shadow:inset 0 0 0 1px rgba(0, 0, 0, 0.2)}.color-picker__slider:not(:last-of-type){margin-bottom:var(--sl-spacing-small)}.color-picker__slider-handle{position:absolute;top:calc(50% - var(--slider-handle-size) / 2);width:var(--slider-handle-size);height:var(--slider-handle-size);background-color:white;border-radius:50%;box-shadow:0 0 0 1px rgba(0, 0, 0, 0.25);margin-left:calc(var(--slider-handle-size) / -2)}.color-picker__slider-handle:focus{outline:none;box-shadow:0 0 0 1px hsl(var(--sl-color-primary-hue), var(--sl-color-primary-saturation), 50%), var(--sl-focus-ring-box-shadow)}.color-picker__hue{background-image:linear-gradient(to right, red 0%, yellow 17%, lime 33%, aqua 50%, blue 67%, fuchsia 83%, red 100%)}.color-picker__alpha .color-picker__alpha-gradient{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:inherit}.color-picker__preview{flex:0 0 auto;position:relative;width:var(--sl-input-height-small);height:var(--sl-input-height-small);border-radius:50%;margin-left:var(--sl-spacing-medium)}.color-picker__preview::before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;border-radius:inherit;background-color:currentColor;box-shadow:inset 0 0 0 1px rgba(0, 0, 0, 0.2)}.color-picker__preview-color{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:inherit;border:solid 1px rgba(0, 0, 0, 0.125)}.color-picker__user-input{display:flex;padding:0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small)}.color-picker__user-input sl-input{min-width:0;flex:1 1 auto}.color-picker__user-input sl-button{flex:0 0 auto;margin-left:var(--sl-spacing-medium)}.color-picker__swatches{display:grid;grid-template-columns:repeat(8, 1fr);grid-gap:6px;justify-items:center;border-top:solid 1px var(--sl-color-gray-90);padding:var(--sl-spacing-small)}.color-picker__swatch{flex:0 0 auto;position:relative;width:20px;height:20px;border-radius:2px}.color-picker__swatch .color-picker__swatch-color{position:absolute;top:0;left:0;width:100%;height:100%;border:solid 1px rgba(0, 0, 0, 0.125);border-radius:inherit;cursor:pointer}.color-picker__swatch:focus{outline:none;box-shadow:var(--sl-focus-ring-box-shadow)}.color-picker__transparent-bg{background-image:linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(45deg, #eee 25%, transparent 25%);background-size:10px 10px;background-position:0 0, 0 0, -5px -5px, 5px 5px}.color-picker--disabled{opacity:0.5;cursor:not-allowed}.color-picker--disabled .color-picker__grid,.color-picker--disabled .color-picker__grid-handle,.color-picker--disabled .color-picker__slider,.color-picker--disabled .color-picker__slider-handle,.color-picker--disabled .color-picker__preview,.color-picker--disabled .color-picker__swatch,.color-picker--disabled .color-picker__swatch-color{pointer-events:none}.color-dropdown::part(panel){max-height:none;overflow:visible}.color-dropdown__trigger{display:inline-block;position:relative;background-color:transparent;border:none;cursor:pointer;transition:var(--sl-transition-fast) box-shadow;-webkit-appearance:none}.color-dropdown__trigger.color-dropdown__trigger--small{width:var(--sl-input-height-small);height:var(--sl-input-height-small);border-radius:var(--sl-border-radius-circle)}.color-dropdown__trigger.color-dropdown__trigger--medium{width:var(--sl-input-height-medium);height:var(--sl-input-height-medium);border-radius:var(--sl-border-radius-circle)}.color-dropdown__trigger.color-dropdown__trigger--large{width:var(--sl-input-height-large);height:var(--sl-input-height-large);border-radius:var(--sl-border-radius-circle)}.color-dropdown__trigger::before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;border-radius:inherit;background-color:currentColor;box-shadow:inset 0 0 0 1px rgba(0, 0, 0, 0.25);transition:inherit}.color-dropdown__trigger:focus{outline:none}.color-dropdown__trigger:focus:not(.color-dropdown__trigger--disabled){box-shadow:var(--sl-focus-ring-box-shadow);outline:none}.color-dropdown__trigger:focus:not(.color-dropdown__trigger--disabled)::before{box-shadow:inset 0 0 0 1px var(--sl-color-primary-50)}.color-dropdown__trigger.color-dropdown__trigger--disabled{opacity:0.5;cursor:not-allowed}";

const ColorPicker = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slChange = createEvent(this, "slChange", 7);
        this.slShow = createEvent(this, "slShow", 7);
        this.slAfterShow = createEvent(this, "slAfterShow", 7);
        this.slHide = createEvent(this, "slHide", 7);
        this.slAfterHide = createEvent(this, "slAfterHide", 7);
        this.bypassValueParse = false;
        this.textInputValue = '';
        this.hue = 0;
        this.saturation = 100;
        this.lightness = 100;
        this.alpha = 100;
        this.showCopyCheckmark = false;
        /** The current color. */
        this.value = '#ffffff';
        /**
         * The format to use for the display value. If opacity is enabled, these will translate to HEXA, RGBA, and HSLA
         * respectively. The color picker will always accept user input in any format (including CSS color names) and convert
         * it to the desired format.
         */
        this.format = 'hex';
        /** Set to true to render the color picker inline rather than inside a dropdown. */
        this.inline = false;
        /** When `inline` is true, this determines the size of the color picker's trigger. */
        this.size = 'medium';
        /** Set to true to disable the color picker. */
        this.disabled = false;
        /** Whether to show the opacity slider. */
        this.opacity = false;
        /** By default, the value will be set in lowercase. Set this to true to set it in uppercase instead. */
        this.uppercase = false;
        /**
         * An array of predefined color swatches to display. Can include any format the color picker can parse, including
         * HEX(A), RGB(A), HSL(A), and CSS color names.
         */
        this.swatches = [
            '#d0021b',
            '#f5a623',
            '#f8e71c',
            '#8b572a',
            '#7ed321',
            '#417505',
            '#bd10e0',
            '#9013fe',
            '#4a90e2',
            '#50e3c2',
            '#b8e986',
            '#000',
            '#444',
            '#888',
            '#ccc',
            '#fff'
        ];
    }
    handleValueChange(newValue, oldValue) {
        if (!this.bypassValueParse) {
            const newColor = this.parseColor(newValue);
            if (newColor) {
                this.textInputValue = this.value;
                this.hue = newColor.hsla.h;
                this.saturation = newColor.hsla.s;
                this.lightness = newColor.hsla.l;
                this.alpha = newColor.hsla.a * 100;
            }
            else {
                this.textInputValue = oldValue;
            }
        }
        if (this.value !== this.lastValueEmitted) {
            this.slChange.emit();
            this.lastValueEmitted = this.value;
        }
    }
    connectedCallback() {
        this.handleAlphaDrag = this.handleAlphaDrag.bind(this);
        this.handleAlphaInput = this.handleAlphaInput.bind(this);
        this.handleAlphaKeyDown = this.handleAlphaKeyDown.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDropdownAfterHide = this.handleDropdownAfterHide.bind(this);
        this.handleDropdownAfterShow = this.handleDropdownAfterShow.bind(this);
        this.handleDropdownHide = this.handleDropdownHide.bind(this);
        this.handleDropdownShow = this.handleDropdownShow.bind(this);
        this.handleGridDrag = this.handleGridDrag.bind(this);
        this.handleGridKeyDown = this.handleGridKeyDown.bind(this);
        this.handleHueDrag = this.handleHueDrag.bind(this);
        this.handleHueInput = this.handleHueInput.bind(this);
        this.handleHueKeyDown = this.handleHueKeyDown.bind(this);
        this.handleLightnessInput = this.handleLightnessInput.bind(this);
        this.handleSaturationInput = this.handleSaturationInput.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleTextInputKeyDown = this.handleTextInputKeyDown.bind(this);
    }
    componentWillLoad() {
        if (!this.setColor(this.value)) {
            this.setColor(`#ffff`);
        }
        this.textInputValue = this.value;
        this.lastValueEmitted = this.value;
        this.syncValues();
    }
    handleCopy() {
        this.textInput.select().then(() => {
            document.execCommand('copy');
            this.copyButton.setFocus();
            this.showCopyCheckmark = true;
            setTimeout(() => (this.showCopyCheckmark = false), 1000);
        });
    }
    handleHueInput(event) {
        const target = event.target;
        this.hue = clamp(Number(target.value), 0, 360);
    }
    handleSaturationInput(event) {
        const target = event.target;
        this.saturation = clamp(Number(target.value), 0, 100);
    }
    handleLightnessInput(event) {
        const target = event.target;
        this.lightness = clamp(Number(target.value), 0, 100);
    }
    handleAlphaInput(event) {
        const target = event.target;
        this.alpha = clamp(Number(target.value), 0, 100);
    }
    handleAlphaDrag(event) {
        const container = this.host.shadowRoot.querySelector('.color-picker__slider.color-picker__alpha');
        const handle = container.querySelector('.color-picker__slider-handle');
        const { width } = container.getBoundingClientRect();
        handle.focus();
        event.preventDefault();
        this.handleDrag(event, container, x => {
            this.alpha = clamp((x / width) * 100, 0, 100);
            this.syncValues();
        });
    }
    handleHueDrag(event) {
        const container = this.host.shadowRoot.querySelector('.color-picker__slider.color-picker__hue');
        const handle = container.querySelector('.color-picker__slider-handle');
        const { width } = container.getBoundingClientRect();
        handle.focus();
        event.preventDefault();
        this.handleDrag(event, container, x => {
            this.hue = clamp((x / width) * 360, 0, 360);
            this.syncValues();
        });
    }
    handleGridDrag(event) {
        const grid = this.host.shadowRoot.querySelector('.color-picker__grid');
        const handle = grid.querySelector('.color-picker__grid-handle');
        const { width, height } = grid.getBoundingClientRect();
        handle.focus();
        event.preventDefault();
        this.handleDrag(event, grid, (x, y) => {
            this.saturation = clamp((x / width) * 100, 0, 100);
            this.lightness = clamp(100 - (y / height) * 100, 0, 100);
            this.syncValues();
        });
    }
    handleDrag(event, container, onMove) {
        if (this.disabled) {
            return false;
        }
        const move = (event) => {
            const dims = container.getBoundingClientRect();
            const offsetX = dims.left + container.ownerDocument.defaultView.pageXOffset;
            const offsetY = dims.top + container.ownerDocument.defaultView.pageYOffset;
            const x = (event.changedTouches ? event.changedTouches[0].pageX : event.pageX) - offsetX;
            const y = (event.changedTouches ? event.changedTouches[0].pageY : event.pageY) - offsetY;
            onMove(x, y);
        };
        // Move on init
        move(event);
        const stop = () => {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('touchmove', move);
            document.removeEventListener('mouseup', stop);
            document.removeEventListener('touchend', stop);
        };
        document.addEventListener('mousemove', move);
        document.addEventListener('touchmove', move);
        document.addEventListener('mouseup', stop);
        document.addEventListener('touchend', stop);
    }
    handleAlphaKeyDown(event) {
        const increment = event.shiftKey ? 10 : 1;
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this.alpha = clamp(this.alpha - increment, 0, 100);
            this.syncValues();
        }
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.alpha = clamp(this.alpha + increment, 0, 100);
            this.syncValues();
        }
        if (event.key === 'Home') {
            event.preventDefault();
            this.alpha = 0;
            this.syncValues();
        }
        if (event.key === 'End') {
            event.preventDefault();
            this.alpha = 100;
            this.syncValues();
        }
    }
    handleHueKeyDown(event) {
        const increment = event.shiftKey ? 10 : 1;
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this.hue = clamp(this.hue - increment, 0, 360);
            this.syncValues();
        }
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.hue = clamp(this.hue + increment, 0, 360);
            this.syncValues();
        }
        if (event.key === 'Home') {
            event.preventDefault();
            this.hue = 0;
            this.syncValues();
        }
        if (event.key === 'End') {
            event.preventDefault();
            this.hue = 360;
            this.syncValues();
        }
    }
    handleGridKeyDown(event) {
        const increment = event.shiftKey ? 10 : 1;
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this.saturation = clamp(this.saturation - increment, 0, 100);
            this.syncValues();
        }
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.saturation = clamp(this.saturation + increment, 0, 100);
            this.syncValues();
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.lightness = clamp(this.lightness + increment, 0, 100);
            this.syncValues();
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.lightness = clamp(this.lightness - increment, 0, 100);
            this.syncValues();
        }
    }
    handleTextInputChange(event) {
        const target = event.target;
        this.setColor(target.value);
        target.value = this.value;
        event.stopPropagation();
    }
    handleTextInputKeyDown(event) {
        if (event.key === 'Enter') {
            this.setColor(this.textInput.value);
            this.textInput.value = this.value;
            setTimeout(() => this.textInput.select());
        }
    }
    handleDocumentMouseDown(event) {
        const target = event.target;
        // Close when clicking outside of the dropdown
        if (target.closest('sl-color-picker') !== this.host) {
            this.dropdown.hide();
        }
    }
    handleDropdownShow(event) {
        event.stopPropagation();
        this.slShow.emit();
    }
    handleDropdownAfterShow(event) {
        event.stopPropagation();
        this.slAfterShow.emit();
    }
    handleDropdownHide(event) {
        event.stopPropagation();
        this.slHide.emit();
    }
    handleDropdownAfterHide(event) {
        event.stopPropagation();
        this.slAfterHide.emit();
    }
    normalizeColorString(colorString) {
        //
        // The color module we're using doesn't parse % values for the alpha channel in RGBA and HSLA. It also doesn't parse
        // hex colors when the # is missing. This pre-parser tries to normalize these edge cases to provide a better
        // experience for users who type in color values.
        //
        if (/rgba?/i.test(colorString)) {
            const rgba = colorString
                .replace(/[^\d.%]/g, ' ')
                .split(' ')
                .map(val => val.trim())
                .filter(val => val.length);
            if (rgba.length < 4) {
                rgba[3] = '1';
            }
            if (rgba[3].indexOf('%') > -1) {
                rgba[3] = (Number(rgba[3].replace(/%/g, '')) / 100).toString();
            }
            return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
        }
        if (/hsla?/i.test(colorString)) {
            const hsla = colorString
                .replace(/[^\d.%]/g, ' ')
                .split(' ')
                .map(val => val.trim())
                .filter(val => val.length);
            if (hsla.length < 4) {
                hsla[3] = '1';
            }
            if (hsla[3].indexOf('%') > -1) {
                hsla[3] = (Number(hsla[3].replace(/%/g, '')) / 100).toString();
            }
            return `hsla(${hsla[0]}, ${hsla[1]}, ${hsla[2]}, ${hsla[3]})`;
        }
        if (/^[0-9a-f]+$/i.test(colorString)) {
            return `#${colorString}`;
        }
        return colorString;
    }
    parseColor(colorString) {
        function toHex(value) {
            const hex = Math.round(value).toString(16);
            return hex.length === 1 ? `0${hex}` : hex;
        }
        let parsed;
        // The color module has a weak parser, so we normalize certain things to make the user experience better
        colorString = this.normalizeColorString(colorString);
        try {
            parsed = color(colorString);
        }
        catch (_a) {
            return false;
        }
        const hsl = {
            h: parsed.hsl().color[0],
            s: parsed.hsl().color[1],
            l: parsed.hsl().color[2],
            a: parsed.hsl().valpha
        };
        const rgb = {
            r: parsed.rgb().color[0],
            g: parsed.rgb().color[1],
            b: parsed.rgb().color[2],
            a: parsed.rgb().valpha
        };
        const hex = {
            r: toHex(parsed.rgb().color[0]),
            g: toHex(parsed.rgb().color[1]),
            b: toHex(parsed.rgb().color[2]),
            a: toHex(parsed.rgb().valpha * 255)
        };
        return {
            hsl: {
                h: hsl.h,
                s: hsl.s,
                l: hsl.l,
                string: this.setLetterCase(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`)
            },
            hsla: {
                h: hsl.h,
                s: hsl.s,
                l: hsl.l,
                a: hsl.a,
                string: this.setLetterCase(`hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${Number(hsl.a.toFixed(2).toString())})`)
            },
            rgb: {
                r: rgb.r,
                g: rgb.g,
                b: rgb.b,
                string: this.setLetterCase(`rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`)
            },
            rgba: {
                r: rgb.r,
                g: rgb.g,
                b: rgb.b,
                a: rgb.a,
                string: this.setLetterCase(`rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${Number(rgb.a.toFixed(2).toString())})`)
            },
            hex: this.setLetterCase(`#${hex.r}${hex.g}${hex.b}`),
            hexa: this.setLetterCase(`#${hex.r}${hex.g}${hex.b}${hex.a}`)
        };
    }
    setColor(colorString) {
        const newColor = this.parseColor(colorString);
        if (!newColor) {
            return false;
        }
        this.hue = newColor.hsla.h;
        this.saturation = newColor.hsla.s;
        this.lightness = newColor.hsla.l;
        this.alpha = this.opacity ? newColor.hsla.a * 100 : 100;
        this.syncValues();
        return true;
    }
    setLetterCase(string) {
        return this.uppercase ? string.toUpperCase() : string.toLowerCase();
    }
    syncValues() {
        const currentColor = this.parseColor(`hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`);
        if (!currentColor) {
            return false;
        }
        // Update the value
        if (this.format === 'hsl') {
            this.textInputValue = this.opacity ? currentColor.hsla.string : currentColor.hsl.string;
        }
        else if (this.format === 'rgb') {
            this.textInputValue = this.opacity ? currentColor.rgba.string : currentColor.rgb.string;
        }
        else {
            this.textInputValue = this.opacity ? currentColor.hexa : currentColor.hex;
        }
        // Setting this.value will trigger the watcher which parses the new color. We want to bypass that behavior because
        // a) we've already done it in this function and b) conversion/rounding can lead to values changing slightly.
        this.bypassValueParse = true;
        this.value = this.textInputValue;
        this.bypassValueParse = false;
    }
    render() {
        const x = this.saturation;
        const y = 100 - this.lightness;
        const ColorPicker = () => {
            return (h("div", { part: "base", class: {
                    'color-picker': true,
                    'color-picker--inline': this.inline,
                    'color-picker--disabled': this.disabled
                }, "aria-disabled": this.disabled }, h("div", { part: "grid", class: "color-picker__grid", style: {
                    backgroundColor: `hsl(${this.hue}deg, 100%, 50%)`
                }, onMouseDown: this.handleGridDrag, onTouchStart: this.handleGridDrag }, h("span", { part: "grid-handle", class: "color-picker__grid-handle", style: {
                    top: `${y}%`,
                    left: `${x}%`
                }, role: "slider", "aria-label": "HSL", "aria-valuetext": `hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, ${Math.round(this.lightness)}%)`, tabIndex: this.disabled ? null : 0, onKeyDown: this.handleGridKeyDown })), h("div", { class: "color-picker__controls" }, h("div", { class: "color-picker__sliders" }, h("div", { part: "slider", class: "color-picker__hue color-picker__slider", onMouseDown: this.handleHueDrag, onTouchStart: this.handleHueDrag }, h("span", { part: "slider-handle", class: "color-picker__slider-handle", style: {
                    left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`
                }, role: "slider", "aria-label": "hue", "aria-orientation": "horizontal", "aria-valuemin": "0", "aria-valuemax": "360", "aria-valuenow": Math.round(this.hue), tabIndex: this.disabled ? null : 0, onKeyDown: this.handleHueKeyDown })), this.opacity && (h("div", { part: "slider", class: "color-picker__alpha color-picker__slider color-picker__transparent-bg", onMouseDown: this.handleAlphaDrag, onTouchStart: this.handleAlphaDrag }, h("div", { class: "color-picker__alpha-gradient", style: {
                    backgroundImage: `linear-gradient(
                      to right,
                      hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0%) 0%,
                      hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%) 100%
                      )`
                } }), h("span", { part: "slider-handle", class: "color-picker__slider-handle", style: {
                    left: `${this.alpha}%`
                }, role: "slider", "aria-label": "alpha", "aria-orientation": "horizontal", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": Math.round(this.alpha), tabIndex: this.disabled ? null : 0, onKeyDown: this.handleAlphaKeyDown })))), h("div", { part: "preview", class: "color-picker__preview color-picker__transparent-bg", style: {
                    color: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
                } })), h("div", { class: "color-picker__user-input" }, h("sl-input", { ref: el => (this.textInput = el), part: "input", size: "small", type: "text", pattern: "[a-fA-F\\d]+", value: this.textInputValue, disabled: this.disabled, onKeyDown: this.handleTextInputKeyDown, onSlChange: this.handleTextInputChange }), h("sl-button", { ref: el => (this.copyButton = el), part: "copy-button", slot: "suffix", class: "color-picker__copy-button", size: "small", circle: true, onClick: this.handleCopy }, h("sl-icon", { name: this.showCopyCheckmark ? 'check2' : 'clipboard' }))), this.swatches && (h("div", { part: "swatches", class: "color-picker__swatches" }, this.swatches.map(swatch => (h("div", { part: "swatch", class: "color-picker__swatch color-picker__transparent-bg", tabIndex: this.disabled ? null : 0, role: "button", "aria-label": swatch, onClick: () => !this.disabled && this.setColor(swatch), onKeyDown: event => !this.disabled && event.key === 'Enter' && this.setColor(swatch) }, h("div", { class: "color-picker__swatch-color", style: { backgroundColor: swatch } }))))))));
        };
        // Render inline
        if (this.inline) {
            return h(ColorPicker, null);
        }
        // Render as a dropdown
        return (h("sl-dropdown", { ref: el => (this.dropdown = el), class: "color-dropdown", "aria-disabled": this.disabled, containingElement: this.host, onSlShow: this.handleDropdownShow, onSlAfterShow: this.handleDropdownAfterShow, onSlHide: this.handleDropdownHide, onSlAfterHide: this.handleDropdownAfterHide }, h("button", { ref: el => (this.trigger = el), slot: "trigger", class: {
                'color-dropdown__trigger': true,
                'color-dropdown__trigger--disabled': this.disabled,
                'color-dropdown__trigger--small': this.size === 'small',
                'color-dropdown__trigger--medium': this.size === 'medium',
                'color-dropdown__trigger--large': this.size === 'large',
                'color-picker__transparent-bg': true
            }, style: {
                color: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
            }, type: "button" }), h(ColorPicker, null)));
    }
    get host() { return this; }
    static get watchers() { return {
        "value": ["handleValueChange"]
    }; }
    static get style() { return colorPickerCss; }
};

//
// Simulates :focus-visible behavior on an element by watching for certain keyboard and mouse heuristics and toggling a
// `focus-visible` class. Works at the component level so no global polyfill is necessary.
//
// This will eventually be removed pending better :focus-visible support: https://caniuse.com/#search=focus-visible
//
const listeners = new WeakMap();
function observe(el) {
    const keys = ['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageDown', 'PageUp'];
    const is = (event) => {
        if (keys.includes(event.key)) {
            el.classList.add('focus-visible');
        }
    };
    const isNot = () => el.classList.remove('focus-visible');
    listeners.set(el, { is, isNot });
    el.addEventListener('keydown', is);
    el.addEventListener('keyup', is);
    el.addEventListener('mousedown', isNot);
    el.addEventListener('mousedown', isNot);
}
function unobserve(el) {
    const { is, isNot } = listeners.get(el);
    el.classList.remove('focus-visible');
    el.removeEventListener('keydown', is);
    el.removeEventListener('keyup', is);
    el.removeEventListener('mousedown', isNot);
    el.removeEventListener('mousedown', isNot);
}
const focusVisible = {
    observe,
    unobserve
};

const detailsCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--hide-duration:var(--sl-transition-medium);--hide-timing-function:ease;--show-duration:var(--sl-transition-medium);--show-timing-function:ease;display:block}.details{border:solid 1px var(--sl-color-gray-90);border-radius:var(--sl-border-radius-medium)}.details--disabled{opacity:0.5}.details__header{display:flex;align-items:center;border-radius:inherit;padding:var(--sl-spacing-medium);user-select:none;cursor:pointer}.details__header:focus{outline:none}.focus-visible .details__header:focus{box-shadow:var(--sl-focus-ring-box-shadow)}.details--disabled .details__header{cursor:not-allowed}.details--disabled .details__header:focus{outline:none;box-shadow:none}.details__summary{flex:1 1 auto;display:flex;align-items:center}.details__summary-icon{flex:0 0 auto;display:flex;align-items:center;transition:var(--sl-transition-medium) transform ease}.details--open .details__summary-icon{transform:rotate(90deg)}.details__body{height:0;overflow:hidden;transition-property:height;transition-duration:var(--hide-duration);transition-timing-function:var(--hide-timing-function)}.details--open .details__body{transition-duration:var(--show-duration);transition-timing-function:var(--show-timing-function)}.details__content{padding:var(--sl-spacing-medium)}";

let id$1 = 0;
const Details = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slShow = createEvent(this, "slShow", 7);
        this.slAfterShow = createEvent(this, "slAfterShow", 7);
        this.slHide = createEvent(this, "slHide", 7);
        this.slAfterHide = createEvent(this, "slAfterHide", 7);
        this.componentId = `details-${++id$1}`;
        /** Indicates whether or not the details is open. You can use this in lieu of the show/hide methods. */
        this.open = false;
        /** The summary to show in the details header. If you need to display HTML, use the `summary` slot instead. */
        this.summary = '';
        /** Set to true to prevent the user from toggling the details. */
        this.disabled = false;
    }
    handleOpenChange() {
        this.open ? this.show() : this.hide();
    }
    connectedCallback() {
        this.handleBodyTransitionEnd = this.handleBodyTransitionEnd.bind(this);
        this.handleSummaryClick = this.handleSummaryClick.bind(this);
        this.handleSummaryKeyDown = this.handleSummaryKeyDown.bind(this);
    }
    componentDidLoad() {
        focusVisible.observe(this.details);
        // Show on init if open
        if (this.open) {
            this.show();
        }
    }
    disconnectedCallback() {
        focusVisible.unobserve(this.details);
    }
    /** Shows the alert. */
    async show() {
        const slShow = this.slShow.emit();
        if (slShow.defaultPrevented) {
            return false;
        }
        if (this.body.scrollHeight === 0) {
            // When the scroll height can't be measured, use auto. This prevents a borked open state when the details is open
            // intiially, but not immediately visible (i.e. in a tab panel).
            this.body.style.height = 'auto';
            this.body.style.overflow = 'visible';
        }
        else {
            this.body.style.height = `${this.body.scrollHeight}px`;
            this.body.style.overflow = 'hidden';
        }
        this.open = true;
    }
    /** Hides the alert */
    async hide() {
        const slHide = this.slHide.emit();
        if (slHide.defaultPrevented) {
            return false;
        }
        // We can't transition out of `height: auto`, so let's set it to the current height first
        this.body.style.height = `${this.body.scrollHeight}px`;
        this.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            this.body.style.height = '0';
        });
        this.open = false;
    }
    handleBodyTransitionEnd(event) {
        const target = event.target;
        // Ensure we only emit one event when the target element is no longer visible
        if (event.propertyName === 'height' && target.classList.contains('details__body')) {
            this.body.style.overflow = this.open ? 'visible' : 'hidden';
            this.body.style.height = this.open ? 'auto' : '0';
            this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();
        }
    }
    handleSummaryClick() {
        if (!this.disabled) {
            this.open ? this.hide() : this.show();
            this.header.focus();
        }
    }
    handleSummaryKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.open ? this.hide() : this.show();
        }
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            event.preventDefault();
            this.hide();
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            event.preventDefault();
            this.show();
        }
    }
    render() {
        return (h("div", { ref: el => (this.details = el), part: "base", class: {
                details: true,
                'details--open': this.open,
                'details--disabled': this.disabled
            } }, h("header", { ref: el => (this.header = el), part: "header", id: `${this.componentId}-header`, class: "details__header", role: "button", "aria-expanded": this.open, "aria-controls": `${this.componentId}-content`, "aria-disabled": this.disabled, tabIndex: this.disabled ? -1 : 0, onClick: this.handleSummaryClick, onKeyDown: this.handleSummaryKeyDown }, h("div", { part: "summary", class: "details__summary" }, h("slot", { name: "summary" }, this.summary)), h("span", { part: "summary-icon", class: "details__summary-icon" }, h("sl-icon", { name: "chevron-right" }))), h("div", { ref: el => (this.body = el), class: "details__body", onTransitionEnd: this.handleBodyTransitionEnd }, h("div", { part: "content", id: `${this.componentId}-content`, class: "details__content", role: "region", "aria-labeledby": `${this.componentId}-header` }, h("slot", null)))));
    }
    static get watchers() { return {
        "open": ["handleOpenChange"]
    }; }
    static get style() { return detailsCss; }
};

//
// Returns an element's offset relative to its parent. Similar to element.offsetTop and element.offsetLeft, except the
// parent doesn't have to be positioned relative or absolute.
//
// NOTE: This was created to work around what appears to be a bug in Chrome where a slotted element's offsetParent
// seems to ignore elements inside the surrounding shadow DOM: https://bugs.chromium.org/p/chromium/issues/detail?id=920069
//
function getOffset(element, parent) {
    return {
        top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
        left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left)
    };
}

const locks = new Set();
//
// Prevents body scrolling. Keeps track of which elements requested a lock so multiple levels of locking are possible
// without premature unlocking.
//
function lockBodyScrolling(lockingEl) {
    locks.add(lockingEl);
    document.body.classList.add('sl-scroll-lock');
}
//
// Unlocks body scrolling. Scrolling will only be unlocked once all elements that requested a lock call this method.
//
function unlockBodyScrolling(lockingEl) {
    locks.delete(lockingEl);
    if (locks.size === 0) {
        document.body.classList.remove('sl-scroll-lock');
    }
}
//
// Scrolls an element into view of its container. If the element is already in view, nothing will happen.
//
function scrollIntoView(element, container, direction = 'vertical') {
    const offset = getOffset(element, container);
    const offsetTop = offset.top + container.scrollTop;
    const offsetLeft = offset.left + container.scrollLeft;
    const minX = container.scrollLeft;
    const maxX = container.scrollLeft + container.offsetWidth;
    const minY = container.scrollTop;
    const maxY = container.scrollTop + container.offsetHeight;
    if (direction === 'horizontal' || direction === 'both') {
        if (offsetLeft < minX) {
            container.scrollTo({ left: offsetLeft, behavior: 'smooth' });
        }
        else if (offsetLeft + element.clientWidth > maxX) {
            container.scrollTo({ left: offsetLeft - container.offsetWidth + element.clientWidth, behavior: 'smooth' });
        }
    }
    if (direction === 'vertical' || direction === 'both') {
        if (offsetTop < minY) {
            container.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
        else if (offsetTop + element.clientHeight > maxY) {
            container.scrollTo({ top: offsetTop - container.offsetHeight + element.clientHeight, behavior: 'smooth' });
        }
    }
}

const dialogCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--width:31rem;display:contents}.dialog{display:flex;align-items:center;justify-content:center;position:fixed;top:0;right:0;bottom:0;left:0;z-index:var(--sl-z-index-dialog)}.dialog[hidden]{display:none}.dialog__panel{display:flex;flex-direction:column;z-index:2;width:var(--width);max-width:calc(100vw - var(--sl-spacing-xx-large));max-height:calc(100vh - var(--sl-spacing-xx-large));background-color:var(--sl-color-white);border-radius:var(--sl-border-radius-medium);box-shadow:var(--sl-shadow-x-large);opacity:0;transform:scale(0.8);transition:var(--sl-transition-medium) opacity, var(--sl-transition-medium) transform}.dialog__panel:focus{outline:none}@media screen and (max-width: 420px){.dialog__panel{max-height:calc(80vh)}}.dialog--open .dialog__panel{display:flex;opacity:1;transform:scale(1)}.dialog__header{display:flex}.dialog__title{flex:1 1 auto;font-size:var(--sl-font-size-large);line-height:var(--sl-line-height-dense);padding:var(--sl-spacing-large)}.dialog__close{flex:0 0 auto;display:flex;align-items:center;font-size:var(--sl-font-size-x-large);padding:0 var(--sl-spacing-large)}.dialog__body{padding:var(--sl-spacing-large);overflow:auto;-webkit-overflow-scrolling:touch}.dialog__footer{text-align:right;padding:var(--sl-spacing-large)}.dialog__footer ::slotted(sl-button:not(:first-of-type)){margin-left:var(--sl-spacing-x-small)}.dialog:not(.dialog--has-footer) .dialog__footer{display:none}.dialog__overlay{position:fixed;top:0;right:0;bottom:0;left:0;background-color:var(--sl-overlay-background-color);opacity:0;transition:var(--sl-transition-medium) opacity}.dialog--open .dialog__overlay{opacity:1}";

let id$2 = 0;
const Dialog = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slShow = createEvent(this, "slShow", 7);
        this.slAfterShow = createEvent(this, "slAfterShow", 7);
        this.slHide = createEvent(this, "slHide", 7);
        this.slAfterHide = createEvent(this, "slAfterHide", 7);
        this.slOverlayDismiss = createEvent(this, "slOverlayDismiss", 7);
        this.componentId = `dialog-${++id$2}`;
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
            }, onKeyDown: this.handleKeyDown, onTransitionEnd: this.handleTransitionEnd, hidden: true }, h("div", { part: "overlay", class: "dialog__overlay", onClick: this.handleOverlayClick }), h("div", { ref: el => (this.panel = el), part: "panel", class: "dialog__panel", role: "dialog", "aria-modal": "true", "aria-hidden": !this.open, "aria-label": this.noHeader ? this.label : null, "aria-labeledby": !this.noHeader ? `${this.componentId}-title` : null, tabIndex: 0 }, !this.noHeader && (h("header", { part: "header", class: "dialog__header" }, h("span", { part: "title", class: "dialog__title", id: `${this.componentId}-title` }, this.label || String.fromCharCode(65279)), h("sl-icon-button", { part: "close-button", class: "dialog__close", name: "x", onClick: this.handleCloseClick }))), h("div", { part: "body", class: "dialog__body" }, h("slot", null)), h("footer", { part: "footer", class: "dialog__footer" }, h("slot", { name: "footer" })))));
    }
    get host() { return this; }
    static get watchers() { return {
        "open": ["handleOpenChange"]
    }; }
    static get style() { return dialogCss; }
};

const drawerCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--size:25rem;display:contents}.drawer{top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden}.drawer[hidden]{display:none}.drawer--contained{position:absolute;z-index:initial}.drawer--fixed{position:fixed;z-index:var(--sl-z-index-drawer)}.drawer__panel{position:absolute;display:flex;flex-direction:column;z-index:2;max-width:100%;max-height:100%;background-color:var(--sl-color-white);box-shadow:var(--sl-shadow-x-large);transition:var(--sl-transition-medium) transform;overflow:auto;pointer-events:all}.drawer__panel:focus{outline:none}.drawer--top .drawer__panel{top:0;right:auto;bottom:auto;left:0;width:100%;height:var(--size);transform:translate(0, -100%)}.drawer--right .drawer__panel{top:0;right:0;bottom:auto;left:auto;width:var(--size);height:100%;transform:translate(100%, 0)}.drawer--bottom .drawer__panel{top:auto;right:auto;bottom:0;left:0;width:100%;height:var(--size);transform:translate(0, 100%)}.drawer--left .drawer__panel{top:0;right:auto;bottom:auto;left:0;width:var(--size);height:100%;transform:translate(-100%, 0)}.drawer--open .drawer__panel{transform:translate(0, 0)}.drawer__header{display:flex}.drawer__title{flex:1 1 auto;font-size:var(--sl-font-size-large);line-height:var(--sl-line-height-dense);padding:var(--sl-spacing-large)}.drawer__close{flex:0 0 auto;display:flex;align-items:center;font-size:var(--sl-font-size-x-large);padding:0 var(--sl-spacing-large)}.drawer__body{flex:1 1 auto;padding:var(--sl-spacing-large);overflow:auto;-webkit-overflow-scrolling:touch}.drawer__footer{text-align:right;padding:var(--sl-spacing-large)}.drawer__footer ::slotted(sl-button:not(:last-of-type)){margin-right:var(--sl-spacing-x-small)}.drawer:not(.drawer--has-footer) .drawer__footer{display:none}.drawer__overlay{display:block;position:fixed;top:0;right:0;bottom:0;left:0;background-color:var(--sl-overlay-background-color);opacity:0;transition:var(--sl-transition-medium) opacity;pointer-events:all}.drawer--contained .drawer__overlay{position:absolute}.drawer--open .drawer__overlay{opacity:1}";

let id$3 = 0;
const Drawer = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slShow = createEvent(this, "slShow", 7);
        this.slAfterShow = createEvent(this, "slAfterShow", 7);
        this.slHide = createEvent(this, "slHide", 7);
        this.slAfterHide = createEvent(this, "slAfterHide", 7);
        this.slOverlayDismiss = createEvent(this, "slOverlayDismiss", 7);
        this.componentId = `drawer-${++id$3}`;
        this.hasFooter = false;
        /** Indicates whether or not the drawer is open. You can use this in lieu of the show/hide methods. */
        this.open = false;
        /**
         * The drawer's label as displayed in the header. You should always include a relevant label even when using
         * `no-header`, as it is required for proper accessibility.
         */
        this.label = '';
        /** The direction from which the drawer will open. */
        this.placement = 'right';
        /**
         * By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of
         * its parent element, set this prop and add `position: relative` to the parent.
         */
        this.contained = false;
        /**
         * Removes the header. This will also remove the default close button, so please ensure you provide an easy,
         * accessible way for users to dismiss the drawer.
         */
        this.noHeader = false;
    }
    handleOpenChange() {
        this.open ? this.show() : this.hide();
    }
    connectedCallback() {
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
        this.handleDocumentFocusIn = this.handleDocumentFocusIn.bind(this);
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
    /** Shows the drawer */
    async show() {
        const slShow = this.slShow.emit();
        if (slShow.defaultPrevented) {
            return false;
        }
        this.drawer.hidden = false;
        requestAnimationFrame(() => (this.open = true));
        // Lock body scrolling only if the drawer isn't contained
        if (!this.contained) {
            lockBodyScrolling(this.host);
        }
        document.addEventListener('focusin', this.handleDocumentFocusIn);
    }
    /** Hides the drawer */
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
        // Trap focus only if the drawer is NOT contained
        if (!this.contained && target.closest('sl-drawer') !== this.host) {
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
        if (event.propertyName === 'transform' && target.classList.contains('drawer__panel')) {
            this.drawer.hidden = !this.open;
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
        return (h("div", { ref: el => (this.drawer = el), part: "base", class: {
                drawer: true,
                'drawer--open': this.open,
                'drawer--top': this.placement === 'top',
                'drawer--right': this.placement === 'right',
                'drawer--bottom': this.placement === 'bottom',
                'drawer--left': this.placement === 'left',
                'drawer--contained': this.contained,
                'drawer--fixed': !this.contained,
                'drawer--has-footer': this.hasFooter
            }, onKeyDown: this.handleKeyDown, onTransitionEnd: this.handleTransitionEnd, hidden: true }, h("div", { part: "overlay", class: "drawer__overlay", onClick: this.handleOverlayClick }), h("div", { ref: el => (this.panel = el), part: "panel", class: "drawer__panel", role: "dialog", "aria-modal": "true", "aria-hidden": !this.open, "aria-label": this.noHeader ? this.label : null, "aria-labeledby": !this.noHeader ? `${this.componentId}-title` : null, tabIndex: 0 }, !this.noHeader && (h("header", { part: "header", class: "drawer__header" }, h("span", { part: "title", class: "drawer__title", id: `${this.componentId}-title` }, this.label || String.fromCharCode(65279)), h("sl-icon-button", { part: "close-button", class: "drawer__close", name: "x", onClick: this.handleCloseClick }))), h("div", { part: "body", class: "drawer__body" }, h("slot", null)), h("footer", { part: "footer", class: "drawer__footer" }, h("slot", { name: "footer" })))));
    }
    get host() { return this; }
    static get watchers() { return {
        "open": ["handleOpenChange"]
    }; }
    static get style() { return drawerCss; }
};

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

/*:: import type { Window } from '../types'; */

/*:: declare function getWindow(node: Node | Window): Window; */
function getWindow(node) {
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  return node;
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/*:: declare function isElement(node: mixed): boolean %checks(node instanceof
  Element); */

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
/*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
  HTMLElement); */


function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getDocumentElement(element) {
  // $FlowFixMe: assume body is always available
  return (isElement(element) ? element.ownerDocument : element.document).documentElement;
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement;
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (!isFixed) {
    if (getNodeName(offsetParent) !== 'body') {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement = getDocumentElement(offsetParent)) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.
function getLayoutRect(element) {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return element.parentNode || // DOM Element detected
  // $FlowFixMe: need a better way to handle this...
  element.host || // ShadowRoot detected
  document.ownerDocument || // Fallback to ownerDocument if available
  document.documentElement // Or to documentElement if everything else fails
  ;
}

function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node)) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle$1(node),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    if (/auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)) {
      return node;
    }
  }

  return getScrollParent(getParentNode(node));
}

function listScrollParents(element, list) {
  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = getNodeName(scrollParent) === 'body';
  var target = isBody ? getWindow(scrollParent) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

var isFirefox = function isFirefox() {
  return typeof window.InstallTrigger !== 'undefined';
};

function getTrueOffsetParent(element) {
  var offsetParent;

  if (!isHTMLElement(element) || !(offsetParent = element.offsetParent) || // https://github.com/popperjs/popper-core/issues/837
  isFirefox() && getComputedStyle$1(offsetParent).position === 'fixed') {
    return null;
  }

  return offsetParent;
}

function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element); // Find the nearest non-table offsetParent

  while (offsetParent && isTableElement(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static') {
    return window;
  }

  return offsetParent || window;
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements =
/*#__PURE__*/
basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements =
/*#__PURE__*/
[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, {}, current, {
      options: Object.assign({}, existing.options, {}, current.options),
      data: Object.assign({}, existing.data, {}, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, {}, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, {}, state.options, {}, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
}

const eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

function getVariation(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
}

const popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsets(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: Math.round(x * dpr) / dpr || 0,
    y: Math.round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive;

  var _roundOffsets = roundOffsets(offsets),
      x = _roundOffsets.x,
      y = _roundOffsets.y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
    } // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    /*:: offsetParent = (offsetParent: Element); */


    if (placement === top) {
      sideY = bottom;
      y -= offsetParent.clientHeight - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left) {
      sideX = right;
      x -= offsetParent.clientWidth - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref3) {
  var state = _ref3.state,
      options = _ref3.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  }; // popper offsets are always available

  state.styles.popper = Object.assign({}, state.styles.popper, {}, mapToStyles(Object.assign({}, commonStyles, {
    offsets: state.modifiersData.popperOffsets,
    position: state.options.strategy,
    adaptive: adaptive
  }))); // arrow offsets may not be available

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, {}, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
}

const computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$1(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: 'absolute',
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}

const applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$1,
  requires: ['computeStyles']
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;
  state.modifiersData.popperOffsets.x += x;
  state.modifiersData.popperOffsets.y += y;
  state.modifiersData[name] = data;
}

const offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

var hash$1 = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash$1[matched];
  });
}

function getViewportRect(element) {
  var win = getWindow(element);
  return {
    width: win.innerWidth,
    height: win.innerHeight,
    x: 0,
    y: 0
  };
}

function getDocumentRect(element) {
  var win = getWindow(element);
  var winScroll = getWindowScroll(element);
  var documentRect = getCompositeRect(getDocumentElement(element), win);
  documentRect.height = Math.max(documentRect.height, win.innerHeight);
  documentRect.width = Math.max(documentRect.width, win.innerWidth);
  documentRect.x = -winScroll.scrollLeft;
  documentRect.y = -winScroll.scrollTop;
  return documentRect;
}

function toNumber(cssValue) {
  return parseFloat(cssValue) || 0;
}

function getBorders(element) {
  var computedStyle = isHTMLElement(element) ? getComputedStyle$1(element) : {};
  return {
    top: toNumber(computedStyle.borderTopWidth),
    right: toNumber(computedStyle.borderRightWidth),
    bottom: toNumber(computedStyle.borderBottomWidth),
    left: toNumber(computedStyle.borderLeftWidth)
  };
}

function getDecorations(element) {
  var win = getWindow(element);
  var borders = getBorders(element);
  var isHTML = getNodeName(element) === 'html';
  var winScrollBarX = getWindowScrollBarX(element);
  var x = element.clientWidth + borders.right;
  var y = element.clientHeight + borders.bottom; // HACK:
  // document.documentElement.clientHeight on iOS reports the height of the
  // viewport including the bottom bar, even if the bottom bar isn't visible.
  // If the difference between window innerHeight and html clientHeight is more
  // than 50, we assume it's a mobile bottom bar and ignore scrollbars.
  // * A 50px thick scrollbar is likely non-existent (macOS is 15px and Windows
  //   is about 17px)
  // * The mobile bar is 114px tall

  if (isHTML && win.innerHeight - element.clientHeight > 50) {
    y = win.innerHeight - borders.bottom;
  }

  return {
    top: isHTML ? 0 : element.clientTop,
    right: // RTL scrollbar (scrolling containers only)
    element.clientLeft > borders.left ? borders.right : // LTR scrollbar
    isHTML ? win.innerWidth - x - winScrollBarX : element.offsetWidth - x,
    bottom: isHTML ? win.innerHeight - y : element.offsetHeight - y,
    left: isHTML ? winScrollBarX : element.clientLeft
  };
}

function contains(parent, child) {
  // $FlowFixMe: hasOwnProperty doesn't seem to work in tests
  var isShadow = Boolean(child.getRootNode && child.getRootNode().host); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (isShadow) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(element);
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement);
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    var decorations = getDecorations(isHTMLElement(clippingParent) ? clippingParent : getDocumentElement(element));
    accRect.top = Math.max(rect.top + decorations.top, accRect.top);
    accRect.right = Math.min(rect.right - decorations.right, accRect.right);
    accRect.bottom = Math.min(rect.bottom - decorations.bottom, accRect.bottom);
    accRect.left = Math.max(rect.left + decorations.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), {}, paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(referenceElement);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, {}, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations;
  var variation = getVariation(placement);
  var placements = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements; // $FlowFixMe: Flow seems to have problems with two array unions...

  var overflows = placements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [overflow[_basePlacement] <= 0, overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0];

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}

const flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function within(min, value, max) {
  return Math.max(min, Math.min(value, max));
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (checkMainAxis) {
    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _mainSide = mainAxis === 'x' ? top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var _preventedOffset = within(_min, _offset, _max);

    state.modifiersData.popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
}

const preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement) {
    return;
  }

  var paddingObject = state.modifiersData[name + "#persistent"].padding;
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
  var clientOffset = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientLeft || 0 : arrowOffsetParent.clientTop || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2 - clientOffset; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var center = within(paddingObject[minProp], state.rects.popper[len] / 2 - arrowRect[len] / 2 + centerToReference, state.rects.popper[len] - arrowRect[len] - paddingObject[maxProp]); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = center, _state$modifiersData$);
}

function effect$2(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
      _options$padding = options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding; // CSS selector

  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {

    return;
  }

  state.elements.arrow = arrowElement;
  state.modifiersData[name + "#persistent"] = {
    padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements))
  };
}

const arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$2,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
}

const hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper =
/*#__PURE__*/
popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

//
class Popover {
    constructor(anchor, popover, options) {
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
        this.anchor = anchor;
        this.popover = popover;
        this.options = Object.assign({
            skidding: 0,
            distance: 0,
            placement: 'bottom-start',
            visibleClass: 'popover-visible',
            onAfterShow: () => { },
            onAfterHide: () => { },
            onTransitionEnd: () => { }
        }, options);
        this.isVisible = false;
        this.popover.classList.remove(this.options.visibleClass);
        this.popover.addEventListener('transitionend', this.handleTransitionEnd);
    }
    handleTransitionEnd(event) {
        const target = event.target;
        // Make sure the transition event originates from from the popover itself
        if (target === this.popover) {
            // This is called before the element is hidden so users can do things like reset scroll. It will fire once for
            // every transition property (event.propertyName discloses which property has finished transitioning.
            this.options.onTransitionEnd.call(this, event);
            if (!this.isVisible && !this.popover.hidden) {
                this.popover.hidden = true;
                this.popover.classList.remove(this.options.visibleClass);
                this.options.onAfterHide.call(this);
            }
        }
    }
    destroy() {
        this.popover.removeEventListener('transitionend', this.handleTransitionEnd);
        if (this.popper) {
            this.popper.destroy();
            this.popper = null;
        }
    }
    show() {
        this.isVisible = true;
        this.popover.hidden = false;
        requestAnimationFrame(() => this.popover.classList.add(this.options.visibleClass));
        if (this.popper) {
            this.popper.destroy();
        }
        this.popper = createPopper(this.anchor, this.popover, {
            placement: this.options.placement,
            modifiers: [
                {
                    name: 'flip',
                    options: {
                        boundary: 'viewport'
                    }
                },
                {
                    name: 'offset',
                    options: {
                        offset: [this.options.skidding, this.options.distance]
                    }
                }
            ]
        });
        // Reposition the menu after it appears in case a modifier kicked in
        requestAnimationFrame(() => {
            this.popper.update();
            this.options.onAfterShow.call(this);
        });
    }
    hide() {
        // Apply the hidden styles and wait for the transition before hiding completely
        this.isVisible = false;
        this.popover.classList.remove(this.options.visibleClass);
    }
    setOptions(options) {
        this.options = Object.assign(this.options, options);
        this.isVisible
            ? this.popover.classList.add(this.options.visibleClass)
            : this.popover.classList.remove(this.options.visibleClass);
        // Update popper options
        if (this.popper) {
            this.popper.setOptions({
                placement: this.options.placement
            });
            requestAnimationFrame(() => this.popper.update());
        }
    }
}

const dropdownCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block}.dropdown{position:relative}.dropdown__trigger{display:block}.dropdown__panel{position:absolute;z-index:var(--sl-z-index-dropdown);max-height:50vh;font-family:var(--sl-font-sans);font-size:var(--sl-font-size-medium);font-weight:var(--sl-font-weight-normal);color:var(--color);background-color:var(--sl-color-white);border:solid 1px var(--sl-color-gray-90);border-radius:var(--sl-border-radius-medium);box-shadow:var(--sl-shadow-large);opacity:0;overflow:auto;overscroll-behavior:none;transition:var(--sl-transition-fast) opacity}.dropdown__panel.popover-visible{opacity:1}";

let id$4 = 0;
const Dropdown = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slShow = createEvent(this, "slShow", 7);
        this.slAfterShow = createEvent(this, "slAfterShow", 7);
        this.slHide = createEvent(this, "slHide", 7);
        this.slAfterHide = createEvent(this, "slAfterHide", 7);
        this.componentId = `dropdown-${++id$4}`;
        this.ignoreMouseEvents = false;
        this.ignoreOpenWatcher = false;
        /** Indicates whether or not the dropdown is open. You can use this in lieu of the show/hide methods. */
        this.open = false;
        /**
         * The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel
         * inside of the viewport.
         */
        this.placement = 'bottom-start';
        /** Determines whether the dropdown should hide when a menu item is selected. */
        this.closeOnSelect = true;
        /** The dropdown will close when the user interacts outside of this element (e.g. clicking). */
        this.containingElement = this.host;
        /** The distance in pixels from which to offset the panel away from its trigger. */
        this.distance = 2;
        /** The distance in pixels from which to offset the panel along its trigger. */
        this.skidding = 0;
    }
    handleOpenChange() {
        if (!this.ignoreOpenWatcher) {
            this.open ? this.show() : this.hide();
        }
    }
    handlePopoverOptionsChange() {
        this.popover.setOptions({ placement: this.placement });
    }
    connectedCallback() {
        this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
        this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
        this.handleMenuItemActivate = this.handleMenuItemActivate.bind(this);
        this.handlePanelSelect = this.handlePanelSelect.bind(this);
        this.handleTriggerKeyDown = this.handleTriggerKeyDown.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
    }
    componentDidLoad() {
        this.popover = new Popover(this.trigger, this.panel, {
            placement: this.placement,
            skidding: this.skidding,
            distance: this.distance,
            onAfterHide: () => this.slAfterHide.emit(),
            onAfterShow: () => this.slAfterShow.emit(),
            onTransitionEnd: () => {
                if (!this.open) {
                    this.panel.scrollTop = 0;
                }
            }
        });
        // Show on init if open
        if (this.open) {
            this.show();
        }
    }
    disconnectedCallback() {
        this.hide();
        this.popover.destroy();
    }
    /** Shows the dropdown panel */
    async show() {
        this.ignoreOpenWatcher = true;
        this.open = true;
        const slShow = this.slShow.emit();
        if (slShow.defaultPrevented) {
            this.open = false;
            this.ignoreOpenWatcher = false;
            return;
        }
        this.popover.show();
        this.ignoreOpenWatcher = false;
        this.panel.addEventListener('slActivate', this.handleMenuItemActivate);
        this.panel.addEventListener('slSelect', this.handlePanelSelect);
        document.addEventListener('mousedown', this.handleDocumentMouseDown);
        document.addEventListener('keydown', this.handleDocumentKeyDown);
    }
    /** Hides the dropdown panel */
    async hide() {
        this.ignoreOpenWatcher = true;
        this.open = false;
        const slHide = this.slHide.emit();
        if (slHide.defaultPrevented) {
            this.open = true;
            this.ignoreOpenWatcher = false;
            return;
        }
        this.popover.hide();
        this.ignoreOpenWatcher = false;
        this.panel.removeEventListener('slActivate', this.handleMenuItemActivate);
        this.panel.removeEventListener('slSelect', this.handlePanelSelect);
        document.removeEventListener('mousedown', this.handleDocumentMouseDown);
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
    }
    focusOnTrigger() {
        const slot = this.trigger.querySelector('slot');
        const trigger = slot.assignedElements({ flatten: true })[0];
        if (trigger) {
            if (typeof trigger.setFocus === 'function') {
                trigger.setFocus();
            }
            else if (typeof trigger.focus === 'function') {
                trigger.focus();
            }
        }
    }
    getMenu() {
        return this.panel
            .querySelector('slot')
            .assignedElements({ flatten: true })
            .filter(el => el.tagName.toLowerCase() === 'sl-menu')[0];
    }
    handleDocumentKeyDown(event) {
        const menu = this.getMenu();
        // Close when escape is pressed
        if (event.key === 'Escape') {
            this.hide();
            this.focusOnTrigger();
            return;
        }
        // Close when tabbing results in the focus leaving the containing element
        if (event.key === 'Tab') {
            setTimeout(() => {
                if (document.activeElement &&
                    document.activeElement.closest(this.containingElement.tagName.toLowerCase()) !== this.containingElement) {
                    this.hide();
                    return;
                }
            });
        }
        // Prevent the page from scrolling when certain keys are pressed
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
        }
        // If a menu is present, focus on it when certain keys are pressed
        if (menu && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
            event.preventDefault();
            menu.setFocus();
        }
    }
    handleDocumentMouseDown(event) {
        // Close when clicking outside of the close element
        const path = event.composedPath();
        if (!path.includes(this.containingElement)) {
            this.hide();
            return;
        }
    }
    handleMenuItemActivate(event) {
        const item = event.target;
        scrollIntoView(item, this.panel);
    }
    handlePanelSelect(event) {
        const target = event.target;
        // Hide the dropdown when a menu item is selected
        if (this.closeOnSelect && target.tagName.toLowerCase() === 'sl-menu') {
            this.hide();
            this.focusOnTrigger();
        }
    }
    handleTriggerKeyDown(event) {
        // Open the panel when pressing down or up while focused on the trigger
        if (!this.open && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
            this.show();
            event.preventDefault();
            event.stopPropagation();
        }
        // All other keys focus the menu and initiate type-to-select
        const menu = this.getMenu();
        if (menu && event.target !== menu) {
            menu.setFocus();
            menu.typeToSelect(event.key);
            return;
        }
    }
    togglePanel() {
        this.open ? this.hide() : this.show();
    }
    render() {
        return (h("div", { part: "base", id: this.componentId, class: {
                dropdown: true,
                'dropdown--open': this.open
            }, "aria-expanded": this.open, "aria-haspopup": "true" }, h("span", { part: "trigger", class: "dropdown__trigger", ref: el => (this.trigger = el), onKeyDown: this.handleTriggerKeyDown, onClick: this.togglePanel }, h("slot", { name: "trigger" })), h("div", { ref: el => (this.panel = el), part: "panel", class: "dropdown__panel", role: "menu", "aria-hidden": !this.open, "aria-labeledby": this.componentId, hidden: true }, h("slot", null))));
    }
    get host() { return this; }
    static get watchers() { return {
        "open": ["handleOpenChange"],
        "placement": ["handlePopoverOptionsChange"],
        "distance": ["handlePopoverOptionsChange"],
        "skidding": ["handlePopoverOptionsChange"]
    }; }
    static get style() { return dropdownCss; }
};

const formCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:block}";

const Form = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slSubmit = createEvent(this, "slSubmit", 7);
    }
    connectedCallback() {
        this.formControls = [
            {
                tag: 'button',
                serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null,
                click: event => {
                    const target = event.target;
                    if (target.type === 'submit') {
                        this.submit();
                    }
                }
            },
            {
                tag: 'input',
                serialize: (el, formData) => {
                    if (!el.name || el.disabled) {
                        return;
                    }
                    if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) {
                        return;
                    }
                    if (el.type === 'file') {
                        [...el.files].map(file => formData.append(el.name, file));
                        return;
                    }
                    formData.append(el.name, el.value);
                },
                click: event => {
                    const target = event.target;
                    if (target.type === 'submit') {
                        this.submit();
                    }
                },
                keyDown: event => {
                    const target = event.target;
                    if (event.key === 'Enter' && !['checkbox', 'file', 'radio'].includes(target.type)) {
                        this.submit();
                    }
                }
            },
            {
                tag: 'select',
                serialize: (el, formData) => {
                    if (el.name && !el.disabled) {
                        if (el.multiple) {
                            const selectedOptions = [...el.querySelectorAll('option:checked')];
                            if (selectedOptions.length) {
                                selectedOptions.map((option) => formData.append(el.name, option.value));
                            }
                            else {
                                formData.append(el.name, '');
                            }
                        }
                        else {
                            formData.append(el.name, el.value);
                        }
                    }
                }
            },
            {
                tag: 'sl-button',
                serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null,
                click: event => {
                    const target = event.target;
                    if (target.submit) {
                        this.submit();
                    }
                }
            },
            {
                tag: 'sl-checkbox',
                serialize: (el, formData) => el.name && el.checked && !el.disabled ? formData.append(el.name, el.value) : null
            },
            {
                tag: 'sl-input',
                serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null,
                keyDown: event => {
                    if (event.key === 'Enter') {
                        this.submit();
                    }
                }
            },
            {
                tag: 'sl-radio',
                serialize: (el, formData) => el.name && el.checked && !el.disabled ? formData.append(el.name, el.value) : null
            },
            {
                tag: 'sl-range',
                serialize: (el, formData) => {
                    if (el.name && !el.disabled) {
                        formData.append(el.name, el.value + '');
                    }
                }
            },
            {
                tag: 'sl-select',
                serialize: (el, formData) => {
                    if (el.name && !el.disabled) {
                        if (el.multiple) {
                            const selectedOptions = [...el.value];
                            if (selectedOptions.length) {
                                selectedOptions.map(value => formData.append(el.name, value));
                            }
                            else {
                                formData.append(el.name, '');
                            }
                        }
                        else {
                            formData.append(el.name, el.value + '');
                        }
                    }
                }
            },
            {
                tag: 'sl-switch',
                serialize: (el, formData) => el.name && el.checked && !el.disabled ? formData.append(el.name, el.value) : null
            },
            {
                tag: 'sl-textarea',
                serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null
            },
            {
                tag: 'textarea',
                serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null
            }
        ];
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    /** Serializes all form controls elements and returns a `FormData` object. */
    async getFormData() {
        const formData = new FormData();
        const formControls = await this.getFormControls();
        formControls.map(el => this.serializeElement(el, formData));
        return formData;
    }
    /** Gets all form control elements (native and custom). */
    async getFormControls() {
        const slot = this.form.querySelector('slot');
        const tags = this.formControls.map(control => control.tag);
        return slot
            .assignedElements({ flatten: true })
            .reduce((all, el) => all.concat(el, [...el.querySelectorAll('*')]), [])
            .filter(el => tags.includes(el.tagName.toLowerCase()));
    }
    /** Submits the form. */
    async submit() {
        const formData = await this.getFormData();
        const formControls = await this.getFormControls();
        this.slSubmit.emit({ formData, formControls });
    }
    handleClick(event) {
        const target = event.target;
        const tag = target.tagName.toLowerCase();
        for (const formControl of this.formControls) {
            if (formControl.tag === tag && formControl.click) {
                formControl.click(event);
            }
        }
    }
    handleKeyDown(event) {
        const target = event.target;
        const tag = target.tagName.toLowerCase();
        for (const formControl of this.formControls) {
            if (formControl.tag === tag && formControl.keyDown) {
                formControl.keyDown(event);
            }
        }
    }
    serializeElement(el, formData) {
        const tag = el.tagName.toLowerCase();
        for (const formControl of this.formControls) {
            if (formControl.tag === tag) {
                return formControl.serialize(el, formData);
            }
        }
        return null;
    }
    render() {
        return (h("div", { ref: el => (this.form = el), part: "base", class: "form", role: "form", onClick: this.handleClick, onKeyDown: this.handleKeyDown }, h("slot", null)));
    }
    static get style() { return formCss; }
};

const cache = new Map();
const requests = new Map();
const requestIcon = (url) => {
    let req = requests.get(url);
    if (!req) {
        req = fetch(url).then(async (res) => {
            if (res.ok) {
                const div = document.createElement('div');
                div.innerHTML = await res.text();
                const svg = div.firstElementChild;
                if (svg && svg.tagName.toLowerCase() === 'svg') {
                    cache.set(url, div.innerHTML);
                    return svg.outerHTML;
                }
                else {
                    console.warn(`Invalid SVG icon: ${url}`);
                    return '';
                }
            }
            else {
                return '';
            }
        });
        requests.set(url, req);
    }
    return req;
};

const iconCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block;width:1em;height:1em;contain:strict;box-sizing:content-box !important}.icon,svg{display:block;height:100%;width:100%}";

const parser = new DOMParser();
const Icon = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slLoad = createEvent(this, "slLoad", 7);
        this.slError = createEvent(this, "slError", 7);
    }
    handleChange() {
        this.setIcon();
    }
    componentDidLoad() {
        this.setIcon();
    }
    getLabel() {
        let label = '';
        if (this.label) {
            label = this.label;
        }
        else if (this.name) {
            label = this.name.replace(/-/g, ' ');
        }
        else if (this.src) {
            label = this.src.replace(/.*\//, '').replace(/-/g, ' ').replace(/\.svg/i, '');
        }
        return label;
    }
    setIcon() {
        const url = this.name ? getAssetPath(`./icons/${this.name}.svg`) : this.src;
        requestIcon(url)
            .then(source => {
            const doc = parser.parseFromString(source, 'text/html');
            const svg = doc.body.querySelector('svg');
            if (svg) {
                this.svg = svg.outerHTML;
                this.slLoad.emit();
            }
            else {
                this.svg = '';
                this.slError.emit();
            }
        })
            .catch(error => this.slError.emit(error));
    }
    render() {
        return h("div", { part: "base", class: "icon", role: "img", "aria-label": this.getLabel(), innerHTML: this.svg });
    }
    static get assetsDirs() { return ["icons"]; }
    static get watchers() { return {
        "name": ["handleChange"],
        "src": ["handleChange"]
    }; }
    static get style() { return iconCss; }
};

const iconButtonCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block}.icon-button{flex:0 0 auto;display:flex;align-items:center;background:none;border:none;border-radius:var(--sl-border-radius-medium);font-size:inherit;color:var(--sl-color-gray-50);padding:var(--sl-spacing-x-small);cursor:pointer;transition:var(--sl-transition-medium) color;-webkit-appearance:none}.icon-button:hover:not(.icon-button--disabled),.icon-button:focus:not(.icon-button--disabled){color:var(--sl-color-primary-50)}.icon-button:active:not(.icon-button--disabled){color:var(--sl-color-primary-40)}.icon-button:focus{outline:none}.icon-button--disabled{opacity:0.5;cursor:not-allowed}.focus-visible.icon-button:focus{box-shadow:var(--sl-focus-ring-box-shadow)}";

const IconButton = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** Set to true to disable the button. */
        this.disabled = false;
    }
    componentDidLoad() {
        focusVisible.observe(this.button);
    }
    disconnectedCallback() {
        focusVisible.unobserve(this.button);
    }
    render() {
        return (h("button", { ref: el => (this.button = el), part: "base", class: {
                'icon-button': true,
                'icon-button--disabled': this.disabled
            }, type: "button" }, h("sl-icon", { name: this.name, src: this.src, label: this.label })));
    }
    static get style() { return iconButtonCss; }
};

const inputCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.form-control .label{display:none}.form-control--has-label .label{display:inline-block;color:var(--sl-input-label-color);margin-bottom:var(--sl-spacing-xxx-small)}.form-control--has-label .label.label--small{font-size:var(--sl-input-label-font-size-small)}.form-control--has-label .label.label--medium{font-size:var(--sl-input-label-font-size-medium)}.form-control--has-label .label.label--large{font-size:var(--sl-input-label-font-size-large)}.form-control--has-label .label.label--valid{color:var(--sl-input-label-color-valid)}.form-control--has-label .label.label--invalid{color:var(--sl-input-label-color-invalid)}.help-text{color:var(--sl-input-help-text-color)}.help-text.help-text--small{font-size:var(--sl-input-help-text-font-size-small)}.help-text.help-text--medium{font-size:var(--sl-input-help-text-font-size-medium)}.help-text.help-text--large{font-size:var(--sl-input-help-text-font-size-large)}.help-text.help-text--valid{color:var(--sl-input-help-text-color-valid)}.help-text.help-text--invalid{color:var(--sl-input-help-text-color-invalid)}.help-text ::slotted(*){margin-top:var(--sl-spacing-xxx-small)}:host{display:block}.input{flex:1 1 auto;display:inline-flex;align-items:stretch;justify-content:center;position:relative;width:100%;font-family:var(--sl-input-font-family);font-weight:var(--sl-input-font-weight);letter-spacing:var(--sl-input-letter-spacing);background-color:var(--sl-input-background-color);border:solid var(--sl-input-border-width) var(--sl-input-border-color);vertical-align:middle;overflow:hidden;transition:var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;cursor:text}.input:hover:not(.input--disabled){background-color:var(--sl-input-background-color-hover);border-color:var(--sl-input-border-color-hover);color:var(--sl-input-color-hover)}.input.input--focused:not(.input--disabled){background-color:var(--sl-input-background-color-focus);border-color:var(--sl-input-border-color-focus);box-shadow:var(--sl-focus-ring-box-shadow);color:var(--sl-input-color-focus)}.input.input--disabled{background-color:var(--sl-input-background-color-disabled);border-color:var(--sl-input-border-color-disabled);opacity:0.5;cursor:not-allowed}.input.input--disabled .input__control{color:var(--sl-input-color-disabled)}.input.input--disabled .input__control::placeholder{color:var(--sl-input-placeholder-color-disabled)}.input.input--valid:not(.input--disabled){color:var(--sl-input-color-valid);border-color:var(--sl-input-border-color-valid)}.input.input--valid:not(.input--disabled).input--focused{box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-success-hue), var(--sl-color-success-saturation), 50%, var(--sl-focus-ring-alpha));border-color:var(--sl-input-border-color-valid)}.input.input--invalid:not(.input--disabled){border-color:var(--sl-color-danger-50)}.input.input--invalid:not(.input--disabled).input--focused{box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-danger-hue), var(--sl-color-danger-saturation), 50%, var(--sl-focus-ring-alpha))}.input__control{flex:1 1 auto;font-family:inherit;font-size:inherit;font-weight:inherit;min-width:0;height:100%;color:var(--sl-input-color);border:none;background:none;box-shadow:none;padding:0;margin:0;cursor:inherit;-webkit-appearance:none}.input__control::-webkit-search-decoration,.input__control::-webkit-search-cancel-button,.input__control::-webkit-search-results-button,.input__control::-webkit-search-results-decoration{-webkit-appearance:none}.input__control::placeholder{color:var(--sl-input-placeholder-color);user-select:none}.input__control:focus{outline:none}.input__prefix,.input__suffix{display:inline-flex;flex:0 0 auto;align-items:center;color:var(--sl-input-icon-color)}.input--small{border-radius:var(--sl-input-border-radius-small);font-size:var(--sl-input-font-size-small);height:var(--sl-input-height-small)}.input--small .input__control{height:calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);margin:0 var(--sl-input-spacing-small)}.input--small .input__clear,.input--small .input__password-toggle{margin-right:var(--sl-input-spacing-small)}.input--small .input__prefix ::slotted(*){margin-left:var(--sl-input-spacing-small)}.input--small .input__suffix ::slotted(*){margin-right:var(--sl-input-spacing-small)}.input--medium{border-radius:var(--sl-input-border-radius-medium);font-size:var(--sl-input-font-size-medium);height:var(--sl-input-height-medium)}.input--medium .input__control{height:calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);margin:0 var(--sl-input-spacing-medium)}.input--medium .input__clear,.input--medium .input__password-toggle{margin-right:var(--sl-input-spacing-medium)}.input--medium .input__prefix ::slotted(*){margin-left:var(--sl-input-spacing-medium)}.input--medium .input__suffix ::slotted(*){margin-right:var(--sl-input-spacing-medium)}.input--large{border-radius:var(--sl-input-border-radius-large);font-size:var(--sl-input-font-size-large);height:var(--sl-input-height-large)}.input--large .input__control{height:calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);margin:0 var(--sl-input-spacing-large)}.input--large .input__clear,.input--large .input__password-toggle{margin-right:var(--sl-input-spacing-large)}.input--large .input__prefix ::slotted(*){margin-left:var(--sl-input-spacing-large)}.input--large .input__suffix ::slotted(*){margin-right:var(--sl-input-spacing-large)}.input--pill.input--small{border-radius:var(--sl-input-height-small)}.input--pill.input--medium{border-radius:var(--sl-input-height-medium)}.input--pill.input--large{border-radius:var(--sl-input-height-large)}.input__clear,.input__password-toggle{display:inline-flex;align-items:center;font-size:inherit;color:var(--sl-input-icon-color);border:none;background:none;padding:0;transition:var(--sl-transition-fast) color;cursor:pointer}.input__clear:hover,.input__password-toggle:hover{color:var(--sl-input-icon-color-hover)}.input__clear:focus,.input__password-toggle:focus{outline:none}.input--empty .input__clear{visibility:hidden}";

let id$5 = 0;
const Input = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slChange = createEvent(this, "slChange", 7);
        this.slInput = createEvent(this, "slInput", 7);
        this.slFocus = createEvent(this, "slFocus", 7);
        this.slBlur = createEvent(this, "slBlur", 7);
        this.inputId = `input-${++id$5}`;
        this.labelId = `input-label-${id$5}`;
        this.helpTextId = `input-help-text-${id$5}`;
        this.hasFocus = false;
        this.isPasswordVisible = false;
        /** The input's type. */
        this.type = 'text';
        /** The input's size. */
        this.size = 'medium';
        /** The input's name attribute. */
        this.name = '';
        /** The input's value attribute. */
        this.value = '';
        /** Set to true to draw a pill-style input with rounded edges. */
        this.pill = false;
        /** The input's label. */
        this.label = '';
        /** Set to true to disable the input. */
        this.disabled = false;
        /** Set to true for a readonly input. */
        this.readonly = false;
        /** Set to true to add a clear button when the input is populated. */
        this.clearable = false;
        /** Set to true to add a password toggle button for password inputs. */
        this.togglePassword = false;
        /** Set to true to indicate that the user input is valid. */
        this.valid = false;
        /** Set to true to indicate that the user input is invalid. */
        this.invalid = false;
    }
    connectedCallback() {
        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handlePasswordToggle = this.handlePasswordToggle.bind(this);
    }
    /** Sets focus on the input. */
    async setFocus() {
        this.input.focus();
    }
    /** Removes focus from the input. */
    async removeFocus() {
        this.input.blur();
    }
    /** Selects all the text in the input. */
    async select() {
        return this.input.select();
    }
    /** Sets the start and end positions of the text selection (0-based). */
    async setSelectionRange(selectionStart, selectionEnd, selectionDirection = 'none') {
        return this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
    }
    /** Replaces a range of text with a new string. */
    async setRangeText(replacement, start, end, selectMode = 'preserve') {
        return this.input.setRangeText(replacement, start, end, selectMode);
    }
    handleChange() {
        this.slChange.emit();
    }
    handleInput() {
        this.value = this.input.value;
        this.slInput.emit();
    }
    handleBlur() {
        this.hasFocus = false;
        this.slBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.slFocus.emit();
    }
    handleClearClick() {
        if (this.input.value !== '') {
            this.input.value = '';
            this.input.dispatchEvent(new window.Event('input', { bubbles: true }));
            this.input.dispatchEvent(new window.Event('change', { bubbles: true }));
        }
        this.input.focus();
    }
    handleMouseDown(event) {
        const target = event.target;
        if (target !== this.input) {
            event.preventDefault();
            this.input.focus();
        }
    }
    handlePasswordToggle() {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
    render() {
        return (h("div", { part: "form-control", class: {
                'form-control': true,
                'form-control--has-label': this.label.length > 0,
                'form-control--valid': this.valid,
                'form-control--invalid': this.invalid
            } }, h("label", { part: "label", class: {
                label: true,
                'label--small': this.size === 'small',
                'label--medium': this.size === 'medium',
                'label--large': this.size === 'large',
                'label--valid': this.valid,
                'label--invalid': this.invalid
            }, htmlFor: this.inputId }, this.label), h("div", { part: "base", class: {
                input: true,
                // Sizes
                'input--small': this.size === 'small',
                'input--medium': this.size === 'medium',
                'input--large': this.size === 'large',
                // States
                'input--pill': this.pill,
                'input--disabled': this.disabled,
                'input--focused': this.hasFocus,
                'input--empty': this.value.length === 0,
                'input--valid': this.valid,
                'input--invalid': this.invalid
            }, onMouseDown: this.handleMouseDown }, h("span", { part: "prefix", class: "input__prefix" }, h("slot", { name: "prefix" })), h("input", { part: "input", ref: el => (this.input = el), id: this.inputId, class: "input__control", type: this.type === 'password' && this.isPasswordVisible ? 'text' : this.type, name: this.name, placeholder: this.placeholder, disabled: this.disabled, readonly: this.readonly, minLength: this.minlength, maxLength: this.maxlength, min: this.min, max: this.max, step: this.step, value: this.value, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, autoFocus: this.autofocus, pattern: this.pattern, required: this.required, inputMode: this.inputmode, "aria-labelledby": this.labelId, "aria-describedby": this.helpTextId, onChange: this.handleChange, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur }), this.clearable && (h("button", { part: "clear-button", class: "input__clear", type: "button", onClick: this.handleClearClick, tabindex: "-1" }, h("slot", { name: "clear-icon" }, h("sl-icon", { name: "x-circle" })))), this.togglePassword && (h("button", { part: "password-toggle-button", class: "input__password-toggle", type: "button", onClick: this.handlePasswordToggle, tabindex: "-1" }, this.isPasswordVisible ? (h("slot", { name: "show-password-icon" }, h("sl-icon", { name: "eye-slash" }))) : (h("slot", { name: "hide-password-icon" }, ' ', h("sl-icon", { name: "eye" }))))), h("span", { part: "suffix", class: "input__suffix" }, h("slot", { name: "suffix" }))), h("div", { part: "help-text", id: this.helpTextId, class: {
                'help-text': true,
                'help-text--small': this.size === 'small',
                'help-text--medium': this.size === 'medium',
                'help-text--large': this.size === 'large',
                'help-text--valid': this.valid,
                'help-text--invalid': this.invalid
            } }, h("slot", { name: "help-text" }))));
    }
    get host() { return this; }
    static get style() { return inputCss; }
};

const menuCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:block}.menu{padding:var(--sl-spacing-x-small) 0}.menu:focus{outline:none}";

const Menu = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slFocus = createEvent(this, "slFocus", 7);
        this.slBlur = createEvent(this, "slBlur", 7);
        this.slSelect = createEvent(this, "slSelect", 7);
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
            }, tabIndex: 0, role: "menu", onClick: this.handleClick, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut }, h("slot", null)));
    }
    static get style() { return menuCss; }
};

const menuDividerCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:block}.menu-divider{border-top:solid 1px var(--sl-color-gray-90);margin:var(--sl-spacing-x-small) 0}";

const MenuDivider = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
    }
    render() {
        return h("div", { part: "base", class: "menu-divider", role: "separator" });
    }
    static get style() { return menuDividerCss; }
};

const menuItemCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:block}.menu-item{position:relative;display:flex;align-items:stretch;background-color:var(--sl-color-white);font-family:var(--sl-font-sans);font-size:var(--sl-font-size-medium);font-weight:var(--sl-font-weight-normal);line-height:var(--sl-line-height-normal);letter-spacing:var(--sl-letter-spacing-normal);text-align:left;color:var(--color-gray-40);padding:var(--sl-spacing-xx-small) var(--sl-spacing-x-large);transition:var(--sl-transition-fast) fill;user-select:none;white-space:nowrap;cursor:pointer}.menu-item.menu-item--active:not(.menu-item--disabled){background-color:var(--sl-color-primary-95);color:var(--sl-color-primary-50)}.menu-item.menu-item--disabled{color:var(--sl-color-gray-70);cursor:not-allowed}.menu-item .menu-item__label{flex:1 1 auto}.menu-item .menu-item__prefix{flex:0 0 auto;display:flex;align-items:center}.menu-item .menu-item__prefix ::slotted(:last-child){margin-right:0.5em}.menu-item .menu-item__suffix{flex:0 0 auto;display:flex;align-items:center}.menu-item .menu-item__suffix ::slotted(:first-child){margin-left:0.5em}.menu-item .menu-item__check{display:flex;position:absolute;left:0.5em;top:calc(50% - 0.5em);visibility:hidden;align-items:center;font-size:inherit}.menu-item--checked .menu-item__check{visibility:visible}";

const MenuItem = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slActivate = createEvent(this, "slActivate", 7);
        this.slDeactivate = createEvent(this, "slDeactivate", 7);
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
        return (h("div", { part: "base", class: {
                'menu-item': true,
                'menu-item--checked': this.checked,
                'menu-item--active': this.active,
                'menu-item--disabled': this.disabled
            }, role: "menuitem", "aria-checked": this.checked, "aria-disabled": this.disabled, "aria-selected": this.active }, h("span", { part: "checked-icon", class: "menu-item__check" }, h("sl-icon", { name: "check2" })), h("span", { part: "prefix", class: "menu-item__prefix" }, h("slot", { name: "prefix" })), h("span", { part: "label", class: "menu-item__label" }, h("slot", null)), h("span", { part: "suffix", class: "menu-item__suffix" }, h("slot", { name: "suffix" }))));
    }
    static get watchers() { return {
        "active": ["handleActiveChange"]
    }; }
    static get style() { return menuItemCss; }
};

const menuLabelCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:block}.menu-label{font-family:var(--sl-font-sans);font-size:var(--sl-font-size-small);font-weight:var(--sl-font-weight-normal);line-height:var(--sl-line-height-normal);letter-spacing:var(--sl-letter-spacing-normal);color:var(--sl-color-gray-70);padding:var(--sl-spacing-xx-small) var(--sl-spacing-x-large);user-select:none}";

const MenuLabel = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
    }
    render() {
        return (h("div", { part: "base", class: "menu-label" }, h("slot", null)));
    }
    static get style() { return menuLabelCss; }
};

const progressBarCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--height:16px;display:block}.progress-bar{position:relative;background:var(--sl-color-gray-90);height:var(--height);border-radius:var(--sl-border-radius-pill);overflow:hidden}.progress-bar__indicator{height:100%;font-family:var(--sl-font-sans);font-size:12px;font-weight:var(--sl-font-weight-normal);background-color:var(--sl-color-primary-50);color:var(--sl-color-white);text-align:center;line-height:var(--height);white-space:nowrap;overflow:hidden;transition:400ms width, 400ms background-color;user-select:none}";

const ProgressBar = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** The progress bar's percentage, 0 to 100. */
        this.percentage = 0;
    }
    render() {
        return (h("div", { part: "base", class: "progress-bar", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": this.percentage }, h("div", { part: "base", class: "progress-bar__indicator", style: {
                width: `${this.percentage}%`
            } }, h("span", { part: "label", class: "progress-bar__label" }, h("slot", null)))));
    }
    static get style() { return progressBarCss; }
};

const progressRingCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--track-color:var(--sl-color-gray-90);--indicator-color:var(--sl-color-primary-50);display:inline-flex}.progress-ring{display:inline-flex;align-items:center;justify-content:center;position:relative}.progress-ring__track{stroke:var(--track-color)}.progress-ring__indicator{stroke:var(--indicator-color);transition:0.35s stroke-dashoffset, 0.35s stroke;transform:rotate(-90deg);transform-origin:50% 50%}.progress-ring__label{display:flex;align-items:center;justify-content:center;position:absolute;top:0;left:0;width:100%;height:100%;text-align:center;color:var(--sl-color-black);user-select:none}";

const Progress = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** The size of the progress ring in pixels. */
        this.size = 128;
        /** The stroke width of the progress ring in pixels. */
        this.strokeWidth = 4;
    }
    handlePercentageChange() {
        this.updateProgress();
    }
    componentDidLoad() {
        this.updateProgress();
    }
    updateProgress() {
        const radius = this.indicator.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (this.percentage / 100) * circumference;
        this.indicator.style.strokeDasharray = `${circumference} ${circumference}`;
        this.indicator.style.strokeDashoffset = `${offset}`;
    }
    render() {
        return (h("div", { part: "base", class: "progress-ring" }, h("svg", { class: "progress-ring__image", width: this.size, height: this.size }, h("circle", { class: "progress-ring__track", "stroke-width": this.strokeWidth, "stroke-linecap": "round", fill: "transparent", r: this.size / 2 - this.strokeWidth * 2, cx: this.size / 2, cy: this.size / 2 }), h("circle", { ref: (el) => (this.indicator = el), class: "progress-ring__indicator", "stroke-width": this.strokeWidth, "stroke-linecap": "round", fill: "transparent", r: this.size / 2 - this.strokeWidth * 2, cx: this.size / 2, cy: this.size / 2 })), h("span", { part: "label", class: "progress-ring__label" }, h("slot", null))));
    }
    static get watchers() { return {
        "percentage": ["handlePercentageChange"]
    }; }
    static get style() { return progressRingCss; }
};

const radioCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block}.radio{display:inline-flex;align-items:center;font-family:var(--sl-input-font-family);font-size:var(--sl-input-font-size-medium);font-weight:var(--sl-input-font-weight);color:var(--sl-input-color);vertical-align:middle;cursor:pointer}.radio__icon{display:inline-flex;width:var(--sl-toggle-size);height:var(--sl-toggle-size)}.radio__icon svg{width:100%;height:100%}.radio__control{position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--sl-toggle-size);height:var(--sl-toggle-size);border:solid var(--sl-input-border-width) var(--sl-input-border-color);border-radius:50%;background-color:var(--sl-input-background-color);color:var(--sl-color-white);transition:var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color, var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow}.radio__control input[type=radio]{position:absolute;opacity:0;padding:0;margin:0;pointer-events:none;-webkit-appearance:none}.radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover{border-color:var(--sl-input-border-color-hover);background-color:var(--sl-input-background-color-hover)}.radio.radio--focused:not(.radio--checked):not(.radio--disabled) .radio__control{border-color:var(--sl-input-border-color-focus);background-color:var(--sl-input-background-color-focus);box-shadow:var(--sl-focus-ring-box-shadow)}.radio--checked .radio__control{border-color:var(--sl-color-primary-50);background-color:var(--sl-color-primary-50)}.radio.radio--checked:not(.radio--disabled) .radio__control:hover{border-color:var(--sl-color-primary-60);background-color:var(--sl-color-primary-60)}.radio.radio--checked:not(.radio--disabled).radio--focused .radio__control{border-color:var(--sl-color-primary-60);background-color:var(--sl-color-primary-60);box-shadow:var(--sl-focus-ring-box-shadow)}.radio--disabled{opacity:0.5;cursor:not-allowed}.radio__label{line-height:var(--sl-toggle-size);margin-left:0.5em;user-select:none}";

let id$6 = 0;
const Radio = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slBlur = createEvent(this, "slBlur", 7);
        this.slChange = createEvent(this, "slChange", 7);
        this.slFocus = createEvent(this, "slFocus", 7);
        this.inputId = `radio-${++id$6}`;
        this.labelId = `radio-label-${id$6}`;
        this.hasFocus = false;
        /** Set to true to disable the radio. */
        this.disabled = false;
        /** Set to true to draw the radio in a checked state. */
        this.checked = false;
    }
    handleCheckedChange() {
        if (this.checked) {
            this.getSiblingRadios().map(radio => (radio.checked = false));
        }
        this.input.checked = this.checked;
        this.slChange.emit();
    }
    connectedCallback() {
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }
    /** Sets focus on the radio. */
    async setFocus() {
        this.input.focus();
    }
    /** Removes focus from the radio. */
    async removeFocus() {
        this.input.blur();
    }
    getAllRadios() {
        const form = this.host.closest('sl-form, form') || document.body;
        if (!this.name)
            return [];
        return [...form.querySelectorAll('sl-radio')].filter((radio) => radio.name === this.name);
    }
    getSiblingRadios() {
        return this.getAllRadios().filter(radio => radio !== this.host);
    }
    handleClick() {
        this.checked = this.input.checked;
    }
    handleBlur() {
        this.hasFocus = false;
        this.slBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.slFocus.emit();
    }
    handleKeyDown(event) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            const radios = this.getAllRadios().filter(radio => !radio.disabled);
            const incr = ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
            let index = radios.indexOf(this.host) + incr;
            if (index < 0)
                index = radios.length - 1;
            if (index > radios.length - 1)
                index = 0;
            this.getAllRadios().map(radio => (radio.checked = false));
            radios[index].setFocus();
            radios[index].checked = true;
            event.preventDefault();
        }
    }
    handleMouseDown(event) {
        // Prevent clicks on the label from briefly blurring the input
        event.preventDefault();
        this.input.focus();
    }
    render() {
        return (h("label", { part: "base", class: {
                radio: true,
                'radio--checked': this.checked,
                'radio--disabled': this.disabled,
                'radio--focused': this.hasFocus
            }, htmlFor: this.inputId, role: "radio", onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown }, h("span", { part: "control", class: "radio__control" }, h("span", { part: "checked-icon", class: "radio__icon" }, h("svg", { viewBox: "0 0 16 16" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, h("g", { fill: "currentColor" }, h("circle", { cx: "8", cy: "8", r: "3.42857143" }))))), h("input", { ref: el => (this.input = el), id: this.inputId, type: "radio", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, "aria-labeledby": this.labelId, onClick: this.handleClick, onBlur: this.handleBlur, onFocus: this.handleFocus })), h("span", { part: "label", id: this.labelId, class: "radio__label" }, h("slot", null))));
    }
    get host() { return this; }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
    static get style() { return radioCss; }
};

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

const rangeCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--thumb-size:20px;--tooltip-offset-y:10px;--track-height:6px;display:block}.range{position:relative}.range .range__control{-webkit-appearance:none;width:100%;height:var(--sl-input-height-medium);background:transparent;line-height:var(--sl-input-height-medium);vertical-align:middle}.range .range__control::-webkit-slider-runnable-track{width:100%;height:var(--track-height);background-color:var(--sl-color-gray-90);border-radius:3px;border:none}.range .range__control::-webkit-slider-thumb{border:none;width:var(--thumb-size);height:var(--thumb-size);border-radius:50%;background-color:var(--sl-color-primary-50);border:solid var(--sl-input-border-width) var(--sl-color-primary-50);-webkit-appearance:none;margin-top:calc(var(--thumb-size) / -2 + var(--track-height) / 2);transition:var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color, var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow, var(--sl-transition-fast) transform;cursor:pointer}.range .range__control:not(:disabled)::-webkit-slider-thumb:hover{background-color:var(--sl-color-primary-60);border-color:var(--sl-color-primary-60)}.range .range__control:not(:disabled):focus::-webkit-slider-thumb{background-color:var(--sl-color-primary-60);border-color:var(--sl-color-primary-60);box-shadow:var(--sl-focus-ring-box-shadow)}.range .range__control:not(:disabled)::-webkit-slider-thumb:active{background-color:var(--sl-color-primary-40);border-color:var(--sl-color-primary-40);cursor:grabbing}.range .range__control::-moz-focus-outer{border:0}.range .range__control::-moz-range-track{width:100%;height:var(--track-height);background-color:var(--sl-color-gray-90);border-radius:3px;border:none}.range .range__control::-moz-range-thumb{border:none;height:var(--thumb-size);width:var(--thumb-size);border-radius:50%;background-color:var(--sl-color-primary-50);border-color:var(--sl-color-primary-50);transition:var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color, var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow, var(--sl-transition-fast) transform;cursor:pointer}.range .range__control:not(:disabled)::-moz-range-thumb:hover{background-color:var(--sl-color-primary-60);border-color:var(--sl-color-primary-60)}.range .range__control:not(:disabled):focus::-moz-range-thumb{background-color:var(--sl-color-primary-60);border-color:var(--sl-color-primary-60);box-shadow:var(--sl-focus-ring-box-shadow)}.range .range__control:not(:disabled)::-moz-range-thumb:active{background-color:var(--sl-color-primary-40);border-color:var(--sl-color-primary-40);cursor:grabbing}.range .range__control:focus{outline:none}.range .range__control:disabled{opacity:0.5}.range .range__control:disabled::-webkit-slider-thumb{cursor:not-allowed}.range .range__control:disabled::-moz-range-thumb{cursor:not-allowed}.range__tooltip{position:absolute;z-index:var(--sl-z-index-tooltip);left:1px;border-radius:var(--sl-tooltip-border-radius);background-color:var(--sl-tooltip-background-color);font-family:var(--sl-tooltip-font-family);font-size:var(--sl-tooltip-font-size);font-weight:var(--sl-tooltip-font-weight);line-height:var(--sl-tooltip-line-height);color:var(--sl-tooltip-color);opacity:0;padding:var(--sl-tooltip-padding);transition:var(--sl-transition-fast) opacity;pointer-events:none}.range__tooltip::after{content:\"\";position:absolute;width:0;height:0;left:50%;margin-left:calc(-1 * var(--sl-tooltip-arrow-size))}.range--tooltip-visible .range__tooltip{opacity:1}.range--tooltip-top .range__tooltip{top:calc(-1 * var(--thumb-size) - var(--tooltip-offset-y))}.range--tooltip-top .range__tooltip::after{border-top:var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);border-left:var(--sl-tooltip-arrow-size) solid transparent;border-right:var(--sl-tooltip-arrow-size) solid transparent;top:100%}.range--tooltip-bottom .range__tooltip{bottom:calc(-1 * var(--thumb-size) - var(--tooltip-offset-y))}.range--tooltip-bottom .range__tooltip::after{border-bottom:var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);border-left:var(--sl-tooltip-arrow-size) solid transparent;border-right:var(--sl-tooltip-arrow-size) solid transparent;bottom:100%}";

const Range = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slChange = createEvent(this, "slChange", 7);
        this.slBlur = createEvent(this, "slBlur", 7);
        this.slFocus = createEvent(this, "slFocus", 7);
        this.hasFocus = false;
        this.hasTooltip = false;
        /** The input's name attribute. */
        this.name = '';
        /** Set to true to disable the input. */
        this.disabled = false;
        /** The input's min attribute. */
        this.min = 0;
        /** The input's max attribute. */
        this.max = 100;
        /** The input's step attribute. */
        this.step = 1;
        /** The preferred placedment of the tooltip. */
        this.tooltip = 'top';
        /** A function used to format the tooltip's value. */
        this.tooltipFormatter = (value) => value.toString();
    }
    connectedCallback() {
        this.handleInput = this.handleInput.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
    }
    componentWillLoad() {
        if (this.value === undefined || this.value === null)
            this.value = this.min;
        if (this.value < this.min)
            this.value = this.min;
        if (this.value > this.max)
            this.value = this.max;
    }
    componentDidLoad() {
        this.syncTooltip();
        this.resizeObserver = new index(() => this.syncTooltip());
    }
    /** Sets focus on the input. */
    async setFocus() {
        this.input.focus();
    }
    /** Removes focus from the input. */
    async removeFocus() {
        this.input.blur();
    }
    handleInput() {
        this.value = Number(this.input.value);
        this.slChange.emit();
        requestAnimationFrame(() => this.syncTooltip());
    }
    handleBlur() {
        this.hasFocus = false;
        this.hasTooltip = false;
        this.slBlur.emit();
        this.resizeObserver.unobserve(this.input);
    }
    handleFocus() {
        this.hasFocus = true;
        this.hasTooltip = true;
        this.slFocus.emit();
        this.resizeObserver.observe(this.input);
    }
    handleTouchStart() {
        this.setFocus();
    }
    syncTooltip() {
        if (this.tooltip !== 'none') {
            const percent = Math.max(0, (this.value - this.min) / (this.max - this.min));
            const inputWidth = this.input.offsetWidth;
            const tooltipWidth = this.output.offsetWidth;
            const thumbSize = getComputedStyle(this.input).getPropertyValue('--thumb-size');
            const x = `calc(${inputWidth * percent}px - calc(calc(${percent} * ${thumbSize}) - calc(${thumbSize} / 2)))`;
            this.output.style.transform = `translateX(${x})`;
            this.output.style.marginLeft = `-${tooltipWidth / 2}px`;
        }
    }
    render() {
        return (h("div", { part: "base", class: {
                range: true,
                // States
                'range--disabled': this.disabled,
                'range--focused': this.hasFocus,
                'range--tooltip-visible': this.hasTooltip,
                'range--tooltip-top': this.tooltip === 'top',
                'range--tooltip-bottom': this.tooltip === 'bottom'
            }, onTouchStart: this.handleTouchStart }, h("input", { part: "input", ref: el => (this.input = el), type: "range", class: "range__control", name: this.name, disabled: this.disabled, min: this.min, max: this.max, step: this.step, value: this.value, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur }), this.tooltip !== 'none' && (h("output", { part: "tooltip", ref: el => (this.output = el), class: "range__tooltip" }, this.tooltipFormatter(this.value)))));
    }
    static get style() { return rangeCss; }
};

const ratingCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--symbol-color:var(--sl-color-gray-85);--symbol-color-active:#ffbe00;--symbol-size:1.2rem;--symbol-spacing:var(--sl-spacing-xxx-small);display:inline-flex}.rating{position:relative;display:inline-flex;border-radius:var(--sl-border-radius-medium);vertical-align:middle}.rating:focus{outline:none}.rating.focus-visible:focus{box-shadow:var(--sl-focus-ring-box-shadow)}.rating__symbols{display:inline-flex;position:relative;font-size:var(--symbol-size);line-height:0;color:var(--symbol-color);white-space:nowrap;cursor:pointer}.rating__symbols>*{padding:var(--symbol-spacing)}.rating__symbols--indicator{position:absolute;top:0;left:0;color:var(--symbol-color-active);pointer-events:none}.rating__symbol{transition:var(--sl-transition-fast) transform}.rating__symbol--hover{transform:scale(1.2)}.rating--disabled .rating__symbols,.rating--readonly .rating__symbols{cursor:default}.rating--disabled .rating__symbol--hover,.rating--readonly .rating__symbol--hover{transform:none}.rating--disabled{opacity:0.5}.rating--disabled .rating__symbols{cursor:not-allowed}";

const Rating = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slChange = createEvent(this, "slChange", 7);
        this.hoverValue = 0;
        this.isHovering = false;
        /** The current rating. */
        this.value = 0;
        /** The highest rating to show. */
        this.max = 5;
        /** The minimum increment value allowed by the control. */
        this.precision = 1;
        /** Makes the rating readonly. */
        this.readonly = false;
        /** Disables the rating. */
        this.disabled = false;
        /** A function that returns the symbols to display. Accepts an option `value` parameter you can use to map a specific
         * symbol to a value. */
        // @ts-ignore
        this.getSymbol = (value) => '<sl-icon name="star-fill"></sl-icon>';
    }
    handleValueChange() {
        this.slChange.emit();
    }
    connectedCallback() {
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }
    /** Sets focus on the rating. */
    async setFocus() {
        this.rating.focus();
    }
    /** Removes focus from the rating. */
    async removeFocus() {
        this.rating.blur();
    }
    componentDidLoad() {
        focusVisible.observe(this.rating);
    }
    disconnectedCallback() {
        focusVisible.unobserve(this.rating);
    }
    getValueFromMousePosition(event) {
        const containerLeft = this.rating.getBoundingClientRect().left;
        const containerWidth = this.rating.getBoundingClientRect().width;
        return clamp(this.roundToPrecision(((event.clientX - containerLeft) / containerWidth) * this.max, this.precision), 0, this.max);
    }
    handleClick(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        const newValue = this.getValueFromMousePosition(event);
        this.value = newValue === this.value ? 0 : newValue;
        this.isHovering = false;
    }
    handleKeyDown(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        if (event.key === 'ArrowLeft') {
            const decrement = event.shiftKey ? 1 : this.precision;
            this.value = Math.max(0, this.value - decrement);
            event.preventDefault();
        }
        if (event.key === 'ArrowRight') {
            const increment = event.shiftKey ? 1 : this.precision;
            this.value = Math.min(this.max, this.value + increment);
            event.preventDefault();
        }
        if (event.key === 'Home') {
            this.value = 0;
            event.preventDefault();
        }
        if (event.key === 'End') {
            this.value = this.max;
            event.preventDefault();
        }
    }
    handleMouseEnter() {
        this.isHovering = true;
    }
    handleMouseLeave() {
        this.isHovering = false;
    }
    handleMouseMove(event) {
        this.hoverValue = this.getValueFromMousePosition(event);
    }
    roundToPrecision(numberToRound, precision = 0.5) {
        const multiplier = 1 / precision;
        return Math.ceil(numberToRound * multiplier) / multiplier;
    }
    render() {
        const counter = Array.from(Array(this.max).keys());
        let displayValue = 0;
        if (this.disabled || this.readonly) {
            displayValue = this.value;
        }
        else {
            displayValue = this.isHovering ? this.hoverValue : this.value;
        }
        return (h("div", { ref: el => (this.rating = el), part: "base", class: {
                rating: true,
                'rating--readonly': this.readonly,
                'rating--disabled': this.disabled
            }, "aria-disabled": this.disabled, "aria-readonly": this.readonly, "aria-value": this.value, "aria-valuemin": 0, "aria-valuemax": this.max, tabIndex: this.disabled ? -1 : 0, onClick: this.handleClick, onKeyDown: this.handleKeyDown, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onMouseMove: this.handleMouseMove }, h("span", { class: "rating__symbols rating__symbols--inactive" }, counter.map(index => (h("span", { class: {
                rating__symbol: true,
                'rating__symbol--hover': this.isHovering && Math.ceil(displayValue) === index + 1
            }, role: "presentation",
            // Users can click the current value to clear the rating. When this happens, we set this.isHovering to
            // false to prevent the hover state from confusing them as they move the mouse out of the control. This
            // extra mouseenter will reinstate it if they happen to mouse over an adjacent symbol.
            onMouseEnter: this.handleMouseEnter, innerHTML: this.getSymbol(index + 1) })))), h("span", { class: "rating__symbols rating__symbols--indicator" }, counter.map(index => (h("span", { class: {
                rating__symbol: true,
                'rating__symbol--hover': this.isHovering && Math.ceil(displayValue) === index + 1
            }, style: {
                clipPath: displayValue > index + 1 ? null : `inset(0 ${100 - ((displayValue - index) / 1) * 100}% 0 0)`
            }, role: "presentation", innerHTML: this.getSymbol(index + 1) }))))));
    }
    get host() { return this; }
    static get watchers() { return {
        "value": ["handleValueChange"]
    }; }
    static get style() { return ratingCss; }
};

const selectCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.form-control .label{display:none}.form-control--has-label .label{display:inline-block;color:var(--sl-input-label-color);margin-bottom:var(--sl-spacing-xxx-small)}.form-control--has-label .label.label--small{font-size:var(--sl-input-label-font-size-small)}.form-control--has-label .label.label--medium{font-size:var(--sl-input-label-font-size-medium)}.form-control--has-label .label.label--large{font-size:var(--sl-input-label-font-size-large)}.form-control--has-label .label.label--valid{color:var(--sl-input-label-color-valid)}.form-control--has-label .label.label--invalid{color:var(--sl-input-label-color-invalid)}.help-text{color:var(--sl-input-help-text-color)}.help-text.help-text--small{font-size:var(--sl-input-help-text-font-size-small)}.help-text.help-text--medium{font-size:var(--sl-input-help-text-font-size-medium)}.help-text.help-text--large{font-size:var(--sl-input-help-text-font-size-large)}.help-text.help-text--valid{color:var(--sl-input-help-text-color-valid)}.help-text.help-text--invalid{color:var(--sl-input-help-text-color-invalid)}.help-text ::slotted(*){margin-top:var(--sl-spacing-xxx-small)}:host{display:block}.select{width:100%}.select__input{flex:1 1 auto;width:100%}.select__input::part(input){cursor:pointer}.select__input span[slot=prefix]{margin-left:var(--sl-spacing-xx-small)}.select__input span[slot=prefix] sl-tag:not(:last-of-type){margin-right:var(--sl-spacing-xx-small)}.select__icon{display:inline-flex}.select__icon sl-icon{transition:var(--sl-transition-medium) transform ease}.select--open .select__icon sl-icon{transform:rotate(-180deg)}";

let id$7 = 0;
const Select = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slChange = createEvent(this, "slChange", 7);
        this.slFocus = createEvent(this, "slFocus", 7);
        this.slBlur = createEvent(this, "slBlur", 7);
        this.inputId = `select-${++id$7}`;
        this.labelId = `select-label-${id$7}`;
        this.helpTextId = `select-help-text-${id$7}`;
        this.hasFocus = false;
        this.isOpen = false;
        this.items = [];
        this.displayLabel = '';
        this.displayTags = [];
        /** Set to true to enable multiselect. */
        this.multiple = false;
        /**
         * The maximum number of tags to show when `multiple` is true. After the maximum, "+n" will be shown to indicate the
         * number of additional items that are selected. Set to -1 to remove the limit.
         */
        this.maxTagsVisible = 3;
        /** Set to true to disable the select control. */
        this.disabled = false;
        /** The select's name. */
        this.name = '';
        /** The select's placeholder text. */
        this.placeholder = '';
        /** The select's size. */
        this.size = 'medium';
        /** The value of the control. This will be a string or an array depending on `multiple`. */
        this.value = '';
        /** Set to true to draw a pill-style select with rounded edges. */
        this.pill = false;
        /** The select's label. */
        this.label = '';
        /** Set to true to indicate that the user input is valid. */
        this.valid = false;
        /** Set to true to indicate that the user input is invalid. */
        this.invalid = false;
    }
    handleMultipleChange() {
        // Cast to array | string based on `this.multiple`
        const value = this.getValueAsArray();
        this.value = this.multiple ? value : value[0] || '';
        this.syncItemsFromValue();
    }
    handleValueChange() {
        this.syncItemsFromValue();
        this.slChange.emit();
    }
    connectedCallback() {
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleLabelClick = this.handleLabelClick.bind(this);
        this.handleMenuKeyDown = this.handleMenuKeyDown.bind(this);
        this.handleMenuHide = this.handleMenuHide.bind(this);
        this.handleMenuShow = this.handleMenuShow.bind(this);
        this.handleMenuSelect = this.handleMenuSelect.bind(this);
        this.handleSlotChange = this.handleSlotChange.bind(this);
    }
    componentDidLoad() {
        this.menu.querySelector('slot').addEventListener('slotchange', this.handleSlotChange);
        this.resizeObserver = new index(() => this.resizeMenu());
        this.reportDuplicateItemValues();
        // We need to do an initial sync after the component has rendered, so this will suppress the re-render warning
        requestAnimationFrame(() => this.syncItemsFromValue());
    }
    disconnectedCallback() {
        this.menu.querySelector('slot').removeEventListener('slotchange', this.handleSlotChange);
    }
    getItemLabel(item) {
        const slot = item.shadowRoot.querySelector('slot:not([name])');
        return getTextContent(slot);
    }
    getItems() {
        return [...this.host.querySelectorAll('sl-menu-item')];
    }
    getValueAsArray() {
        return Array.isArray(this.value) ? this.value : [this.value];
    }
    handleBlur() {
        this.hasFocus = false;
        this.slBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.slFocus.emit();
        this.input.setSelectionRange(0, 0);
    }
    handleKeyDown(event) {
        const target = event.target;
        // Open the dropdown when enter is pressed while the input is focused
        if (!this.isOpen && event.key === 'Enter' && target === this.input) {
            this.dropdown.show();
            event.preventDefault();
            return;
        }
    }
    handleLabelClick() {
        this.input.setFocus();
    }
    handleMenuKeyDown(event) {
        // Close when escape or tab pressed
        if (event.key === 'Escape' || event.key === 'Tab') {
            this.dropdown.hide();
            event.preventDefault();
            return;
        }
    }
    handleMenuSelect(event) {
        const item = event.detail.item;
        if (this.multiple) {
            this.value = this.value.includes(item.value)
                ? this.value.filter(v => v !== item.value)
                : [...this.value, item.value];
        }
        else {
            this.value = item.value;
        }
        this.syncItemsFromValue();
    }
    handleMenuShow(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        this.resizeMenu();
        this.resizeObserver.observe(this.host);
        this.isOpen = true;
    }
    handleMenuHide() {
        this.resizeObserver.unobserve(this.host);
        this.isOpen = false;
        this.input.setFocus();
    }
    handleSlotChange() {
        this.syncItemsFromValue();
        this.reportDuplicateItemValues();
    }
    reportDuplicateItemValues() {
        const items = this.getItems();
        // Report duplicate values since they can break selection logic
        const duplicateValues = items.map(item => item.value).filter((e, i, a) => a.indexOf(e) !== i);
        if (duplicateValues.length) {
            throw new Error('Duplicate value found on <sl-menu-item> in <sl-select>: "' + duplicateValues.join('", "') + '"');
        }
    }
    resizeMenu() {
        this.menu.style.width = `${this.input.clientWidth}px`;
    }
    syncItemsFromValue() {
        const items = this.getItems();
        const value = this.getValueAsArray();
        // Sync checked states
        items.map(item => (item.checked = value.includes(item.value)));
        // Sync display label
        if (this.multiple) {
            const checkedItems = [];
            value.map(val => items.map(item => (item.value === val ? checkedItems.push(item) : null)));
            this.displayTags = checkedItems.map(item => {
                return (h("sl-tag", { type: "info", size: this.size, pill: this.pill, clearable: true, onClick: event => event.stopPropagation(), onSlClear: () => {
                        item.checked = false;
                        this.syncValueFromItems();
                    } }, this.getItemLabel(item)));
            });
            if (this.maxTagsVisible > 0 && this.displayTags.length > this.maxTagsVisible) {
                const total = this.displayTags.length;
                this.displayTags = this.displayTags.slice(0, this.maxTagsVisible);
                this.displayTags.push(h("sl-tag", { type: "info", size: this.size }, "+", total - this.maxTagsVisible));
            }
            this.displayLabel = '';
        }
        else {
            const checkedItem = items.filter(item => item.value === value[0])[0];
            this.displayLabel = checkedItem ? this.getItemLabel(checkedItem) : '';
            this.displayTags = [];
        }
    }
    syncValueFromItems() {
        const items = this.getItems();
        const checkedItems = items.filter(item => item.checked);
        const checkedValues = checkedItems.map(item => item.value);
        if (this.multiple) {
            this.value = this.value.filter(val => checkedValues.includes(val));
        }
        else {
            this.value = checkedValues.length > 0 ? checkedValues[0] : '';
        }
    }
    render() {
        return (h("div", { part: "form-control", class: {
                'form-control': true,
                'form-control--has-label': this.label.length > 0,
                'form-control--valid': this.valid,
                'form-control--invalid': this.invalid
            } }, h("label", { part: "label", class: {
                label: true,
                'label--small': this.size === 'small',
                'label--medium': this.size === 'medium',
                'label--large': this.size === 'large',
                'label--valid': this.valid,
                'label--invalid': this.invalid
            }, htmlFor: this.inputId }, this.label), h("sl-dropdown", { part: "base", ref: el => (this.dropdown = el), closeOnSelect: !this.multiple, containingElement: this.host, class: {
                select: true,
                'select--open': this.isOpen,
                'select--focused': this.hasFocus,
                'select--disabled': this.disabled,
                'select--multiple': this.multiple,
                'select--small': this.size === 'small',
                'select--medium': this.size === 'medium',
                'select--large': this.size === 'large',
                'select--pill': this.pill
            }, onSlShow: this.handleMenuShow, onSlHide: this.handleMenuHide }, h("sl-input", { slot: "trigger", part: "input", ref: el => (this.input = el), id: this.inputId, class: "select__input", name: this.name, value: this.displayLabel, disabled: this.disabled, pill: this.pill, placeholder: this.displayLabel === '' && this.displayTags.length === 0 ? this.placeholder : null, readonly: true, size: this.size, valid: this.valid, invalid: this.invalid, "aria-labelledby": this.labelId, onSlFocus: this.handleFocus, onSlBlur: this.handleBlur, onKeyDown: this.handleKeyDown }, this.displayTags.length && (h("span", { part: "tags", slot: "prefix", class: "select__tags" }, this.displayTags)), h("span", { part: "icon", slot: "suffix", class: "select__icon" }, h("sl-icon", { name: "chevron-down" }))), h("sl-menu", { ref: el => (this.menu = el), class: "select__menu", onSlSelect: this.handleMenuSelect, onKeyDown: this.handleMenuKeyDown }, h("slot", null))), h("div", { part: "help-text", id: this.helpTextId, class: {
                'help-text': true,
                'help-text--small': this.size === 'small',
                'help-text--medium': this.size === 'medium',
                'help-text--large': this.size === 'large',
                'help-text--valid': this.valid,
                'help-text--invalid': this.invalid
            } }, h("slot", { name: "help-text" }))));
    }
    get host() { return this; }
    static get watchers() { return {
        "multiple": ["handleMultipleChange"],
        "value": ["handleValueChange"]
    }; }
    static get style() { return selectCss; }
};

const skeletonCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--border-radius:var(--sl-border-radius-pill);--color:var(--sl-color-gray-90);--sheen-color:var(--sl-color-gray-95);display:block;position:relative}.skeleton{display:flex;width:100%;height:100%;min-height:1rem}.skeleton__indicator{flex:1 1 auto;background:var(--color);border-radius:var(--border-radius)}.skeleton--sheen .skeleton__indicator{background:linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));background-size:400% 100%;background-size:400% 100%;animation:sheen 8s ease-in-out infinite}.skeleton--pulse .skeleton__indicator{animation:pulse 2s ease-in-out 0.5s infinite}@keyframes sheen{0%{background-position:200% 0}to{background-position:-200% 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}";

const Skeleton = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** Determines which effect the skeleton will use. */
        this.effect = 'sheen';
    }
    render() {
        return (h("div", { part: "base", class: {
                skeleton: true,
                'skeleton--pulse': this.effect === 'pulse',
                'skeleton--sheen': this.effect === 'sheen'
            }, "aria-busy": true, "aria-live": "polite" }, h("div", { part: "indicator", class: "skeleton__indicator" })));
    }
    static get style() { return skeletonCss; }
};

const spinnerCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--track-color:transparent;--indicator-color:var(--sl-color-primary-50);--stroke-width:2px;display:inline-flex}.spinner{display:inline-block;width:1em;height:1em;border-radius:50%;border:solid var(--stroke-width) var(--indicator-color);border-bottom-color:var(--track-color);animation:1s linear infinite spin}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const Spinner = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
    }
    render() {
        return h("span", { part: "base", class: "spinner", "aria-busy": "true", "aria-live": "polite" });
    }
    static get style() { return spinnerCss; }
};

const switchCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--height:var(--sl-toggle-size);--thumb-size:calc(var(--sl-toggle-size) + 4px);--track-border-radius:var(--height);--width:calc(var(--height) * 2);display:inline-block}.switch{display:inline-flex;align-items:center;font-family:var(--sl-input-font-family);font-size:var(--sl-input-font-size-medium);font-weight:var(--sl-input-font-weight);color:var(--sl-input-color);vertical-align:middle;cursor:pointer}.switch__control{position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--width);height:var(--height);background-color:var(--sl-color-gray-80);border:solid var(--sl-input-border-width) var(--sl-color-gray-80);border-radius:var(--track-border-radius);transition:var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color}.switch__control .switch__thumb{width:var(--thumb-size);height:var(--thumb-size);background-color:var(--sl-color-white);border-radius:50%;border:solid var(--sl-input-border-width) var(--sl-input-border-color);transform:translateX(calc(var(--width) / -2 + var(--thumb-size) / 2 - (var(--thumb-size) - var(--height)) / 2));transition:var(--sl-transition-fast) transform ease, var(--sl-transition-fast) background-color, var(--sl-transition-fast) border-color, var(--sl-transition-fast) box-shadow}.switch__control input[type=checkbox]{position:absolute;opacity:0;padding:0;margin:0;pointer-events:none;-webkit-appearance:none}.switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover{background-color:var(--sl-color-gray-90);border-color:var(--sl-color-gray-90)}.switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb{background-color:var(--sl-color-white);border-color:var(--sl-input-border-color)}.switch.switch--focused:not(.switch--checked):not(.switch--disabled) .switch__control{background-color:var(--sl-color-gray-90);border-color:var(--sl-color-gray-90)}.switch.switch--focused:not(.switch--checked):not(.switch--disabled) .switch__control .switch__thumb{background-color:var(--sl-color-white);border-color:var(--sl-color-primary-50);box-shadow:var(--sl-focus-ring-box-shadow)}.switch--checked .switch__control{background-color:var(--sl-color-primary-50);border-color:var(--sl-color-primary-50)}.switch--checked .switch__control .switch__thumb{background-color:var(--sl-color-white);border-color:var(--sl-color-primary-50);transform:translateX(calc(var(--width) / 2 - var(--thumb-size) / 2 + (var(--thumb-size) - var(--height)) / 2))}.switch.switch--checked:not(.switch--disabled) .switch__control:hover{background-color:var(--sl-color-primary-60);border-color:var(--sl-color-primary-60)}.switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb{background-color:var(--sl-color-white);border-color:var(--sl-color-primary-50)}.switch.switch--checked:not(.switch--disabled).switch--focused .switch__control{background-color:var(--sl-color-primary-60);border-color:var(--sl-color-primary-60)}.switch.switch--checked:not(.switch--disabled).switch--focused .switch__control .switch__thumb{background-color:var(--sl-color-white);border-color:var(--sl-color-primary-50);box-shadow:var(--sl-focus-ring-box-shadow)}.switch--disabled{opacity:0.5;cursor:not-allowed}.switch__label{line-height:var(--height);margin-left:0.5em;user-select:none}";

let id$8 = 0;
const Switch = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slBlur = createEvent(this, "slBlur", 7);
        this.slChange = createEvent(this, "slChange", 7);
        this.slFocus = createEvent(this, "slFocus", 7);
        this.switchId = `switch-${++id$8}`;
        this.labelId = `switch-label-${id$8}`;
        this.hasFocus = false;
        /** Set to true to disable the switch. */
        this.disabled = false;
        /** Set to true to draw the switch in a checked state. */
        this.checked = false;
    }
    handleCheckedChange() {
        this.input.checked = this.checked;
        this.slChange.emit();
    }
    connectedCallback() {
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }
    /** Sets focus on the switch. */
    async setFocus() {
        this.input.focus();
    }
    /** Removes focus from the switch. */
    async removeFocus() {
        this.input.blur();
    }
    handleClick() {
        this.checked = this.input.checked;
    }
    handleBlur() {
        this.hasFocus = false;
        this.slBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.slFocus.emit();
    }
    handleKeyDown(event) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this.checked = false;
        }
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.checked = true;
        }
    }
    handleMouseDown(event) {
        // Prevent clicks on the label from briefly blurring the input
        event.preventDefault();
        this.input.focus();
    }
    render() {
        return (h("label", { part: "base", htmlFor: this.switchId, role: "switch", class: {
                switch: true,
                'switch--checked': this.checked,
                'switch--disabled': this.disabled,
                'switch--focused': this.hasFocus
            }, onMouseDown: this.handleMouseDown }, h("span", { part: "control", class: "switch__control" }, h("span", { part: "thumb", class: "switch__thumb" }), h("input", { ref: el => (this.input = el), id: this.switchId, type: "checkbox", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, "aria-labeledby": this.labelId, onClick: this.handleClick, onBlur: this.handleBlur, onFocus: this.handleFocus, onKeyDown: this.handleKeyDown })), h("span", { part: "label", id: this.labelId, class: "switch__label" }, h("slot", null))));
    }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
    static get style() { return switchCss; }
};

const tabCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--focus-ring:var(--sl-focus-ring-box-shadow-inset);display:inline-block}.tab{font-family:var(--sl-font-sans);font-size:var(--sl-font-size-small);font-weight:var(--sl-font-weight-semibold);border-radius:4px;color:var(--sl-color-gray-40);padding:16px 20px;white-space:nowrap;user-select:none;cursor:pointer;transition:var(--transition-speed) box-shadow, var(--transition-speed) color}.tab:hover:not(.tab--disabled){color:var(--sl-color-primary-50)}.tab:focus{outline:none}.tab:focus:not(.tab--disabled){color:var(--sl-color-primary-50);box-shadow:var(--focus-ring)}.tab.tab--active:not(.tab--disabled){color:var(--sl-color-primary-50)}.tab.tab--disabled{opacity:0.5;cursor:not-allowed}";

let id$9 = 0;
const Tab$1 = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.componentId = `tab-${++id$9}`;
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
    get host() { return this; }
    static get style() { return tabCss; }
};

const tabGroupCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:block}.tab-group{display:flex;border:solid 1px transparent;border-radius:0}.tab-group .tab-group__tabs{display:flex;position:relative}.tab-group .tab-group__active-tab-indicator{position:absolute;transition:var(--sl-transition-fast) transform ease, var(--sl-transition-fast) width ease}.tab-group:not(.focus-visible) ::slotted(sl-tab){--focus-ring:none}.tab-group--horizontal-scroll .tab-group__nav-container{position:relative;padding:0 var(--sl-spacing-x-large)}.tab-group__scroll-button{display:flex;align-items:center;justify-content:center;position:absolute;top:0;bottom:0;width:var(--sl-spacing-x-large)}.tab-group__scroll-button--left{left:0}.tab-group__scroll-button--right{right:0}.tab-group--top{flex-direction:column}.tab-group--top .tab-group__nav{display:flex;order:1;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}.tab-group--top .tab-group__nav::-webkit-scrollbar{width:0;height:0}.tab-group--top .tab-group__tabs{flex:1 1 auto;position:relative;flex-direction:row;border-bottom:solid 2px var(--sl-color-gray-90)}.tab-group--top .tab-group__active-tab-indicator{bottom:-2px;border-bottom:solid 2px var(--sl-color-primary-50)}.tab-group--top .tab-group__body{order:2}.tab-group--bottom{flex-direction:column}.tab-group--bottom .tab-group__nav{display:flex;order:2;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}.tab-group--bottom .tab-group__nav::-webkit-scrollbar{width:0;height:0}.tab-group--bottom .tab-group__tabs{flex:1 1 auto;position:relative;flex-direction:row;border-top:solid 2px var(--sl-color-gray-90)}.tab-group--bottom .tab-group__active-tab-indicator{top:calc(-1 * 2px);border-top:solid 2px var(--sl-color-primary-50)}.tab-group--bottom .tab-group__body{order:1}.tab-group--left{flex-direction:row}.tab-group--left .tab-group__nav{order:1}.tab-group--left .tab-group__tabs{flex:0 0 auto;flex-direction:column;border-right:solid 2px var(--sl-color-gray-90)}.tab-group--left .tab-group__active-tab-indicator{right:calc(-1 * 2px);border-right:solid 2px var(--sl-color-primary-50)}.tab-group--left .tab-group__body{flex:1 1 auto;order:2}.tab-group--right{flex-direction:row}.tab-group--right .tab-group__nav{order:2}.tab-group--right .tab-group__tabs{flex:0 0 auto;flex-direction:column;border-left:solid 2px var(--sl-color-gray-90)}.tab-group--right .tab-group__active-tab-indicator{left:calc(-1 * 2px);border-left:solid 2px var(--sl-color-primary-50)}.tab-group--right .tab-group__body{flex:1 1 auto;order:1}";

const TabGroup = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slTabShow = createEvent(this, "slTabShow", 7);
        this.slTabHide = createEvent(this, "slTabHide", 7);
        this.canScrollHorizontally = false;
        /** The placement of the tabs. */
        this.placement = 'top';
    }
    handlePlacementChange() {
        this.syncActiveTabIndicator();
    }
    connectedCallback() {
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleScrollLeft = this.handleScrollLeft.bind(this);
        this.handleScrollRight = this.handleScrollRight.bind(this);
    }
    componentDidLoad() {
        // Set initial tab state when the tabs first become visible
        const observer = new IntersectionObserver((entries, observer) => {
            if (entries[0].intersectionRatio > 0) {
                this.setAriaLabels();
                this.setActiveTab(this.getActiveTab() || this.getAllTabs()[0], false);
                observer.unobserve(entries[0].target);
            }
        });
        observer.observe(this.host);
        focusVisible.observe(this.tabGroup);
        this.resizeObserver = new index(() => this.syncHorizontalScroll());
        this.resizeObserver.observe(this.nav);
        requestAnimationFrame(() => this.syncHorizontalScroll());
        // Update aria labels if the DOM changes
        this.mutationObserver = new MutationObserver(mutations => {
            if (mutations.some(mutation => {
                return !['aria-labeledby', 'aria-controls'].includes(mutation.attributeName);
            })) {
                setTimeout(() => this.setAriaLabels());
            }
        });
        this.mutationObserver.observe(this.host, { attributes: true, childList: true, subtree: true });
    }
    disconnectedCallback() {
        this.mutationObserver.disconnect();
        focusVisible.unobserve(this.tabGroup);
        this.resizeObserver.unobserve(this.nav);
    }
    /** Shows the specified tab panel. */
    async show(panel) {
        const tabs = this.getAllTabs();
        const tab = tabs.find(el => el.panel === panel);
        if (tab) {
            this.setActiveTab(tab);
        }
    }
    getAllTabs(includeDisabled = false) {
        const slot = this.tabs.querySelector('slot');
        return [...slot.assignedElements()].filter((el) => {
            return includeDisabled
                ? el.tagName.toLowerCase() === 'sl-tab'
                : el.tagName.toLowerCase() === 'sl-tab' && !el.disabled;
        });
    }
    getAllPanels() {
        const slot = this.body.querySelector('slot');
        return [...slot.assignedElements()].filter((el) => el.tagName.toLowerCase() === 'sl-tab-panel');
    }
    getActiveTab() {
        return this.getAllTabs().find(el => el.active);
    }
    handleClick(event) {
        const target = event.target;
        const tab = target.closest('sl-tab');
        if (tab) {
            this.setActiveTab(tab);
        }
    }
    handleKeyDown(event) {
        // Activate a tab
        if (['Enter', ' '].includes(event.key)) {
            const target = event.target;
            const tab = target.closest('sl-tab');
            if (tab) {
                this.setActiveTab(tab);
                event.preventDefault();
            }
        }
        // Move focus left or right
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
            const activeEl = document.activeElement;
            if (activeEl && activeEl.tagName.toLowerCase() === 'sl-tab') {
                const tabs = this.getAllTabs();
                let index = tabs.indexOf(activeEl);
                if (event.key === 'Home') {
                    index = 0;
                }
                else if (event.key === 'End') {
                    index = tabs.length - 1;
                }
                else if (event.key === 'ArrowLeft') {
                    index = Math.max(0, index - 1);
                }
                else if (event.key === 'ArrowRight') {
                    index = Math.min(tabs.length - 1, index + 1);
                }
                tabs[index].setFocus();
                if (['top', 'bottom'].includes(this.placement)) {
                    scrollIntoView(tabs[index], this.nav, 'horizontal');
                }
                event.preventDefault();
            }
        }
    }
    handleScrollLeft() {
        this.nav.scroll({
            left: this.nav.scrollLeft - this.nav.clientWidth,
            behavior: 'smooth'
        });
    }
    handleScrollRight() {
        this.nav.scroll({
            left: this.nav.scrollLeft + this.nav.clientWidth,
            behavior: 'smooth'
        });
    }
    setActiveTab(tab, emitEvents = true) {
        if (tab && tab !== this.activeTab && !tab.disabled) {
            const previousTab = this.activeTab;
            this.activeTab = tab;
            // Sync tabs and panels
            this.getAllTabs().map(el => (el.active = el === this.activeTab));
            this.getAllPanels().map(el => (el.active = el.name === this.activeTab.panel));
            this.syncActiveTabIndicator();
            if (['top', 'bottom'].includes(this.placement)) {
                scrollIntoView(this.activeTab, this.nav, 'horizontal');
            }
            // Emit events
            if (emitEvents) {
                if (previousTab) {
                    this.slTabHide.emit({ name: previousTab.panel });
                }
                this.slTabShow.emit({ name: this.activeTab.panel });
            }
        }
    }
    setAriaLabels() {
        const tabs = this.getAllTabs();
        const panels = this.getAllPanels();
        // Link each tab with its corresponding panel
        tabs.map(tab => {
            const panel = panels.find(el => el.name === tab.panel);
            if (panel) {
                tab.setAttribute('aria-controls', panel.getAttribute('id'));
                panel.setAttribute('aria-labeledby', tab.getAttribute('id'));
            }
        });
    }
    syncActiveTabIndicator() {
        const tab = this.getActiveTab();
        const width = tab.clientWidth;
        const height = tab.clientHeight;
        const offset = getOffset(tab, this.nav);
        const offsetTop = offset.top + this.nav.scrollTop;
        const offsetLeft = offset.left + this.nav.scrollLeft;
        switch (this.placement) {
            case 'top':
            case 'bottom':
                this.activeTabIndicator.style.width = `${width}px`;
                this.activeTabIndicator.style.height = null;
                this.activeTabIndicator.style.transform = `translateX(${offsetLeft}px)`;
                break;
            case 'left':
            case 'right':
                this.activeTabIndicator.style.width = null;
                this.activeTabIndicator.style.height = `${height}px`;
                this.activeTabIndicator.style.transform = `translateY(${offsetTop}px)`;
                break;
        }
    }
    syncHorizontalScroll() {
        this.canScrollHorizontally =
            ['top', 'bottom'].includes(this.placement) && this.nav.scrollWidth > this.nav.clientWidth;
    }
    render() {
        return (h("div", { part: "base", ref: el => (this.tabGroup = el), class: {
                'tab-group': true,
                // Placements
                'tab-group--top': this.placement === 'top',
                'tab-group--bottom': this.placement === 'bottom',
                'tab-group--left': this.placement === 'left',
                'tab-group--right': this.placement === 'right',
                'tab-group--horizontal-scroll': this.canScrollHorizontally
            }, onClick: this.handleClick, onKeyDown: this.handleKeyDown }, h("div", { class: "tab-group__nav-container" }, this.canScrollHorizontally && (h("sl-icon-button", { class: "tab-group__scroll-button tab-group__scroll-button--left", name: "chevron-left", onClick: this.handleScrollLeft })), h("div", { ref: el => (this.nav = el), key: "nav", part: "nav", class: "tab-group__nav", tabindex: "-1" }, h("div", { ref: el => (this.tabs = el), part: "tabs", class: "tab-group__tabs", role: "tablist" }, h("div", { ref: el => (this.activeTabIndicator = el), part: "active-tab-indicator", class: "tab-group__active-tab-indicator" }), h("slot", { name: "nav" }))), this.canScrollHorizontally && (h("sl-icon-button", { class: "tab-group__scroll-button tab-group__scroll-button--right", name: "chevron-right", onClick: this.handleScrollRight }))), h("div", { ref: el => (this.body = el), part: "body", class: "tab-group__body" }, h("slot", null))));
    }
    get host() { return this; }
    static get watchers() { return {
        "placement": ["handlePlacementChange"]
    }; }
    static get style() { return tabGroupCss; }
};

const tabPanelCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:block}.tab-panel{border:solid 1px transparent;padding:20px 20px}";

let id$a = 0;
const TabPanel = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.componentId = `tab-panel-${++id$a}`;
        /** The tab panel's name. */
        this.name = '';
        /** When true, the tab panel will be shown. */
        this.active = false;
    }
    render() {
        return (
        // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
        h(Host, { id: this.host.id || this.componentId, style: { display: this.active ? 'block' : 'none' } }, h("div", { part: "base", class: "tab-panel", role: "tabpanel", "aria-selected": this.active, "aria-hidden": !this.active }, h("slot", null))));
    }
    get host() { return this; }
    static get style() { return tabPanelCss; }
};

const tagCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block}.tag{display:flex;align-items:center;border:solid 1px;line-height:1;white-space:nowrap;user-select:none;cursor:default}.tag__clear::part(base){color:inherit;padding:0}.tag--primary{background-color:var(--sl-color-primary-95);border-color:var(--sl-color-primary-80);color:var(--sl-color-primary-35)}.tag--success{background-color:var(--sl-color-success-95);border-color:var(--sl-color-success-80);color:var(--sl-color-success-30)}.tag--info{background-color:var(--sl-color-info-95);border-color:var(--sl-color-info-80);color:var(--sl-color-info-40)}.tag--warning{background-color:var(--sl-color-warning-95);border-color:var(--sl-color-warning-80);color:var(--sl-color-warning-30)}.tag--danger{background-color:var(--sl-color-danger-95);border-color:var(--sl-color-danger-80);color:var(--sl-color-danger-40)}.tag--small{font-size:var(--sl-button-font-size-small);height:calc(var(--sl-input-height-small) * 0.8);line-height:calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);border-radius:var(--sl-input-border-radius-small);padding:0 var(--sl-spacing-x-small)}.tag--small .tag__clear{margin-left:var(--sl-spacing-xx-small);margin-right:calc(-1 * var(--sl-spacing-xxx-small))}.tag--medium{font-size:var(--sl-button-font-size-medium);height:calc(var(--sl-input-height-medium) * 0.8);line-height:calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);border-radius:var(--sl-input-border-radius-medium);padding:0 var(--sl-spacing-small)}.tag--medium .tag__clear{margin-left:var(--sl-spacing-xx-small);margin-right:calc(-1 * var(--sl-spacing-xx-small))}.tag--large{font-size:var(--sl-button-font-size-large);height:calc(var(--sl-input-height-large) * 0.8);line-height:calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);border-radius:var(--sl-input-border-radius-large);padding:0 var(--sl-spacing-medium)}.tag--large .tag__clear{margin-left:var(--sl-spacing-xx-small);margin-right:calc(-1 * var(--sl-spacing-x-small))}.tag--pill{border-radius:var(--sl-border-radius-pill)}";

const Tag = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slClear = createEvent(this, "slClear", 7);
        /** The tag's type. */
        this.type = 'primary';
        /** The tag's size. */
        this.size = 'medium';
        /** Set to true to draw a pill-style tag with rounded edges. */
        this.pill = false;
        /** Set to true to make the tag clearable. */
        this.clearable = false;
    }
    connectedCallback() {
        this.handleClearClick = this.handleClearClick.bind(this);
    }
    handleClearClick() {
        this.slClear.emit();
    }
    render() {
        return (h("span", { ref: el => (this.tag = el), part: "base", class: {
                tag: true,
                // Types
                'tag--primary': this.type === 'primary',
                'tag--success': this.type === 'success',
                'tag--info': this.type === 'info',
                'tag--warning': this.type === 'warning',
                'tag--danger': this.type === 'danger',
                'tag--text': this.type === 'text',
                // Sizes
                'tag--small': this.size === 'small',
                'tag--medium': this.size === 'medium',
                'tag--large': this.size === 'large',
                // Modifers
                'tag--pill': this.pill,
                'tag--clearable': this.clearable
            } }, h("span", { part: "content", class: "tag__content" }, h("slot", null)), this.clearable && (h("sl-icon-button", { part: "clear-button", name: "x", class: "tag__clear", onClick: this.handleClearClick }))));
    }
    static get style() { return tagCss; }
};

const textareaCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.form-control .label{display:none}.form-control--has-label .label{display:inline-block;color:var(--sl-input-label-color);margin-bottom:var(--sl-spacing-xxx-small)}.form-control--has-label .label.label--small{font-size:var(--sl-input-label-font-size-small)}.form-control--has-label .label.label--medium{font-size:var(--sl-input-label-font-size-medium)}.form-control--has-label .label.label--large{font-size:var(--sl-input-label-font-size-large)}.form-control--has-label .label.label--valid{color:var(--sl-input-label-color-valid)}.form-control--has-label .label.label--invalid{color:var(--sl-input-label-color-invalid)}.help-text{color:var(--sl-input-help-text-color)}.help-text.help-text--small{font-size:var(--sl-input-help-text-font-size-small)}.help-text.help-text--medium{font-size:var(--sl-input-help-text-font-size-medium)}.help-text.help-text--large{font-size:var(--sl-input-help-text-font-size-large)}.help-text.help-text--valid{color:var(--sl-input-help-text-color-valid)}.help-text.help-text--invalid{color:var(--sl-input-help-text-color-invalid)}.help-text ::slotted(*){margin-top:var(--sl-spacing-xxx-small)}:host{display:block}.textarea{display:flex;align-items:center;position:relative;width:100%;font-family:var(--sl-input-font-family);font-weight:var(--sl-input-font-weight);line-height:var(--sl-line-height-normal);letter-spacing:var(--sl-input-letter-spacing);background-color:var(--sl-input-background-color);border:solid var(--sl-input-border-width) var(--sl-input-border-color);vertical-align:middle;transition:var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;cursor:text}.textarea:hover:not(.textarea--disabled){background-color:var(--sl-input-background-color-hover);border-color:var(--sl-input-border-color-hover);color:var(--sl-input-color-hover)}.textarea.textarea--focused:not(.textarea--disabled){background-color:var(--sl-input-background-color-focus);border-color:var(--sl-input-border-color-focus);box-shadow:var(--sl-focus-ring-box-shadow);color:var(--sl-input-color-focus)}.textarea.textarea--disabled{background-color:var(--sl-input-background-color-disabled);border-color:var(--sl-input-border-color-disabled);color:var(--sl-input-color-disabled);opacity:0.5;cursor:not-allowed}.textarea.textarea--disabled .textarea__control::placeholder{color:var(--sl-input-placeholder-color-disabled)}.textarea.textarea--valid:not(.textarea--disabled){color:var(--sl-input-color-valid);border-color:var(--sl-input-border-color-valid)}.textarea.textarea--valid:not(.textarea--disabled).textarea--focused{box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-success-hue), var(--sl-color-success-saturation), 50%, var(--sl-focus-ring-alpha));border-color:var(--sl-input-border-color-valid)}.textarea.textarea--invalid:not(.textarea--disabled){border-color:var(--sl-color-danger-50)}.textarea.textarea--invalid:not(.textarea--disabled).textarea--focused{box-shadow:0 0 0 var(--sl-focus-ring-width) hsla(var(--sl-color-danger-hue), var(--sl-color-danger-saturation), 50%, var(--sl-focus-ring-alpha))}.textarea__control{flex:1 1 auto;font-family:inherit;font-size:inherit;font-weight:inherit;line-height:1.4;color:var(--sl-input-color);border:none;background:none;box-shadow:none;cursor:inherit;-webkit-appearance:none}.textarea__control::-webkit-search-decoration,.textarea__control::-webkit-search-cancel-button,.textarea__control::-webkit-search-results-button,.textarea__control::-webkit-search-results-decoration{-webkit-appearance:none}.textarea__control::placeholder{color:var(--sl-input-placeholder-color);user-select:none}.textarea__control:focus{outline:none}.textarea--small{border-radius:var(--sl-input-border-radius-small);font-size:var(--sl-input-font-size-small)}.textarea--small .textarea__control{padding:0.5em var(--sl-input-spacing-small)}.textarea--medium{border-radius:var(--sl-input-border-radius-medium);font-size:var(--sl-input-font-size-medium)}.textarea--medium .textarea__control{padding:0.5em var(--sl-input-spacing-medium)}.textarea--large{border-radius:var(--sl-input-border-radius-large);font-size:var(--sl-input-font-size-large)}.textarea--large .textarea__control{padding:0.5em var(--sl-input-spacing-large)}.textarea--resize-none .textarea__control{resize:none}.textarea--resize-vertical .textarea__control{resize:vertical}.textarea--resize-auto .textarea__control{height:auto;resize:none}";

let id$b = 0;
const Textarea = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slChange = createEvent(this, "slChange", 7);
        this.slInput = createEvent(this, "slInput", 7);
        this.slFocus = createEvent(this, "slFocus", 7);
        this.slBlur = createEvent(this, "slBlur", 7);
        this.textareaId = `textarea-${++id$b}`;
        this.labelId = `textarea-label-${id$b}`;
        this.helpTextId = `textarea-help-text-${id$b}`;
        this.hasFocus = false;
        /** The textarea's size. */
        this.size = 'medium';
        /** The textarea's name attribute. */
        this.name = '';
        /** The textarea's value attribute. */
        this.value = '';
        /** The textarea's label. */
        this.label = '';
        /** Set to true to disable the textarea. */
        this.disabled = false;
        /** Set to true for a readonly textarea. */
        this.readonly = false;
        /** Controls how the textarea can be resized. */
        this.resize = 'vertical';
        /** Set to true to indicate that the user input is valid. */
        this.valid = false;
        /** Set to true to indicate that the user input is invalid. */
        this.invalid = false;
        /** The number of rows to display by default. */
        this.rows = 4;
    }
    handleRowsChange() {
        this.setTextareaHeight();
    }
    connectedCallback() {
        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }
    componentDidLoad() {
        this.setTextareaHeight();
        this.resizeObserver = new index(() => this.setTextareaHeight());
        this.resizeObserver.observe(this.textarea);
    }
    disconnectedCallback() {
        this.resizeObserver.unobserve(this.textarea);
    }
    /** Sets focus on the textarea. */
    async setFocus() {
        this.textarea.focus();
    }
    /** Removes focus fromt the textarea. */
    async removeFocus() {
        this.textarea.blur();
    }
    /** Selects all the text in the input. */
    async select() {
        return this.textarea.select();
    }
    /** Sets the start and end positions of the text selection (0-based). */
    async setSelectionRange(selectionStart, selectionEnd, selectionDirection = 'none') {
        return this.textarea.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
    }
    /** Replaces a range of text with a new string. */
    async setRangeText(replacement, start, end, selectMode = 'preserve') {
        return this.textarea.setRangeText(replacement, start, end, selectMode);
    }
    handleChange() {
        this.slChange.emit();
    }
    handleInput() {
        this.value = this.textarea.value;
        this.setTextareaHeight();
        this.slInput.emit();
    }
    handleBlur() {
        this.hasFocus = false;
        this.slBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.slFocus.emit();
    }
    setTextareaHeight() {
        if (this.resize === 'auto') {
            this.textarea.style.height = 'auto';
            this.textarea.style.height = this.textarea.scrollHeight + 'px';
        }
        else {
            this.textarea.style.height = undefined;
        }
    }
    render() {
        return (h("div", { part: "form-control", class: {
                'form-control': true,
                'form-control--has-label': this.label.length > 0,
                'form-control--valid': this.valid,
                'form-control--invalid': this.invalid
            } }, h("label", { part: "label", class: {
                label: true,
                'label--small': this.size === 'small',
                'label--medium': this.size === 'medium',
                'label--large': this.size === 'large',
                'label--valid': this.valid,
                'label--invalid': this.invalid
            }, htmlFor: this.textareaId }, this.label), h("div", { part: "base", class: {
                textarea: true,
                // Sizes
                'textarea--small': this.size === 'small',
                'textarea--medium': this.size === 'medium',
                'textarea--large': this.size === 'large',
                // States
                'textarea--disabled': this.disabled,
                'textarea--focused': this.hasFocus,
                'textarea--empty': this.value.length === 0,
                'textarea--valid': this.valid,
                'textarea--invalid': this.invalid,
                // Modifiers
                'textarea--resize-none': this.resize === 'none',
                'textarea--resize-vertical': this.resize === 'vertical',
                'textarea--resize-auto': this.resize === 'auto'
            } }, h("textarea", { part: "textarea", ref: el => (this.textarea = el), id: this.textareaId, class: "textarea__control", name: this.name, placeholder: this.placeholder, disabled: this.disabled, readOnly: this.readonly, rows: this.rows, maxLength: this.maxlength, value: this.value, autoCapitalize: this.autocapitalize, autoCorrect: this.autocorrect, autoFocus: this.autofocus, required: this.required, inputMode: this.inputmode, "aria-labelledby": this.labelId, onChange: this.handleChange, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur })), h("div", { part: "help-text", id: this.helpTextId, class: {
                'help-text': true,
                'help-text--small': this.size === 'small',
                'help-text--medium': this.size === 'medium',
                'help-text--large': this.size === 'large',
                'help-text--valid': this.valid,
                'help-text--invalid': this.invalid
            } }, h("slot", { name: "help-text" }))));
    }
    static get watchers() { return {
        "rows": ["handleRowsChange"]
    }; }
    static get style() { return textareaCss; }
};

const tooltipCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--max-width:20rem;--hide-delay:0s;--hide-duration:0.125s;--hide-timing-function:ease;--show-delay:0.125s;--show-duration:0.125s;--show-timing-function:ease;display:contents}.tooltip{position:absolute;max-width:var(--max-width);z-index:var(--sl-z-index-tooltip);border-radius:var(--sl-tooltip-border-radius);background-color:var(--sl-tooltip-background-color);font-family:var(--sl-tooltip-font-family);font-size:var(--sl-tooltip-font-size);font-weight:var(--sl-tooltip-font-weight);line-height:var(--sl-tooltip-line-height);color:var(--sl-tooltip-color);opacity:0;transition:var(--sl-transition-fast) opacity;padding:var(--sl-tooltip-padding);pointer-events:none}.tooltip::after{content:\"\";position:absolute;width:0;height:0}.tooltip.popover-visible{opacity:1}.tooltip[data-popper-placement^=bottom]::after{bottom:100%;left:calc(50% - var(--sl-tooltip-arrow-size));border-bottom:var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);border-left:var(--sl-tooltip-arrow-size) solid transparent;border-right:var(--sl-tooltip-arrow-size) solid transparent}.tooltip[data-popper-placement=bottom-start]::after{left:var(--sl-tooltip-arrow-start-end-offset)}.tooltip[data-popper-placement=bottom-end]::after{right:var(--sl-tooltip-arrow-start-end-offset);left:auto}.tooltip[data-popper-placement^=top]::after{top:100%;left:calc(50% - var(--sl-tooltip-arrow-size));border-top:var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);border-left:var(--sl-tooltip-arrow-size) solid transparent;border-right:var(--sl-tooltip-arrow-size) solid transparent}.tooltip[data-popper-placement=top-start]::after{left:var(--sl-tooltip-arrow-start-end-offset)}.tooltip[data-popper-placement=top-end]::after{right:var(--sl-tooltip-arrow-start-end-offset);left:auto}.tooltip[data-popper-placement^=left]::after{top:calc(50% - var(--sl-tooltip-arrow-size));left:100%;border-left:var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);border-top:var(--sl-tooltip-arrow-size) solid transparent;border-bottom:var(--sl-tooltip-arrow-size) solid transparent}.tooltip[data-popper-placement=left-start]::after{top:var(--sl-tooltip-arrow-start-end-offset)}.tooltip[data-popper-placement=left-end]::after{top:auto;bottom:var(--sl-tooltip-arrow-start-end-offset)}.tooltip[data-popper-placement^=right]::after{top:calc(50% - var(--sl-tooltip-arrow-size));right:100%;border-right:var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);border-top:var(--sl-tooltip-arrow-size) solid transparent;border-bottom:var(--sl-tooltip-arrow-size) solid transparent}.tooltip[data-popper-placement=right-start]::after{top:var(--sl-tooltip-arrow-start-end-offset)}.tooltip[data-popper-placement=right-end]::after{top:auto;bottom:var(--sl-tooltip-arrow-start-end-offset)}";

let id$c = 0;
const Tooltip = class extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.slShow = createEvent(this, "slShow", 7);
        this.slAfterShow = createEvent(this, "slAfterShow", 7);
        this.slHide = createEvent(this, "slHide", 7);
        this.slAfterHide = createEvent(this, "slAfterHide", 7);
        this.componentId = `tooltip-${++id$c}`;
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
        return (h(Host, { onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut }, h("slot", { "aria-describedby": this.componentId }), !this.disabled && (h("div", { part: "base", ref: el => (this.tooltip = el), id: this.componentId, class: {
                tooltip: true,
                'tooltip--open': this.open
            }, role: "tooltip", "aria-hidden": !this.open }, this.content))));
    }
    get host() { return this; }
    static get watchers() { return {
        "open": ["handleOpenChange"]
    }; }
    static get style() { return tooltipCss; }
};

const SlAlert = /*@__PURE__*/proxyCustomElement(Tab, [1,"sl-alert",{"open":[1540],"closable":[4],"type":[1]}]);
const SlAnimation = /*@__PURE__*/proxyCustomElement(Animate, [1,"sl-animation",{"name":[1],"delay":[2],"direction":[1],"duration":[2],"easing":[1],"endDelay":[2,"end-delay"],"fill":[1],"iterations":[2],"iterationStart":[2,"iteration-start"],"keyframes":[1040],"playbackRate":[2,"playback-rate"],"pause":[4]}]);
const SlAvatar = /*@__PURE__*/proxyCustomElement(Avatar, [1,"sl-avatar",{"image":[1],"alt":[1],"initials":[1],"shape":[1],"hasError":[32]}]);
const SlBadge = /*@__PURE__*/proxyCustomElement(Badge, [1,"sl-badge",{"type":[1],"pill":[4],"pulse":[4]}]);
const SlButton = /*@__PURE__*/proxyCustomElement(Button, [1,"sl-button",{"type":[1],"size":[1],"caret":[4],"disabled":[4],"loading":[4],"pill":[4],"circle":[4],"submit":[4],"name":[1],"value":[1],"href":[1],"target":[1],"download":[1],"hasFocus":[32]}]);
const SlButtonGroup = /*@__PURE__*/proxyCustomElement(ButtonGroup, [1,"sl-button-group",{"label":[1]}]);
const SlCard = /*@__PURE__*/proxyCustomElement(Card, [1,"sl-card",{"hasFooter":[32],"hasImage":[32],"hasHeader":[32]}]);
const SlCheckbox = /*@__PURE__*/proxyCustomElement(Checkbox, [1,"sl-checkbox",{"name":[1],"value":[1],"disabled":[4],"checked":[1028],"indeterminate":[1028],"hasFocus":[32]}]);
const SlColorPicker = /*@__PURE__*/proxyCustomElement(ColorPicker, [1,"sl-color-picker",{"value":[1537],"format":[1],"inline":[4],"size":[1],"disabled":[4],"opacity":[4],"uppercase":[4],"swatches":[16],"textInputValue":[32],"hue":[32],"saturation":[32],"lightness":[32],"alpha":[32],"showCopyCheckmark":[32]}]);
const SlDetails = /*@__PURE__*/proxyCustomElement(Details, [1,"sl-details",{"open":[1540],"summary":[1],"disabled":[4]}]);
const SlDialog = /*@__PURE__*/proxyCustomElement(Dialog, [1,"sl-dialog",{"open":[1540],"label":[1],"noHeader":[4,"no-header"],"hasFooter":[32]}]);
const SlDrawer = /*@__PURE__*/proxyCustomElement(Drawer, [1,"sl-drawer",{"open":[1540],"label":[1],"placement":[1],"contained":[4],"noHeader":[4,"no-header"],"hasFooter":[32]}]);
const SlDropdown = /*@__PURE__*/proxyCustomElement(Dropdown, [1,"sl-dropdown",{"open":[1540],"placement":[1],"closeOnSelect":[4,"close-on-select"],"containingElement":[16],"distance":[2],"skidding":[2]}]);
const SlForm = /*@__PURE__*/proxyCustomElement(Form, [1,"sl-form"]);
const SlIcon = /*@__PURE__*/proxyCustomElement(Icon, [1,"sl-icon",{"name":[1],"src":[1],"label":[1],"svg":[32]}]);
const SlIconButton = /*@__PURE__*/proxyCustomElement(IconButton, [1,"sl-icon-button",{"name":[1],"src":[1],"label":[1],"disabled":[4]}]);
const SlInput = /*@__PURE__*/proxyCustomElement(Input, [1,"sl-input",{"type":[1],"size":[1],"name":[1],"value":[1025],"pill":[4],"label":[1],"placeholder":[1],"disabled":[4],"readonly":[4],"minlength":[2],"maxlength":[2],"min":[2],"max":[2],"step":[2],"autocapitalize":[1],"autocorrect":[1],"autocomplete":[1],"autofocus":[4],"pattern":[1],"required":[4],"clearable":[4],"togglePassword":[4,"toggle-password"],"inputmode":[1],"valid":[4],"invalid":[4],"hasFocus":[32],"isPasswordVisible":[32]}]);
const SlMenu = /*@__PURE__*/proxyCustomElement(Menu, [1,"sl-menu",{"hasFocus":[32]}]);
const SlMenuDivider = /*@__PURE__*/proxyCustomElement(MenuDivider, [1,"sl-menu-divider"]);
const SlMenuItem = /*@__PURE__*/proxyCustomElement(MenuItem, [1,"sl-menu-item",{"checked":[4],"active":[4],"value":[1],"disabled":[4]}]);
const SlMenuLabel = /*@__PURE__*/proxyCustomElement(MenuLabel, [1,"sl-menu-label"]);
const SlProgressBar = /*@__PURE__*/proxyCustomElement(ProgressBar, [1,"sl-progress-bar",{"percentage":[2]}]);
const SlProgressRing = /*@__PURE__*/proxyCustomElement(Progress, [1,"sl-progress-ring",{"size":[2],"strokeWidth":[2,"stroke-width"],"percentage":[2]}]);
const SlRadio = /*@__PURE__*/proxyCustomElement(Radio, [1,"sl-radio",{"name":[1],"value":[1],"disabled":[4],"checked":[1028],"hasFocus":[32]}]);
const SlRange = /*@__PURE__*/proxyCustomElement(Range, [1,"sl-range",{"name":[1],"value":[1026],"disabled":[4],"min":[2],"max":[2],"step":[2],"tooltip":[1],"tooltipFormatter":[16],"hasFocus":[32],"hasTooltip":[32]}]);
const SlRating = /*@__PURE__*/proxyCustomElement(Rating, [1,"sl-rating",{"value":[1538],"max":[2],"precision":[2],"readonly":[4],"disabled":[4],"getSymbol":[16],"hoverValue":[32],"isHovering":[32]}]);
const SlSelect = /*@__PURE__*/proxyCustomElement(Select, [1,"sl-select",{"multiple":[4],"maxTagsVisible":[2,"max-tags-visible"],"disabled":[4],"name":[1],"placeholder":[1],"size":[1],"value":[1025],"pill":[4],"label":[1],"valid":[4],"invalid":[4],"hasFocus":[32],"isOpen":[32],"items":[32],"displayLabel":[32],"displayTags":[32]}]);
const SlSkeleton = /*@__PURE__*/proxyCustomElement(Skeleton, [1,"sl-skeleton",{"effect":[1]}]);
const SlSpinner = /*@__PURE__*/proxyCustomElement(Spinner, [1,"sl-spinner"]);
const SlSwitch = /*@__PURE__*/proxyCustomElement(Switch, [1,"sl-switch",{"name":[1],"value":[1],"disabled":[4],"checked":[1028],"hasFocus":[32]}]);
const SlTab = /*@__PURE__*/proxyCustomElement(Tab$1, [1,"sl-tab",{"panel":[1],"active":[4],"disabled":[4]}]);
const SlTabGroup = /*@__PURE__*/proxyCustomElement(TabGroup, [1,"sl-tab-group",{"placement":[1],"canScrollHorizontally":[32]}]);
const SlTabPanel = /*@__PURE__*/proxyCustomElement(TabPanel, [1,"sl-tab-panel",{"name":[1],"active":[4]}]);
const SlTag = /*@__PURE__*/proxyCustomElement(Tag, [1,"sl-tag",{"type":[1],"size":[1],"pill":[4],"clearable":[4]}]);
const SlTextarea = /*@__PURE__*/proxyCustomElement(Textarea, [1,"sl-textarea",{"size":[1],"name":[1],"value":[1025],"label":[1],"placeholder":[1],"disabled":[4],"readonly":[4],"resize":[1],"maxlength":[2],"autocapitalize":[1],"autocorrect":[1],"autocomplete":[1],"autofocus":[4],"required":[4],"inputmode":[1],"valid":[4],"invalid":[4],"rows":[2],"hasFocus":[32]}]);
const SlTooltip = /*@__PURE__*/proxyCustomElement(Tooltip, [1,"sl-tooltip",{"content":[1],"placement":[1],"disabled":[4],"distance":[2],"open":[1540],"skidding":[2],"trigger":[1]}]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      SlAlert,
  SlAnimation,
  SlAvatar,
  SlBadge,
  SlButton,
  SlButtonGroup,
  SlCard,
  SlCheckbox,
  SlColorPicker,
  SlDetails,
  SlDialog,
  SlDrawer,
  SlDropdown,
  SlForm,
  SlIcon,
  SlIconButton,
  SlInput,
  SlMenu,
  SlMenuDivider,
  SlMenuItem,
  SlMenuLabel,
  SlProgressBar,
  SlProgressRing,
  SlRadio,
  SlRange,
  SlRating,
  SlSelect,
  SlSkeleton,
  SlSpinner,
  SlSwitch,
  SlTab,
  SlTabGroup,
  SlTabPanel,
  SlTag,
  SlTextarea,
  SlTooltip
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { SlAlert, SlAnimation, SlAvatar, SlBadge, SlButton, SlButtonGroup, SlCard, SlCheckbox, SlColorPicker, SlDetails, SlDialog, SlDrawer, SlDropdown, SlForm, SlIcon, SlIconButton, SlInput, SlMenu, SlMenuDivider, SlMenuItem, SlMenuLabel, SlProgressBar, SlProgressRing, SlRadio, SlRange, SlRating, SlSelect, SlSkeleton, SlSpinner, SlSwitch, SlTab, SlTabGroup, SlTabPanel, SlTag, SlTextarea, SlTooltip, defineCustomElements };

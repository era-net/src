import { r as registerInstance, h } from './index-d587ef97.js';

const buttonGroupCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-block}.button-group{display:flex;flex-wrap:nowrap;position:relative}::slotted(.sl-hover){z-index:1}::slotted(.sl-focus){z-index:2}";

const ButtonGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
ButtonGroup.style = buttonGroupCss;

export { ButtonGroup as sl_button_group };

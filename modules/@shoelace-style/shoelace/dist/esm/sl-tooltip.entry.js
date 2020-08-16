import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-d587ef97.js';
import { P as Popover } from './popover-1bc3ff78.js';

const tooltipCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--max-width:20rem;--hide-delay:0s;--hide-duration:0.125s;--hide-timing-function:ease;--show-delay:0.125s;--show-duration:0.125s;--show-timing-function:ease;display:contents}.tooltip{position:absolute;max-width:var(--max-width);z-index:var(--sl-z-index-tooltip);border-radius:var(--sl-tooltip-border-radius);background-color:var(--sl-tooltip-background-color);font-family:var(--sl-tooltip-font-family);font-size:var(--sl-tooltip-font-size);font-weight:var(--sl-tooltip-font-weight);line-height:var(--sl-tooltip-line-height);color:var(--sl-tooltip-color);opacity:0;transition:var(--sl-transition-fast) opacity;padding:var(--sl-tooltip-padding);pointer-events:none}.tooltip::after{content:\"\";position:absolute;width:0;height:0}.tooltip.popover-visible{opacity:1}.tooltip[data-popper-placement^=bottom]::after{bottom:100%;left:calc(50% - var(--sl-tooltip-arrow-size));border-bottom:var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);border-left:var(--sl-tooltip-arrow-size) solid transparent;border-right:var(--sl-tooltip-arrow-size) solid transparent}.tooltip[data-popper-placement=bottom-start]::after{left:var(--sl-tooltip-arrow-start-end-offset)}.tooltip[data-popper-placement=bottom-end]::after{right:var(--sl-tooltip-arrow-start-end-offset);left:auto}.tooltip[data-popper-placement^=top]::after{top:100%;left:calc(50% - var(--sl-tooltip-arrow-size));border-top:var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);border-left:var(--sl-tooltip-arrow-size) solid transparent;border-right:var(--sl-tooltip-arrow-size) solid transparent}.tooltip[data-popper-placement=top-start]::after{left:var(--sl-tooltip-arrow-start-end-offset)}.tooltip[data-popper-placement=top-end]::after{right:var(--sl-tooltip-arrow-start-end-offset);left:auto}.tooltip[data-popper-placement^=left]::after{top:calc(50% - var(--sl-tooltip-arrow-size));left:100%;border-left:var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);border-top:var(--sl-tooltip-arrow-size) solid transparent;border-bottom:var(--sl-tooltip-arrow-size) solid transparent}.tooltip[data-popper-placement=left-start]::after{top:var(--sl-tooltip-arrow-start-end-offset)}.tooltip[data-popper-placement=left-end]::after{top:auto;bottom:var(--sl-tooltip-arrow-start-end-offset)}.tooltip[data-popper-placement^=right]::after{top:calc(50% - var(--sl-tooltip-arrow-size));right:100%;border-right:var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);border-top:var(--sl-tooltip-arrow-size) solid transparent;border-bottom:var(--sl-tooltip-arrow-size) solid transparent}.tooltip[data-popper-placement=right-start]::after{top:var(--sl-tooltip-arrow-start-end-offset)}.tooltip[data-popper-placement=right-end]::after{top:auto;bottom:var(--sl-tooltip-arrow-start-end-offset)}";

let id = 0;
const Tooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.slShow = createEvent(this, "slShow", 7);
        this.slAfterShow = createEvent(this, "slAfterShow", 7);
        this.slHide = createEvent(this, "slHide", 7);
        this.slAfterHide = createEvent(this, "slAfterHide", 7);
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
        return (h(Host, { onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut }, h("slot", { "aria-describedby": this.componentId }), !this.disabled && (h("div", { part: "base", ref: el => (this.tooltip = el), id: this.componentId, class: {
                tooltip: true,
                'tooltip--open': this.open
            }, role: "tooltip", "aria-hidden": !this.open }, this.content))));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "open": ["handleOpenChange"]
    }; }
};
Tooltip.style = tooltipCss;

export { Tooltip as sl_tooltip };

import { r as registerInstance, h } from './index-d587ef97.js';

const badgeCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:inline-flex}.badge{display:inline-flex;align-items:center;justify-content:center;font-size:var(--sl-font-size-x-small);font-weight:var(--sl-font-weight-semibold);letter-spacing:var(--sl-letter-spacing-normal);line-height:1;border-radius:var(--sl-border-radius-small);white-space:nowrap;padding:3px 6px;user-select:none;cursor:inherit}.badge--primary{background-color:var(--sl-color-primary-50);color:var(--sl-color-white)}.badge--success{background-color:var(--sl-color-success-50);color:var(--sl-color-white)}.badge--info{background-color:var(--sl-color-info-50);color:var(--sl-color-white)}.badge--warning{background-color:var(--sl-color-warning-50);color:var(--sl-color-white)}.badge--danger{background-color:var(--sl-color-danger-50);color:var(--sl-color-white)}.badge--pill{border-radius:var(--sl-border-radius-pill)}.badge--pulse{animation:pulse 1.5s infinite}.badge--pulse.badge--primary{--pulse-hue:var(--sl-color-primary-hue);--pulse-saturation:var(--sl-color-primary-saturation)}.badge--pulse.badge--success{--pulse-hue:var(--sl-color-success-hue);--pulse-saturation:var(--sl-color-success-saturation)}.badge--pulse.badge--info{--pulse-hue:var(--sl-color-info-hue);--pulse-saturation:var(--sl-color-info-saturation)}.badge--pulse.badge--warning{--pulse-hue:var(--sl-color-warning-hue);--pulse-saturation:var(--sl-color-warning-saturation)}.badge--pulse.badge--danger{--pulse-hue:var(--sl-color-danger-hue);--pulse-saturation:var(--sl-color-danger-saturation)}@keyframes pulse{0%{box-shadow:0 0 0 0 hsla(var(--pulse-hue), var(--pulse-saturation), 50%, 0.75)}70%{box-shadow:0 0 0 0.5rem hsla(var(--pulse-hue), var(--pulse-saturation), 50%, 0)}100%{box-shadow:0 0 0 0 hsla(var(--pulse-hue), var(--pulse-saturation), 50%, 0)}}";

const Badge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
Badge.style = badgeCss;

export { Badge as sl_badge };

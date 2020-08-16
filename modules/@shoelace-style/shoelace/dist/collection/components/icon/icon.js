import { Component, Event, Prop, State, Watch, getAssetPath, h } from '@stencil/core';
import { requestIcon } from './request';
const parser = new DOMParser();
/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 */
export class Icon {
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
    static get is() { return "sl-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["icon.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["icon.css"]
    }; }
    static get assetsDirs() { return ["icons"]; }
    static get properties() { return {
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The name of the icon to draw."
            },
            "attribute": "name",
            "reflect": false
        },
        "src": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "An external URL of an SVG file."
            },
            "attribute": "src",
            "reflect": false
        },
        "label": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "An alternative description to use for accessibility. If omitted, the name or src will be used to generate it."
            },
            "attribute": "label",
            "reflect": false
        }
    }; }
    static get states() { return {
        "svg": {}
    }; }
    static get events() { return [{
            "method": "slLoad",
            "name": "slLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the icon has loaded."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slError",
            "name": "slError",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the icon failed to load."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get watchers() { return [{
            "propName": "name",
            "methodName": "handleChange"
        }, {
            "propName": "src",
            "methodName": "handleChange"
        }]; }
}

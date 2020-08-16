import { Component, Element, Event, Prop, State, Watch, h } from '@stencil/core';
import color from 'color';
import { clamp } from '../../utilities/math';
/**
 * @since 2.0
 * @status stable
 *
 * @part base - The component's base wrapper.
 * @part swatches - The container that holds swatches.
 * @part swatch - Each individual swatch.
 * @part grid - The color grid.
 * @part grid-handle - The color grid's handle.
 * @part slider - Hue and opacity sliders.
 * @part slider-handle - Hue and opacity slider handles.
 * @part preview - The preview color.
 * @part input - The text input.
 * @part copy-button - The copy button.
 */
export class ColorPicker {
    constructor() {
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
                }, "aria-disabled": this.disabled },
                h("div", { part: "grid", class: "color-picker__grid", style: {
                        backgroundColor: `hsl(${this.hue}deg, 100%, 50%)`
                    }, onMouseDown: this.handleGridDrag, onTouchStart: this.handleGridDrag },
                    h("span", { part: "grid-handle", class: "color-picker__grid-handle", style: {
                            top: `${y}%`,
                            left: `${x}%`
                        }, role: "slider", "aria-label": "HSL", "aria-valuetext": `hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, ${Math.round(this.lightness)}%)`, tabIndex: this.disabled ? null : 0, onKeyDown: this.handleGridKeyDown })),
                h("div", { class: "color-picker__controls" },
                    h("div", { class: "color-picker__sliders" },
                        h("div", { part: "slider", class: "color-picker__hue color-picker__slider", onMouseDown: this.handleHueDrag, onTouchStart: this.handleHueDrag },
                            h("span", { part: "slider-handle", class: "color-picker__slider-handle", style: {
                                    left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`
                                }, role: "slider", "aria-label": "hue", "aria-orientation": "horizontal", "aria-valuemin": "0", "aria-valuemax": "360", "aria-valuenow": Math.round(this.hue), tabIndex: this.disabled ? null : 0, onKeyDown: this.handleHueKeyDown })),
                        this.opacity && (h("div", { part: "slider", class: "color-picker__alpha color-picker__slider color-picker__transparent-bg", onMouseDown: this.handleAlphaDrag, onTouchStart: this.handleAlphaDrag },
                            h("div", { class: "color-picker__alpha-gradient", style: {
                                    backgroundImage: `linear-gradient(
                      to right,
                      hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0%) 0%,
                      hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%) 100%
                      )`
                                } }),
                            h("span", { part: "slider-handle", class: "color-picker__slider-handle", style: {
                                    left: `${this.alpha}%`
                                }, role: "slider", "aria-label": "alpha", "aria-orientation": "horizontal", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": Math.round(this.alpha), tabIndex: this.disabled ? null : 0, onKeyDown: this.handleAlphaKeyDown })))),
                    h("div", { part: "preview", class: "color-picker__preview color-picker__transparent-bg", style: {
                            color: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
                        } })),
                h("div", { class: "color-picker__user-input" },
                    h("sl-input", { ref: el => (this.textInput = el), part: "input", size: "small", type: "text", pattern: "[a-fA-F\\d]+", value: this.textInputValue, disabled: this.disabled, onKeyDown: this.handleTextInputKeyDown, onSlChange: this.handleTextInputChange }),
                    h("sl-button", { ref: el => (this.copyButton = el), part: "copy-button", slot: "suffix", class: "color-picker__copy-button", size: "small", circle: true, onClick: this.handleCopy },
                        h("sl-icon", { name: this.showCopyCheckmark ? 'check2' : 'clipboard' }))),
                this.swatches && (h("div", { part: "swatches", class: "color-picker__swatches" }, this.swatches.map(swatch => (h("div", { part: "swatch", class: "color-picker__swatch color-picker__transparent-bg", tabIndex: this.disabled ? null : 0, role: "button", "aria-label": swatch, onClick: () => !this.disabled && this.setColor(swatch), onKeyDown: event => !this.disabled && event.key === 'Enter' && this.setColor(swatch) },
                    h("div", { class: "color-picker__swatch-color", style: { backgroundColor: swatch } }))))))));
        };
        // Render inline
        if (this.inline) {
            return h(ColorPicker, null);
        }
        // Render as a dropdown
        return (h("sl-dropdown", { ref: el => (this.dropdown = el), class: "color-dropdown", "aria-disabled": this.disabled, containingElement: this.host, onSlShow: this.handleDropdownShow, onSlAfterShow: this.handleDropdownAfterShow, onSlHide: this.handleDropdownHide, onSlAfterHide: this.handleDropdownAfterHide },
            h("button", { ref: el => (this.trigger = el), slot: "trigger", class: {
                    'color-dropdown__trigger': true,
                    'color-dropdown__trigger--disabled': this.disabled,
                    'color-dropdown__trigger--small': this.size === 'small',
                    'color-dropdown__trigger--medium': this.size === 'medium',
                    'color-dropdown__trigger--large': this.size === 'large',
                    'color-picker__transparent-bg': true
                }, style: {
                    color: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
                }, type: "button" }),
            h(ColorPicker, null)));
    }
    static get is() { return "sl-color-picker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["color-picker.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["color-picker.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The current color."
            },
            "attribute": "value",
            "reflect": true,
            "defaultValue": "'#ffffff'"
        },
        "format": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'hex' | 'rgb' | 'hsl'",
                "resolved": "\"hex\" | \"hsl\" | \"rgb\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The format to use for the display value. If opacity is enabled, these will translate to HEXA, RGBA, and HSLA\nrespectively. The color picker will always accept user input in any format (including CSS color names) and convert\nit to the desired format."
            },
            "attribute": "format",
            "reflect": false,
            "defaultValue": "'hex'"
        },
        "inline": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set to true to render the color picker inline rather than inside a dropdown."
            },
            "attribute": "inline",
            "reflect": false,
            "defaultValue": "false"
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'small' | 'medium' | 'large'",
                "resolved": "\"large\" | \"medium\" | \"small\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "When `inline` is true, this determines the size of the color picker's trigger."
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "'medium'"
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set to true to disable the color picker."
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "opacity": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Whether to show the opacity slider."
            },
            "attribute": "opacity",
            "reflect": false,
            "defaultValue": "false"
        },
        "uppercase": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "By default, the value will be set in lowercase. Set this to true to set it in uppercase instead."
            },
            "attribute": "uppercase",
            "reflect": false,
            "defaultValue": "false"
        },
        "swatches": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "An array of predefined color swatches to display. Can include any format the color picker can parse, including\nHEX(A), RGB(A), HSL(A), and CSS color names."
            },
            "defaultValue": "[\n    '#d0021b',\n    '#f5a623',\n    '#f8e71c',\n    '#8b572a',\n    '#7ed321',\n    '#417505',\n    '#bd10e0',\n    '#9013fe',\n    '#4a90e2',\n    '#50e3c2',\n    '#b8e986',\n    '#000',\n    '#444',\n    '#888',\n    '#ccc',\n    '#fff'\n  ]"
        }
    }; }
    static get states() { return {
        "textInputValue": {},
        "hue": {},
        "saturation": {},
        "lightness": {},
        "alpha": {},
        "showCopyCheckmark": {}
    }; }
    static get events() { return [{
            "method": "slChange",
            "name": "slChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the color picker's value changes."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slShow",
            "name": "slShow",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the color picker opens. Calling `event.preventDefault()` will prevent it from being opened."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slAfterShow",
            "name": "slAfterShow",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted after the color picker opens and all transitions are complete."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slHide",
            "name": "slHide",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the color picker closes. Calling `event.preventDefault()` will prevent it from being closed."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "slAfterHide",
            "name": "slAfterHide",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted after the color picker closes and all transitions are complete."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "handleValueChange"
        }]; }
}

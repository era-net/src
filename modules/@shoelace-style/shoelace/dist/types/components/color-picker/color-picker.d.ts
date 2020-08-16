import { EventEmitter } from '../../stencil-public-runtime';
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
export declare class ColorPicker {
    bypassValueParse: boolean;
    copyButton: HTMLSlButtonElement;
    dropdown: HTMLSlDropdownElement;
    lastValueEmitted: string;
    menu: HTMLElement;
    textInput: HTMLSlInputElement;
    trigger: HTMLElement;
    host: HTMLSlColorPickerElement;
    textInputValue: string;
    hue: number;
    saturation: number;
    lightness: number;
    alpha: number;
    showCopyCheckmark: boolean;
    /** The current color. */
    value: string;
    /**
     * The format to use for the display value. If opacity is enabled, these will translate to HEXA, RGBA, and HSLA
     * respectively. The color picker will always accept user input in any format (including CSS color names) and convert
     * it to the desired format.
     */
    format: 'hex' | 'rgb' | 'hsl';
    /** Set to true to render the color picker inline rather than inside a dropdown. */
    inline: boolean;
    /** When `inline` is true, this determines the size of the color picker's trigger. */
    size: 'small' | 'medium' | 'large';
    /** Set to true to disable the color picker. */
    disabled: boolean;
    /** Whether to show the opacity slider. */
    opacity: boolean;
    /** By default, the value will be set in lowercase. Set this to true to set it in uppercase instead. */
    uppercase: boolean;
    /**
     * An array of predefined color swatches to display. Can include any format the color picker can parse, including
     * HEX(A), RGB(A), HSL(A), and CSS color names.
     */
    swatches: string[];
    /** Emitted when the color picker's value changes. */
    slChange: EventEmitter;
    /** Emitted when the color picker opens. Calling `event.preventDefault()` will prevent it from being opened. */
    slShow: EventEmitter;
    /** Emitted after the color picker opens and all transitions are complete. */
    slAfterShow: EventEmitter;
    /** Emitted when the color picker closes. Calling `event.preventDefault()` will prevent it from being closed. */
    slHide: EventEmitter;
    /** Emitted after the color picker closes and all transitions are complete. */
    slAfterHide: EventEmitter;
    handleValueChange(newValue: string, oldValue: string): void;
    connectedCallback(): void;
    componentWillLoad(): void;
    handleCopy(): void;
    handleHueInput(event: Event): void;
    handleSaturationInput(event: Event): void;
    handleLightnessInput(event: Event): void;
    handleAlphaInput(event: Event): void;
    handleAlphaDrag(event: any): void;
    handleHueDrag(event: any): void;
    handleGridDrag(event: any): void;
    handleDrag(event: any, container: HTMLElement, onMove: (x: number, y: number) => void): boolean;
    handleAlphaKeyDown(event: KeyboardEvent): void;
    handleHueKeyDown(event: KeyboardEvent): void;
    handleGridKeyDown(event: KeyboardEvent): void;
    handleTextInputChange(event: CustomEvent): void;
    handleTextInputKeyDown(event: KeyboardEvent): void;
    handleDocumentMouseDown(event: MouseEvent): void;
    handleDropdownShow(event: CustomEvent): void;
    handleDropdownAfterShow(event: CustomEvent): void;
    handleDropdownHide(event: CustomEvent): void;
    handleDropdownAfterHide(event: CustomEvent): void;
    normalizeColorString(colorString: string): string;
    parseColor(colorString: string): false | {
        hsl: {
            h: any;
            s: any;
            l: any;
            string: string;
        };
        hsla: {
            h: any;
            s: any;
            l: any;
            a: any;
            string: string;
        };
        rgb: {
            r: any;
            g: any;
            b: any;
            string: string;
        };
        rgba: {
            r: any;
            g: any;
            b: any;
            a: any;
            string: string;
        };
        hex: string;
        hexa: string;
    };
    setColor(colorString: string): boolean;
    setLetterCase(string: string): string;
    syncValues(): boolean;
    render(): any;
}

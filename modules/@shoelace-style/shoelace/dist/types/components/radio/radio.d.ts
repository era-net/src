import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The radio's label.
 *
 * @part base - The component's base wrapper.
 * @part control - The radio control.
 * @part checked-icon - The container the wraps the checked icon.
 * @part label - The radio label.
 */
export declare class Radio {
    inputId: string;
    labelId: string;
    input: HTMLInputElement;
    host: HTMLSlRadioElement;
    hasFocus: boolean;
    /** The radio's name attribute. */
    name: string;
    /** The radio's value attribute. */
    value: string;
    /** Set to true to disable the radio. */
    disabled: boolean;
    /** Set to true to draw the radio in a checked state. */
    checked: boolean;
    handleCheckedChange(): void;
    /** Emitted when the control loses focus. */
    slBlur: EventEmitter;
    /** Emitted when the control's checked state changes. */
    slChange: EventEmitter;
    /** Emitted when the control gains focus. */
    slFocus: EventEmitter;
    connectedCallback(): void;
    /** Sets focus on the radio. */
    setFocus(): Promise<void>;
    /** Removes focus from the radio. */
    removeFocus(): Promise<void>;
    getAllRadios(): HTMLSlRadioElement[];
    getSiblingRadios(): HTMLSlRadioElement[];
    handleClick(): void;
    handleBlur(): void;
    handleFocus(): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleMouseDown(event: MouseEvent): void;
    render(): any;
}

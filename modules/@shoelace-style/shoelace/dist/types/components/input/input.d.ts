import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @since 2.0
 * @status stable
 *
 * @slot prefix - Used to prepend an icon or similar element to the input.
 * @slot suffix - Used to append an icon or similar element to the input.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot show-password-icon - An icon to use in lieu of the default show password icon.
 * @slot hide-password-icon - An icon to use in lieu of the default hide password icon.
 * @slot help-text - Help text that describes how to use the input.
 *
 * @part base - The component's base wrapper.
 * @part form-control - The form control that wraps the label and the input.
 * @part label - The input label.
 * @part input - The synthetic input container.
 * @part prefix - The input prefix container.
 * @part clear-button - The clear button.
 * @part password-toggle-button - The password toggle button.
 * @part suffix - The input suffix container.
 * @part help-text - The input help text.
 */
export declare class Input {
    inputId: string;
    labelId: string;
    helpTextId: string;
    input: HTMLInputElement;
    host: HTMLSlInputElement;
    hasFocus: boolean;
    isPasswordVisible: boolean;
    /** The input's type. */
    type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
    /** The input's size. */
    size: 'small' | 'medium' | 'large';
    /** The input's name attribute. */
    name: string;
    /** The input's value attribute. */
    value: string;
    /** Set to true to draw a pill-style input with rounded edges. */
    pill: boolean;
    /** The input's label. */
    label: string;
    /** The input's placeholder text. */
    placeholder: string;
    /** Set to true to disable the input. */
    disabled: boolean;
    /** Set to true for a readonly input. */
    readonly: boolean;
    /** The input's minlength attribute. */
    minlength: number;
    /** The input's maxlength attribute. */
    maxlength: number;
    /** The input's min attribute. */
    min: number;
    /** The input's max attribute. */
    max: number;
    /** The input's step attribute. */
    step: number;
    /** The input's autocaptialize attribute. */
    autocapitalize: string;
    /** The input's autocorrect attribute. */
    autocorrect: string;
    /** The input's autocomplete attribute. */
    autocomplete: string;
    /** The input's autofocus attribute. */
    autofocus: boolean;
    /** The input's pattern attribute. */
    pattern: string;
    /** The input's required attribute. */
    required: boolean;
    /** Set to true to add a clear button when the input is populated. */
    clearable: boolean;
    /** Set to true to add a password toggle button for password inputs. */
    togglePassword: boolean;
    /** The input's inputmode attribute. */
    inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    /** Set to true to indicate that the user input is valid. */
    valid: boolean;
    /** Set to true to indicate that the user input is invalid. */
    invalid: boolean;
    /** Emitted when the control's value changes. */
    slChange: EventEmitter;
    /** Emitted when the control receives input. */
    slInput: EventEmitter;
    /** Emitted when the control gains focus. */
    slFocus: EventEmitter;
    /** Emitted when the control loses focus. */
    slBlur: EventEmitter;
    connectedCallback(): void;
    /** Sets focus on the input. */
    setFocus(): Promise<void>;
    /** Removes focus from the input. */
    removeFocus(): Promise<void>;
    /** Selects all the text in the input. */
    select(): Promise<void>;
    /** Sets the start and end positions of the text selection (0-based). */
    setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none'): Promise<void>;
    /** Replaces a range of text with a new string. */
    setRangeText(replacement: string, start: number, end: number, selectMode?: 'select' | 'start' | 'end' | 'preserve'): Promise<void>;
    handleChange(): void;
    handleInput(): void;
    handleBlur(): void;
    handleFocus(): void;
    handleClearClick(): void;
    handleMouseDown(event: MouseEvent): void;
    handlePasswordToggle(): void;
    render(): any;
}

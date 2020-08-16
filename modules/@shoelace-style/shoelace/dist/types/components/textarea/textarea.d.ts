import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @since 2.0
 * @status stable
 *
 * @slot help-text - Help text that describes how to use the input.
 *
 * @part base - The component's base wrapper.
 * @part form-control - The form control that wraps the textarea and label.
 * @part label - The textarea label.
 * @part textarea - The textarea control.
 * @part help-text - The textarea help text.
 */
export declare class Textarea {
    textareaId: string;
    labelId: string;
    helpTextId: string;
    resizeObserver: any;
    textarea: HTMLTextAreaElement;
    hasFocus: boolean;
    /** The textarea's size. */
    size: 'small' | 'medium' | 'large';
    /** The textarea's name attribute. */
    name: string;
    /** The textarea's value attribute. */
    value: string;
    /** The textarea's label. */
    label: string;
    /** The textarea's placeholder text. */
    placeholder: string;
    /** Set to true to disable the textarea. */
    disabled: boolean;
    /** Set to true for a readonly textarea. */
    readonly: boolean;
    /** Controls how the textarea can be resized. */
    resize: 'none' | 'vertical' | 'auto';
    /** The textarea's maxlength attribute. */
    maxlength: number;
    /** The textarea's autocaptialize attribute. */
    autocapitalize: string;
    /** The textarea's autocorrect attribute. */
    autocorrect: string;
    /** The textarea's autocomplete attribute. */
    autocomplete: string;
    /** The textarea's autofocus attribute. */
    autofocus: boolean;
    /** The textarea's required attribute. */
    required: boolean;
    /** The textarea's inputmode attribute. */
    inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    /** Set to true to indicate that the user input is valid. */
    valid: boolean;
    /** Set to true to indicate that the user input is invalid. */
    invalid: boolean;
    /** The number of rows to display by default. */
    rows: number;
    /** Emitted when the control's value changes. */
    slChange: EventEmitter;
    /** Emitted when the control receives input. */
    slInput: EventEmitter;
    /** Emitted when the control gains focus. */
    slFocus: EventEmitter;
    /** Emitted when the control loses focus. */
    slBlur: EventEmitter;
    handleRowsChange(): void;
    connectedCallback(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    /** Sets focus on the textarea. */
    setFocus(): Promise<void>;
    /** Removes focus fromt the textarea. */
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
    setTextareaHeight(): void;
    render(): any;
}

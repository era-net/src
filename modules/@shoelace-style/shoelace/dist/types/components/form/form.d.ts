import { EventEmitter } from '../../stencil-public-runtime';
interface FormControl {
    tag: string;
    serialize: (el: HTMLElement, formData: FormData) => void;
    click?: (event: MouseEvent) => any;
    keyDown?: (event: KeyboardEvent) => any;
}
/**
 * @since 2.0
 * @status experimental
 *
 * @slot - The form's content.
 *
 * @part base - The component's base wrapper.
 */
export declare class Form {
    form: HTMLElement;
    formControls: FormControl[];
    /** Emitted when the form is submitted. */
    slSubmit: EventEmitter;
    connectedCallback(): void;
    /** Serializes all form controls elements and returns a `FormData` object. */
    getFormData(): Promise<FormData>;
    /** Gets all form control elements (native and custom). */
    getFormControls(): Promise<HTMLElement[]>;
    /** Submits the form. */
    submit(): Promise<void>;
    handleClick(event: MouseEvent): void;
    handleKeyDown(event: KeyboardEvent): void;
    serializeElement(el: HTMLElement, formData: FormData): void;
    render(): any;
}
export {};

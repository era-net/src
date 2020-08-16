import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The alert's content.
 * @slot icon - An icon to show in the alert.
 *
 * @part base - The component's base wrapper.
 * @part icon - The container that wraps the alert icon.
 * @part message - The alert message.
 * @part close-button - The close button.
 */
export declare class Tab {
    alert: HTMLElement;
    host: HTMLSlAlertElement;
    /** Indicates whether or not the alert is open. You can use this in lieu of the show/hide methods. */
    open: boolean;
    /** Set to true to make the alert closable. */
    closable: boolean;
    /** The type of alert. */
    type: 'primary' | 'success' | 'info' | 'warning' | 'danger';
    handleOpenChange(): void;
    /** Emitted when the alert opens. Calling `event.preventDefault()` will prevent it from being opened. */
    slShow: EventEmitter;
    /** Emitted after the alert opens and all transitions are complete. */
    slAfterShow: EventEmitter;
    /** Emitted when the alert closes. Calling `event.preventDefault()` will prevent it from being closed. */
    slHide: EventEmitter;
    /** Emitted after the alert closes and all transitions are complete. */
    slAfterHide: EventEmitter;
    connectedCallback(): void;
    componentDidLoad(): void;
    /** Shows the alert. */
    show(): Promise<boolean>;
    /** Hides the alert */
    hide(): Promise<boolean>;
    handleCloseClick(): void;
    handleTransitionEnd(event: TransitionEvent): void;
    render(): any;
}

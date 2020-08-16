//
// A positioning utility for popovers that handles show/hide/transitionEnd events with simple callbacks.
//
// Powered by Popper.js.
//
// NOTE:
//
// - The popover MUST have at least one property that transitions, otherwise transitionEnd won't fire and the popover
//   won't be hidden.
//
// - When the popover is shown, it's assigned `PopoverOptions.visibleClass`. You can use this class to provide different
//   transitions for show/hide.
//
// - Popper uses `translate3d` to position elements, so adding a transition to the `transform` property may have an
//   undesired effect when the element is shown and when its placement changes.
//
import { createPopper } from '@popperjs/core';
export default class Popover {
    constructor(anchor, popover, options) {
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
        this.anchor = anchor;
        this.popover = popover;
        this.options = Object.assign({
            skidding: 0,
            distance: 0,
            placement: 'bottom-start',
            visibleClass: 'popover-visible',
            onAfterShow: () => { },
            onAfterHide: () => { },
            onTransitionEnd: () => { }
        }, options);
        this.isVisible = false;
        this.popover.classList.remove(this.options.visibleClass);
        this.popover.addEventListener('transitionend', this.handleTransitionEnd);
    }
    handleTransitionEnd(event) {
        const target = event.target;
        // Make sure the transition event originates from from the popover itself
        if (target === this.popover) {
            // This is called before the element is hidden so users can do things like reset scroll. It will fire once for
            // every transition property (event.propertyName discloses which property has finished transitioning.
            this.options.onTransitionEnd.call(this, event);
            if (!this.isVisible && !this.popover.hidden) {
                this.popover.hidden = true;
                this.popover.classList.remove(this.options.visibleClass);
                this.options.onAfterHide.call(this);
            }
        }
    }
    destroy() {
        this.popover.removeEventListener('transitionend', this.handleTransitionEnd);
        if (this.popper) {
            this.popper.destroy();
            this.popper = null;
        }
    }
    show() {
        this.isVisible = true;
        this.popover.hidden = false;
        this.popover.clientWidth; // force reflow
        requestAnimationFrame(() => this.popover.classList.add(this.options.visibleClass));
        if (this.popper) {
            this.popper.destroy();
        }
        this.popper = createPopper(this.anchor, this.popover, {
            placement: this.options.placement,
            modifiers: [
                {
                    name: 'flip',
                    options: {
                        boundary: 'viewport'
                    }
                },
                {
                    name: 'offset',
                    options: {
                        offset: [this.options.skidding, this.options.distance]
                    }
                }
            ]
        });
        // Reposition the menu after it appears in case a modifier kicked in
        requestAnimationFrame(() => {
            this.popper.update();
            this.options.onAfterShow.call(this);
        });
    }
    hide() {
        // Apply the hidden styles and wait for the transition before hiding completely
        this.isVisible = false;
        this.popover.classList.remove(this.options.visibleClass);
    }
    setOptions(options) {
        this.options = Object.assign(this.options, options);
        this.isVisible
            ? this.popover.classList.add(this.options.visibleClass)
            : this.popover.classList.remove(this.options.visibleClass);
        // Update popper options
        if (this.popper) {
            this.popper.setOptions({
                placement: this.options.placement
            });
            requestAnimationFrame(() => this.popper.update());
        }
    }
}

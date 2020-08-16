'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9b0ec98d.js');

const formCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{display:block}";

const Form = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.slSubmit = index.createEvent(this, "slSubmit", 7);
    }
    connectedCallback() {
        this.formControls = [
            {
                tag: 'button',
                serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null,
                click: event => {
                    const target = event.target;
                    if (target.type === 'submit') {
                        this.submit();
                    }
                }
            },
            {
                tag: 'input',
                serialize: (el, formData) => {
                    if (!el.name || el.disabled) {
                        return;
                    }
                    if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) {
                        return;
                    }
                    if (el.type === 'file') {
                        [...el.files].map(file => formData.append(el.name, file));
                        return;
                    }
                    formData.append(el.name, el.value);
                },
                click: event => {
                    const target = event.target;
                    if (target.type === 'submit') {
                        this.submit();
                    }
                },
                keyDown: event => {
                    const target = event.target;
                    if (event.key === 'Enter' && !['checkbox', 'file', 'radio'].includes(target.type)) {
                        this.submit();
                    }
                }
            },
            {
                tag: 'select',
                serialize: (el, formData) => {
                    if (el.name && !el.disabled) {
                        if (el.multiple) {
                            const selectedOptions = [...el.querySelectorAll('option:checked')];
                            if (selectedOptions.length) {
                                selectedOptions.map((option) => formData.append(el.name, option.value));
                            }
                            else {
                                formData.append(el.name, '');
                            }
                        }
                        else {
                            formData.append(el.name, el.value);
                        }
                    }
                }
            },
            {
                tag: 'sl-button',
                serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null,
                click: event => {
                    const target = event.target;
                    if (target.submit) {
                        this.submit();
                    }
                }
            },
            {
                tag: 'sl-checkbox',
                serialize: (el, formData) => el.name && el.checked && !el.disabled ? formData.append(el.name, el.value) : null
            },
            {
                tag: 'sl-input',
                serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null,
                keyDown: event => {
                    if (event.key === 'Enter') {
                        this.submit();
                    }
                }
            },
            {
                tag: 'sl-radio',
                serialize: (el, formData) => el.name && el.checked && !el.disabled ? formData.append(el.name, el.value) : null
            },
            {
                tag: 'sl-range',
                serialize: (el, formData) => {
                    if (el.name && !el.disabled) {
                        formData.append(el.name, el.value + '');
                    }
                }
            },
            {
                tag: 'sl-select',
                serialize: (el, formData) => {
                    if (el.name && !el.disabled) {
                        if (el.multiple) {
                            const selectedOptions = [...el.value];
                            if (selectedOptions.length) {
                                selectedOptions.map(value => formData.append(el.name, value));
                            }
                            else {
                                formData.append(el.name, '');
                            }
                        }
                        else {
                            formData.append(el.name, el.value + '');
                        }
                    }
                }
            },
            {
                tag: 'sl-switch',
                serialize: (el, formData) => el.name && el.checked && !el.disabled ? formData.append(el.name, el.value) : null
            },
            {
                tag: 'sl-textarea',
                serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null
            },
            {
                tag: 'textarea',
                serialize: (el, formData) => el.name && !el.disabled ? formData.append(el.name, el.value) : null
            }
        ];
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    /** Serializes all form controls elements and returns a `FormData` object. */
    async getFormData() {
        const formData = new FormData();
        const formControls = await this.getFormControls();
        formControls.map(el => this.serializeElement(el, formData));
        return formData;
    }
    /** Gets all form control elements (native and custom). */
    async getFormControls() {
        const slot = this.form.querySelector('slot');
        const tags = this.formControls.map(control => control.tag);
        return slot
            .assignedElements({ flatten: true })
            .reduce((all, el) => all.concat(el, [...el.querySelectorAll('*')]), [])
            .filter(el => tags.includes(el.tagName.toLowerCase()));
    }
    /** Submits the form. */
    async submit() {
        const formData = await this.getFormData();
        const formControls = await this.getFormControls();
        this.slSubmit.emit({ formData, formControls });
    }
    handleClick(event) {
        const target = event.target;
        const tag = target.tagName.toLowerCase();
        for (const formControl of this.formControls) {
            if (formControl.tag === tag && formControl.click) {
                formControl.click(event);
            }
        }
    }
    handleKeyDown(event) {
        const target = event.target;
        const tag = target.tagName.toLowerCase();
        for (const formControl of this.formControls) {
            if (formControl.tag === tag && formControl.keyDown) {
                formControl.keyDown(event);
            }
        }
    }
    serializeElement(el, formData) {
        const tag = el.tagName.toLowerCase();
        for (const formControl of this.formControls) {
            if (formControl.tag === tag) {
                return formControl.serialize(el, formData);
            }
        }
        return null;
    }
    render() {
        return (index.h("div", { ref: el => (this.form = el), part: "base", class: "form", role: "form", onClick: this.handleClick, onKeyDown: this.handleKeyDown }, index.h("slot", null)));
    }
};
Form.style = formCss;

exports.sl_form = Form;

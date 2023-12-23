import {FormGroupConfig, FormInputConfig} from "../config/form-config";

export class Bootstrap53Renderer {

    private createElement(tag: string, attributes: {[key: string]: string} = {}, children: HTMLElement[]|Text[] = []): HTMLElement {
        let element = document.createElement(tag);
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        for (let child of children) {
            element.appendChild(child);
        }
        return element;
    }

    /**
     * Returns a <div> Element containing the rendered form based on the config
     * provided. It uses Bootstrap 5.3 for the rendering.
     *
     * @param config
     */
    render(config: FormGroupConfig): HTMLDivElement {
        const formGroup = this.createElement('div', {class: `form-group ${config.size ? `form-group-${config.size}` : ''}`.trim()});

        if (config.title) {
            const titleElement = this.createElement('h3', {}, [document.createTextNode(config.title)]);
            formGroup.appendChild(titleElement);
        }

        if (config.description) {
            const descriptionElement = this.createElement('p', {class: 'form-text'}, [document.createTextNode(config.description)]);
            formGroup.appendChild(descriptionElement);
        }

        const row = this.createElement('div', {class: 'row'});
        for (const field of config.fields) {
            let fieldElement: HTMLElement;

            switch (field.type) {
                case undefined:
                case 'text':
                case 'password':
                case 'email':
                case 'number':
                    fieldElement = this.createInputField(field, config.size, config.style);
                    break;
                case 'select':
                    fieldElement = this.createSelectField(field, config.size, config.style);
                    break;
                case 'textarea':
                    fieldElement = this.createTextareaField(field, config.size, config.style);
                    break;
                case 'checkbox':
                    fieldElement = this.createCheckboxField(field, config.size);
                    break;
                case 'radio':
                    fieldElement = this.createRadioField(field, config.size);
                    break;
                case 'hr':
                    fieldElement = this.createElement('hr');
                    break;
                case 'description':
                    fieldElement = this.createElement('p', {}, [document.createTextNode(field.label || '')]);
                    break;
                case 'button':
                    fieldElement = this.createButton(field, config.size);
                    break;
                default:
                    throw new Error(`Unsupported field type: ${field.type}`);
            }

            // Always attach to row
            if (field.cols && field.cols > 0) {
                fieldElement.classList.add(`col-lg-${field.cols}`);
            } else {
                fieldElement.classList.add('col-lg-12');
            }

            row.appendChild(fieldElement);

        }



        if (row.hasChildNodes()) {
            formGroup.appendChild(row);
        }

        if (config.buttons && config.buttons.length > 0) {
            const buttonBar = this.createButtonBar(config.buttons, config.size);
            formGroup.appendChild(buttonBar);
        }

        return formGroup as HTMLDivElement;
    }

    private generateId(): string {
        return 'id-' + Math.random().toString(36).substr(2, 9);
    }

    private createInputField(field: FormInputConfig, size?: string, groupStyle?: string): HTMLElement {
        const id = field.id || this.generateId();
        const input = this.createElement('input', {
            type: field.type,
            id: id,
            name: field.name,
            class: `form-control ${size ? `form-control-${size}` : ''}`.trim(),
            placeholder: field.placeholder || '',
            value: field.value || field.defaultValue || ''
        });

        this.applyOptions(input, field.options);

        return this.wrapWithFormGroup(input, field.label, id, field.style || groupStyle, field.help, field.desc);
    }

    private createSelectField(field: FormInputConfig, size?: string, groupStyle?: string): HTMLElement {
        const id = field.id || this.generateId();
        const select = this.createElement('select', {
            id: id,
            name: field.name,
            class: `form-select ${size ? `form-select-${size}` : ''}`.trim()
        });

        this.populateSelectOptions(select, field.options, field.defaultValue);

        return this.wrapWithFormGroup(select, field.label, id, field.style || groupStyle, field.help, field.desc);
    }

    private createTextareaField(field: FormInputConfig, size?: string, groupStyle?: string): HTMLElement {
        const id = field.id || this.generateId();
        const textarea = this.createElement('textarea', {
            id: id,
            name: field.name,
            class: `form-control ${size ? `form-control-${size}` : ''}`.trim(),
            placeholder: field.placeholder || ''
        }, [document.createTextNode(field.value || field.defaultValue || '')]);

        this.applyOptions(textarea, field.options);

        return this.wrapWithFormGroup(textarea, field.label, id, field.style || groupStyle, field.help, field.desc);
    }

    private createCheckboxField(field: FormInputConfig, size?: string): HTMLElement {
        const id = field.id || this.generateId();
        const checkbox = this.createElement('input', {
            type: 'checkbox',
            id: id,
            name: field.name,
            class: `form-check-input ${size ? `form-check-input-${size}` : ''}`.trim(),
            value: field.value || field.defaultValue || ''
        });
        if (field.checked || (field.defaultValue === 'checked')) {
            checkbox.setAttribute('checked', 'checked');
        }

        this.applyOptions(checkbox, field.options);

        const label = this.createElement('label', {
            for: id,
            class: 'form-check-label'
        }, [document.createTextNode(field.label || '')]);

        const div = this.createElement('div', {class: 'form-check'}, [checkbox, label]);



        return div;
    }

    private createRadioField(field: FormInputConfig, size?: string): HTMLElement {
        const div = this.createElement('div');

        this.populateRadioOptions(div, field, size);

        return this.wrapWithFormGroup(div, field.label, undefined, undefined, field.help, field.desc);
    }

    private createButton(field: FormInputConfig, size?: string): HTMLElement {
        const button = this.createElement('button', {
            type: field.type || 'button',
            class: `btn ${size ? `btn-${size}` : ''} ${field.class || 'btn-primary'}`.trim(),
            id: field.id || this.generateId()
        }, [document.createTextNode(field.label || '')]);

        if (field.onClick) {
            button.addEventListener('click', field.onClick);
        }

        this.applyOptions(button, field.options);

        return button;
    }

    private createButtonBar(buttons: FormInputConfig[], size?: string): HTMLElement {
        const buttonBar = this.createElement('div', {class: 'button-bar'});

        for (const buttonConfig of buttons) {
            const button = this.createButton(buttonConfig, size);
            buttonBar.appendChild(button);
        }

        return buttonBar;
    }

    private wrapWithFormGroup(element: HTMLElement, label?: string, id?: string, style?: string, help?: string, desc?: string): HTMLElement {
        const div = this.createElement('div', {class: 'mb-3'});

        if (style === 'floating') {
            const floatingDiv = this.createElement('div', {class: 'form-floating'});
            floatingDiv.appendChild(element);
            if (label) {
                const labelElement = this.createElement('label', {
                    for: id || element.getAttribute('id'),
                }, [document.createTextNode(label)]);
                floatingDiv.appendChild(labelElement);
            }
            div.appendChild(floatingDiv);
        } else if (style === 'input-group') {
            const inputGroupDiv = this.createElement('div', {class: 'input-group'});
            if (label) {
                const span = this.createElement('span', {
                    class: 'input-group-text'
                }, [document.createTextNode(label)]);
                inputGroupDiv.appendChild(span);
            }
            inputGroupDiv.appendChild(element);
            div.appendChild(inputGroupDiv);
        } else {
            if (label) {
                const labelElement = this.createElement('label', {
                    for: id || element.getAttribute('id'),
                    class: 'form-label'
                }, [document.createTextNode(label)]);
                if (desc) {
                    labelElement.appendChild(this.createElement('small', {class: 'form-text text-muted'}, [document.createTextNode(desc)]));

                }
                div.appendChild(labelElement);
            }
            div.appendChild(element);
        }

        if (help) {
            const helpElement = this.createHelpText(help);
            div.appendChild(helpElement);
        }

        return div;
    }

    private createHelpText(help?: string ): HTMLElement {
        const helpText = help  || '';
        return this.createElement('small', {class: 'form-text text-muted'}, [document.createTextNode(helpText)]);
    }

    private applyOptions(element: HTMLElement, options: any): void {
        if (options instanceof Array) {
            for (const value of options) {
                element.setAttribute(value, '');
            }
        } else if (typeof options === 'object' && options !== null) {
            for (const [key, value] of Object.entries(options)) {
                element.setAttribute(key, value);
            }
        }
    }

    private populateSelectOptions(select: HTMLElement, options: any, defaultValue: string | undefined): void {
        if (options instanceof Array) {
            for (const value of options) {
                const optionElement = this.createElement('option', {
                    value: value
                }, [document.createTextNode(value)]);
                if (defaultValue && defaultValue === value) {
                    optionElement.setAttribute('selected', 'selected');
                }
                select.appendChild(optionElement);
            }
        } else if (typeof options === 'object' && options !== null) {
            for (const option of options) {
                const optionElement = this.createElement('option', {
                    value: option.value
                }, [document.createTextNode(option.label)]);
                if (option.selected || (defaultValue && defaultValue === option.value)) {
                    optionElement.setAttribute('selected', 'selected');
                }
                select.appendChild(optionElement);
            }
        }
    }

    private populateRadioOptions(div: HTMLElement, field: FormInputConfig, size?: string): void {
        const options = field.options;
        if (options instanceof Array) {
            for (const value of options) {
                const id = this.generateId();
                const radio = this.createElement('input', {
                    type: 'radio',
                    id: id,
                    name: field.name,
                    class: `form-check-input ${size ? `form-check-input-${size}` : ''}`.trim(),
                    value: value
                });
                if (field.defaultValue && field.defaultValue === value) {
                    radio.setAttribute('checked', 'checked');
                }

                const label = this.createElement('label', {
                    for: id,
                    class: 'form-check-label'
                }, [document.createTextNode(value)]);

                const radioDiv = this.createElement('div', {class: 'form-check'}, [radio, label]);

                div.appendChild(radioDiv);
            }
        } else if (typeof options === 'object' && options !== null) {
            for (const option of options) {
                const id = option.id || this.generateId();
                const radio = this.createElement('input', {
                    type: 'radio',
                    id: id,
                    name: field.name,
                    class: `form-check-input ${size ? `form-check-input-${size}` : ''}`.trim(),
                    value: option.value
                });
                if (option.checked || (field.defaultValue && field.defaultValue === option.value)) {
                    radio.setAttribute('checked', 'checked');
                }

                this.applyOptions(radio, option.options);

                const label = this.createElement('label', {
                    for: id,
                    class: 'form-check-label'
                }, [document.createTextNode(option.label)]);

                const radioDiv = this.createElement('div', {class: 'form-check'}, [radio, label]);

                div.appendChild(radioDiv);
            }
        }
    }
}

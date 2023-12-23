import {FormGroupConfig, FormInputConfig, ValidationState} from "../config/form-config";

export class FormValidator {

    public constructor(public readonly config: FormGroupConfig) {
    }

    /**
     * Validate all form elements below the provided element.
     * If a name is provided, only the form element with that name will be validated.
     *
     * @param element The form element to validate.
     * @param name The name of the form element to validate. If null, all elements will be validated.
     * @returns An array of ValidationState objects representing the validation state of each form element.
     */
    public validate(element: HTMLElement, name: string = null): ValidationState[] {
        const validationStates: ValidationState[] = [];
        const fields = this.config.fields || [];

        fields.forEach(field => {
            if (name === null || field.name === name) {
                const inputElements = element.querySelectorAll(`[name="${field.name}"]`);
                inputElements.forEach(inputElement => {
                    const validationState = this.validateField(inputElement, field);
                    if (validationState) {
                        validationStates.push(validationState);
                    }
                });
            }
        });

        return validationStates;
    }

    /**
     * Validate a single form field.
     *
     * @param inputElement The input element to validate.
     * @param fieldConfig The configuration for the form field.
     * @returns A ValidationState object representing the validation state of the form element.
     */
    private validateField(inputElement: Element, fieldConfig: FormInputConfig): ValidationState | null {
        if (inputElement instanceof HTMLInputElement || inputElement instanceof HTMLSelectElement || inputElement instanceof HTMLTextAreaElement) {
            const value = this.getElementValue(inputElement);
            let isValid = true;
            let message = '';

            if (fieldConfig.required && !value) {
                isValid = false;
                message = 'This field is required.';
            } else if (fieldConfig.validator) {
                const validationResult = fieldConfig.validator(value, this.config, fieldConfig, inputElement as HTMLElement);
                if (typeof validationResult === 'string') {
                    isValid = false;
                    message = validationResult;
                } else {
                    isValid = validationResult;
                }
            }

            // Check for built-in browser validation if custom validator is not provided
            if (!fieldConfig.validator && !inputElement.checkValidity()) {
                isValid = false;
                message = inputElement.validationMessage;
            }

            return {
                name: fieldConfig.name || '',
                valid: isValid,
                message: !isValid ? message : undefined
            };
        }
        return null;
    }

    /**
     * Get the value of a form element.
     *
     * @param inputElement The input element to get the value from.
     * @returns The value of the form element.
     */
    private getElementValue(inputElement: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string | string[] | boolean {
        if (inputElement instanceof HTMLInputElement && inputElement.type === 'checkbox') {
            return inputElement.checked;
        } else if (inputElement instanceof HTMLInputElement && inputElement.type === 'radio') {
            const form = inputElement.form;
            if (form) {
                const checkedRadio = form.querySelector(`input[name="${inputElement.name}"]:checked`) as HTMLInputElement;
                return checkedRadio ? checkedRadio.value : '';
            }
        } else if (inputElement instanceof HTMLSelectElement && inputElement.multiple) {
            return Array.from(inputElement.selectedOptions).map(option => option.value);
        } else {
            return inputElement.value;
        }
    }
}
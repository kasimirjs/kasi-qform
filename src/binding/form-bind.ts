/**
 * The FormBinder Class is used to bind a form element to a scope property.
 */
export class FormBinder {
    #listeners: any[] = [];

    public constructor(
        // The observed <input> <textarea> <option> or <select> element
        public readonly element: HTMLElement,
        // The scope to bind to
        public readonly scope: any,
        // The name of the property to bind to
        public readonly name: string,
        /**
         * Callback to be called when the value changes
         */
        public readonly onchange: (newValue: any, scope: any, name: string, element: HTMLElement) => void
    ) {
        // Register the onchange listener
        this.#listeners.push(this.__onFormChange.bind(this));
        this.element.addEventListener('change', this.#listeners[0]);
        this.element.addEventListener('keyup', this.#listeners[0]);

        // Initialize the element's value
        this.updateElementValue(this.getScopeValue());
    }

    private __onFormChange() {
        const newValue = this.getElementValue();
        this.setScopeValue(newValue);
        this.onchange(newValue, this.scope, this.name, this.element);
    }

    private getElementValue(): any {
        if (this.element instanceof HTMLInputElement && this.element.type === 'checkbox') {
            return this.element.checked;
        } else if (this.element instanceof HTMLInputElement && this.element.type === 'radio') {
            const form = this.element.form;
            if (form) {
                const checkedRadio = form.querySelector(`input[name="${this.element.name}"]:checked`) as HTMLInputElement;
                return checkedRadio ? checkedRadio.value : null;
            }
        } else if (this.element instanceof HTMLSelectElement) {
            return this.element.value;
        } else {
            return this.element['value'];
        }
    }

    private updateElementValue(value: any): void {
        if (this.element instanceof HTMLInputElement && this.element.type === 'checkbox') {
            this.element.checked = Boolean(value);
        } else if (this.element instanceof HTMLInputElement && this.element.type === 'radio') {
            this.element.checked = this.element.value === value;
        } else if (this.element instanceof HTMLSelectElement) {
            this.element.value = value;
        } else {
            this.element['value'] = value;
        }
    }

    public getScopeValue(): any {
        return this.scope[this.name];
    }

    public setScopeValue(newValue: any): void {
        this.scope[this.name] = newValue;
        this.updateElementValue(newValue);
    }

    public unregister(): void {
        this.#listeners.forEach(listener => {
            this.element.removeEventListener('change', listener);
            this.element.removeEventListener('keyup', listener);
        });
        delete this.element['__formBinder'];
    }
}

export function bindFormElement(element: HTMLElement, scope: any, name: string, onchange: (newValue: any, scope: any, name: string, element: HTMLElement) => void): FormBinder {
    if (!element['__formBinder']) {
        element['__formBinder'] = new FormBinder(element, scope, name, onchange);
    }
    return element['__formBinder'];
}
export type FormInputConfig = {
    /**
     * The type of the form field
     *
     * By default it will create a type="text" input field.
     *
     * Will be used to determine the input type, if the input is a select, radio or checkbox, etc. or
     * special formats as:
     *
     * - description: Will output a <detail><summary> field with the label as summary and the description as detail
     * - hr: Will output a <hr> tag
     * - html: Will output the html as is (auto-detected if html is set)
     * - switch: Same as checkbox, but with a switch style
     */
    type?: "text" | "email" | "password" | "switch" | "textarea" | "date" | "time" | "datetime" | "select" | "radio" | "checkbox" | "description" | "hr" | "html" | null;

    /**
     * The name of the form field (used for the name attribute, id attribute and label and bind if not set)
     */
    name?: string;
    id?: string | null;
    label?: string | null;
    placeholder?: string | null;
    required?: null | true;
    disabled?: null | true;
    readonly?: null | true;

    /**
     * Print multiple inputs in a row. The width (cols) for above lg breakpoint. (Below lg will always be 12 cols)
     *
     * By default: 12 cols for all.
     */
    cols?: number | null;

    /**
     * for type: select or type radio - the options of the select field. If options is string[] the value will be used as text and value.
     */
    options?: { value?: string, text: string }[]| string[] | null;

    /**
     * Only used for type: html - Output the html as is
     */
    html?: string | null;

    /**
     * The default value of the form field
     */
    default?: any;

    /**
     * The description of the form field (used for the aria-describedby attribute and as small muted text as port of the label
     */
    desc?: string | null;

    /**
     * The help text of the form field (will print a small text under the form field)
     */
    help?: string | null;

    /**
     * The bind path of the form field (used for the bind attribute)
     */
    bind?: string | null;

    size?: "sm" | null | "xl";

    /**
     * The style. If set to "floating" the label will be floating above the input field.
     * If set to "input-group" the label will be inside the input field.
     *
     * inline: Only for radio and checkbox. Will print the radio/checkbox inline.
     */
    style?: "floating" | "input-group" | "inline" | null;

    /**
     * If set, there will be a small button inside the form element to save the changes.
     */
    onchange?: (newValue: any, scope: any, config: FormInputConfig, element: HTMLElement) => void;

    /**
     * The validator function. If not set, the default validator will be used. If
     * true is returned the field is valid, if false is returned the field is invalid or if a string is returned
     * the field is invalid and the string is used as error message. Parameters are the $scope, the value and the field config
     *
     */
    validator?: (value: any, scope: any, config: FormInputConfig, element: HTMLElement) => boolean | string;
};

export type ButtonConfig = {
    type?: "button" | "submit" | "reset" | null;
    label?: string | null;
    class?: string | null;
    onclick?: (scope: any, config: ButtonConfig, element: HTMLElement) => void;
};

export type FormGroupConfig = {
    /**
     * The title of the form
     *
     * will print a h3 Element with the title
     */
    title?: string | null;
    /**
     * Will print an additional description under the title
     */
    description?: string | null;

    /**
     * The default size of the form elements.
     */
    size?: "sm" | null | "xl";

    /**
     * The style. If set to "floating" the label will be floating above the input field.
     * If set to "input-group" the label will be inside the input field.
     * This sets the default for all fields. If you want to set it for a single field, use the style property of the field.
     */
    style?: "floating" | "input-group" | null;

    fields?: FormInputConfig[] | null;

    /**
     * If it has more than one button, the buttons will be printed in a row under the form.
     */
    buttons?: ButtonConfig[] | null;

    onsubmit?: (scope: any, config: FormGroupConfig, event: Event) => void;
};



export type ValidationState = {
    name: string;
    valid: boolean;
    message?: string;
}

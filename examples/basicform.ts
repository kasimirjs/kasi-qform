import {registerQFormPreset} from "../src/functions";
import {FormGroupConfig} from "../src/config/form-config";
import {registerExample} from "@kasimirjs/devdoc/src/functions";
import {KasiQFormElement} from "../src/qform";
import {ka_sleep} from "@kasimirjs/embed";


registerExample({
    name: "basicform",
    filename: "/examples/basicform.ts",
    example: () => {
        registerQFormPreset("basicForm", {
            title: "Basic Form",
            description: "A simple form with basic fields",
            fields: [
                {name: "firstName", label: "First Name", cols: 6, type: "text"},
                {name: "lastName", label: "Last Name", cols: 6, type: "text", desc: "This is a description"},
                {name: "email", style:"input-group", label: "Email", type: "email"},
                {
                    name: "comment",
                    style:"floating",
                    label: "Comment",
                    type: "text",
                    desc: "This is a description",
                    help: "This is a help text2"
                },
                {name: "callback", type: "radio", style: "inline", options: ["Yes", "No"], label: "Callback", default: "Yes"},
                {name: "callback1", type: "checkbox", label: "Accept terms and conditions", default: "Yes"},
                {name: "callback1", type: "switch", label: "Accept terms and conditions", default: "Yes"},
                {type: "hr"},
                {type: "description", desc: "This is a description from a text element"},
                {html: "<b>This is a html</b> from a text element"},
                {name: "callback2", type: "checkbox", label: "Checkbox with options", options: ["option a", "option b"], default: "Yes"},
                {name: "callback2", type: "checkbox", style: "inline", label: "Checkbox with options (inline)", options: ["option a", "option b"], default: "Yes"},
            ],
            buttons: [
                {label: "Submit", type: "submit", class: "btn-primary"},
                {label: "Ignore", type: "submit"}

            ]
        });
        // wurst
    },
    htmlFrameworks: {
        bootstrap5: true
    },
    starterHTML: `<kasi-qform data-preset="basicForm"></kasi-qform>`,
    //starter: (element: ShadowRoot) => {}
});

registerQFormPreset("validation-form1", {
    title: "Basic Form Validation",
    fields: [
        {name: "firstName", label: "First Name", cols: 6, type: "text", required: true},
        {name: "lastName", label: "Last Name", cols: 6, type: "text", desc: "This is a description", required: true},
        {name: "email", style:"input-group", label: "Email", type: "email"},
    ]
});
registerExample({
    name: "validation1",
    filename: "/examples/basicform.ts",
    example: async (document : ShadowRoot) => {
        const e = new KasiQFormElement(null, "validation-form1");
        document.appendChild(e);
        await ka_sleep(1000);
        e.updateValidationState([{name: "firstName", valid: false, message: "This is an error message"}]);
        await ka_sleep(1000);
        e.updateValidationState([{name: "firstName", valid: true, message: "This is an error message"}]);
    },
    htmlFrameworks: {
        bootstrap5: true
    },
});


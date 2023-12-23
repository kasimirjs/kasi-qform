import {registerQFormPreset} from "../src/functions";
import {FormGroupConfig} from "../src/config/form-config";
import {registerExample} from "@kasimirjs/devdoc/src/functions";


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
                {name: "callback", type: "radio", options: ["Yes", "No"], label: "Callback", default: "Yes"},
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

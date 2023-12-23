import {registerQFormComponent, registerQFormPreset} from "../src/functions";
import {FormGroupConfig} from "../src/config/form-config";
import {register} from "@kasimirjs/devdoc/src/register";
export * from "../examples/basicform";

register();

registerQFormComponent();



// Advanced form preset with validation and different field types
registerQFormPreset("advancedForm", {
    title: "Advanced Form",
    description: "A complex form with validation and various field types",
    size: "sm",
    style: "floating",
    fields: [
        {name: "username", label: "Username", size: "sm", type: "text", required: true},
        {name: "password", label: "Password", type: "password", required: true},
        {name: "confirmPassword", label: "Confirm Password", type: "password", required: true},
        {name: "age", label: "Age", type: "number", min: 18},
        {name: "bio", label: "Biography", type: "textarea"},
        {name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"]},
        {name: "gender", label: "Gender", type: "radio", options: ["Male", "Female", "Other"]},
        {name: "terms", label: "Accept Terms", type: "checkbox", required: true}
    ]
} as FormGroupConfig);

// Contact form preset
registerQFormPreset("contactForm", {
    title: "Contact Form",
    description: "A form to get in touch with us",
    size: "md",
    fields: [
        {name: "fullName", label: "Full Name", type: "text", required: true},
        {name: "email", label: "Email", type: "email", required: true},
        {name: "message", label: "Message", type: "textarea", required: true}
    ]
} as FormGroupConfig);

// Registration form preset
registerQFormPreset("registrationForm", {
    title: "Registration Form",
    description: "Sign up to our service",
    size: "md",
    fields: [
        {name: "email", label: "Email", type: "email", required: true},
        {name: "password", label: "Password", type: "password", required: true},
        {name: "confirmPassword", label: "Confirm Password", type: "password", required: true},
        {name: "newsletter", label: "Subscribe to newsletter", type: "checkbox"}
    ]
} as FormGroupConfig);

// Feedback form preset
registerQFormPreset("feedbackForm", {
    title: "Feedback Form",
    description: "We would love to hear your thoughts",
    size: "md",
    fields: [
        {name: "rating", label: "Rating", type: "select", options: ["Excellent", "Good", "Average", "Poor", "Terrible"], required: true},
        {name: "comments", label: "Comments", type: "textarea"}
    ]
} as FormGroupConfig);

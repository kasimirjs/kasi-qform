import {registerQFormComponent, registerQFormPreset} from "../src/functions";
import {FormGroupConfig} from "../src/config/form-config";

registerQFormComponent();

// Basic form preset
registerQFormPreset("basicForm", {
    title: "Basic Form",
    description: "A simple form with basic fields",
    size: "md",
    fields: [
        {name: "firstName", label: "First Name", cols: 6, type: "text"},
        {name: "lastName", label: "Last Name", cols: 6, type: "text"},
        {name: "email", style:"input-group", label: "Email", type: "email"}
    ],
    buttons: [
        {label: "Submit", type: "submit", class: "btn-primary"},
        {label: "Ignore", type: "submit"}

    ]
} as FormGroupConfig);

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

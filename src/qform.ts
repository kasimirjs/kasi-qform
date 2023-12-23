import {FormGroupConfig, ValidationState} from "./config/form-config";
import {__qformPresets} from "./functions";
import {Bootstrap53Renderer} from "./renderer/bootstrap53-renderer";
import {Debouncer, ka_dom_ready} from "@kasimirjs/embed";
import {FormValidator} from "./validation/validator";


export class KasiQFormElement extends HTMLElement {


    public scope : any = null;

    public constructor(private config : FormGroupConfig = null, private presetName : string = null) {
        super();
    }


    public bind(scope : any) {
        this.scope = scope;
    }

    async connectedCallback() {
        await ka_dom_ready();
        if (this.dataset.preset) {
            this.presetName = this.dataset.preset;
        }
        if (this.presetName){
            this.config = __qformPresets[this.presetName];
            if(this.config === undefined) {
                console.error("qform preset (specified in 'data-preset'-attribute) not found: " + this.presetName + " on element: ", this);
                throw new Error("qform preset not found: " + this.presetName);
            }
        }
        let r = new Bootstrap53Renderer();
        this.append(r.render(this.config))
        this.addEventListener("change", (e) => {
            this.validate(e.originalTarget.name);
        });
        const debouncer = new Debouncer(500);

        this.addEventListener("keyup", async (e : KeyboardEvent) => {
            await debouncer.debounce();
            console.log(e);
            this.validate(e.originalTarget.name);
        });

    }

    public validate(name : string = null) {
        let v = new FormValidator(this.config);
        let validationStates = v.validate(this, name);
        this.updateValidationState(validationStates);
    }

    public updateValidationState(validationState : ValidationState[]|ValidationState|true|false) {
        let r = new Bootstrap53Renderer();
        r.setValidationState(this, validationState);
    }

}


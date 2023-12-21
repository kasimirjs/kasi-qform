import {FormGroupConfig} from "./config/form-config";
import {__qformPresets} from "./functions";
import {Bootstrap53Renderer} from "./renderer/bootstrap53-renderer";
import {ka_dom_ready} from "@kasimirjs/embed";


export class KasiQFormElement extends HTMLElement {



    public constructor(private config : FormGroupConfig = null) {
        super();
    }


    async connectedCallback() {
        await ka_dom_ready();
        if (this.dataset.preset) {
            this.config = __qformPresets[this.dataset.preset];
            if(this.config === undefined) {
                console.error("qform preset (specified in 'data-preset'-attribute) not found: " + this.dataset.preset + " on element: ", this);
                throw new Error("qform preset not found: " + this.dataset.preset);
            }
        }
        let r = new Bootstrap53Renderer();
        console.log("rendering qform", this.config)
        this.append(r.render(this.config))
    }

}


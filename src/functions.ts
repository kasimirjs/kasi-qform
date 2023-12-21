import {FormGroupConfig} from "./config/form-config";
import {KasiQFormElement} from "./qform";

/**
 * Registers the qform component to ElementRegistry
 * Must be called before using the qform component
 *
 */
export function registerQFormComponent() : void {
    customElements.define('kasi-qform', KasiQFormElement);
}


export let __qformPresets : {[key : string] : FormGroupConfig} = {};

/**
 * Registers a form config preset for use by <kasi-qform data-preset='presetName'>
 *
 * @param presetName
 * @param config
 */
export function registerQFormPreset(presetName : string, config : FormGroupConfig) : void {
    __qformPresets[presetName] = config;
}

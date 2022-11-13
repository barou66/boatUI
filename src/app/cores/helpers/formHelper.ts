import { FormControl } from "@angular/forms";

export default class FormHelper {
  static   getControlValue(control:FormControl):string{
    return (control.value !==null)?control.value: '';
  }
}

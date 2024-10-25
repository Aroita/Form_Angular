import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { filter } from "rxjs";

@Directive({
  selector: '[appRectrictedValidator]',
  standalone: true,

  providers: [{
    provide: 'NG_VALIDATORS',
    useExisting: RectrictedValidatorDirective,
    multi: true
  }]
})

export class RectrictedValidatorDirective implements Validator {

  @Input('appRectrictedValidator') appRectrictedValidator: string[] = [];

  validate(control: AbstractControl):  ValidationErrors |  null {
    if(!control.value) return null;

//comprueba si el valor de control incluye alguno de los valores de appRectrictedValidator
   const appRectrictedValidator =  this.appRectrictedValidator
   .map(v => control.value.includes(v) ?  v :null)
   filter(v => v !== null);

//si encuentra algun valor, devuelve un error
  return appRectrictedValidator.length > 0 ?
  { 'appRectrictedValidator': appRectrictedValidator.join(',') } : null;
  }



  constructor() { }

}


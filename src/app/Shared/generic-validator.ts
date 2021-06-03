import {AbstractControl} from '@angular/forms';

;

   export function numericValidator(control: AbstractControl) {
    let value = control.value;

      if (isNaN(Number(value))){
        return {
          numericValidator: {
            string: value
          }
        }
      }

    return null;
  }
  export function characterValidator(control: AbstractControl) {
    let value = control.value;

      if (!(/^[a-zA-Z]+$/.test(value))){
        return {
          characterValidator: {
            string: value
          }
        }
      }

    return null;
  }





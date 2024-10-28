import { CommonModule } from '@angular/common';
import { Component, Provider, forwardRef } from '@angular/core';
 import { profileIconNames } from './profile-icon-names';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const PROFILE_ICON_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProfileIconSelectorComponent),
  multi: true
};

@Component({
  selector: 'con-profile-icon-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-icon-selector.component.html',
  styleUrl: './profile-icon-selector.component.css',
  providers: [PROFILE_ICON_VALUE_ACCESSOR]
})
export class ProfileIconSelectorComponent implements ControlValueAccessor {
  profileIcons = profileIconNames;
  showAllIcons: boolean= true;
  selectedIcon!: string | null;

  onChange!: Function;
  onTouched!: Function;

  iconSelected(icon: string) {
    this.showAllIcons = false;
    this.selectedIcon = icon;
    this.onChange(icon);

  }
  writeValue(icon: string){
    this.selectedIcon = icon;
//si el icono no es nulo y no es una cadena vacía, establezca showAllIcons en falso para ocultar todos los iconos
    if(icon && icon !== ''){
      this.showAllIcons = false;
    }else{
      this.showAllIcons = true;
    }
  }
//registrar la función de devolución de llamada de cambio de valor
  registerOnChange(fn: Function){
    this.onChange = (icon: string) => {
      fn(icon);
      //this.showAllIcons = false;
    }

  }
// registrar la función de devolución de llamada táctil
  registerOnTouched(fn: Function){
    this.onTouched = fn;
  }

}

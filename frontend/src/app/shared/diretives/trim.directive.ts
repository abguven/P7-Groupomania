import { Directive, HostListener, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * On onBlur event trims the input value and updates the input control
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[trimInput],textarea[trimInput]',
})
export class TrimDirective implements OnInit {


  constructor(@Optional() private ngControl: NgControl) {
  }

  ngOnInit(): void {
    if (!this.ngControl) {
      console.warn("TrimInputDirective ne peux être qu'aux (ngModel ou formControl)");
      return;
    }

  }

 
  @HostListener('blur') onBlur(): void {
    const inputCtrl = this.ngControl;
    let inputValue = inputCtrl.value;
    if(inputValue){
        const trimmedValue = inputValue.trim();
        if (trimmedValue !== inputValue){
            inputCtrl.control?.patchValue(trimmedValue);        
        }
    }
 
  } // @HostListener('blur') onBlur(): void

} // export class TrimDirective
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { BsSpinnerComponent } from '../tools/bs-spinner/bs-spinner.component';
import { ErrorImageDirective } from './diretives/error-image.directive';



@NgModule({
  declarations: [
    TimeAgoPipe,
    BsSpinnerComponent,
    ErrorImageDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    ReactiveFormsModule,
    TimeAgoPipe,
    BsSpinnerComponent,
    ErrorImageDirective
  ]
})
export class SharedModule { }

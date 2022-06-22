import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { BsSpinnerComponent } from '../tools/bs-spinner/bs-spinner.component';
import { ErrorImageDirective } from './diretives/error-image.directive';
import { AvatarAltPipe } from './pipes/avatar-alt.pipe';



@NgModule({
  declarations: [
    TimeAgoPipe,
    AvatarAltPipe,
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
    AvatarAltPipe,
    BsSpinnerComponent,
    ErrorImageDirective
  ]
})
export class SharedModule { }

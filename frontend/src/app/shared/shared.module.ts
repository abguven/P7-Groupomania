import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { BsSpinnerComponent } from './components/bs-spinner/bs-spinner.component';
import { ErrorImageDirective } from './diretives/error-image.directive';
import { AvatarAltPipe } from './pipes/avatar-alt.pipe';
import { ErrorPanelComponent } from './components/error-panel/error-panel.component';
import { TrimDirective } from './diretives/trim.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    TimeAgoPipe,
    AvatarAltPipe,
    BsSpinnerComponent,
    ErrorImageDirective,
    TrimDirective,
    ErrorPanelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule
  ],
  exports:[
    ReactiveFormsModule,
    TimeAgoPipe,
    AvatarAltPipe,
    BsSpinnerComponent,
    ErrorImageDirective,
    TrimDirective,
    ErrorPanelComponent,
    NgbModule,
    AppRoutingModule,
  ]
})
export class SharedModule { }

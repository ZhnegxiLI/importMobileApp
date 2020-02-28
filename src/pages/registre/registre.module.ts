import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrePage } from './registre';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule, MatSelectModule,MatFormFieldModule,MatInputModule,MatStepperModule,MatIconModule } from '@angular/material'

@NgModule({
  declarations: [
    RegistrePage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrePage),
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
})
export class RegistrePageModule {}

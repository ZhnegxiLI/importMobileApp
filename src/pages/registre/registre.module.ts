import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrePage } from './registre';

@NgModule({
  declarations: [
    RegistrePage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrePage),
  ],
})
export class RegistrePageModule {}

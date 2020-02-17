import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrePage } from './registre';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RegistrePage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrePage),
    TranslateModule
  ],
})
export class RegistrePageModule {}

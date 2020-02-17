import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistreSuccedPage } from './registre-succed';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RegistreSuccedPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistreSuccedPage),
    TranslateModule
  ],
})
export class RegistreSuccedPageModule {}

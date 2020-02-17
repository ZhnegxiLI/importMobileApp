import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslationPage } from './translation';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TranslationPage,
  ],
  imports: [
    IonicPageModule.forChild(TranslationPage),
    TranslateModule
  ],
})
export class TranslationPageModule {}

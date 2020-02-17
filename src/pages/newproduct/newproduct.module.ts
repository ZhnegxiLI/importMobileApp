import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewproductPage } from './newproduct';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewproductPage,
  ],
  imports: [
    IonicPageModule.forChild(NewproductPage),
    TranslateModule
  ],
})
export class NewproductPageModule {}

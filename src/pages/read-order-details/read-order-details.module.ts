import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadOrderDetailsPage } from './read-order-details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ReadOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadOrderDetailsPage),
    TranslateModule
  ],
})
export class ReadOrderDetailsPageModule {}

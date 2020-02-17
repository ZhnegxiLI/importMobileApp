import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadOrderListPage } from './read-order-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ReadOrderListPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadOrderListPage),
    TranslateModule
  ],
})
export class ReadOrderListPageModule {}

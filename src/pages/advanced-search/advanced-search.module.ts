import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvancedSearchPage } from './advanced-search';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdvancedSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvancedSearchPage),
    TranslateModule
  ],
})
export class AdvancedSearchPageModule {}

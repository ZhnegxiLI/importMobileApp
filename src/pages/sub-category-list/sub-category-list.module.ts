import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubCategoryListPage } from './sub-category-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SubCategoryListPage,
  ],
  imports: [
    IonicPageModule.forChild(SubCategoryListPage),
    TranslateModule
  ],
})
export class SubCategoryListPageModule {}

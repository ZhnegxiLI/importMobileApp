import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubCategoryListPage } from './sub-category-list';

@NgModule({
  declarations: [
    SubCategoryListPage,
  ],
  imports: [
    IonicPageModule.forChild(SubCategoryListPage),
  ],
})
export class SubCategoryListPageModule {}

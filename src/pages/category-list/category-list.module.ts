import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryListPage } from './category-list';
import {SubCategoryListPage} from '../sub-category-list/sub-category-list';
import { from } from 'rxjs/observable/from';

@NgModule({
  declarations: [
    CategoryListPage
  ],
  imports: [
    IonicPageModule.forChild(CategoryListPage),
  ],
})
export class CategoryListPageModule {}

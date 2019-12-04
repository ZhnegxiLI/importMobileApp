import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductEvaluationListPage } from './product-evaluation-list';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    ProductEvaluationListPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(ProductEvaluationListPage),
  ],
})
export class ProductEvaluationListPageModule {}

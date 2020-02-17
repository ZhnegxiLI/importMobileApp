import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductEvaluationListPage } from './product-evaluation-list';
import { StarRatingModule } from 'ionic3-star-rating';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductEvaluationListPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(ProductEvaluationListPage),
    TranslateModule

  ],
})
export class ProductEvaluationListPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WriteProductEvaluationPage } from './write-product-evaluation';
import { StarRatingModule } from 'ionic3-star-rating';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    WriteProductEvaluationPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(WriteProductEvaluationPage),
    TranslateModule
  ],
})
export class ProductEvaluationListPageModule {}

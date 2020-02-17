import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import { StarRatingModule } from 'ionic3-star-rating';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductDetailPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(ProductDetailPage),
    TranslateModule
  ],
})
export class ProductDetailPageModule {}

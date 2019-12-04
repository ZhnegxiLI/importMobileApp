import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    ProductDetailPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(ProductDetailPage),
  ],
})
export class ProductDetailPageModule {}

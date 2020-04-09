import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ENV } from '@app/env';


@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  isFavorite : boolean = false;
  productId : number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
  }

  private product: any = {};
  private host = ENV.SERVER_API_URL;

  favorite(){
    this.isFavorite = !this.isFavorite;
  }

  writeEvaluation(){
    this.navCtrl.push('WriteProductEvaluationPage',{
      productId:this.productId
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
    this.productId = this.navParams.get('productId');

    this.initLoadData();
  }

  calculCommentAverageLevel(){
    var averageLevel = 5;
    if(this.product!=null&& this.product.Comments!=null && this.product.Comments.length>0){
      var totalLevel = 0;
      this.product.Comments.forEach(p => {
        totalLevel = p.Level + totalLevel;
      });
      averageLevel = totalLevel / this.product.Comments.length;
    }
    return averageLevel;
  }

  initLoadData (){
    if(this.productId!=null&& this.productId!=0){
      this.rest.GetProductById(this.productId).subscribe(result=>{
        if(result!=null){
          console.log(result);
          this.product = result;
        }
      },
      error=>{

      })
    }
  }

  displayAvis(){
    if(this.product.Comments!=null &&this.product.Comments.length>0 ){
      this.navCtrl.push('ProductEvaluationListPage', {type:"GetCommentByProductId",productId: this.productId});
    }
  }

}

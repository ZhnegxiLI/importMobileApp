import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ENV } from '@app/env';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';


@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage extends BaseUI{
  isFavorite : boolean = false;
  productId : number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public network: Network, public toastCtrl: ToastController) {
    super();
  }

  private product: any = {};
  private host = ENV.SERVER_API_URL;

  addProductIntoFavoriteList(){
    this.isFavorite = !this.isFavorite;
    if (this.network.type != 'none') {

      this.rest.AddIntoProductFavoriteList({
        UserId: localStorage.getItem('userId'),
        ProductId: this.product.ProductId,
        IsFavorite: this.isFavorite
      }) //TODO: change
      .subscribe(
        (f: any) => {
          if(f!=null && f>0){
            if(this.isFavorite==false){
              super.showToast(this.toastCtrl,"Product successfully remove in your favorite list"); // todo translate
            }
            else{
              super.showToast(this.toastCtrl,"Product successfully added into the favorite list"); // todo translate
            }
           
          }
        },
        error => {
          super.showToast(this.toastCtrl, error.Msg);
        }
      );


    } else {
      super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
    }
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
          this.isFavorite = result.IsFavorite;
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

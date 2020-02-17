import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { RestProvider } from '../../providers/rest/rest';
import { Network } from '@ionic-native/network';
import { BaseUI } from '../../app/common/baseui';


//@IonicPage()
@Component({
  selector: 'page-newproduct',
  templateUrl: 'newproduct.html',
})
export class NewproductPage extends BaseUI{
  SecondReferenceId: number = 0;
  SecondReferenceLabel: string = '';
  productList : any[] = [];
  step:number = 10;
  counter:number = 0;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public network: Network,
     public rest: RestProvider,
     public toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    this.SecondReferenceId = this.navParams.get('ReferenceId');
    this.SecondReferenceLabel = this.navParams.get('RefereceLabel');
    console.log('ionViewDidLoad NewproductPage');
    this.loadProductList();
  }

  productDetail(){
    this.navCtrl.push(ProductDetailPage);
  }

  loadProductList(){
    if (this.network.type != 'none') {
      this.rest.GetProductListBySecondCategory(this.SecondReferenceId,this.counter,this.step) // 填写url的参数
        .subscribe(
          f => {
            if (f.Success&&f.Data!=null) {
                this.productList = f.Data.ProductList;
            } else {
              super.showToast(this.toastCtrl, f.Msg);
            }
          },
          error => {
            super.showToast(this.toastCtrl, error.Msg);
          });
    }
    else {
      super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
    }
  }

  doInfinite(infiniteScroll){
    if(this.network.type !='none'){
      this.counter= this.counter+1;
      this.rest.GetProductListBySecondCategory(this.SecondReferenceId,this.counter,this.step) //TODO: change
          .subscribe(
            (f : any) => {     
              if(f.Success){
                if (f["Data"].TotalCount <= this.step*this.counter) {
                  infiniteScroll.enable(false);   //没有数据的时候隐藏 ion-infinate-scroll
                }
                else{
                  this.productList= this.productList.concat(f["Data"].ProductList!=null ?f["Data"].ProductList:[]);
                  infiniteScroll.complete(); 
                }
              }else{
                super.showToast(this.toastCtrl, f.Msg);
              }
            },
            error => {
                super.showToast(this.toastCtrl, error.Msg);
            }
          );
    }
    else{
      super.showToast(this.toastCtrl, "您处于离线状态，请连接网络! "); 
    }
  }  

}

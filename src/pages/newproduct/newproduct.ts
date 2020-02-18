import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { RestProvider } from '../../providers/rest/rest';
import { Network } from '@ionic-native/network';
import { BaseUI } from '../../app/common/baseui';
import { Storage } from '@ionic/storage';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-newproduct',
  templateUrl: 'newproduct.html',
})
export class NewproductPage extends BaseUI{
  loading:boolean = true;
  SecondReferenceId: number = 0;
  SecondReferenceLabel: string = '';
  productList : any[] = [];
  step:number = 10;
  counter:number = 0;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public network: Network,
     public rest: RestProvider,
     public toastCtrl: ToastController,
     public storage:Storage,
     public utilis:UtilsProvider) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewproductPage');
  }

  ionViewDidEnter(){
    this.SecondReferenceId = this.navParams.get('ReferenceId');
    this.SecondReferenceLabel = this.navParams.get('RefereceLabel');
    this.loadProductList();
  }

  productDetail(){
    this.navCtrl.push('ProductDetailPage');
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
          },
          ()=>this.loading=false);
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
  
 async addInCart( event: Event,item:any ){
    event.stopPropagation();
    var cartProductList = JSON.parse(await this.utilis.getKey('cartProductList'));
    if(cartProductList==null){
      cartProductList = [];
    }
    var temp = cartProductList.find(p=>p.ReferenceId == item.ReferenceId);
    if(temp==null){
      if(item.Quantity==null){
        item.Quantity = 0;
      }
      cartProductList.push(item);
    }
    cartProductList.forEach(p => {
      if(p.ReferenceId == item.ReferenceId){
        p.Quantity = p.Quantity + 1;
      }
      if(p.Selected ==null){
        p.Selected = false;
      }
    });

    
    this.storage.set('cartProductList',JSON.stringify(cartProductList));

    super.showToast(this.toastCtrl,'add successfully!')
  }

}

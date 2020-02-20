import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../app/common/baseui';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage extends BaseUI {

  orderProductList: any[] = [];
  facturationAdress: object = {};
  shippingAdress : any[] = [];
  defaultShippingAdress: object;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider,
    public storage: Storage,
    public network: Network,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    super();
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad OrderConfirmationPage');
 
  }

  async ionViewDidLoad() {
    if (this.network.type != 'none') {
      var loading = super.showLoading(this.loadingCtrl,'En cours'); // TODO: translate
      var UserId = await this.utils.getKey('userId');

      // Get selected product in cart 
      var selectedReferenceIds = [];
      var selectedReferences = this.navParams.get('References');
    
      selectedReferences.map(p => selectedReferenceIds.push(p.ReferenceId));
  
      Observable.forkJoin(this.rest.GetProductInfoByReferenceIds(selectedReferenceIds), this.rest.GetUserFacturationAdress(UserId), this.rest.GetUserShippingAdress(UserId))
        .subscribe(
          ([SelectedProductInfo, FacturationAdress, ShippingAdress]) => {
            if (SelectedProductInfo.Success && SelectedProductInfo.Data != null &&
              FacturationAdress.Success && ShippingAdress.Success) {
                /* Bind the product data */
                this.formatProductData(SelectedProductInfo, selectedReferences);
                /* Bind the facturation adress data */
                this.facturationAdress = FacturationAdress.Data;
                /* Bind the shipping adress data */
                this.shippingAdress = ShippingAdress.Data;
                if(this.shippingAdress.length>0&&this.shippingAdress[0]!=null){
                  this.defaultShippingAdress = this.shippingAdress[0];
                }
            }
          },
          error => {
            this.navCtrl.pop();
            super.showToast(this.toastCtrl,"Internal error please try again");// TODO: translate
          },
          ()=>loading.dismiss());

    }
    else {
      super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
    }

  }

  formatProductData(SelectedProductInfo, selectedReferences){

    /* Bind the data */
    this.orderProductList = SelectedProductInfo.Data;
    /* Attach the quantity */
    this.orderProductList.map(p => {
      var temp = selectedReferences.find(x => {return x.ReferenceId == p.ReferenceId;} );
      if(temp!=null){
        p.Quantity = temp.Quantity;
      }
    });
    console.log(this.orderProductList);
  }

  calculTotalPrice(){
    var total = 0;
    this.orderProductList.map(p=> total = total + p.Price*p.Quantity);
    return total;
  }

  async validOrder(){
    var productInfo =[];
    this.orderProductList.map(p=>productInfo.push({
      ReferenceId: p.ReferenceId,
      Quantity : p.Quantity
    }));
    if(this.defaultShippingAdress!=null&&this.defaultShippingAdress!={}&& this.defaultShippingAdress["Id"]!=null){
      var shippingAdressId = this.defaultShippingAdress["Id"];
    }
    var shippingAdressId = 1;//todo remove
    var facturationAdressId = this.facturationAdress["Id"];
    var UserId = Number.parseInt(await this.utils.getKey('userId'));
    if(productInfo.length>0&& shippingAdressId!=null){
      if (this.network.type != 'none') {
        var loading = super.showLoading(this.loadingCtrl,"En cours...");// TODO: translation
        this.rest.SaveOrder(productInfo,shippingAdressId, facturationAdressId,UserId) // 填写url的参数
          .subscribe(
            async f => {
              if (f.Success&&f.Data!=null) {
                /*Step1: Show the successful message */
                super.showToast(this.toastCtrl, "Votre commande est bien passé, nous allons vous contacter dans un meilleur délais");
                
                /*Step2: Remove the already pass product */
                var cartProductList = JSON.parse( await this.utils.getKey('cartProductList'));
                var newCartProductList = [];
                cartProductList.forEach(p => {
                  if(productInfo.findIndex(x=>x.ReferenceId==p.ReferenceId)==-1){
                    newCartProductList.push(p);
                  }
                });
                this.storage.set('cartProductList',JSON.stringify(newCartProductList));
              } else {
                super.showToast(this.toastCtrl, f.Msg);
              }
            },
            error => {
              super.showToast(this.toastCtrl, error.Msg);
            },
            ()=>{
              loading.dismiss();
              this.navCtrl.pop();
            });
      }
      else {
        super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
      }
    }
    else {
      super.showToast(this.toastCtrl,"Internal error, cannot valid your order for the moment"); // TODO: translate
    }
   
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Network } from '@ionic-native/network';
import { BaseUI } from '../../app/common/baseui';


@IonicPage()
@Component({
  selector: 'page-read-order-details',
  templateUrl: 'read-order-details.html',
})
export class ReadOrderDetailsPage extends BaseUI{
  OrderId: number;
  OrderInfo: any={};
  ShippingAdress : any = {};
  FacturationAdress:any={};
  Status :any = {};
  ProductList:any=[];

  loading : boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public rest: RestProvider,
    public network : Network,
    public toastCtrl: ToastController) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadOrderDetailsPage');
    this.OrderId = this.navParams.get('OrderId');
    this.loadOrderDetail();
  }

  loadOrderDetail(){
    if (this.network.type != 'none') {
      this.rest.GetOrdersListByOrderId(this.OrderId) // 填写url的参数
        .subscribe(
          f => {
            if (f.Success && f.Data != null) {
              if(f.Data.OrderInfo!=null){
                this.OrderInfo = f.Data.OrderInfo;
              }
              if(f.Data.FacturationAdress!=null){
                this.FacturationAdress = f.Data.FacturationAdress;
              }
              if(f.Data.ShippingAdress!=null){
                this.ShippingAdress = f.Data.ShippingAdress;
              }
              if(f.Data.Status!=null){
                this.Status = f.Data.Status;
              }
              if(f.Data.ProductList!=null){
                this.ProductList = f.Data.ProductList;
              }
              
              console.log(this.OrderInfo);
            } else {
              super.showToast(this.toastCtrl, f.Msg);
            }
          },
          error => {
            super.showToast(this.toastCtrl, error.Msg);
          }, () => this.loading = false);
    }
    else {
      super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
    }
  }

}

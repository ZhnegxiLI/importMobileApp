import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Network } from '@ionic-native/network';
import { BaseUI } from '../../app/common/baseui';
import { ENV } from '@app/env';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-read-order-details',
  templateUrl: 'read-order-details.html',
})
export class ReadOrderDetailsPage extends BaseUI {

  private host = ENV.SERVER_API_URL;

  OrderId: number;
  OrderInfo: any = {};
  ShippingAdress: any = {};
  FacturationAdress: any = {};
  Status: any = {};
  ProductList: any = [];

  private ClientRemark : any = null;
  private AdminRemark: any = null;
  private ShippingMessage: string = "France de port 1500€HT, 2000€HT pour le sud de la France et 2500€HT pour les étangers."; 

  loading: boolean;

  private TaxRate: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public network: Network,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadOrderDetailsPage');
    this.OrderId = this.navParams.get('OrderId');
    this.loadOrderDetail();
  }

  loadOrderDetail() {
    if (this.network.type != 'none') {

      var loading = this.showLoading(this.loadingCtrl,this.translateService.instant("Loading")); // todo translate
      this.rest.GetOrdersListByOrderId(this.OrderId) // 填写url的参数
        .subscribe(
          f => {
            if (f.Success && f.Data != null) {
              if (f.Data.OrderInfo != null) {
                this.OrderInfo = f.Data.OrderInfo;
              }
              if (f.Data.FacturationAdress != null) {
                this.FacturationAdress = f.Data.FacturationAdress;
              }
              if (f.Data.ShippingAdress != null) {
                this.ShippingAdress = f.Data.ShippingAdress;
              }
              if (f.Data.Status != null) {
                this.Status = f.Data.Status;
              }
              if (f.Data.ProductList != null) {
                this.ProductList = f.Data.ProductList;
              }

              if (f.Data.TaxRate != null) {
                this.TaxRate = f.Data.TaxRate.Value;
              }
              if(f.Data.ClientRemark != null) {
                this.ClientRemark = f.Data.ClientRemark;
              }

              if(f.Data.AdminRemark != null) {
                this.AdminRemark = f.Data.AdminRemark;
              }
              if(f.Data.ShippingMessage != null) {
                this.ShippingMessage = f.Data.ShippingMessage;
              }
            } else {
              super.showToast(this.toastCtrl, f.Msg);
            }

            loading.dismiss();
          },
          error => {
            loading.dismiss();
            super.showToast(this.toastCtrl, error.Msg);

          }, () => this.loading = false);
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline")); 
    }
  }


  calculBasicTotalPrice() {
    var TotalPrice = 0;
    if (this.ProductList != null && this.OrderInfo.TotalPrice != null) {
      this.ProductList.forEach(p => {
        if (p.Quantity != null && p.Price != null) {
          TotalPrice = TotalPrice + p.Quantity * p.Price;
        }
      });
    }
    else {
      TotalPrice = this.OrderInfo.TotalPrice;
    }

    return TotalPrice;
  }

  ContactUs(){
    this.navCtrl.push('ContactUsPage',{
      OrderId : this.OrderInfo.Id,
      Page: 'ReadOrderDetailsPage'
    });
  }
  
  getStatusClass(StatusCode) {
    var statusColor = "warning";
    switch (StatusCode) {
      case 'OrderStatus_Valid':
        statusColor = "secondary"
        break;
      case 'OrderStatus_Refus':
        statusColor = "danger"
        break;
      case 'OrderStatus_Progressing':
        statusColor = "warning"
        break;
    }
    return statusColor;
  }

}

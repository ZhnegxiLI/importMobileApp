import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Network } from '@ionic-native/network';
import { UtilsProvider } from '../../providers/utils/utils';
import { BaseUI } from '../../app/common/baseui';

@IonicPage()
@Component({
  selector: 'page-read-order-list',
  templateUrl: 'read-order-list.html',
})
export class ReadOrderListPage extends BaseUI{

  orderList:any[] = [];
  loading: boolean = true;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public rest : RestProvider,
    public network : Network,
    public utils: UtilsProvider,
    public toastCtrl:ToastController) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadOrderListPage');
    this.loadOrderList();
  }
  commandeDetail(order){
    this.navCtrl.push('ReadOrderDetailsPage');
  }
  async loadOrderList(){
    if (this.network.type != 'none') {
      var UserId = parseInt(await this.utils.getKey('userId'));
      this.rest.GetOrdersListByUserId(UserId) // 填写url的参数
        .subscribe(
          f => {
            if (f.Success&&f.Data!=null) {
                this.orderList =f.Data;
                console.log(this.orderList);
            } else {
              super.showToast(this.toastCtrl, f.Msg);
            }
          },
          error => {
            super.showToast(this.toastCtrl, error.Msg);
          },()=>this.loading=false);
    }
    else {
      super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
    }
  }
  getStatusClass(StatusCode){
    var statusColor = "warning";
    switch(StatusCode){
      case 'OrderStatus_Valid':
        statusColor= "secondary"
        break;
      case 'OrderStatus_Refus':
        statusColor= "danger"
        break;
      case 'OrderStatus_Progressing':
        statusColor= "warning"
        break;
    }
    return statusColor;
  }
}

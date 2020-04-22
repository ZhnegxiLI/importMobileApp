import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Network } from '@ionic-native/network';
import { UtilsProvider } from '../../providers/utils/utils';
import { BaseUI } from '../../app/common/baseui';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-read-order-list',
  templateUrl: 'read-order-list.html',
})
export class ReadOrderListPage extends BaseUI {

  orderList: any[] = [];
  loading: boolean = true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public network: Network,
    public utils: UtilsProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadOrderListPage');
    this.loadOrderList();
  }
  commandeDetail(order) {
    this.navCtrl.push('ReadOrderDetailsPage',{OrderId:order.Id});
  }
  
  async loadOrderList() {
    if (this.network.type != 'none') {
      var UserId = parseInt(await this.utils.getKey('userId'));
      var orderType = this.navParams.get('orderType');
      this.rest.GetOrdersListByUserId(UserId,orderType) // 填写url的参数
        .subscribe(
          f => {
            if (f.Success && f.Data != null) {
              this.orderList = f.Data;
              console.log(this.orderList);
            } else {
              super.showToast(this.toastCtrl,this.translateService.instant("Msg_Error") );
            }
          },
          error => {
            super.showToast(this.toastCtrl,this.translateService.instant("Msg_Error") );
          }, () => this.loading = false);
    }
    else {
      super.showToast(this.toastCtrl,this.translateService.instant("Msg_Offline") );
    }
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

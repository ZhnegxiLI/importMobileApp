import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage extends BaseUI {

  private isSystemMessage: boolean = false;
  private criteria: any = {
    Title: null,
    Body: null,
    OrderId: null
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public rest: RestProvider, public network: Network, public loadingCtrl: LoadingController, public viewCtrl: ViewController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
    if (this.navParams.get('OrderId') != null) {
      //
      this.criteria.OrderId = this.navParams.get('OrderId');
    }
    if (this.navParams.get('SystemMessage') != null) {
      this.criteria.Title = this.navParams.get('SystemMessage').Title;
      this.criteria.Body = this.navParams.get('SystemMessage').Body;
      this.isSystemMessage = true;
      if (this.network.type != 'none') {

        this.rest.UpdateMessageStatus({
          MessageId: this.navParams.get('SystemMessage').Id,
          Status: true,
          UserId: localStorage.getItem('userId')
        }) // 填写url的参数
          .subscribe(
            f => { },
            error => {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            });
      }
      else {
        super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    console.log(this.criteria);


    if (this.network.type != 'none') {
      var loading = this.showLoading(this.loadingCtrl, this.translateService.instant('Loading'));

      var MessageInfo: any = {};

      MessageInfo.Message = this.criteria;
      MessageInfo.FromUserId = localStorage.getItem('userId');

      // this.navCtrl.parent.select(0); // 跳转tabs
      this.rest.SaveMessage(MessageInfo) // 填写url的参数
        .subscribe(
          f => {
            if (f > 0) {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_SaveSuccess"));

              this.navCtrl.pop();
            }
            else {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            }
            loading.dismiss();
          },
          error => {
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            loading.dismiss();
          });
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }



}

import { Component, ViewChild, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BaseUI } from '../../app/common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Network } from '@ionic-native/network';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI {

  public messageList: any[] = [];
  public loading: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public translateService: TranslateService,
    public toastCtrl: ToastController, public rest: RestProvider, public network: Network, public modalCtrl: ModalController,public event: Events) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');

    this.loadMesage();
  }

  loadMesage() {
    if (this.network.type != 'none') {
      var criteria = {
        UserId: localStorage.getItem('userId'),
      }
      this.loading = true
      this.rest.GetMessageByUserAndStatus(criteria) // 填写url的参数
        .subscribe(
          result => {
            if (result.List != null && result.List.length > 0) {
              this.messageList = result.List;
              
              var count = this.messageList.filter(p=>p.IsReaded==false);
              this.event.publish('message:new', count);
            }

            this.loading = false;
          },
          error => {
            this.loading = false;
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
          });
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }

  readDetailInfo(message) {

    var modal = this.modalCtrl.create('ContactUsPage', {
      SystemMessage: message
    });
    modal.present();
    modal.onDidDismiss(f => {
      this.loadMesage();
    })

  }


}


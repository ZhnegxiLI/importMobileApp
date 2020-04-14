import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../app/common/baseui';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage extends BaseUI{

  private criteria:any = {
    Title : null,
    Body: null,
    OrderId: null
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController,
    public rest: RestProvider,public network: Network,public loadingCtrl: LoadingController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
    if (this.navParams.get('OrderId')!=null){
      //
      this.criteria.OrderId = this.navParams.get('OrderId');
    }
  }

  save(){
    console.log(this.criteria);

    
    if (this.network.type != 'none') {
      var loading = this.showLoading(this.loadingCtrl,"En cours..."); // todo: 翻译
      
      var MessageInfo:any = {};

      MessageInfo.Message = this.criteria; 
      MessageInfo.FromUserId = localStorage.getItem('userId');
  
     // this.navCtrl.parent.select(0); // 跳转tabs
      this.rest.SaveMessage(MessageInfo) // 填写url的参数
        .subscribe(
          f => {
            if(f>0){
              super.showToast(this.toastCtrl, "Saved successfully"); // todo translate

              this.navCtrl.pop();
            }

            loading.dismiss();
          },
          error => {
        
           // todo error
            loading.dismiss();
          });
    }
    else {
      super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
    }
  }



}

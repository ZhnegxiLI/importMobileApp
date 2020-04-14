import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Network } from '@ionic-native/network';
import { BaseUI } from '../../app/common/baseui';



@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage extends BaseUI{

  private email : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private rest : RestProvider, public network: Network,
    public toastCtrl: ToastController ,
    public loadingCtrl: LoadingController) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  sendEmail(){
    if(this.email !=null && this.email!= ''){
      if (this.network.type != 'none') {
        var loading = this.showLoading(this.loadingCtrl,"En cours..."); // todo: 翻译

       // this.navCtrl.parent.select(0); // 跳转tabs
        this.rest.SendPasswordResetLink(this.email) // 填写url的参数
          .subscribe(
            f => {
              if(f!=null && f.Success == true){
                this.navCtrl.setRoot('RegistreSuccedPage',{page:'ForgetPasswordPage',email:f.Data});
              }
              else {
                super.showToast(this.toastCtrl, "AccountNotExists"); // todo translate
              }
  
              loading.dismiss();
            },
            error => {
              super.showToast(this.toastCtrl, "SomeErrorIsOccur"); // todo translate
            });
      }
      else {
        super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
      }
    }
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { BaseUI } from '../../app/common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { from } from 'rxjs/observable/from';
import {Storage } from '@ionic/storage';
import {RegistrePage} from '../registre/registre';
import { Network } from '@ionic-native/network';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  email: string;
  password: string;
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController ,
    public storage: Storage,
    public modalCtrl : ModalController,
    public network: Network) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
   // this.viewCtrl.dismiss();
 
    if (this.network.type != 'none') {
      var loading = this.showLoading(this.loadingCtrl,"En cours..."); // todo: 翻译
      var LoginInfo = {
        Email: this.email,
        Password: this.password 
      }

  
     // this.navCtrl.parent.select(0); // 跳转tabs
      this.rest.Login(LoginInfo) // 填写url的参数
        .subscribe(
          f => {
            if (f.Success&&f.Data!=null&&f.Data.Token!=null&&f.Data.UserId!=null&&f.Data.UserId>0) {
              this.showToast(this.toastCtrl,"Login successfully"); // 翻译
              /* 重整成一个object */
              this.storage.set('email',this.email);
              this.storage.set('token',f.Data.Token);
              this.storage.set('userId',f.Data.UserId); 

              this.viewCtrl.dismiss();
             
            } else {
              super.showToast(this.toastCtrl, f.Msg);
            }
            loading.dismiss();
          },
          error => {
            super.showToast(this.toastCtrl, error.Msg);
            loading.dismiss();
          });
    }
    else {
      super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
    }
  }

  registre(){

  this.navCtrl.push(RegistrePage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

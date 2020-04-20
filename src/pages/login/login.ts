import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, ModalController, App } from 'ionic-angular';
import { BaseUI } from '../../app/common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { from } from 'rxjs/observable/from';
import {Storage } from '@ionic/storage';
import {RegistrePage} from '../registre/registre';
import { Network } from '@ionic-native/network';
import { HomePage } from '../home/home';

@IonicPage()
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
    public network: Network,
    public appCtrl: App) {
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
      this.rest.getNewRefreshToken(LoginInfo) // 填写url的参数
        .subscribe(
          f => {


            if(f!=null && f.authToken!=null){
              localStorage.setItem('login  Status', '1');
              localStorage.setItem('jwt', f.authToken.token);
              localStorage.setItem('username', f.authToken.username);
              localStorage.setItem('userId',f.authToken.userId);
              localStorage.setItem('expiration', f.authToken.expiration);
              localStorage.setItem('userRole', f.authToken.roles);
              localStorage.setItem('refreshToken', f.authToken.refresh_token);
              //this.router.navigate(['sample']);


              this.storage.set('userId',f.authToken.userId);
              this.storage.set('jwt',f.authToken.token);
              this.storage.set('refreshToken',f.authToken.refresh_token);

              this.viewCtrl.dismiss();
          }

            loading.dismiss();
          },
          error => {
            var message = JSON.parse(error);
            if(message.LoginError!=null){
              super.showToast(this.toastCtrl, message.LoginError);
            }
           
            loading.dismiss();
          });
    }
    else {
      super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
    }
  }

  registre(){

   // this.appCtrl.getRootNavs()[0].push('RegistrePage');
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push('RegistrePage');
  }

  findOutPassword(){
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push('ForgetPasswordPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

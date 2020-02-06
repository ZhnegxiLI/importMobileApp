import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { BaseUI } from '../../app/common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { from } from 'rxjs/observable/from';
import {Storage } from '@ionic/storage';
import {RegistrePage} from '../registre/registre'


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  mobile: any;
  password: any;
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController ,
    public storage: Storage,
    public modalCtrl : ModalController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.rest.Login(this.mobile).subscribe(
          f => {
        
            
          },
        error => {
          this.errorMessage = <any>error;
         // loading.dismiss();
          super.showToast(this.toastCtrl, "Echec de connection, veuillez vérifier votre connexion de réseau"); // 添加多种错误代码检测
        });
    //var loading = super.showLoading(this.loadingCtrl, "En cours de connecter");
    // this.rest.Login(this.mobile, this.password)
    //   .subscribe(
    //     f => {
    //       if (f["Status"] == "OK") {
    //         //添加token处理
    //         this.storage.set('UserId', f['UserId']);
    //         loading.dismiss();
    //         this.dismiss();
    //       }
    //       else {
    //         loading.dismiss();
    //         super.showToast(this.toastCtrl, "Echec de connection, veuillez vérifier votre login et mot de passe"); //f["StatusContent"], todo: 后端api需返回错误状态 
    //       }
    //     },
    //   error => {
    //     this.errorMessage = <any>error;
    //     loading.dismiss();
    //     super.showToast(this.toastCtrl, "Echec de connection, veuillez vérifier votre connexion de réseau"); // 添加多种错误代码检测
    //   });
  }

  registre(){

  this.navCtrl.push(RegistrePage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

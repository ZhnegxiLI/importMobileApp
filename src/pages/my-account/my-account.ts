import { ContactUsPage } from './../contact-us/contact-us';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { Storage } from '@ionic/storage';
import { ReadOrderListPage } from '../read-order-list/read-order-list';
import {AboutUsPage} from '../about-us/about-us'; 
import {TranslationPage} from '../translation/translation'
import { UtilsProvider } from '../../providers/utils/utils'; 
import { RestProvider } from '../../providers/rest/rest';
import { Events } from 'ionic-angular';
import { BaseUI } from '../../app/common/baseui';

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage extends BaseUI{

  public notLogin: boolean = true;
  public logined: boolean = false;
  private username : string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public utils :UtilsProvider,
    public rest: RestProvider,
    public event: Events,
    public toastCtrl: ToastController) {
      super();

      event.subscribe('logout:logout', () => {
        super.showToast(this.toastCtrl,"You have been log out, try to log in again");
        this.navCtrl.popToRoot();
      });
  }



  showModal() {
    let modal = this.modalCtrl.create('LoginPage');
    modal.onDidDismiss(()=>{
        this.loadUserPage();
    });
    modal.present();
  }

  async ionViewDidEnter() {
   await this.loadUserPage();
  }

  contactUs(){
    this.navCtrl.push('ContactUsPage', {Page: 'MyAccountPage'});
  }

  aboutUs(){
    this.navCtrl.push('AboutUsPage');
  }

  loadUserPage() {

    var token = localStorage.getItem('jwt');
    var userId = localStorage.getItem('userId');
    if(userId ==null || token == null){
      this.notLogin = true;
      this.logined = false;
    }
    else {
      this.notLogin = false;
      this.logined = true;

      this.username = localStorage.getItem('username');
    }

    if(this.logined){
      this.loadNotReadMessage();
    }
  }
  logout(){
   
    localStorage.clear();

    this.storage.remove('userId');
    this.storage.remove('jwt');
    this.storage.remove('refreshToken');

    this.loadUserPage();
  }

  loadNotReadMessage(){
    this.rest.GetNoReadMessageCount({UserId:localStorage.getItem('userId')}).subscribe(result=>{
      if(result!=null){
        this.event.publish('message:new', result);
      }
    })
  }

  readCommandList(orderType){
    this.navCtrl.push('ReadOrderListPage',{orderType: orderType});
  }

  translation(){
    let modal = this.modalCtrl.create('TranslationPage');
    modal.onDidDismiss(()=>{
       
    });
    modal.present();
  }


  UserInfoPage(){
    this.navCtrl.push('UserInfoPage');
  }

  myAvis(){
    this.navCtrl.push('ProductEvaluationListPage'); // all
  }

}

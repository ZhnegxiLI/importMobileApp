import { ContactUsPage } from './../contact-us/contact-us';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { Storage } from '@ionic/storage';
import { ReadOrderListPage } from '../read-order-list/read-order-list';
import {AboutUsPage} from '../about-us/about-us'; 
import {TranslationPage} from '../translation/translation'
import { UtilsProvider } from '../../providers/utils/utils'; 

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  public notLogin: boolean = true;
  public logined: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public utils :UtilsProvider) {
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
    this.navCtrl.push('ContactUsPage');
  }

  aboutUs(){
    this.navCtrl.push('AboutUsPage');
  }

  async loadUserPage() {

    var userId = await this.utils.getKey('userId');
    var token = await this.utils.getKey('token');
    if(userId ==null || token == null){
      this.notLogin = true;
      this.logined = false;
    }
    else {
      this.notLogin = false;
      this.logined = true;
    }
  }
  logout(){
    this.storage.remove('userId');
    this.storage.remove('token');
    this.loadUserPage();
  }
  readCommandList(){
    this.navCtrl.push('ReadOrderListPage');
  }
  viewAllOrder(){
    this.navCtrl.push('ReadOrderListPage');
  }
  
  translation(){
    let modal = this.modalCtrl.create('TranslationPage');
    modal.onDidDismiss(()=>{
       
    });
    modal.present();
  }

}

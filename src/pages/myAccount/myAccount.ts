import { ContactUsPage } from './../contact-us/contact-us';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { from } from 'rxjs/observable/from';
import { Storage } from '@ionic/storage';
import { ReadOrderListPage } from '../read-order-list/read-order-list';
import {AboutUsPage} from '../about-us/about-us'; 
import {TranslationPage} from '../translation/translation'

@Component({
  selector: 'page-myAccount',
  templateUrl: 'myAccount.html',
})
export class myAccountPage {
  public notLogin: boolean = true;
  public logined: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage) {
  }

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(()=>{
        this.loadUserPage();
    });
    modal.present();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  contactUs(){
    this.navCtrl.push(ContactUsPage);
  }

  aboutUs(){
    this.navCtrl.push(AboutUsPage);
  }

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val!=null) {
        this.notLogin = true;
        this.logined = false;
      }

      else {
        this.notLogin = true;
        this.logined = false;
      }
    });
  }
  logout(){
    this.storage.remove('UserId');
    this.loadUserPage();
  }
  readCommandList(){
    this.navCtrl.push(ReadOrderListPage);
  }
  
  translation(){
    let modal = this.modalCtrl.create(TranslationPage);
    modal.onDidDismiss(()=>{
       
    });
    modal.present();
  }
}

import { ContactUsPage } from './../contact-us/contact-us';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { from } from 'rxjs/observable/from';
import { Storage } from '@ionic/storage';
import { ReadOrderListPage } from '../read-order-list/read-order-list';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val!=null) {
        this.notLogin = false;
        this.logined = true;
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
}

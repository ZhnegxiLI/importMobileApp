import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { UtilsProvider } from '../../providers/utils/utils'; 


@IonicPage()
@Component({
  selector: 'page-registre-succed',
  templateUrl: 'registre-succed.html',
})
export class RegistreSuccedPage {
  email:string;

  constructor(private app:App,public navCtrl: NavController, public navParams: NavParams,public utils :UtilsProvider) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad RegistreSuccedPage');
    this.email = await this.utils.getKey('email');
  }
  returnToAccueil(){
    // Set the tab to the first choice 
    //this.navCtrl.parent.select(0);
    this.navCtrl.setRoot('TabsPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegistreSuccedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registre-succed',
  templateUrl: 'registre-succed.html',
})
export class RegistreSuccedPage {

  constructor(private app:App,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistreSuccedPage');
  }
  returnToAccueil(){
    // Set the tab to the first choice 
    //this.navCtrl.parent.select(0);
    this.navCtrl.setRoot(TabsPage);
  }

}

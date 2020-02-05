import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-translation',
  templateUrl: 'translation.html',
})
export class TranslationPage {
  public selectedLang: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : Storage,public translate: TranslateService, public viewCtrl: ViewController, public utilis:UtilsProvider) {
  }

 ionViewDidLoad() {
    console.log('ionViewDidLoad TranslationPage');
    this.selectedLang = this.translate.defaultLang ;
  }

  changeLang(){
    this.translate.setDefaultLang(this.selectedLang);
    this.storage.set('lang', this.selectedLang);
    this.viewCtrl.dismiss();
  }

}

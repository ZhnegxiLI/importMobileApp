import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { UtilsProvider } from '../../providers/utils/utils'; 
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-registre-succed',
  templateUrl: 'registre-succed.html',
})
export class RegistreSuccedPage {
  private email:string;
  private message : string ;

  constructor(private app:App,public navCtrl: NavController, public navParams: NavParams,public utils :UtilsProvider,public translateService: TranslateService) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad RegistreSuccedPage');
    this.email = this.navParams.get('email'); //await this.utils.getKey('email');
    if(this.navParams.get('page')!=null && this.navParams.get('page') == 'RegistrePage'){
      this.message = this.translateService.instant('registre-succed.Confirm')!=null ? this.translateService.instant('registre-succed.Confirm').replace('{email}', this.email): '';
    }
    else if(this.navParams.get('page')!=null && this.navParams.get('page') == 'ForgetPasswordPage'){
      this.message = this.translateService.instant('registre-succed.ForgetPasswordSendEmail')!=null ? this.translateService.instant('registre-succed.ForgetPasswordSendEmail').replace('{email}', this.email): '';
    }
  
  }
  returnToAccueil(){
    // Set the tab to the first choice 
    //this.navCtrl.parent.select(0);
    this.navCtrl.setRoot('TabsPage');
  }

}

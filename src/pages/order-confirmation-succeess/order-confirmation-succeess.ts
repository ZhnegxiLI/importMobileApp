import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-order-confirmation-succeess',
  templateUrl: 'order-confirmation-succeess.html',
})
export class OrderConfirmationSucceessPage {

  public message: string = "";
  public OrderId : any = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmationSucceessPage');
      this.OrderId =  this.navParams.get('OrderId');
      
      this.message = this.translateService.instant( 'page-order-confirmation-succeess.Message').replace('{Email}', this.navParams.get('Email'));
  }
  returnToAccueil(){
    this.navCtrl.setRoot('TabsPage');
  }

}

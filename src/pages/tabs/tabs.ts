import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = 'HomePage';
  tabDiscovery = 'ReadOrderListPage';
  tabCart = 'CartPage';
  tabNotification = 'AddAdressPage';
  tabMyAccount = 'MyAccountPage';

  constructor() {

  }
}

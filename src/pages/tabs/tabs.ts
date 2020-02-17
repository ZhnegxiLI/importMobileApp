import { Component } from '@angular/core';

import { HomePage } from '../home/home';
// import { DiscoveryPage } from '../discovery/discovery';
import { CartPage } from '../cart/cart';
import { NotificationPage } from '../notification/notification'; 
import {RegistreSuccedPage} from '../registre-succed/registre-succed'
import { ReadOrderListPage } from '../read-order-list/read-order-list';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = 'HomePage';
  tabDiscovery = 'ReadOrderListPage';
  tabCart = 'CartPage';
  tabNotification = 'RegistreSuccedPage';
  tabMyAccount = 'MyAccountPage';

  constructor() {

  }
}

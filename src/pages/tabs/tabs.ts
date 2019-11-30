import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { DiscoveryPage } from '../discovery/discovery';
import { CartPage } from '../cart/cart';
import { myAccountPage } from '../myAccount/myAccount';
import { NotificationPage } from '../notification/notification'; 

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabDiscovery = DiscoveryPage;
  tabCart = CartPage;
  tabNotification = NotificationPage;
  tabMyAccount = myAccountPage;

  constructor() {

  }
}

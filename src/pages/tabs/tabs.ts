import { Component } from '@angular/core';
import { IonicPage, Events } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public MessageCount: number = 0;
  tabHome = 'HomePage';
  tabDiscovery = 'CategoryListPage';
  tabCart = 'CartPage';
  tabNotification = 'NotificationPage';
  tabMyAccount = 'MyAccountPage';

  constructor(public events: Events) {
    events.subscribe('message:new', (count) => {
      var ParsedInt = parseInt(count);
      if(typeof ParsedInt == "number"){
        this.MessageCount =  ParsedInt || 0;
      }
      else{
        this.MessageCount = 0;
      }
    
    });
  }
}

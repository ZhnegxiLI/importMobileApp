import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ENV } from '@app/env';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
import { UtilsProvider } from '../providers/utils/utils'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'TabsPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public translate: TranslateService, public event :Events, public utils:UtilsProvider ) {
    platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      console.log('Current environment:'+ENV.MODE);
      
      var lang = await this.utils.getKey('lang');
      if(lang!=null){
        translate.setDefaultLang(lang); 
      }
      else{
        translate.setDefaultLang('fr');
      }
    });
  }
}

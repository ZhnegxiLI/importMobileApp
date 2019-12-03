import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { CartPage } from '../pages/cart/cart';
import { myAccountPage } from '../pages/myAccount/myAccount';
import { NotificationPage } from '../pages/notification/notification';
import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage'
import {SearchPage} from '../pages/search/search'


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { NewproductPage } from '../pages/newproduct/newproduct'
import { CategoryListPage } from '../pages/category-list/category-list'
import {SubCategoryListPage} from '../pages/sub-category-list/sub-category-list';

@NgModule({
  declarations: [
    MyApp,
    DiscoveryPage,
    CartPage,
    HomePage,
    TabsPage,
    myAccountPage,
    NotificationPage,
    LoginPage,
    NewproductPage,
    SearchPage,
    CategoryListPage,
    SubCategoryListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true'
    }),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DiscoveryPage,
    CartPage,
    HomePage,
    TabsPage,
    myAccountPage,
    NotificationPage,
    LoginPage,
    NewproductPage,
    SearchPage,
    CategoryListPage,
    SubCategoryListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider
  ]
})
export class AppModule { }

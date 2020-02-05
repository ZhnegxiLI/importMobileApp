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
import { RegistrePage } from '../pages/registre/registre'

import { IonicStorageModule } from '@ionic/storage';
import {SearchPage} from '../pages/search/search';
import {ReadOrderListPage } from '../pages/read-order-list/read-order-list';
import {SubCategoryListPage } from '../pages/sub-category-list/sub-category-list';
import { ReadOrderDetailsPage } from '../pages/read-order-details/read-order-details'

import { ProductEvaluationListPage } from '../pages/product-evaluation-list/product-evaluation-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { NewproductPage } from '../pages/newproduct/newproduct'
import { CategoryListPage } from '../pages/category-list/category-list';
import { ComponentsModule } from '../components/components.module';

import { ProductDetailPage } from '../pages/product-detail/product-detail';
import {WriteProductEvaluationPage} from '../pages/write-product-evaluation/write-product-evaluation'
import { StarRatingModule } from 'ionic3-star-rating';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { AboutUsPage } from '../pages/about-us/about-us';
import {TranslationPage} from '../pages/translation/translation'

import { HttpClientModule,HttpClient} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UtilsProvider } from '../providers/utils/utils';


export function createTranslateLoader(http: HttpClient) {
  //此出的路径需要和第二步新建的文件夹保持一致
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MyApp,
    RegistrePage,
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
    ReadOrderListPage,
    SubCategoryListPage,
    ReadOrderDetailsPage,
    ProductDetailPage,
    WriteProductEvaluationPage,
    ProductEvaluationListPage,
    ContactUsPage,
    AboutUsPage,
    TranslationPage 
  ],
  imports: [
    StarRatingModule,
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true'
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegistrePage,
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
    ReadOrderListPage,
    SubCategoryListPage,
    ReadOrderDetailsPage,
    ProductDetailPage,
    WriteProductEvaluationPage,
    ProductEvaluationListPage,
    ContactUsPage,
    AboutUsPage,
    TranslationPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    UtilsProvider
  ]
})
export class AppModule { }

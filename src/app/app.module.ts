import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { DiscoveryPage } from '../pages/discovery/discovery';

import { Network } from '@ionic-native/network';

import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';

import { ComponentsModule } from '../components/components.module';
import { StarRatingModule } from 'ionic3-star-rating';

import { HttpClientModule,HttpClient} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UtilsProvider } from '../providers/utils/utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule, MatSelectModule,MatFormFieldModule,MatInputModule } from '@angular/material'

export function createTranslateLoader(http: HttpClient) {
  //此出的路径需要和第二步新建的文件夹保持一致
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MyApp,
    DiscoveryPage,
  ],
  imports: [
    StarRatingModule,
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
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
    DiscoveryPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    UtilsProvider,
    Network
  ]
})
export class AppModule { }

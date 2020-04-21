import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import{ UtilsProvider } from '../../providers/utils/utils'
import { Network } from '@ionic-native/network';
import { BaseUI } from '../../app/common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { TranslateService } from '@ngx-translate/core';
@IonicPage()
@Component({
  selector: 'page-write-product-evaluation',
  templateUrl: 'write-product-evaluation.html',
})
export class WriteProductEvaluationPage extends BaseUI{
  level: number = 5;
  title: string;
  body: string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public utils: UtilsProvider,
    public network:Network,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    public translateService: TranslateService,
    public rest:RestProvider) {
      super();
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductEvaluationListPage');
  }

  async saveProductComment(){
    if(this.level!=null&&this.title!=null && this.title!=''){
      var criteria = {
        Title: this.title,
        Body: this.body,
        Level: this.level,
        UserId: await this.utils.getKey('userId'),
        ProductId: this.navParams.get('productId')
      }
      if (this.network.type != 'none') {
        var loading = super.showLoading(this.loadingCtrl,this.translateService.instant('Loading') );
        this.rest.SaveProductComment(criteria) 
          .subscribe(
            f => {
              if (f.Success&&f.Data!=null) {
                  super.showToast(this.toastCtrl,'votre avis est bien enregistré');// TODO:translate
                  this.navCtrl.pop();
              } else {
                super.showToast(this.toastCtrl, f.Msg);
              }
            },
            error => {
              super.showToast(this.toastCtrl, error.Msg);
            },()=>loading.dismiss());
      }
      else {
        super.showToast(this.toastCtrl, "Vous êtes hors connexion, veuillez essayer ultérieusement ");
      }
    }
  }

}

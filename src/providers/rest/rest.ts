
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timeout, catchError, mergeMap } from 'rxjs/operators'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ENV } from '@app/env';
import { Events } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { TranslateService } from '@ngx-translate/core';

import 'rxjs/add/operator/catch';
import 'rxjs/Rx';



@Injectable()
export class RestProvider {
  constructor(public http: Http,
    public storage: Storage,
    public event: Events,
    public utils: UtilsProvider,
    public translate: TranslateService
  ) {

  }
  private host = ENV.SERVER_API_URL;

  // private apiUrlLogin = this.host + "api/Auth/Login"; 


  private apiUrlGetCargoByName = this.host + 'api/cargo/GetCargo';
  private apiUrlGetOrdersByUserId = this.host + 'api/SalesOrder/GetSalesOrderByUserId';
  private apiUrlGetSalesOrderCategoriesByUserId = this.host + 'api/SalesOrder/GetSalesOrderCategoriesByUserId';
  private apiUrlGetDeptByName = this.host + 'api/Client';
  private apiUrlGetSalesOrderByOrderId = this.host + "api/SalesOrder/GetSalesOrderByOrderId";
  private apiUrlInsertSalesOrderByOrderId = this.host + "api/SalesOrder/InsertSalesOrderByOrderId";
  private apiUrlgetUserList = this.host + "api/Auth/getUserList";

  private apiUrlUpdateSalesOrderStatut = this.host + "api/SalesOrder/UpdateSalesOrderStatut";
  private apiUrlCheckAvailabilityOfToken = this.host + "api/Auth/CheckAvailabilityOfToken";
  private apiUrlGetSalesOrderValidationContent = this.host + 'api/SalesOrder/GetSalesOrderValidationContent';
  private apiUrlGetCompanyName = this.host + 'api/Version/GetCompanyName';
  private apiUrlGetSalesOrderValidationList = this.host + 'api/SalesOrder/GetSalesOrderValidationList';
  private apiUrlGetUnitList = this.host + 'api/cargo/GetUnitList';

  private apiUrlGetPermissionList = this.host + 'api/Permission/GetPermissionList';
  private apiUrlGetUserPermissionById = this.host + 'api/Permission/GetUserPermissionById';
  private apiUrlSaveUserPermission = this.host + 'api/Permission/SaveUserPermission';

  private apiUrlAdvancedSalesOrderSearch = this.host + "api/SalesOrder/AdvancedSalesOrderSearch";
  /*
  * With auth services 
  */

  private apiUrlRegistre = this.host + "api/Account/Register";
  private apiUrlLogin = this.host + "api/Auth/Login";
  private apiUrlGetProductMainCategory = this.host + "api/Product/GetProductMainCategory";
  private apiUrlGetProductSecondCategory = this.host + "api/Product/GetProductSecondCategory";


  private apiUrlGetProductListBySecondCategory = this.host + "api/Product/GetProductListBySecondCategory";
  private apiUrlGetProductListBySecondCategoryWithAuth = this.host + "api/Product/GetProductListBySecondCategoryWithAuth";
  private apiUrlGetProductInfoByReferenceIds = this.host + "api/Product/GetProductInfoByReferenceIds";
  private apiUrlGetProductListByPublishDate = this.host + "api/Product/GetProductListByPublishDate";
  private apiUrlGetProductListBySalesPerformance = this.host + "api/Product/GetProductListBySalesPerformance";

  private apiUrlSaveProductComment = this.host + "api/Product/SaveProductComment";
  private apiUrlGetProductCommentListByProductId = this.host + "api/Product/GetProductCommentListByProductId";

  
  private apiUrlGetUserShippingAdress = this.host + "api/Adress/GetUserShippingAdress";
  private apiUrlGetUserFacturationAdress = this.host + "api/Adress/GetUserFacturationAdress";
  private apiUrlGetUserDefaultShippingAdress = this.host + "api/Adress/GetUserDefaultShippingAdress";
  private apiUrlCreateOrUpdateAdress = this.host +"api/Adress/CreateOrUpdateAdress";

  private apiUrlSaveOrder = this.host + "api/Order/SaveOrder";
  private apiUrlGetOrdersListByUserId = this.host + "api/Order/GetOrdersListByUserId";
  

  Registre(RegistrerInfo: object): Observable<any> {
    return this.postUrlReturnWithOutAuth(this.apiUrlRegistre, RegistrerInfo);
  }
  Login(LoginInfo: object): Observable<any> {
    return this.postUrlReturnWithOutAuth(this.apiUrlLogin, LoginInfo);
  }
  GetProductMainCategory(): Observable<any> {
    var lang = this.translate.defaultLang;
    return this.getUrlReturnWithOutAuth(this.apiUrlGetProductMainCategory + "?Lang=" + lang);
  }
  GetProductSecondCategory(MainCategoryReferenceId: number): Observable<any> {
    var lang = this.translate.defaultLang;
    return this.getUrlReturnWithOutAuth(this.apiUrlGetProductSecondCategory + "?MainCategoryReferenceId=" + MainCategoryReferenceId + "&Lang=" + lang);
  }

  GetProductListByPublishDate(Begin: number, Step:number): Observable<any> {
    var lang = this.translate.defaultLang;
    return this.getUrlReturnWithOutAuth(this.apiUrlGetProductListByPublishDate + 
       "?Lang=" + lang+"&Begin="+Begin+"&Step="+Step);
  }

  GetProductListBySalesPerformance(Begin: number, Step:number): Observable<any> {
    var lang = this.translate.defaultLang;
    return this.getUrlReturnWithOutAuth(this.apiUrlGetProductListBySalesPerformance + 
       "?Lang=" + lang+"&Begin="+Begin+"&Step="+Step);
  }


  GetProductListBySecondCategory(SecondCategoryReferenceId: number, Begin: number, Step:number): Observable<any> {
    var lang = this.translate.defaultLang;
    return this.getUrlReturnWithOutAuth(this.apiUrlGetProductListBySecondCategory + 
      "?SecondCategoryReferenceId=" + SecondCategoryReferenceId + "&Lang=" + lang+"&Begin="+Begin+"&Step="+Step);
  }

  GetProductListBySecondCategoryWithAuth(SecondCategoryReferenceId: number, Begin: number, Step:number): Observable<any> {
    var lang = this.translate.defaultLang;
    return this.getUrlReturn(this.apiUrlGetProductListBySecondCategoryWithAuth + 
      "?SecondCategoryReferenceId=" + SecondCategoryReferenceId + "&Lang=" + lang+"&Begin="+Begin+"&Step="+Step);
  }

  SaveProductComment(criteria): Observable<any>{
    // TODO : change to with auth 
    return this.postUrlReturnWithOutAuth(this.apiUrlSaveProductComment, criteria);
  }

  GetProductCommentListByProductId(ProductId: number, Begin: number, Step:number): Observable<any>{
    // TODO : change to with auth 
    var lang = this.translate.defaultLang;
    return this.getUrlReturn(this.apiUrlGetProductCommentListByProductId + 
      "?ProductId="+ProductId +"&Begin="+Begin+"&Step="+Step+"&Lang="+lang);
  }

  SaveOrder(References:any[] ,ShippingAdressId:number, FacturationAdressId:number, UserId:number): Observable<any> {
   // TODO : change to with auth 
    return this.postUrlReturnWithOutAuth(this.apiUrlSaveOrder, 
      { References: References, ShippingAdressId: ShippingAdressId, FacturationAdressId:FacturationAdressId,
        UserId:UserId});
  }
  GetOrdersListByUserId(UserId: number): Observable<any>{
    var lang = this.translate.defaultLang;
    return this.getUrlReturn(this.apiUrlGetOrdersListByUserId + 
      "?UserId="+UserId+"&Lang="+lang);
  }



  GetUserFacturationAdress(UserId): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetUserFacturationAdress + "?UserId="+UserId);
  }

  GetUserDefaultShippingAdress(UserId): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetUserDefaultShippingAdress + "?UserId="+UserId);
  }

  GetUserShippingAdress(UserId): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetUserShippingAdress + "?UserId="+UserId);
  }

  CreateOrUpdateAdress(criteria): Observable<any> {
    return this.postUrlReturnWithOutAuth(this.apiUrlCreateOrUpdateAdress,criteria);
  }


  GetProductInfoByReferenceIds(ReferenceIds): Observable<any> {
    var lang = this.translate.defaultLang; // TODO : change to with auth 
    return this.postUrlReturnWithOutAuth(this.apiUrlGetProductInfoByReferenceIds, { ReferenceIds: ReferenceIds, Lang: lang });
  }







  SaveUserPermission(UserPermissionParam: object): Observable<any> {
    return this.postUrlReturn(this.apiUrlSaveUserPermission, UserPermissionParam);
  }
  GetCargoByName(limit: number): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetCargoByName + "?limit=" + limit);
  }

  GetPermissionList(): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetPermissionList);
  }
  GetUserPermissionById(userId: string): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetUserPermissionById + '?userId=' + userId);
  }

  GetSalesOrderValidationList(categoryId: number, type: string): Observable<any> {
    return this.postUrlReturn(this.apiUrlGetSalesOrderValidationList, { categoryId: categoryId, type: type });
  }

  AdvancedSalesOrderSearch(criteria: object): Observable<any> {
    return this.postUrlReturn(this.apiUrlAdvancedSalesOrderSearch, criteria);
  }

  GetUnitList(): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetUnitList);
  }

  GetSalesOrderValidationContent(orderId: string): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetSalesOrderValidationContent + "?orderId=" + orderId);
  }

  GetOrdersByUserId(userId: string, categoryId: string, type: string, step: number, begin: number): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetOrdersByUserId + "?userId=" + userId + "&categoryId=" + categoryId + "&type=" + type + "&step=" + step + "&begin=" + begin);
  }

  GetSalesOrderCategoriesByUserId(userId: string, type: string): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetSalesOrderCategoriesByUserId + "?userId=" + userId + "&type=" + type);
  }

  GetDeptByName(limit: number): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetDeptByName + "?limit=" + limit);
  }

  GetSalesOrderByOrderId(orderId: string): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetSalesOrderByOrderId + "?orderId=" + orderId);
  }

  InsertSalesOrderByOrderId(orderInfo, products: Array<any>): Observable<any> {
    return this.postUrlReturn(this.apiUrlInsertSalesOrderByOrderId, { orderInfo: orderInfo, products: products });
  }
  UpdateSalesOrderStatut(userId, orderId, applicationContent, statusCode): Observable<any> {
    return this.postUrlReturn(this.apiUrlUpdateSalesOrderStatut, { userId: userId, applicationContent: applicationContent, orderId: orderId, statutCode: statusCode });
  }

  GetCompanyName(): Observable<any> {
    return this.getUrlReturn(this.apiUrlGetCompanyName);
  }

  /**
   * Without auth
   * 
   * @param {*} User
   * @returns {Observable<any>}
   * @memberof RestProvider
   */
  // Login(User):Observable<any>{
  //   this.event.publish('user:created');
  //   return this.postUrlReturnWithOutAuth(this.apiUrlLogin, User);
  // }
  /**
   * Without auth
   * Get userlist for the login page 
   * @returns {Observable<any>}
   * @memberof RestProvider
   */
  GetUserList(): Observable<any> {
    return this.getUrlReturnWithOutAuth(this.apiUrlgetUserList);
  }

  CheckAvailabilityOfToken(token: string): Observable<any> {
    return this.getUrlReturn(this.apiUrlCheckAvailabilityOfToken + "?token=" + token);
  }

  // TODO: Login page remove all 
  private getUrlReturnWithOutAuth(url: string): Observable<any> {
    return this.http.get(url)
      .pipe(
        timeout(20000),
        //       catchError(e => {
        //         return of({'error':'timeout'});
        //       })
      )
      .map(this.extractData)
      .catch(this.handleError);
  }

  private getToken(): Observable<any> {
    return Observable.fromPromise(this.storage.get('token').then(token => {
      //maybe some processing logic like JSON.parse(token)
      return token;
    }));
  }

  private getUrlReturn(url: string): Observable<any> {
    return this.getToken().pipe(
      mergeMap(token => this.http.get(url, {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      })
        .pipe(
          timeout(20000)
        )
        .map(this.extractData)
        .catch(this.handleError)
      )
    );
  }

  private postUrlReturn(url: string, body: any): Observable<any> {
    return this.getToken().pipe(
      mergeMap(token => this.http.post(url, body, {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      }).pipe(
        timeout(20000),
        // catchError(e => {
        //   return of({
        //     'Success': false,
        //     'Msg':'访问超时，请检查网络连接',
        //     'error':'timeout'});
        // })
      )
        .map(this.extractData)
        .catch(this.handleError)
      )
    );
  }

  private postUrlReturnWithOutAuth(url: string, body: any): Observable<any> {
    return this.http.post(url, body)
      .pipe(
        timeout(20000),
      )
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    // if (error instanceof Response) {
    //   const body = error.json() || '';
    //   const err = body.error || JSON.stringify(body);
    //   errMsg = `${error.status}-${error.statusText || ''} ${err}`;
    // }
    // else {
    //   errMsg = error.message ? error.message : error.tostring();
    // }
    // console.error(errMsg);
    // return Observable.throw(errMsg);
    if (error.name != null && error.name == "TimeoutError") {
      //超时信息
      return Observable.throw({ Msg: "连接超时请检查网络连接", Success: false });
    }
    else {

      console.error(JSON.parse(error._body));
      return Observable.throw(JSON.parse(error._body));
    }
  }
}

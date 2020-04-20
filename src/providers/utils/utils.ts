import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UtilsProvider {
  constructor(public http: HttpClient, public storage:Storage) {
  }

  async getKey(key:string): Promise<string>{
    return await this.storage.get(key);
  }

  async checkIsLogined():Promise<boolean>  {
    
    var jwt = await this.getKey('jwt');
    var userId =await this.getKey('userId');
    return jwt!=null && userId!=null;
  }

}

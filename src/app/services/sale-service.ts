import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SaleService
{
    apiUrl: any = environment.apiURL;
    constructor(private _httpClient: HttpClient){}
  
    getProductDetail(): Observable<any>
    {
        let urlEndPoint = this.apiUrl+ environment.getAllProductDetailEndpoint;
        return  this._httpClient.get(urlEndPoint)
    }

    async getByIdProductDetail(id: any){
        let urlEndPoint = this.apiUrl+ environment.getByIdProductDetailEndpoint;
        return await this._httpClient.get<any>(urlEndPoint + id);
    }
  
   async updateProductDetail(data: any ): Promise<Observable<any>>{
    let urlEndPoint = this.apiUrl+ environment.updateProductDetailEndpoint;
    return await  this._httpClient.post<any>(urlEndPoint, data);
  }
  
  async deleteProductDetail(id: any ): Promise<Observable<any>>{
    let urlEndPoint = this.apiUrl+ environment.deleteProductDetailEndpoint;
    return await  this._httpClient.delete<any>(urlEndPoint+ id);
  }

  async AddInventory(data: any): Promise<Observable<any>>
  {
      let urlEndpointupdate = this.apiUrl+ environment.AddProductDetailEndpoint;
      return await  this._httpClient.post<any>(urlEndpointupdate, data);
  }

}
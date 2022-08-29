import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ProductService
{
    apiUrl: any = environment.apiURL;
    constructor(private _httpClient: HttpClient)
    {
    }
  
    getProduct(): Observable<any>
    {
        let urlEndPoint = this.apiUrl+ environment.getAllProductEndpoint;
        return  this._httpClient.get(urlEndPoint)
    }
    getQuery1(): Observable<any>
    {
        let urlEndPoint = this.apiUrl+ environment.getAllQueryEndpoint;
        return  this._httpClient.get(urlEndPoint)
    }
  
    getQuery2(): Observable<any>
    {
        let urlEndPoint = this.apiUrl+ environment.getAllProductqueryEndpoint;
        return  this._httpClient.get(urlEndPoint)
    }

    getQuery3(): Observable<any>
    {
        let urlEndPoint = this.apiUrl+ environment.getAllProductquery2Endpoint;
        return  this._httpClient.get(urlEndPoint)
    }

    async getByIdProduct(id: any){
        let urlEndPoint = this.apiUrl+ environment.getByIdProductEndpoint;
        return await this._httpClient.get<any>(urlEndPoint + id);
    }
  
   async updateProduct(data: any ): Promise<Observable<any>>{
    let urlEndPoint = this.apiUrl+ environment.updateProductEndpoint;
    return await  this._httpClient.post<any>(urlEndPoint, data);
  }

    
  async updateProductCant(data: any ): Promise<Observable<any>>{
    let urlEndPoint = this.apiUrl+ environment.updateProductCantEndpoint;
    return await  this._httpClient.post<any>(urlEndPoint, data);
  }
  
  async deleteProduct(id: any ): Promise<Observable<any>>{
    let urlEndPoint = this.apiUrl+ environment.deleteProductEndpoint;
    return await  this._httpClient.delete<any>(urlEndPoint+ id);
  }


  async AddProduct(data: any): Promise<Observable<any>>
  {
      let urlEndpointupdate = this.apiUrl+ environment.AddProductEndpoint;
      return await  this._httpClient.post<any>(urlEndpointupdate, data);
  }

  

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class CategoryService
{
    apiUrl: any = environment.apiURL;
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    getCategory(): Observable<any>
    {
        let urlEndPoint = this.apiUrl+ environment.getAllCategoryEndpoint;
  
        return  this._httpClient.get(urlEndPoint)
    }
  
  
    async getByIdCategory(id: any){
        let urlEndPoint = environment.getByIdCategoryEndpoint;
        return await this._httpClient.get<any>(urlEndPoint + id);
    }
  

  


}

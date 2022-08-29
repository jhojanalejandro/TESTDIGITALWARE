import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class EmployeeService
{
    apiUrl: any = environment.apiURL;
    constructor(private _httpClient: HttpClient)
    {
    }
  
    getEmployee(): Observable<any>
    {
        let urlEndPoint = this.apiUrl+ environment.getAllEmployeeEndpoint;
  
        return  this._httpClient.get(urlEndPoint)
    }
  

    async getByIdEmployee(id: any){
        let urlEndPoint = this.apiUrl+environment.getByIdEmployeeEndpoint;
        return await this._httpClient.get<any>(urlEndPoint + id);
    }
  
   async updateEmployee(data: any ): Promise<Observable<any>>{
    let urlEndPoint = this.apiUrl+ environment.updateEmployeeEndpoint;
    return await  this._httpClient.post<any>(urlEndPoint, data);
  }
  
  async deleteEmployee(id: any ): Promise<Observable<any>>{
    let urlEndPoint = this.apiUrl+ environment.deleteEmployeeEndpoint;
    return await  this._httpClient.delete<any>(urlEndPoint+ id);
  }

  async AddEmployee(data: any): Promise<Observable<any>>
  {
      let urlEndpointupdate = this.apiUrl+ environment.AddEmployeeEndpoint;
      return await  this._httpClient.post<any>(urlEndpointupdate, data);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ClientService
{
  apiUrl: any = environment.apiURL;
  constructor(private _httpClient: HttpClient){}

  getClient(): Observable<any>
  {
      let urlEndPoint = this.apiUrl+ environment.getAllClientEndpoint;

      return  this._httpClient.get(urlEndPoint)
  }


  async getByIdClient(id: any){
      let urlEndPoint = this.apiUrl+environment.getByIdClientEndpoint;
      return await this._httpClient.get<any>(urlEndPoint + id);
  }

 async updateClient(data: any ): Promise<Observable<any>>{
  let urlEndPoint = this.apiUrl+ environment.updateClientEndpoint;
  return await  this._httpClient.post<any>(urlEndPoint, data);
}

async deleteClient(id: any ): Promise<Observable<any>>{
  let urlEndPoint = this.apiUrl+ environment.deleteClientEndpoint;
  return await  this._httpClient.delete<any>(urlEndPoint+ id);
}

async AddClient(data: any): Promise<Observable<any>>
{
    let urlEndpointupdate = this.apiUrl+ environment.AddClientEndpoint;
    return await  this._httpClient.post<any>(urlEndpointupdate, data);
}

}

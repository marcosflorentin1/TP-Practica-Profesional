import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Params } from '../models/params';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  public getData = (route: string, params: Params) => {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress, params));
  }

  public getDataById = (route: string, id: number) => {
    return this.http.get(`${environment.urlAddress}/${route}?idVehiculo=${id}`, this.generateHeaders());
  }

  public create = (route: string, body: any) => {
    return this.http.post(`${environment.urlAddress}/${route}`, body, this.generateHeaders());
  }

  // public update = (route: string, body) => {
  //   return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  // }

  public delete = (route: string, id: number) => {
    return this.http.delete(`${environment.urlAddress}/${route}?id=${id}`);
  }

  private createCompleteRoute = (route: string, envAddress: string, params: Params = null) => {
    return `${envAddress}/${route}?ultimoIdVehiculo=${params.ultimoIdVehiculo}&operador=${params.operador}&dominio=${params.dominio}&tramite=${params.tramite}&siniestro=${params.siniestro}&chasis=${params.chasis}&etiqueta=${params.etiqueta}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
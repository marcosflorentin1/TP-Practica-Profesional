import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartesService {

  constructor(private http: HttpClient) { }

  public get = (route: string, idParte: number) => {
    return this.http.get(`${environment.urlAddress}/${route}?idParte=${idParte}`, this.generateHeaders());
  }

  public getAll = (route: string) => {
    return this.http.get(`${environment.urlAddress}/${route}`, this.generateHeaders());
  }

  public create = (route: string, body: any) => {
    return this.http.post(`${environment.urlAddress}/${route}`, body, this.generateHeaders());
  }

  // public update = (route: string, body) => {
  //   return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  // }

  public delete = (route: string, idParte: number) => {
    return this.http.delete(`${environment.urlAddress}/${route}?idParte=${idParte}`);
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}

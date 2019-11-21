import { Injectable } from '@angular/core';
import { VehiculoService } from './vehiculo.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  public getUsuario = (route: string, usuario: string, pass: string) => {
    return this.http.get(`${environment.urlAddress}/${route}?usuario=${usuario}&pass=${pass}`, this.generateHeaders());
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

  public delete = (route: string, idUsuario: number) => {
    return this.http.delete(`${environment.urlAddress}/${route}?idUsuario=${idUsuario}`);
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly imageUrl: string = `${environment.urlAddress}/imagen.php`;

  constructor(private httpClient: HttpClient) { }

  // public get(){
  //   return this.httpClient.get(this.imageUrl, this.generateHeaders());
  // }

  public get = (route: string) => {
    return this.httpClient.get(`${environment.urlAddress}/${route}`, this.generateHeaders());
  }

  public post(formData: any): any {
    return this.httpClient.post(this.imageUrl, formData);
  }

  getImage(imageUrl: string): Observable<any> {
    return this.httpClient
      .get(this.imageUrl);
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}

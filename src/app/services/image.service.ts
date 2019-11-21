import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly imageUrl: string = `${environment.urlAddress}/image.php`;

  constructor(private httpClient: HttpClient) { }

  public post(formData: any): any {
    return this.httpClient.post(this.imageUrl, formData);
  }
}

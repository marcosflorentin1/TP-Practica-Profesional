import { Injectable } from '@angular/core';
var ftpClient = require('ftp-client');


@Injectable({
  providedIn: 'root'
})
export class FtpService {
  ftpConfig = {
    host: 'localhost',
    port: 21,
    user: 'anonymous',
    password: 'anonymous@'
  };
  
  options = {
    logging: 'none',
    overwrite: 'all'
  };

  client = new ftpClient(this.ftpConfig, this.options);

  constructor() { }

  subirArchivo(): void{
    this.client.connect(()=> alert('conectado!!'));

  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { DialogComponent } from '../common/dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  @Input() isLogued: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private matDialog: MatDialog
    ) { }

  ngOnInit() {
  }

  login(): void {
    this.usuarioService.getUsuario("usuario.php", this.username, this.password)
      .toPromise()
      .then((usuario: Usuario) => {
        if (usuario && usuario.usuario && usuario.pass) {
          
          //alert("Bienvenido " + usuario.usuario);
         this.showDialog();

          this.isLogued = true;
          this.loginService.setUserLogued(usuario.usuario);
          this.router.navigate(["vehiculos"]);
        } else {
          alert("Usuario Invalido");
        }
      });
  }

  onKeydown(event): void {
    if (event.key === "Enter") {
      this.login();
    }
  }

  showDialog(): void{
    const dialogRef = this.matDialog.open(DialogComponent, {
      width: '450px',
      height: '200px'
    }); 
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }
}
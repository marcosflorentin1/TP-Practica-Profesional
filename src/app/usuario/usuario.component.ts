import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
    usuarioForm: FormGroup;
  usuarios: Usuario[];
  isAdmin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuarioService,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isAdmin = this.loginService.getUserLogued() == "admin";
    if (this.isAdmin) {
      this.getUsuarios();

      this.usuarioForm = this.formBuilder.group({
        usuario: ['', Validators.required],
        pass: ['', Validators.required]
      });
    }
    else{
      this.router.navigate([""]);
    }
  }

  getUsuarios(): void {
    this.usuariosService.getAll("usuario.php")
      .toPromise()
      .then(usuarios => {
        this.usuarios = usuarios as Usuario[];
      })
  }

  agregarUsuario(): void {
    let usuario: Usuario = this.usuarioForm.value as Usuario;
    this.usuariosService.create("usuario.php", usuario)
      .toPromise()
      .then(() => {
        this.usuarios.push(usuario);
        this.usuarioForm.reset();
      });
  }

  eliminarUsuario(idUsuario: number) {
    this.usuariosService.delete("usuario.php", idUsuario)
      .toPromise()
      .then(() => {
        this.usuarios = this.usuarios.filter(usuario => usuario.idUsuario != idUsuario);
      });
  }
}

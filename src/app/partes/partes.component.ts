import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { Parte } from '../models/parte';
import { PartesService } from '../services/partes.service';

@Component({
  selector: 'app-partes',
  templateUrl: './partes.component.html',
  styleUrls: ['./partes.component.css']
})
export class PartesComponent implements OnInit {
  parteForm: FormGroup;
  partes: Parte[];
  isLogued: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private partesService: PartesService,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isLogued = this.loginService.isLogued;

    if (this.isLogued) {
      this.getPartes();

      this.parteForm = this.formBuilder.group({
        descripcion: ['', Validators.required]
      });
    }
    else {
      this.router.navigate([""]);
    }
  }

  getPartes(): void {
    this.partesService.getAll("parte.php")
      .toPromise()
      .then(partes => {
        this.partes = partes as Parte[];
      })
  }

  agregarParte(): void {
    let parte: Parte = this.parteForm.value as Parte;
    this.partesService.create("parte.php", parte)
      .toPromise()
      .then(() => {
        this.partes.push(parte);
        this.parteForm.reset();
      });
  }

  eliminarParte(idParte: number) {
    this.partesService.delete("parte.php", idParte)
      .toPromise()
      .then(() => {
        this.partes = this.partes.filter(parte => parte.idParte != idParte);
      });
  }
}

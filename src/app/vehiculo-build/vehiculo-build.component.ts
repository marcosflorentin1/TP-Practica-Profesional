import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Parte } from '../models/parte';
import { VehiculoService } from '../services/vehiculo.service';
import { Params } from '../models/params';
import { Vehiculo } from '../models/vehiculo';
import { VehiculoParte } from '../models/vehiculo-parte';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { LoginService } from '../login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Estado } from '../common/enums';
import { ImageService } from '../services/image.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-vehiculo-build',
  templateUrl: './vehiculo-build.component.html',
  styleUrls: ['./vehiculo-build.component.css']
})
export class VehiculoBuildComponent implements OnInit {
  vehiculoForm: FormGroup;
  partes: Parte[] = [];
  isEditMode: boolean = false;
  vehiculoPartes: VehiculoParte[] = [];
  idVehiculo: number;
  isLogued: boolean = false;
  partesCargadas: boolean = false;
  title: string = "Nuevo Vehículo";
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  linkImagen: string = 'fotos?dominio=';
  cantidadSeleccionadas: number = 0;
  chasisRepetido: boolean = false;
  delayTimer: any;

  constructor(
    private formBuilder: FormBuilder,
    private vehiculoService: VehiculoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private cookieService: CookieService,
    private imageService: ImageService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.isLogued = this.isLogued = this.loginService.isLogued;

    if (this.isLogued) {
      this.idVehiculo = +this.activatedRoute.snapshot.paramMap.get('idVehiculo');

      this.getPartes();
      this.vehiculoForm = this.formBuilder.group({
        idVehiculo: [''],
        dominio: [''],
        formulario04d: [''],
        certificadoBaja: [''],
        registroSeccional: [''],
        fechaInicio: [''],
        fechaFin: [''],
        cantidadEtiquetas: [this.cantidadSeleccionadas, ''],
        titular: [''],
        marca: [''],
        modelo: [''],
        marcaMotor: [''],
        numeroMotor: [''],
        marcaChasis: [''],
        numeroChasis: [''],
        localidad: [''],
        provincia: [''],
        estado: [''],
        eliminado: [''],
        observacionPago: [''],
        pagado: [false],
        numeroSiniestro: ['', Validators.required],
        creadoPor: [''],
        creadoFecha: ['']
      });

      if (this.idVehiculo) {
        this.isEditMode = true;
        this.title = "Editar Vehículo";
        let vehiculo: Vehiculo;

        this.vehiculoService.getDataById('vehiculo.php', this.idVehiculo).toPromise()
          .then((result) => {
            vehiculo = result as Vehiculo;
            vehiculo.pagado = !!+vehiculo.pagado;
            // vehiculo.fechaInicio = moment(vehiculo.fechaInicio, "DD/MM/YYYY").format();
            // vehiculo.fechaFin = (vehiculo.fechaFin  == "11/11/1111") ? "" : moment(vehiculo.fechaFin, "DD/MM/YYYY").format();
            this.vehiculoForm.setValue(vehiculo);
            this.cantidadSeleccionadas = this.vehiculoForm.controls['cantidadEtiquetas'].value;
          });
      }
    }
    else {
      this.router.navigate([""]);
    }
  }

  onSubmit(event): void {
    document.getElementById(event.target.id).hidden = true;

    let vehiculoParte: VehiculoParte = new VehiculoParte();

    //salvando usuario y fecha creacion
    var fechaActual = new Date().toLocaleDateString('es-AR');
    this.vehiculoForm.controls["creadoPor"].setValue(this.loginService.getUserLogued());
    this.vehiculoForm.controls["creadoFecha"].setValue(fechaActual);

    if (this.vehiculoForm.controls["estado"].value == Estado.vehiculoIngresado) {
      this.vehiculoForm.controls["fechaInicio"].setValue(fechaActual);
    }

    if (this.vehiculoForm.controls["estado"].value == Estado.stickersRetirados) {
      this.vehiculoForm.controls["fechaFin"].setValue(fechaActual);
    }

    this.vehiculoService.create('vehiculo.php', this.vehiculoForm.value).toPromise()
      .then(vehiculo => {
        vehiculoParte.idVehiculo = +vehiculo["idVehiculo"];

        for (let i = 0; i < this.partes.length; i++) {
          if (this.partes[i].checked) {
            vehiculoParte.idParte = +this.partes[i].idParte;
            vehiculoParte.numeroEtiqueta = this.partes[i].numeroEtiqueta;

            this.vehiculoService.create('vehiculo-parte.php', vehiculoParte).toPromise()
              .then(result => {
                console.log(result);
              })
          }
        }

        if (this.isEditMode) {
          this.vehiculoService.delete('vehiculo.php', (this.vehiculoForm.value as Vehiculo).idVehiculo).toPromise()
            .then(() => {
              this.router.navigate(['vehiculos']);
            });
        }
        else {
          this.router.navigate(['vehiculos']);
        }
      });
  }

  onChecklistChange(value: boolean, item: Parte): void {
    item.checked = value;
    (value)
      ? this.cantidadSeleccionadas++
      : this.cantidadSeleccionadas--;

    this.vehiculoForm.controls['cantidadEtiquetas'].setValue(this.cantidadSeleccionadas);
  }

  public getPartes() {
    this.vehiculoService.getData('parte.php', new Params()).toPromise()
      .then(result => {
        this.partes = result as Parte[];
        this.partes.forEach((parte) => {
          parte.numeroEtiqueta = '';
        });

        if (this.idVehiculo) {
          //aca la magia de la carga
          this.vehiculoService.getDataById('vehiculo-parte.php', this.idVehiculo).toPromise()
            .then(result => {
              this.vehiculoPartes = result as VehiculoParte[];

              this.vehiculoPartes.forEach(vehiculoParte => {
                const parte = this.partes.find(x => x.idParte == vehiculoParte.idParte);
                if (parte) {
                  parte.checked = true;
                  parte.numeroEtiqueta = vehiculoParte.numeroEtiqueta;
                }
              });
              this.partesCargadas = true;
            });
        }
        else {
          this.partesCargadas = true;
        }
      });
  }

  cargarImagen(): void {
    this.router.navigateByUrl('/api/foto/');

  }

  ocultar(event) {
    document.getElementById(event.target.id).hidden = true;
  }

  chasisCambiado(event: any): void {
    let _this = this;

    if (event.target.value) {
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(function () {
        
        _this.spinner.show();

        _this.vehiculoService.getDataByDominio('vehiculo.php', event.target.value)
          .toPromise()
          .then((vehiculo: Vehiculo) => {
            if (!vehiculo) {
              document.getElementById(event.target.id).classList.remove("repetido");
              document.getElementById(event.target.id).classList.add("valido");
              (<HTMLInputElement> document.getElementById("submitButton")).disabled = false;
            } else {
              document.getElementById(event.target.id).classList.remove("valido");
              document.getElementById(event.target.id).classList.add("repetido");
              (<HTMLInputElement> document.getElementById("submitButton")).disabled = true;
            }
            
            _this.spinner.hide();
          });
      }, 1500);
    } else{
      document.getElementById(event.target.id).classList.remove("valido");
      document.getElementById(event.target.id).classList.remove("repetido");
    }
  }
}
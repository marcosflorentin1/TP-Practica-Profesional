import { Component, OnInit } from '@angular/core';
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

  constructor(
    private formBuilder: FormBuilder,
    private vehiculoService: VehiculoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private cookieService: CookieService,
    private imageService: ImageService
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
        cantidadEtiquetas: [''],
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
          });
      }
    }
    else {
      this.router.navigate([""]);
    }
  }

  onSubmit(): void {
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

    //imagen stuff
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.imageService.post(formData)
      .subscribe(res => {
        console.log(res);
        this.uploadedFilePath = res.data.filePath;
        alert('SUCCESS !!');
      })
  }

  onChecklistChange(value: boolean, item: Parte): void {
    item.checked = value;
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


  //IMAGENNN
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  cargarImagen04Dorso(): void {

  }
}
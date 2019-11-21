import { Component, OnInit, ViewChild } from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
import { VehiculoService } from '../services/vehiculo.service';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, MatPaginator } from '@angular/material';
import { Params } from '../models/params';
import { Parte } from '../models/parte';
import { VehiculoParte } from '../models/vehiculo-parte';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class VehiculosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isLogued: boolean = true;
  pageSize: number = 3;
  isLoading: boolean = false;
  partes: Parte[] = [];
  vehiculoPartes: VehiculoParte[] = [];
  textoLoadingPartes: string = '';
  vehiculoActual: Vehiculo = new Vehiculo;
  expandedElement: Vehiculo;

  public columnsToDisplay = [
    'marca',
    'modelo',
    'dominio',
    'numeroSiniestro',
    'formulario04d',
    'certificadoBaja',
    'fechaInicio',
    'estado',
    'creadoPor'
  ];

  vehiculosDataSource = new MatTableDataSource<Vehiculo>();
  params: Params = new Params();

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.isLogued = this.loginService.isLogued;
    
    if (this.isLogued) {
      this.resetFilters();
      this.getVehiculos();
      this.loadPartes();
    }
    else {
      this.router.navigate(['']);
    }
  }

  public getVehiculos() {
    let vehiculos: Vehiculo[];
    this.isLoading = true;
    this.vehiculosDataSource.data = [];
    this.vehiculoService.getData('vehiculo.php', this.params).toPromise()
      .then(result => {
        vehiculos = result as Vehiculo[];
        this.vehiculosDataSource.data = vehiculos;
        this.params.ultimoIdVehiculo = (vehiculos.length) ? vehiculos[vehiculos.length - 1].idVehiculo.toString() : '1';
        this.isLoading = false;
      })
  }

  public loadPartes(): void {
    this.vehiculoService.getData('parte.php', new Params()).toPromise()
      .then(result => {
        this.partes = result as Parte[];
      })
  }

  public getVehiculoPartes(idVehiculo: number): void {
    this.vehiculoPartes = [];
    this.textoLoadingPartes = "Cargando...";
    this.vehiculoService.getDataById('vehiculo-parte.php', idVehiculo).toPromise()
      .then(result => {
        this.vehiculoPartes = result as VehiculoParte[];

        if (!this.vehiculoPartes.length) {
          this.textoLoadingPartes = "Sin partes para mostrar";
        }
      });
  }

  getParteNombre(idParte: number): string {
    return this.partes.find(p => p.idParte == idParte).descripcion;
  }

  setVehiculoActual(vehiculo: Vehiculo){
    this.vehiculoActual = vehiculo;
  }

  public irSiguiente(): void {
    this.params.operador = 's';
    this.getVehiculos();
  }

  public irAnterior(): void {
    this.params.operador = 'a';
    this.getVehiculos();
  }

  public ultimoAnterior(): boolean {
    return (this.vehiculosDataSource.data.length) ? this.vehiculosDataSource.data[0].idVehiculo == 1 : false;
  }

  public ultimoSiguiente(): boolean {
    return this.vehiculosDataSource.data.length != this.pageSize;
  }

  public buscarDominio(value: string): void {
    this.resetFilters();
    this.params.dominio = value;
    this.getVehiculos();
  }

  public buscarTramite(value: string): void {
    this.resetFilters();
    this.params.tramite = value;
    this.getVehiculos();
  }

  public buscarSiniestro(value: string): void {
    this.resetFilters();
    this.params.siniestro = value;
    this.getVehiculos();
  }

  public buscarChasis(value: string): void {
    this.resetFilters();
    this.params.chasis = value;
    this.getVehiculos();
  }

  public buscarEtiqueta(value: string): void {
    this.resetFilters();
    this.params.etiqueta = value;
    this.getVehiculos();
  }

  public eliminarVehiculo(idVehiculo: number): void {
    this.vehiculoService.delete('vehiculo.php', idVehiculo).toPromise()
      .then(result => {
        this.vehiculosDataSource.data = this.vehiculosDataSource.data.filter(item => item.idVehiculo != idVehiculo);
      });
  }

  private resetFilters() {
    this.params.ultimoIdVehiculo = '1';
    this.params.operador = 's';
    this.params.dominio = '';
    this.params.tramite = '';
    this.params.siniestro = '';
    this.params.chasis = '';
    this.params.etiqueta = '';
  }

  editarVehiculo(idVehiculo: number): void {
    this.router.navigate(['/edit', idVehiculo]);
  }
}
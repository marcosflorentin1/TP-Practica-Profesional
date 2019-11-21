import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculoBuildComponent } from './vehiculo-build/vehiculo-build.component';
import { PartesComponent } from './partes/partes.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  { path: 'vehiculos', component: VehiculosComponent },
  { path: 'build', component: VehiculoBuildComponent },
  { path: 'edit/:idVehiculo', component: VehiculoBuildComponent },
  { path: 'partes', component: PartesComponent },
  { path: 'partes-build', component: PartesComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
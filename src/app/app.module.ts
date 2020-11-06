import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculoBuildComponent } from './vehiculo-build/vehiculo-build.component';
import { PartesComponent } from './partes/partes.component';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './navigation/header/header.component';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdePopoverModule } from '@material-extended/mde';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioComponent } from './usuario/usuario.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from './common/dialog/dialog.component';
import {  MatDialogModule } from '@angular/material';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    VehiculosComponent,
    VehiculoBuildComponent,
    PartesComponent,
    HeaderComponent,
    LoginComponent,
    UsuarioComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MdePopoverModule,
    NgbModule,
    MatDialogModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

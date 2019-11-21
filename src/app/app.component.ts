import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'IngresoVehiculo';

  ngOnInit(): void {
    
  }
  
  constructor(private router: Router){}

    Vehiculos(){
      this.router.navigate([""]);
    };
    
    Build(){
      this.router.navigate(["build"]);
    };
}
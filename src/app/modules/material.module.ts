import {MatSidenavModule, MatToolbarModule, MatIconModule, MatTableModule, MatTableDataSource, MatProgressSpinnerModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatFormFieldControl, MatInputModule, MatCardModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material'
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatDatepickerModule
  ]
})
export class MaterialModule { }
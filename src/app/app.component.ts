import { Component } from '@angular/core';

//import { CommonModule } from '@angular/common';
//import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Timestamp} from 'rxjs';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // {headerName:'Change',field:'change',sortable:true,filter:true },
  // {headerName:'% Change',field:'pChange',sortable:true,filter:true },
  // {headerName:'Lat Updated',field:'lastUpdateTime',sortable:true,filter:true },
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  rowData$!: Observable<any[]>;
  
  colDefs:ColDef[]= [
    {headerName:'Symbol',field:'symbol',sortable:true,filter:true},
    {headerName:'Opening Value',field:'open',sortable:true,filter:true },
    // {headerName:'Last Price',field:'lastPrice',sortable:true,filter:true },
    // {headerName:'Previous Close',field:'previousClose',sortable:true,filter:true },
    // {headerName:'Change',field:'change',sortable:true,filter:true },
    // {headerName:'% Change',field:'pChange',sortable:true,filter:true },
    // {headerName:'Lat Updated',field:'lastUpdateTime',sortable:true,filter:true },

   
 ];

 defaultColDef:ColDef={
  sortable:true,filter:true
 }

 constructor(private http:HttpClient){}
 ngOnInit()
 {
  this.rowData$ = this.http.get<any[]>('http://localhost:8080/prices/all');
  console.log(this.rowData$);
 }
}

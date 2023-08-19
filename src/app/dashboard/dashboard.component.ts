import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Timestamp} from 'rxjs';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgGridModule } from 'ag-grid-angular';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent{

  rowData: any;
  

constructor(private http:HttpClient){
}
colDefs:ColDef[]= [
  { headerName: 'Sr No', valueGetter: 'node.rowIndex + 1' ,width:80},
  {
    headerName:'Symbol',
    field:'symbol',
    filter:true,unSortIcon:true
      },
  {headerName:'Opening Value',field:'open',sortable:true,filter:true,unSortIcon:true },
  {headerName:'Last Price',field:'lastPrice',sortable:true,filter:true,unSortIcon:true },
  {headerName:'Previous Close',field:'previousClose',sortable:true,filter:true,unSortIcon:true  },
  {headerName:'Change',field:'change',sortable:true,filter:true,unSortIcon:true  },
  {headerName:'% Change',field:'pChange',sortable:true,filter:true,unSortIcon:true  },
  {headerName:'Lat Updated',field:'lastUpdateTime',sortable:true,filter:true,unSortIcon:true },
];
 
 ngOnInit() {
  this.http.get('http://localhost:8080/prices/all')
  .subscribe((data:any) => {
  const stockP=data.stockPrices;
  
   console.log(stockP);
   this.rowData=stockP;
 });

}


}

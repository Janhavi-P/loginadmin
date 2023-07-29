import { Component, NgModule, OnInit } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import {UserServiceService} from '../user-service.service';
//import { DateAdapter } from '@angular/material/core';
//import { NgModule } from '@angular/core';
import { Timestamp} from 'rxjs';

export class stockPrices{
  constructor( public size: number,
    public stockPrices: StocksInfo[]){}
 

}
export class StocksInfo{
  constructor(
    public symbol :string,
    public identifier:string,
    public open:string,
     public change:number,
     public dayHigh:number,
    public dayLow:number,
    public  lastPrice:number,
    public previousClose:number,
     public lastUpdateTime:string,
     public pChange:number
     ){}
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  
  arrayStock!: StocksInfo[];
//arrayStock: []=[];
 title= "main";
  //array:any= [{symbol: 'NIFTY MIDCAP 50', identifier: 'NIFTY MIDCAP 50', open: 10644.8, dayHigh: 10694.75, dayLow: 10623}]
 
  constructor(private httpClient :HttpClient ){

  }
  ngOnInit():void {
    
  this.getData1();

  }
  getData1(): void {
    this.httpClient.get<stockPrices>('http://localhost:8080/prices/all').subscribe(
      (data: stockPrices) => {
        this.arrayStock = data.stockPrices;
        console.log('Data received from backend:', this.arrayStock);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}

// export interface StocksInfo {
//   // Your data model interface to match the MyData class in Java
// }



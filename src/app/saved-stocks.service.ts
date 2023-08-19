import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavedStocksService {
  private savedStocks: any[] = [];

  addSavedStock(stock: any) {
    console.log('Stock with NSE and BSE:', stock);
    this.savedStocks.push(stock);
  }

  getSavedStocks() {
    return this.savedStocks;
  }
}
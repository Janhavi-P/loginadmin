import { Component } from '@angular/core';
import { SavedStocksService } from '../saved-stocks.service';

@Component({
  selector: 'app-saved-stocks',
  templateUrl: './saved-stocks.component.html',
  styleUrls: ['./saved-stocks.component.scss']
})
export class SavedStocksComponent {
  savedStocks: any[] = [];

  constructor(private savedStocksService: SavedStocksService) {
    this.savedStocks = this.savedStocksService.getSavedStocks();
    console.log('Saved Stocks:', this.savedStocks); // Check the logged data

  }
}
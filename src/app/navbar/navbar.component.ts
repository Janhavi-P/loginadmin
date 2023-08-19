import { Component } from '@angular/core';
import { SavedStocksService } from '../saved-stocks.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  savedStocksCount: number = 0;

  constructor(private savedStocksService: SavedStocksService) {
    this.savedStocksCount = this.savedStocksService.getSavedStocks().length;
  }
}

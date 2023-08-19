import { Component } from '@angular/core';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent {
  colDefs = [
    // Existing column definitions...
    { headerName: 'Save', cellRenderer: 'saveButtonRenderer', width: 100 }
  ];

}

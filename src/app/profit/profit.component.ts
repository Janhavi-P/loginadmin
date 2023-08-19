import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NSEApiResponse,BSEApiResponse } from '../api-response';
import { SaveButtonRendererComponent } from '../save-button-renderer/save-button-renderer.component';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { SavedStocksService } from '../saved-stocks.service';



@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.scss']
})
export class ProfitComponent {
  rowData: any;
  isLoading: boolean = true;
  selectedTopRows: number = 5;
  topArbitrageRecords: any[] = [];
  savedRows: any[] = []; 
  constructor(private http:HttpClient,private savedStocksService: SavedStocksService){
    
  }

  colDefs:ColDef[]= [
    { headerName: 'Sr No', valueGetter: 'node.rowIndex + 1',width: 80 },
    {
      headerName:'Symbol',
      field:'symbol',
      width: 160,
      filter: true,
      unSortIcon: true,
      sortable: true,

        },
    { headerName: 'NSE Value', field: 'nseValue', sortable: true, filter: true,width:150,unSortIcon: true,},
    { headerName: 'BSE Value', field: 'bseValue', sortable: true, filter: true,width:150,unSortIcon: true,},
   
    { headerName: 'Profitability (%)', field: 'profitability', sortable: true, filter: true, unSortIcon: true,width:180 },
    {
      headerName: 'Arbitrage Value',
      field: 'roundedArbitrage', // Assuming 'arbitrage' is the field name in your data
      sortable: true,
      filter: true,
      width:200,
      unSortIcon: true,
    },
    {
      headerName: 'Buy From',
      field: 'buyFrom',
      sortable: true,
      filter: true,
      valueGetter: this.getBuyFromValue,
      width: 120
    },
    {
      headerName: 'Sell To',
      field: 'sellTo',
      sortable: true,
      filter: true,
      valueGetter: this.getSellToValue,
      width: 120
    },
    {headerName:'Lat Updated',field:'lastUpdateTime',sortable:true,filter:true,unSortIcon:true },
    {
      headerName: 'Save',
      width: 120,
      cellRenderer: ButtonRendererComponent,
      cellRendererParams: {
        onSaveClick: this.onSaveClick.bind(this),
      },
    }
  ];
  getBuyFromValue(params: any): string {
    if (params.data.nseValue > params.data.bseValue) {
      return 'BSE';
    } else {
      return 'NSE';
    }
  }
  
  getSellToValue(params: any): string {
    if (params.data.nseValue > params.data.bseValue) {
      return 'NSE';
    } else {
      return 'BSE';
    }
  }
  ngOnInit() {
    this.fetchTopRows();
  }
  onSaveClick(data: any): void {
    const nseValue = this.getStockValue(data.symbol, 'nseValue');
    console.log(nseValue);
    const bseValue = this.getStockValue(data.symbol, 'bseValue');
    const stockWithValues = { ...data, nseValue, bseValue };
    this.savedStocksService.addSavedStock(stockWithValues);
  }
  
  private getStockValue(symbol: string, valueField: string): number {
    const stock = this.topArbitrageRecords.find((s: any) => s.symbol === symbol);
    return stock ? stock[valueField] : 0;
  }
  
   updateTopRows() {
    this.fetchTopRows();
  }

  fetchTopRows() {
    this.http.get('http://localhost:8080/prices/all').subscribe((data: any) => {
      const stockP = data.stockPrices;
  
      // Calculate profitability for each stock and round to 2 decimal points
      stockP.forEach((stock: { profitability: number; lastPrice: number; open: number; }) => {
        const rawProfitability = ((stock.lastPrice - stock.open) / stock.open) * 100;
        stock.profitability = parseFloat(rawProfitability.toFixed(2)); // Round to 2 decimal points
      });
  
      // Sort the data by profitability in descending order
      stockP.sort((a: { profitability: number; }, b: { profitability: number; }) => b.profitability - a.profitability);
  
      // Take the user-selected top rows
      this.rowData = stockP.slice(0, this.selectedTopRows);
  
      this.calculateAndFilterArbitrage();
  
      console.log(this.rowData);
    });
  }
    // By using the toFixed(2) method, the profitability values will be rounded to two decimal points.
    
  
  async calculateAndFilterArbitrage() {
   
    const symbols = this.rowData.map((stock: { symbol: any; }) => stock.symbol);
    console.log('Symbols:', symbols);
    const nseValues = await this.fetchNSEValues(symbols);
    const bseValues = await this.fetchBSEValues(symbols);
    this.topArbitrageRecords = this.rowData.map((stock: any) => {
      const nseValue = nseValues[stock.symbol];
      const bseValue = bseValues[stock.symbol];
  
      const arbitrage = nseValue - bseValue;
      const recommendation = arbitrage > 0 ? 'Buy' : 'Sell';
      const sellTo = nseValue > bseValue ? 'NSE' : 'BSE';
      const buyFrom = nseValue > bseValue ? 'BSE' : 'NSE';
      const roundedArbitrage = parseFloat(arbitrage.toFixed(2));
      return {
        ...stock,
        nseValue,
        bseValue,
        roundedArbitrage,
        recommendation,
        buyFrom,
        sellTo,
      };
    }).sort((a: any, b: any) => b.arbitrage - a.arbitrage).slice(0, 10);
  }
  //   this.topArbitrageRecords = this.rowData.map((stock: { symbol: string | number; }) => {
  //     const nseValue = nseValues[stock.symbol];
  //     const bseValue = bseValues[stock.symbol];
  
  //     const arbitrage = nseValue - bseValue;
  //     const recommendation = arbitrage > 0 ? 'Buy' : 'Sell';
  
  //     return { ...stock, nseValue, bseValue, arbitrage, recommendation };
  //   }).sort((a: { arbitrage: number; }, b: { arbitrage: number; }) => b.arbitrage - a.arbitrage).slice(0, 10);
  // }
 
  async fetchNSEValues(symbols: string[]): Promise<{ [symbol: string]: number }> {
    this.isLoading = true;
    const nseValues: { [symbol: string]: number } = {};
    

    for (const symbol of symbols) {
      console.log("inside for");
        try {
        const response = await this.http.get<NSEApiResponse>(`http://localhost:8080/current/NSE/${symbol}`).toPromise();
        console.log('NSE Response for', symbol, ':', response); // Log the response
        if (response && response.hasOwnProperty('currentPrice')) {
          nseValues[symbol] = response.currentPrice;
          console.log(nseValues[symbol]);
        } else {
          console.error(`Invalid NSE response for ${symbol}:`, response);
          nseValues[symbol] = 0; // Set a default value
        }
      } catch (error) {
        console.error(`Failed to fetch NSE value for ${symbol}`, error);
        nseValues[symbol] = 0;
      }
       // Introduce a delay of, for example, 1000 milliseconds (1 second) between API calls
       await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
  this.isLoading = false;
      console.log('NSE Values:', nseValues);
    return nseValues;
  }
   
  async fetchBSEValues(symbols: string[]): Promise<{ [symbol: string]: number }> {
    this.isLoading = true;
    const bseValues: { [symbol: string]: number } = {};
    console.log('Starting BSE value fetching...');
    
    for (const symbol of symbols) {
      try {
        const response = await this.http.get<BSEApiResponse>(`http://localhost:8080/current/BSE/${symbol}`).toPromise();
        console.log('BSE Response for', symbol, ':', response); // Log the response
        
        if (response && response.hasOwnProperty('currentPrice')) {
          bseValues[symbol] = response.currentPrice;
          console.log(bseValues[symbol]);
        } else {
          console.error(`Invalid BSE response for ${symbol}:`, response);
          bseValues[symbol] = 0; // Set a default value
        }
      } catch (error) {
        console.error(`Failed to fetch BSE value for ${symbol}`, error);
        bseValues[symbol] = 0;
      }
      
      // Introduce a delay of, for example, 1000 milliseconds (1 second) between API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('BSE Values:', bseValues);
    this.isLoading = false;
    return bseValues;
  }

}

//------------------------------------------------------------
    // console.log('Starting NSE value fetching...',symbols[0]);
    // const responseObservable = this.http.get<NSEApiResponse>(`http://localhost:8080/current/NSE/${symbols[0]}`);
    // responseObservable.subscribe((response) => {
    //   console.log('NSE Response:', response);
    //   if (response && response.hasOwnProperty('currentPrice')) {
    //     console.log('Current Price:', response.currentPrice);
    //   } else {
    //     console.error('Invalid NSE response:', response);
    //   }
    // }, (error) => {
    //   console.error('Failed to fetch NSE value:', error);
    // });
    //     //------------------------------------------------------------
    //     console.log('Starting NSE value fetching...',symbols[1]);
    //     const responseObservable2 = this.http.get<NSEApiResponse>(`http://localhost:8080/current/NSE/${symbols[1]}`);
    //     responseObservable2.subscribe((response) => {
    //       console.log('NSE Response:', response);
    //       if (response && response.hasOwnProperty('currentPrice')) {
    //         console.log('Current Price:', response.currentPrice);
    //       } else {
    //         console.error('Invalid NSE response:', response);
    //       }
    //     }, (error) => {
    //       console.error('Failed to fetch NSE value:', error);
    //     });
                //------------------------------------------------------------
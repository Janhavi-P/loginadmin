import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'app-button-renderer',
  templateUrl: './button-renderer.component.html',
  styleUrls: ['./button-renderer.component.scss']
})
export class ButtonRendererComponent implements ICellRendererAngularComp { 
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }
  refresh(params: any): boolean {
    // Implement your logic here if needed
    return false; // Return false to prevent AG Grid from re-rendering
  }
  onSaveClick(): void {
    if (this.params.onSaveClick) {
      this.params.onSaveClick(this.params.data);
    }
  }
}
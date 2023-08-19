import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-save-button-renderer',
  template: `
  <button type="button" (click)="onClick($event)">{{label}}</button> `,
  templateUrl: './save-button-renderer.component.html',
  styleUrls: ['./save-button-renderer.component.scss']
})
export class SaveButtonRendererComponent implements ICellRendererAngularComp {
  public params: any;
  constructor() {}

  agInit(params: any): void {
    this.params = params;
  }

  onSaveClick(): void {
    if (this.params.onSaveClick) {
      this.params.onSaveClick(this.params.data); // Pass the row data to onSaveClick function
    }
  }

  refresh(params: any): boolean {
    return false;
  }
}
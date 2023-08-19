import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { LogComponent } from './log/log.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from './user-service.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule } from '@angular/material/toolbar';
import { AgGridModule } from 'ag-grid-angular';
import {MatTableModule} from '@angular/material/table';
import { HomeComponent } from './home/home.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { ProfitComponent } from './profit/profit.component';
import { FormsModule } from '@angular/forms';
import { StockListComponent } from './stock-list/stock-list.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SaveButtonRendererComponent } from './save-button-renderer/save-button-renderer.component';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';
import { SavedStocksComponent } from './saved-stocks/saved-stocks.component';
import { LogOutComponent } from './log-out/log-out.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    Navbar2Component,
    ProfitComponent,
    StockListComponent,
    SaveButtonRendererComponent,
    ButtonRendererComponent,
    SavedStocksComponent,
    LogOutComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    CommonModule,
    MatToolbarModule,
    AgGridModule,
    MatTableModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogComponent } from './log/log.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { HomeComponent } from './home/home.component';
import { ProfitComponent } from './profit/profit.component';
import { SavedStocksComponent } from './saved-stocks/saved-stocks.component';
import { LogOutComponent } from './log-out/log-out.component';
// import { HomeComponent } from './home/home.component';


const routes: Routes = [
 
  {
    path: '',
    component: AppComponent,
   
    children: [  
      {
        path: '',
        component: LoginComponent,
      },
      {path: 'log', component: LogComponent}
     
    ],
  },{path: 'dashboard', component: DashboardComponent},
    {path: 'recommendations', component: RecommendationsComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profit', component:ProfitComponent},
    {path: 'saved_stocks', component:SavedStocksComponent},
    {path: 'logout', component:LogOutComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
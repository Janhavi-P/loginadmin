import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogComponent } from './log/log.component';
import { DashboardComponent } from './dashboard/dashboard.component';








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
  },{path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
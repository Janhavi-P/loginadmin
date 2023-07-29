import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor ( private http: HttpClient){}
  httpOptions={headers:new HttpHeaders({'Content-Type':'application/json'})}
 getData(){
  //app.use(cors({credentials: true, origin: 'http://localhost:5000'}));
  //let url="http://localhost:8080/prices/all";
 
  return this.http.get("http://localhost:8080/prices/all");
 }
}

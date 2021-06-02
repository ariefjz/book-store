import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl: any = 'http://api.sunhouse.co.id/bookstore/index.php/';
  httpOptions: any;

  constructor(
    public http: HttpClient
  ) { }


  getToken() {
    var appToken = localStorage.getItem('authToken');
    if(appToken != null) {
      var tkn = JSON.parse(appToken);
      
      this.httpOptions={
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tkn.token
        })
      }
    }
  }

  get(url: String) {
    this.getToken();
    return this.http.get(this.serverUrl+url, this.httpOptions);
  }

  post(url: String, data: any) {
    this.getToken();
    return this.http.post(this.serverUrl+url, data, this.httpOptions);
  }

  put(url: String, data: any) {
    this.getToken();
    return this.http.put(this.serverUrl+url, data, this.httpOptions);
  }

  delete(url: String) {
    this.getToken();
    return this.http.delete(this.serverUrl+url, this.httpOptions);
  }

  upload(file: any) {
    return this.http.post(this.serverUrl+'upload/book',file);
  }

  auth(type: String, email: String, password: String) {
    var link = "";
    if(type == "login") {
      link = "auth/login";
    } else {
      link = "auth/register";
    }

    return this.http.post(this.serverUrl + link , {
      email:email,
      password:password,
    });
    
  }
}
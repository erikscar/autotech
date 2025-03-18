import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = "http://localhost:5153/api/user/profile"

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    const headers = new HttpHeaders({Authorization: `Bearer ${ token }`})

    return this.http.get(this.apiUrl,{ headers })
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = "http://localhost:5153/api/user"

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    const headers = new HttpHeaders({Authorization: `Bearer ${ token }`})

    return this.http.get(this.apiUrl + "/profile",{ headers })
  }

  getUserByEmail(email: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post(`${this.apiUrl}/email`, `"${email}"`, { headers });
  }

  updateUser(data: any) {
    return this.http.put(this.apiUrl, data)
  }
  
} 
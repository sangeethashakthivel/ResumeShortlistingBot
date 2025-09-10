import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  // BOT FAQ
  getBotFAQs(): Observable<any> { return this.http.get(`${this.apiUrl}/botfaq`); }
  createBotFAQ(faq: any): Observable<any> { return this.http.post(`${this.apiUrl}/botfaq`, faq); }
  updateBotFAQ(id: number, faq: any): Observable<any> { return this.http.put(`${this.apiUrl}/botfaq/${id}`, faq); }
  deleteBotFAQ(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/botfaq/${id}`); }

  // Job Roles
  getJobRoles(): Observable<any> { return this.http.get(`${this.apiUrl}/jobroles`); }
  createJobRole(role: any): Observable<any> { return this.http.post(`${this.apiUrl}/jobroles`, role); }
  updateJobRole(id: number, role: any): Observable<any> { return this.http.put(`${this.apiUrl}/jobroles/${id}`, role); }
  deleteJobRole(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/jobroles/${id}`); }

  // Skills
  getSkills(): Observable<any> { return this.http.get(`${this.apiUrl}/skills`); }
  createSkill(skill: any): Observable<any> { return this.http.post(`${this.apiUrl}/skills`, skill); }
  updateSkill(id: number, skill: any): Observable<any> { return this.http.put(`${this.apiUrl}/skills/${id}`, skill); }
  deleteSkill(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/skills/${id}`); }
}

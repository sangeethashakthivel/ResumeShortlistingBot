import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {   // <-- Make sure the class name is `ResumeService`
  private apiUrl = 'http://localhost:8080/api/resumes';

  constructor(private http: HttpClient) {}

  uploadResume(file: File, jobDescription: string, jobTitle: string, candidateName: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('candidateName', candidateName);
    formData.append('jobDescription', jobDescription);
    formData.append('jobTitle', jobTitle);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getScore(candidateName: string) {
    return this.http.get(`${this.apiUrl}/score/${candidateName}`, { responseType: 'text' });
  }
}

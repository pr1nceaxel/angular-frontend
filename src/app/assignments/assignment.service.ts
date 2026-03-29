import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Assignment, AssignmentPage } from '../core/models/assignment.model';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/assignments`;

  list(page = 1, limit = 15): Observable<AssignmentPage> {
    const params = new HttpParams().set('page', String(page)).set('limit', String(limit));
    return this.http.get<AssignmentPage>(this.base, { params });
  }

  getById(id: string): Observable<Assignment> {
    return this.http.get<Assignment>(`${this.base}/${id}`);
  }

  create(body: Partial<Assignment>): Observable<Assignment> {
    return this.http.post<Assignment>(this.base, body);
  }

  update(id: string, body: Partial<Assignment>): Observable<Assignment> {
    return this.http.put<Assignment>(`${this.base}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

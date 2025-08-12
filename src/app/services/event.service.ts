import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventBooking {
  name: string;
  date?: Date;
  timeInput?: string;
  time: string;
  event_type: string;
  mobile_number: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private BASE_URL = 'https://abhishekregister.astromonk.co.in/events/api/events/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No access token found. Please log in.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getEvents(): Observable<EventBooking[]> {
    return this.http.get<EventBooking[]>(this.BASE_URL, { headers: this.getAuthHeaders() });
  }

  createEvent(event: EventBooking): Observable<any> {
    return this.http.post(this.BASE_URL, event, { headers: this.getAuthHeaders() });
  }

  updateEvent(id: number, event: EventBooking): Observable<EventBooking> {
    return this.http.put<EventBooking>(`${this.BASE_URL}${id}/`, event, { headers: this.getAuthHeaders() });
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}${id}/`, { headers: this.getAuthHeaders() });
  }

  getEventTypes(): string[] {
    return [
      'वास्तुशांती',
      'गृहप्रवेश',
      'सत्यनारायण पूजा',
      'गणपती पूजा',
      'लग्न मुहूर्त',
      'नामकरण'
    ];
  }
}

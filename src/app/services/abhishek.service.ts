import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbhishekService {
  private apiUrl = 'https://abhishekregister.astromonk.co.in/userregistration/user-registration/create_user/';
  // private apiUrl =
  //   'http://192.168.0.186:8001/api/user-registration/create_user/';

  constructor(private http: HttpClient) {}

  addUser(data: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      data
    );
  }

  getAllData(): Observable<any[]> {
    // Use the correct GET endpoint for listing users
    return this.http.get<any[]>(
      'https://abhishekregister.astromonk.co.in/userregistration/user-registration/list_users/'
    );
  }

  getDataById(id: string): Observable<any> {
    console.log('Fetching data by ID:', id);
    // GET request for a specific record
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateData(id: string, data: any): Observable<any> {
    // Use the correct UPDATE endpoint for your API
    return this.http.put<any>(
      `http://192.168.0.186:8001/api/user-registration/update_user/${id}/`,
      data
    );
  }

  deleteData(id: string): Observable<any> {
    // Use the correct DELETE endpoint for your API
    return this.http.delete<any>(
      `http://192.168.0.186:8001/api/user-registration/delete_user/${id}/`
    );
  }
}

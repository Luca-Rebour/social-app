import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConnectProfilesModel, ConnectProfilesResponse } from '../models/connect-profiles.model';
import { environment } from './../environment/environment';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GetProfilesService {

  constructor(private http: HttpClient, private local: LocalStorageService) { }

  private apiUrl: string = environment.api_url;

  getRandomProfiles(): Observable<ConnectProfilesModel[]> {
    const userId = this.local.getItem('IdUsuarioActivo') || '';
    console.log('Fetching Profiles for userId:', userId);
  
    return this.http
      .post<ConnectProfilesResponse>(`${this.apiUrl}/getProfiles.php`, { userId: userId })
      .pipe(
        map(response => {
          console.log('Profiles Response: ', response);
          return response.profiles.map(profile => new ConnectProfilesModel(profile));
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error.message}`
      );
    }
    return throwError(error.status);
  }

}

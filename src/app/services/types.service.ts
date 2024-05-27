import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TypesDetails } from '../interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  private http = inject(HttpClient);

  constructor() { }

  getTypesDetais(url: string): Observable<TypesDetails> {
    return this.http.get<TypesDetails>(url);
  }
}

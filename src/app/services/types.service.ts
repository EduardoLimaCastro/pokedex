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

  //----Faz o fetch de detalhes de um tipo de Pokémon
  getTypesDetais(url: string): Observable<TypesDetails> {
    return this.http.get<TypesDetails>(url);
  }
}

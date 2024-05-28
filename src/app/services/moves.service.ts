import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MoveDetails } from '../interfaces/moves';

@Injectable({
  providedIn: 'root'
})
export class MovesService {

  private http = inject(HttpClient);

  constructor() { }

  //----Faz o fetch de todos os moves de um Pokemon específico
  getMovesDetais(url: string): Observable<MoveDetails> {
    return this.http.get<MoveDetails>(url);
  }

}

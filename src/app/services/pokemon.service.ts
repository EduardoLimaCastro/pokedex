import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);

  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor() { }

  getPokemons(page = 1) {
    return this.http.get(`${this.apiUrl}pokemon/?offset=20&limit=20`);
  }

  getPokemonDetails() {

  }

}

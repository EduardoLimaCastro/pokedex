import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PokemonDetails } from '../interfaces/pokemonDetails';
import { Observable, delay, map } from 'rxjs';
import { PokemonResult } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);

  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor() { }

  getPokemons(offset: number, limit: number): Observable<PokemonResult> {
    return this.http.get<PokemonResult>(`${this.apiUrl}pokemon/?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(pokemonName: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.apiUrl}/pokemon/${pokemonName}`);
  }

}

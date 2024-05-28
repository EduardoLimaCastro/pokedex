import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PokemonDetails } from '../interfaces/pokemonDetails';
import { Observable, delay, map } from 'rxjs';
import { PokemonResult } from '../interfaces/pokemon';
import { PokemonSpecies } from '../interfaces/pokemonSpecies';
import { PokemonEvolution } from '../interfaces/pokemonEvolution';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);

  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor() { }

  //----Faz o fetch de 20 pokemons com offset e limit para paginação
  getPokemons(offset: number, limit: number): Observable<PokemonResult> {
    return this.http.get<PokemonResult>(`${this.apiUrl}pokemon/?offset=${offset}&limit=${limit}`);
  }

  //----Faz o fetch de detalhes de um Pokemon específico
  getPokemonDetails(pokemonName: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.apiUrl}pokemon/${pokemonName}`);
  }

  //----Faz o fetch de detalhes de uma espécie de Pokémon
  getPokemonSpecies(pokemonName: string): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${this.apiUrl}pokemon-species/${pokemonName}`);
  }

  //----Faz o fetch da linha de evolução de um pokemon
  getPokemonEvolutionChain(pokemonChain: string): Observable<PokemonEvolution> {
    return this.http.get<PokemonEvolution>(pokemonChain)
  }

}

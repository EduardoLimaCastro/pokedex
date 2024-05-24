import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetails } from '../../interfaces/pokemonDetails';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  standalone: true,
  imports: []
})
export class PokemonCardComponent {
  public pokemonService = inject(PokemonService);
  public pokemonsDetails: PokemonDetails[] = []
  public pokemonsArrayTest: PokemonDetails[] = []
  private _pokemonData: any = [];

  @Input() set pokemonData(value: any) {
    this._pokemonData = value
    this.onPokemonDataChange(value);
  }

  get pokemonData(): any {
    return this._pokemonData;
  }

  constructor() { }

  onPokemonDataChange(pokemon: []) {
    console.log(pokemon)
    this.pokemonsArrayTest = pokemon
  }



}
import { Component, Input, inject } from '@angular/core';
import { IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetails } from '../../interfaces/pokemonDetails';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  standalone: true,
  imports: [IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent]
})
export class PokemonCardComponent {
  public pokemonService = inject(PokemonService);
  public pokemonsDetails: PokemonDetails[] = []
  public pokemonsArrayTest: PokemonDetails[] = []
  public pokemonImageBaseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
  private _pokemon: any = [];
  private _pokemonEvolutions: any = [];

  @Input() set pokemon(value: any) {
    this._pokemon = value
    this.onPokemonChange(value);
  }

  @Input() set pokemonEvolutions(value: any) {
    this._pokemonEvolutions = value;
    this.onPokemonEvolutionsChange(value);
  }

  get pokemon(): any {
    return this._pokemon;
  }

  get pokemonEvolutions(): any {
    return this._pokemonEvolutions;
  }

  constructor() { }

  onPokemonChange(pokemon: []) {
    // console.log(pokemon)
    this.pokemonsArrayTest = pokemon
  }

  onPokemonEvolutionsChange(pokemon: []) {
    // console.log(pokemon)
  }

}
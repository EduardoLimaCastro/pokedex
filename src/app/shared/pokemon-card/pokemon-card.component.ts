import { Component, Input, inject } from '@angular/core';
import { IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonItem, IonBadge } from '@ionic/angular/standalone';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetails } from '../../interfaces/pokemonDetails';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  standalone: true,
  imports: [IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, RouterModule, IonItem, IonBadge]
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
  }

  onPokemonEvolutionsChange(pokemon: []) {
  }

  //--------Definição da cor da Badge de acordo com o grupo do Pokémon
  getBadgeColor(type: string): string {
    switch (type) {
      case 'normal':
        return 'normal';
      case 'fighting':
        return 'fighting';
      case 'flying':
        return 'flying';
      case 'poison':
        return 'poison';
      case 'ground':
        return 'ground';
      case 'rock':
        return 'rock';
      case 'bug':
        return 'bug';
      case 'ghost':
        return 'ghost';
      case 'steel':
        return 'steel';
      case 'fire':
        return 'fire';
      case 'water':
        return 'water';
      case 'grass':
        return 'grass';
      case 'electric':
        return 'electric';
      case 'psychic':
        return 'psychic';
      case 'ice':
        return 'ice';
      case 'dragon':
        return 'dragon';
      case 'dark':
        return 'dark';
      case 'fairy':
        return 'fairy';
      case 'stellar':
        return 'stellar';
      case 'unknown':
        return 'unknown';
      case 'baby':
        return 'baby';
      default:
        return 'primary';
    }
  }

}
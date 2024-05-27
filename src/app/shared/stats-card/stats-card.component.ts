import { Component, Input, inject } from '@angular/core';
import { IonCard, IonProgressBar, IonRow, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; // Import this
import { warning, musicalNotes } from 'ionicons/icons';

import { PokemonService } from '../../services/pokemon.service';
import { PokemonSpecies } from '../../interfaces/pokemonSpecies';
import { RemoveFormFeedPipe } from '../pipes/remove-form-feed.pipe'
import { PokemonEvolution } from '../../interfaces/pokemonEvolution';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonDetails } from 'src/app/interfaces/pokemonDetails';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
  standalone: true,
  imports: [IonCard, IonProgressBar, IonRow, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonIcon, PokemonCardComponent, RemoveFormFeedPipe]
})
export class StatsCardComponent {
  public progress = 0.5;
  public pokemonService = inject(PokemonService);
  public pokemonSpecies: PokemonSpecies = {} as PokemonSpecies;
  public pokemonEvolution: PokemonEvolution = {} as PokemonEvolution;
  public speciesNames: string[] = [];
  public pokemonData: PokemonDetails = {} as PokemonDetails

  private _pokemonName: any = {};

  @Input()
  set pokemonName(value: any) {
    this._pokemonName = value;
    this.onPokemonNameChange(value);
  }
  get pokemonName(): any {
    return this._pokemonName;
  }

  onPokemonNameChange(newName: any): void {
    // console.log(newName)
    this.pokemonData = newName
    this.getPokemonSpecies(newName);
    // console.log(this.pokemonData.types[0].type.name)
    // this.getPokemonData(newName);
  }


  constructor() { addIcons({ warning, musicalNotes }) }

  getPokemonSpecies(pokemonName: any): void {
    // console.log('Getting species for:', pokemonName);
    if (pokemonName) {
      this.pokemonService.getPokemonSpecies(pokemonName.name).subscribe(
        (pokemon) => {
          // console.log('Pokemon species:', pokemon);
          this.pokemonSpecies = pokemon;
        })
    }
  }

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
      default:
        return 'primary';
    }
  }

}

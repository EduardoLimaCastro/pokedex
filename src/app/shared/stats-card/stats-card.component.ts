import { Component, Input, inject } from '@angular/core';
import { IonCard, IonProgressBar, IonRow, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; // Import this
import { warning, musicalNotes } from 'ionicons/icons';

import { PokemonService } from '../../services/pokemon.service';
import { PokemonSpecies } from '../../interfaces/pokemonSpecies';
import { switchMap } from 'rxjs/operators';
import { RemoveFormFeedPipe } from '../pipes/remove-form-feed.pipe'
import { PokemonEvolution } from '../../interfaces/pokemonEvolution';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

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
    this.getPokemonSpecies(newName);
  }


  constructor() { addIcons({ warning, musicalNotes }) }

  getPokemonSpecies(pokemonName: any): void {
    // console.log('Getting species for:', pokemonName);
    this.pokemonService.getPokemonSpecies(pokemonName.name).subscribe(
      (pokemon) => {
        // console.log('Pokemon species:', pokemon);
        this.pokemonSpecies = pokemon;
      })
  }
}

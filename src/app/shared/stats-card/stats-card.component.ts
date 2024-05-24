import { Component, Input, inject } from '@angular/core';
import { IonCard, IonProgressBar, IonRow, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; // Import this
import { warning, musicalNotes } from 'ionicons/icons';

import { PokemonService } from '../../services/pokemon.service';
import { PokemonSpecies } from '../../interfaces/pokemonSpecies';
import { switchMap } from 'rxjs/operators';
import { PokemonEvolution } from '../../interfaces/pokemonEvolution';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
  standalone: true,
  imports: [IonCard, IonProgressBar, IonRow, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonIcon, PokemonCardComponent]
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
    this.getPokemonSpecies(newName);
  }


  constructor() { addIcons({ warning, musicalNotes }) }

  getPokemonSpecies(pokemonName: any): void {
    // console.log('Getting species for:', pokemonName);
    this.pokemonService.getPokemonSpecies(pokemonName.name).pipe(
      switchMap(pokemon => {
        // console.log('Pokemon species:', pokemon);
        this.pokemonSpecies = pokemon;
        return this.pokemonService.getPokemonEvolutionChain(pokemon.evolution_chain.url);
      })
    ).subscribe({
      next: (pokemonChain) => {
        // console.log(pokemonChain);
        this.pokemonEvolution = pokemonChain
        this.speciesNames = this.getAllSpeciesNames(this.pokemonEvolution.chain);
        // console.log(this.speciesNames)
      },
      error: (err) => {
        console.error('Error loading Pokémon evolution chain:', err);
      }
    });
  }

  getAllSpeciesNames(chain: any,) {
    let names: string[] = [];

    if (chain && chain.species && chain.species.name) {
      names.push(chain.species.name);
    }
    if (chain && chain.evolves_to !== null) {
      for (let i = 0; i < chain.evolves_to.length; i++) {
        const subNames = this.getAllSpeciesNames(chain.evolves_to[i]);
        names = names.concat(subNames);
      }
    }
    return names;
  }

}

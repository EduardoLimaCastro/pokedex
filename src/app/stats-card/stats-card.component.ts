import { Component, Input, inject } from '@angular/core';
import { IonCard, IonProgressBar, IonRow } from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';
import { PokemonSpecies } from '../interfaces/pokemonSpecies';
import { PokemonDetails } from '../interfaces/pokemonDetails';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
  standalone: true,
  imports: [IonCard, IonProgressBar, IonRow]
})
export class StatsCardComponent {
  public progress = 0.5;
  public pokemonService = inject(PokemonService);
  public pokemonSpecies: PokemonSpecies = {} as PokemonSpecies;

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
    console.log('Pokemon name changed:', newName);
    this.getPokemonSpecies(newName);
  }


  constructor() { console.log(this.pokemonName) }

  getPokemonSpecies(pokemonName: any): void {
    console.log('Getting species for:', pokemonName);
    this.pokemonService.getPokemonSpecies(pokemonName.name).subscribe({
      next: (pokemon) => {
        console.log('Pokemon species:', pokemon);
        this.pokemonSpecies = pokemon;
      },
      error: (err) => {
        console.error('Error loading Pokémon details:', err);
      }
    });
  }

}

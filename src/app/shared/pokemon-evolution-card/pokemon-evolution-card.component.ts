import { Component, Input, inject } from '@angular/core';
import { PokemonDetails } from 'src/app/interfaces/pokemonDetails';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonItem } from '@ionic/angular/standalone';
import { PokemonEvolutions } from 'src/app/interfaces/pokemonEvolutions';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';


@Component({
  selector: 'app-pokemon-evolution-card',
  templateUrl: './pokemon-evolution-card.component.html',
  styleUrls: ['./pokemon-evolution-card.component.scss'],
  standalone: true,
  imports: [IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, PokemonCardComponent, IonItem],
})
export class PokemonEvolutionCardComponent {
  public pokemonService = inject(PokemonService);
  public pokemonsDetails: PokemonDetails[] = []
  private _pokemonData: any = [];

  @Input() set pokemonData(value: PokemonEvolutions[]) {
    this._pokemonData = value
    this.onPokemonDataChange(value);
  }

  get pokemonData(): any {
    return this._pokemonData;
  }

  constructor() { }

  onPokemonDataChange(pokemon: PokemonEvolutions[]) {
    // console.log(pokemon);
    this.getPokemonDetails(pokemon)
  }

  getPokemonDetails(pokemonsArray: PokemonEvolutions[]) {
    if (pokemonsArray) {
      pokemonsArray.forEach((name) => {
        this.pokemonService.getPokemonDetails(name.name).subscribe({
          next: (pokemon) => {
            this.pokemonsDetails.push(pokemon);
            // console.log(pokemon)
          },
          error: (err) => {
            console.error('Error loading Pokémon details:', err);
          }
        });
      });
    }
  }

}

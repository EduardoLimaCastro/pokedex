import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonList, IonLabel, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails } from 'src/app/interfaces/pokemonDetails';
import { CardPokemonsComponent } from '../../shared/card-pokemons/card-pokemons.component'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonList, IonLabel, IonItem, IonCardContent, CardPokemonsComponent, IonCardTitle, IonCardHeader, IonCard]
})
export class FavoritesPage {
  public favoritePokemons: string[] = [];
  public pokemonService = inject(PokemonService);
  public error = null;
  public isLoading = false;
  public pokemonData: PokemonDetails[] = []

  constructor() {
    const storedClickedPokemons = localStorage.getItem('favorites');
    if (storedClickedPokemons) {
      this.favoritePokemons = JSON.parse(storedClickedPokemons);
      console.log(this.favoritePokemons)
      this.loadPokemonData(this.favoritePokemons)
    }
  }

  loadPokemonData(names: string[]) {
    names.forEach((name) => {
      this.pokemonService.getPokemonDetails(name).subscribe({
        next: (pokemon) => {
          this.pokemonData.push(pokemon);
          console.log(this.pokemonData)
        },
        error: (err) => {
          console.error('Error loading Pokémon details:', err);
        }
      });
    });
  }
}

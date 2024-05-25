import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons]
})
export class FavoritesPage {
  public favoritePokemons: string[] = [];
  public pokemonService = inject(PokemonService);

  constructor() {
    const storedClickedPokemons = localStorage.getItem('favorites');
    if (storedClickedPokemons) {
      this.favoritePokemons = JSON.parse(storedClickedPokemons);
      console.log(this.favoritePokemons)
    }

  }

  getPokemonDetails(pokemonName: string) {

  }

}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonList, IonLabel, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButton, IonIcon } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails } from 'src/app/interfaces/pokemonDetails';
import { CardPokemonsComponent } from '../../shared/card-pokemons/card-pokemons.component'
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonList, IonLabel, IonItem, IonCardContent, CardPokemonsComponent, IonCardTitle, IonCardHeader, IonCard, IonButton, IonIcon]
})
export class FavoritesPage {
  public favoritePokemons: string[] = [];
  public pokemonService = inject(PokemonService);
  public error = null;
  public isLoading = false;
  public pokemonData: PokemonDetails[] = []
  public router = inject(Router);
  public navCtrl = inject(NavController)


  constructor() {
    const storedClickedPokemons = localStorage.getItem('favorites');
    console.log(storedClickedPokemons)
    if (storedClickedPokemons) {
      this.favoritePokemons = JSON.parse(storedClickedPokemons);
      console.log(this.favoritePokemons)
      this.loadPokemonData(this.favoritePokemons)
    }
  }
  //-------Carregar informações dos Pokemons listados
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
  //-------Handler do botão de retornar a página principal
  backPage() {
    this.router.navigate([''])
      .then(() => {
        window.location.reload()
      })
  }

}

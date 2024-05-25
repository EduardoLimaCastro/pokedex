import { Component, Input, OnInit, inject } from '@angular/core';
import { IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonItem, IonBadge, IonIcon, IonButton } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';

@Component({
  selector: 'app-card-pokemons',
  templateUrl: './card-pokemons.component.html',
  styleUrls: ['./card-pokemons.component.scss'],
  standalone: true,
  imports: [IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonItem, RouterModule, IonBadge, IonIcon, IonButton],
})
export class CardPokemonsComponent {

  public pokemonImageBaseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
  public pokemonService = inject(PokemonService);
  private _pokemonData: any = []
  public isClicked: boolean = false;
  public clickedPokemons: string[] = []

  @Input() set pokemonData(value: any) {
    this._pokemonData = value
    this.onPokemonChange(this.pokemonData.name);
  }

  get pokemonData(): any {
    return this._pokemonData;
  }

  constructor() {
    addIcons({ star });
    const storedClickedPokemons = localStorage.getItem('favorites');
    if (storedClickedPokemons) {
      this.clickedPokemons = JSON.parse(storedClickedPokemons);
    }
  }

  onPokemonChange(value: any) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const isFavorite = favorites.includes(value)
    if (isFavorite) {
      this.isClicked = true
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

  handleIconClick(event: Event) {
    event.stopPropagation();
    const index = this.clickedPokemons.indexOf(this.pokemonData.name);
    if (index !== -1) {
      this.clickedPokemons.splice(index, 1);
    } else {
      this.clickedPokemons.push(this.pokemonData.name);
    }
    this.saveClickedPokemons();
    this.isClicked = !this.isClicked
  }

  saveClickedPokemons() {
    // Save clicked pokemons list to local storage
    localStorage.setItem('favorites', JSON.stringify(this.clickedPokemons));
  }

}

import { Component, Input, NgZone, inject } from '@angular/core';
import { IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonItem, IonBadge, IonIcon, IonButton } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';
import { ChangeDetectorRef } from '@angular/core';
import { PokemonDetails } from 'src/app/interfaces/pokemonDetails';

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
  private _pokemonData: PokemonDetails = {} as PokemonDetails
  public isClicked: boolean = false;
  public clickedPokemons: string[] = []
  public cdr = inject(ChangeDetectorRef);

  @Input() set pokemonData(value: any) {
    this._pokemonData = value
    this.onPokemonChange(this.pokemonData.name);
  }

  get pokemonData(): any {
    return this._pokemonData;
  }

  constructor(private ngZone: NgZone) {
    addIcons({ star });
    this.isClicked = false
  }

  ionViewWillEnter() {
    this.updateIsClicked();
    this.ngZone.run(() => {
      this.updateIsClicked();
    });
  }

  updateIsClicked() {
    const favoritePokemon: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const pokemonName = this.pokemonData.name; // Replace 'Pikachu' with the actual Pokémon name you want to track
    this.isClicked = favoritePokemon.includes(pokemonName);
    // console.log(this.isClicked)
  }

  onPokemonChange(value: any) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    // console.log(favorites)
    const isFavorite = favorites.includes(value)
    if (isFavorite) {
      this.isClicked = true
    }
    this.updateIsClicked();
    // console.log(favorites)
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
    this.saveClickedPokemons(this.pokemonData.name);
    this.isClicked = !this.isClicked
  }

  saveClickedPokemons(name: string) {
    // console.log(name)
    let favoritesStorage = localStorage.getItem('favorites')
    let favorites: string[] = []
    if (favoritesStorage) {
      favorites = JSON.parse(favoritesStorage)
    }
    // console.log(favorites)
    if (favorites?.includes(name)) {
      // console.log('include');
      const index = favorites.indexOf(name);
      // console.log(index)
      favorites.splice(index, 1);
      // console.log(favorites)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    } else {
      favorites.push(name);
      // console.log(favorites)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
    // if (favorites?.includes(name[0])) {
    //   console.log('first')
    // } else {
    //   console.log('new')
    //   favorites.push(name)
    // }
  }
}
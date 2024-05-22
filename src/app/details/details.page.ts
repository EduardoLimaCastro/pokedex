import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonThumbnail, IonItem, IonBadge, IonButton, IonRow } from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';
import { PokemonDetails } from '../interfaces/pokemonDetails';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardHeader, IonCardTitle, IonThumbnail, IonItem, IonBadge, IonButton, IonRow]
})
export class DetailsPage {
  private pokemonService = inject(PokemonService);
  public pokemonData: PokemonDetails | null = null
  public pokemonImageBaseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'
  public shiny = false;



  @Input()
  set id(pokemonId: string) {
    this.pokemonService.getPokemonDetails(pokemonId).subscribe((pokemon) => {
      console.log(pokemon)
      this.pokemonData = pokemon
      console.log(pokemon.height)
    })
  }

  constructor() { }

  handleShiny() {
    this.shiny = !this.shiny
    console.log(this.shiny)
  }
}

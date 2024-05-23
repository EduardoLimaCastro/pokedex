import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonThumbnail, IonItem, IonBadge, IonButton, IonRow, IonIcon, IonCard } from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';
import { PokemonDetails } from '../interfaces/pokemonDetails';
import { Howl } from 'howler'
import { StatsCardComponent } from '../stats-card/stats-card.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardHeader, IonCardTitle, IonThumbnail, IonItem, IonBadge, IonButton, IonRow, IonIcon, IonCard, StatsCardComponent]
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
      this.pokemonData = pokemon;
    })
  }

  public player: Howl | null = null;

  constructor() { }


  handlePlay() {
    this.player = new Howl({
      src: this.pokemonData?.cries.latest as string
    });
    this.player.play();
  }

  handleShiny() {
    this.shiny = !this.shiny
    console.log(this.shiny)
  }
}

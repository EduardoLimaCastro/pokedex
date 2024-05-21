import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';
import { PokemonDetails } from '../interfaces/pokemonDetails';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailsPage {
  private pokemonService = inject(PokemonService);
  public pokemonData: PokemonDetails = { height: 0 } as PokemonDetails

  @Input()
  set id(pokemonId: string) {
    this.pokemonService.getPokemonDetails(pokemonId).subscribe((pokemon) => {
      console.log(pokemon)
      this.pokemonData = pokemon
    })
  }

  constructor() { }


}

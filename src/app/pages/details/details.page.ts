import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonThumbnail, IonItem, IonBadge, IonButton, IonRow, IonIcon, IonCard, IonBackButton, IonButtons, IonAccordion, IonAccordionGroup, IonLabel } from '@ionic/angular/standalone';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetails } from '../../interfaces/pokemonDetails';
import { Howl } from 'howler'
import { StatsCardComponent } from '../../shared/stats-card/stats-card.component';
import { addIcons } from 'ionicons';
import { musicalNotes, star, trendingUp } from 'ionicons/icons';
import { PokemonSpecies } from 'src/app/interfaces/pokemonSpecies';
import { PokemonEvolutionCardComponent } from 'src/app/shared/pokemon-evolution-card/pokemon-evolution-card.component';
import { MovesListsComponent } from 'src/app/shared/moves-list/moves-lists.component';
import { Router } from '@angular/router';
import { GroupDetaisComponent } from 'src/app/shared/group-detais/group-detais.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardHeader, IonCardTitle, IonThumbnail, IonItem, IonBadge, IonButton, IonRow, IonIcon, IonCard, StatsCardComponent, IonBackButton, IonButtons, PokemonEvolutionCardComponent, IonAccordion, IonAccordionGroup, IonLabel, MovesListsComponent, GroupDetaisComponent]
})
export class DetailsPage {
  private pokemonService = inject(PokemonService);
  public pokemonData: PokemonDetails | null = null;
  public pokemonSpecies: PokemonSpecies | null = null;
  public pokemonEvolution: any;
  public pokemonImageBaseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
  public shiny = false;
  public isClicked: boolean = false;
  public clickedPokemons: string[] = []
  public router = inject(Router);

  //-------Configuração do player de áudio Howler 
  public player: Howl | null = null;

  @Input()
  set id(pokemonId: string) {
    if (pokemonId) {
      this.pokemonService.getPokemonDetails(pokemonId).subscribe((pokemon) => {
        this.pokemonData = pokemon;
      })
      this.pokemonService.getPokemonSpecies(pokemonId).subscribe((pokemon) => {
        this.pokemonSpecies = pokemon;
        this.pokemonService.getPokemonEvolutionChain(pokemon.evolution_chain.url).subscribe((poke) => {
          this.pokemonEvolution = this.getAllSpeciesNames(poke.chain)
        })
      })
      this.checkIfFavorite(pokemonId);
    }
  }

  constructor() {
    addIcons({ musicalNotes, star });
    const storedClickedPokemons = localStorage.getItem('favorites');
    if (storedClickedPokemons) {
      this.clickedPokemons = JSON.parse(storedClickedPokemons);
    }
  }


  //-------Handler do player de áudio Howler 
  handlePlay() {
    this.player = new Howl({
      src: this.pokemonData?.cries.latest as string
    });
    this.player.play();
  }

  //-------Handler do botão shiny  
  handleShiny() {
    this.shiny = !this.shiny
  }

  //-------Handler do botão de favoritos
  toggleClick(pokemon: any) {
    const index = this.clickedPokemons.indexOf(pokemon);
    if (index !== -1) {
      this.clickedPokemons.splice(index, 1);
    } else {
      this.clickedPokemons.push(pokemon);
    }
    this.saveClickedPokemons();
    this.isClicked = this.handleFavoritePokemon(pokemon);
  }

  saveClickedPokemons() {
    // Salva a lista de Pokémons clicados no LocalStorage
    localStorage.setItem('favorites', JSON.stringify(this.clickedPokemons));
  }

  //-------Criação de um objeto com os detalhes de evoluções
  getAllSpeciesNames(chain: any,) {
    const evolutionArray = [];
    let currentChain = chain;

    while (currentChain) {
      const evolutionObject = {
        name: currentChain.species.name,
        evolutiondetails: {
          evolution_details: currentChain.evolution_details,
          evolves_to: currentChain.evolves_to.map((subChain: { species: { name: any; }; evolution_details: any; evolves_to: any[]; is_baby: any; }) => ({
            name: subChain.species.name,
            evolutiondetails: {
              evolution_details: subChain.evolution_details,
              evolves_to: subChain.evolves_to.map(subSubChain => ({
                name: subSubChain.species.name,
                evolutiondetails: {
                  evolution_details: subSubChain.evolution_details,
                  evolves_to: []
                }
              })),
              is_baby: subChain.is_baby
            }
          })),
          is_baby: currentChain.is_baby
        }
      };

      evolutionArray.push(evolutionObject);

      currentChain = currentChain.evolves_to.length > 0 ? currentChain.evolves_to[0] : null;
    }

    return evolutionArray;
  }

  //-------Handler dos Pokemons Favoritos
  handleFavoritePokemon(pokemon: string): boolean {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(pokemon)) {
      return true
    }
    return false;
  }

  //-------Handler dos Pokemons Favoritos
  checkIfFavorite(pokemonName: string) {
    console.log(pokemonName)
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const isFavorite = favorites.includes(pokemonName)
    if (isFavorite) {
      this.isClicked = true
    }
  }
  //-------Handler do botão de retornar a página principal
  backPage() {
    this.router.navigate(['/home'])
      .then(() => {
        window.location.reload()
      })
  }

}

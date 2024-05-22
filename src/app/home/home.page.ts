import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, InfiniteScrollCustomEvent, IonAvatar, IonItem, IonSkeletonText, IonList, IonAlert, IonLabel, IonButton, IonBadge, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonThumbnail } from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';
import { catchError, finalize } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonDetails } from '../interfaces/pokemonDetails';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonItem, IonSkeletonText, IonList, IonAlert, IonLabel, IonButton, RouterModule, IonBadge, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonThumbnail],
})
export class HomePage {

  public _currentPage = 1;
  public error = null;
  public isLoading = false;
  public names: string[] = []
  public pokemons: Pokemon[] = [];
  public dummyArray = new Array(5);
  public pokemonData: PokemonDetails[] = []
  public pokemonImageBaseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/'
  public next = ''
  public previous = ''
  public pokemonService = inject(PokemonService)
  public offset = 0;

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(value: number) {
    this._currentPage = value;
    this.resetData();
    this.loadPokemons();
  }

  constructor() {
    this.loadPokemons()
  }

  loadPokemons(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    if (!event) {
      this.isLoading = true;
    }

    this.pokemonService.getPokemons(this.currentPage * 20 - 20, 20 * this.currentPage).pipe(
      finalize(() => {
        this.isLoading = false;
        if (event) {
          event.target.complete();
        }
      }),
      catchError((err: any) => {
        console.log(err);

        this.error = err.error.status_message;
        return []
      }),
    ).subscribe({
      next: (res) => {
        console.log(res.results)
        if (res.previous) {
          this.previous = res.previous;
        }
        if (res.next) {
          this.next = res.next;
        }

        res.results.forEach((item) => {
          this.names.push(item.name);
        });
        this.pokemons.push(...res.results);
        if (event) {
          event.target.disabled = res.count <= this.currentPage * 20;
        }
        this.loadPokemonData(this.names)
      }
    })
  }

  loadPokemonData(names: string[]) {
    console.log(names)
    names.forEach((name) => {
      this.pokemonService.getPokemonDetails(name).subscribe({
        next: (pokemon) => {
          this.pokemonData.push(pokemon);
        },
        error: (err) => {
          console.error('Error loading Pokémon details:', err);
        }
      });
    });
  }

  resetData() {
    this.names = [];
    this.pokemons = [];
    this.pokemonData = [];
  }

  paginaAnterior() {
    if (this.currentPage >= 2) {
      this.currentPage--;
    }
    console.log(this.currentPage)
  }

  proximaPagina() {
    this.currentPage++;
    console.log(this.currentPage)
  }

}

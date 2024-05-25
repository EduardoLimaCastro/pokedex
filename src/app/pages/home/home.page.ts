import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, InfiniteScrollCustomEvent, IonAvatar, IonItem, IonSkeletonText, IonList, IonAlert, IonLabel, IonButton, IonBadge, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonThumbnail, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { PokemonService } from '../../services/pokemon.service';
import { catchError, finalize } from 'rxjs';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonDetails } from '../../interfaces/pokemonDetails';
import { RouterModule } from '@angular/router';
import { CardPokemonsComponent } from '../../shared/card-pokemons/card-pokemons.component'
import { addIcons } from 'ionicons';
import { listOutline, list } from 'ionicons/icons';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonItem, IonSkeletonText, IonList, IonAlert, IonLabel, IonButton, RouterModule, IonBadge, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonThumbnail, IonIcon, CardPokemonsComponent, IonButtons],
})
export class HomePage {

  public _currentPage = 1;
  public error = null;
  public isLoading = false;
  public names: string[] = []
  public pokemons: Pokemon[] = [];
  public dummyArray = new Array(5);
  public pokemonData: PokemonDetails[] = []
  public pokemonService = inject(PokemonService)
  public offset = 0;
  public router = inject(Router);
  public navCtrl = inject(NavController)

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
    addIcons({ listOutline, list })
    this.checkFacorites()
  }

  checkFacorites() {
    const favorites = localStorage.getItem('favorites');
    console.log(favorites)
  }

  loadPokemons(event?: InfiniteScrollCustomEvent) {
    console.log('first')
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
        // console.log(res.results)
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
    // console.log(this.currentPage)
  }

  proximaPagina() {
    this.currentPage++;
    // console.log(this.currentPage)
  }

  favoritesPage() {
    this.router.navigate(['/favorites'])
  }
}
import { Component, Input, OnInit, inject } from '@angular/core';
import { IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonItem } from '@ionic/angular/standalone';
import { MoveDetails } from 'src/app/interfaces/moves';
import { MovesService } from 'src/app/services/moves.service';
import { MovesCardsComponent } from '../moves-cards/moves-cards.component';

@Component({
  selector: 'app-moves-lists',
  templateUrl: './moves-lists.component.html',
  styleUrls: ['./moves-lists.component.scss'],
  standalone: true,
  imports: [IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonItem, MovesCardsComponent]
})
export class MovesListsComponent {

  private _pokemonData: any = [];
  private moveService = inject(MovesService);
  private moveDetails: MoveDetails[] = []
  public moves: any;
  public error = null;

  @Input() set pokemonData(value: any) {
    this._pokemonData = value
    // console.log(value.moves[0].move.url)
    this.onMoveChange(value.moves)
  }
  get pokemonData(): any {
    return this._pokemonData;
  }
  constructor() { }

  onMoveChange(value: any) {
    // console.log(value)
    this.moves = this.getMovesDetails(value)
    // console.log(this.moves)
  }

  getMovesDetails(moves: any[]) {
    return moves.map(move => ({
      name: move.move.name,
      level_learned_at: move.version_group_details[0].level_learned_at
    }));

  }
}






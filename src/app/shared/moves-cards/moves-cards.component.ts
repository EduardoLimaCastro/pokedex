import { Component, Input, OnInit } from '@angular/core';
import { IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonItem, IonBadge } from '@ionic/angular/standalone';
@Component({
  selector: 'app-moves-cards',
  templateUrl: './moves-cards.component.html',
  styleUrls: ['./moves-cards.component.scss'],
  standalone: true,
  imports: [IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonItem, IonBadge]
})
export class MovesCardsComponent {

  private _move: any = [];
  private moves: any

  @Input() set move(value: any) {
    this._move = value
    this.onMoveChange(value);
  }

  get move(): any {
    return this._move;
  }

  constructor() { }

  onMoveChange(move: string) {
    // console.log(move)
    this.moves = move
    // console.log(this.moves)
  }

}

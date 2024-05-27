import { Component, Input, OnInit, inject } from '@angular/core';
import { IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonItem } from '@ionic/angular/standalone';
import { TypesDetails } from 'src/app/interfaces/types';
import { TypesService } from 'src/app/services/types.service';
import { GroupCardComponent } from '../group-card/group-card.component';

@Component({
  selector: 'app-group-detais',
  templateUrl: './group-detais.component.html',
  styleUrls: ['./group-detais.component.scss'],
  standalone: true,
  imports: [IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonItem, GroupCardComponent]
})
export class GroupDetaisComponent {
  private _groupData: any = []
  private typesPokemon: any
  private typesService = inject(TypesService)
  public typeData: TypesDetails[] = []

  @Input() set groupData(value: any) {
    this._groupData = value
    // console.log(value.moves[0].move.url)
    this.onGroupChange(value)
  }
  get groupData(): any {
    return this._groupData;
  }

  constructor() { }

  onGroupChange(groups: any) {
    // console.log(groups)
    this.typesPokemon = this.typesGroupsChange(groups)
    console.log(this.typesPokemon)
    this.typesPokemon.forEach((type: any) => {
      this.typesService.getTypesDetais(type.url).subscribe({
        next: (res) => {
          console.log(res)
          this.typeData.push(res);
        },
        error: (err) => {
          console.error('Error loading Pokémon details:', err);
        }
      });
    });
  }

  typesGroupsChange(groups: any[]) {
    console.log(groups)
    return groups.map(group => ({
      name: group.type.name,
      url: group.type.url
    }));
  }
}


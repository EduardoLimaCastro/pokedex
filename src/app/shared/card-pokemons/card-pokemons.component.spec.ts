import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardPokemonsComponent } from './card-pokemons.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CardPokemonsComponent', () => {
  let component: CardPokemonsComponent;
  let fixture: ComponentFixture<CardPokemonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) } // Mock ActivatedRoute with an empty params object
        }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CardPokemonsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

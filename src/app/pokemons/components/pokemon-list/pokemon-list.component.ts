import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonCardComponent } from '@/pokemons/components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'pokemon-list',
  imports: [
    PokemonCardComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
}

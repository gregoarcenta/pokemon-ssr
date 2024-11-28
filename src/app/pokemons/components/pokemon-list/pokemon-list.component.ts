import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardComponent } from '@/pokemons/components/pokemon-card/pokemon-card.component';
import { SimplePokemon } from '@/pokemons/interfaces';

@Component({
  selector: 'pokemon-list',
  imports: [
    PokemonCardComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  public pokemons = input.required<SimplePokemon[]>();
}

import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PokemonListComponent } from '@/pokemons/components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'pokemons',
  imports: [
    PokemonListComponent,

  ],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  public hasPokemons = signal(false);
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Pokémons Page');
    this.meta.updateTag({ name: 'Description', content: 'Este es mi Pokémons page' });
    this.meta.updateTag({ name: 'og:title', content: 'Pokémons Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Pokémons,Page,angular' });
  }
}

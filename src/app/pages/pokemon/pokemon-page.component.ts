import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '@/pokemons/interfaces';
import { PokemonsService } from '@/pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon',
  imports: [
    NgOptimizedImage,

  ],
  templateUrl: './pokemon-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private readonly pokemonService = inject(PokemonsService);
  private readonly route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.pokemonService.loadPokemon(id).pipe(
      tap(({ name, id }) => {
        const pageTitle = `#${id} - ${name}`;
        const pageDescription = `Página del Pokémon ${name}`;
        this.title.setTitle(pageTitle);

        this.meta.updateTag({
          name: 'description',
          content: pageDescription,
        });
        this.meta.updateTag({ name: 'og:title', content: pageTitle });
        this.meta.updateTag({
          name: 'og:description',
          content: pageDescription,
        });
        this.meta.updateTag({
          name: 'og:image',
          content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        });
      }),
    )
      .subscribe(this.pokemon.set);

  }
}

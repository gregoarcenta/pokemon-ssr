import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PokemonsService } from '@/pokemons/services/pokemons.service';
import { SimplePokemon } from '@/pokemons/interfaces';
import {
  PokemonListSkeletonComponent,
} from '@/pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { PokemonListComponent } from '@/pokemons/components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'pokemons',
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent,
  ],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokemonsService = inject(PokemonsService);

  public pokemons = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map(params => params.get('page') ?? 1),
      map(page => isNaN(+page) ? 1 : +page),
      map(page => Math.max(1, page)),
    ),
  );

  ngOnInit(): void {
    this.meta.updateTag({ name: 'Description', content: 'Este es mi Pokémons page' });
    this.meta.updateTag({ name: 'og:title', content: 'Pokémons Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Pokémons,Page,angular' });

    this.loadPokemons();
  }

  loadPokemons(page = 0): void {

    const pageToLoad = this.currentPage()! + page;

    this.pokemonsService.loadPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(`Pokémons SSR - Page ${pageToLoad}`)),
      )
      .subscribe(pokemons => {
        this.pokemons.set(pokemons);
      });
  }
}

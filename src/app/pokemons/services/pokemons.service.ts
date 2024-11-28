import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PokeAPIResponse, Pokemon, SimplePokemon } from '@/pokemons/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {

  private http = inject(HttpClient);
  private url: string = 'https://pokeapi.co/api/v2';

  public loadPage(page: number): Observable<SimplePokemon[]> {

    if (page !== 0) --page;

    page = Math.max(0, page);

    const offset = page * 20;

    return this.http.get<PokeAPIResponse>(`${this.url}/pokemon?limit=20&offset=${offset}`).pipe(
      // delay(2000),
      map(response => (response.results.map(pokemon => ({
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name,
        }),
      ))),
    );
  };

  public loadPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}/pokemon/${id}`);
  }
}

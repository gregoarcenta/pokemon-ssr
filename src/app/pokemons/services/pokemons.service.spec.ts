import { TestBed } from '@angular/core/testing';

import { PokemonsService } from './pokemons.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PokeAPIResponse, SimplePokemon } from '@/pokemons/interfaces';
import { catchError } from 'rxjs';

const mockPokeApiResponse: PokeAPIResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: '',
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  },
];

const mockPokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PokemonsService);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpTesting.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('should load page 5 of SimplePokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpTesting.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=80',
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('should load a pokemon by ID', () => {
    service.loadPokemon('1').subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });

  it('should catch error if pokemon not found', () => {
    const pokemonName = 'pokemon-no-existo';
    service
      .loadPokemon(pokemonName)
      .pipe(
        catchError((err) => {
          expect(err.message).toEqual('Pokemon not found');
          return [];
        }),
      )
      .subscribe();

    const req = httpTesting.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
    );
    expect(req.request.method).toBe('GET');

    req.flush('Pokemon not found', { status: 404, statusText: 'Not Found' });
  });
});

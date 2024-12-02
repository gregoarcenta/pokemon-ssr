import { routes } from '@/app.routes';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';

describe('app routes', () => {
  let router: Router;
  let location: Location;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "about" redirects  to "/about"', async () => {
    await router.navigate(['about']);
    expect(location.path()).toBe('/about');
  });

  it('should navigate to "contact" redirects  to "/contact"', async () => {
    await router.navigate(['contact']);
    expect(location.path()).toBe('/contact');
  });

  it('should navigate to "pricing" redirects  to "/pricing"', async () => {
    await router.navigate(['pricing']);
    expect(location.path()).toBe('/pricing');
  });

  it('should navigate to "pokemons" redirects  to "/pokemons"', async () => {
    await router.navigate(['pokemons']);
    expect(location.path()).toBe('/pokemons');
  });

  it('should navigate to "pokemons/1" redirects  to "/pokemons/1"', async () => {
    await router.navigate(['pokemons/1']);
    expect(location.path()).toBe('/pokemons/1');
  });

  it('should navigate to "unknown-page" redirects  to "/pokemons"', async () => {
    await router.navigate(['unknown-page']);
    expect(location.path()).toBe('/pokemons');
  });

  it('should load the proper component', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about')!;
    expect(aboutRoute).toBeDefined();
    const aboutComponent = (await aboutRoute.loadComponent!()) as any;
    expect(aboutComponent.default.name).toBe('AboutPageComponent');

    const pokemonsRoute = routes.find((route) => route.path === 'pokemons')!;
    expect(pokemonsRoute).toBeDefined();
    const pokemonsComponent = (await pokemonsRoute.loadComponent!()) as any;
    expect(pokemonsComponent.default.name).toBe('PokemonsPageComponent');
  });
});

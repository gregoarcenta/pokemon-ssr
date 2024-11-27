import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@/shared/components/navbar/navbar.component';

@Component({
  selector: 'root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <navbar />
    <div class="max-w-2xl m-auto mt-16 px-2">
      <router-outlet />
    </div>
  `,
})
export class AppComponent {
  title = 'pokemon-ssr';
}

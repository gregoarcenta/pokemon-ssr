import { Component } from '@angular/core';
import { NavbarComponent } from '@/shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'root',
  imports: [NavbarComponent, RouterOutlet],
  template: `
    <navbar />
    <div class="max-w-4xl m-auto mt-16 px-2">
      <router-outlet />
    </div>
  `,
})
export class AppComponent {}

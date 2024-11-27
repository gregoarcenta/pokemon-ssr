import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
}
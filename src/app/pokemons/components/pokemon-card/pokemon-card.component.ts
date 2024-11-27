import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'pokemon-card',
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './pokemon-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {

}

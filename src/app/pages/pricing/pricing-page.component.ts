import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing',
  imports: [],
  templateUrl: './pricing-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  // private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // if (isPlatformServer(this.platform)) {
    //   console.log(this.platform);
    // }
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'Description', content: 'Este es mi pricing page' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Pricing,Page,angular' });
  }
}

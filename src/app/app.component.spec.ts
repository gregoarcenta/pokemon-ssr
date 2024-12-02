import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from '@/shared/components/navbar/navbar.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let compiled: HTMLElement;

  @Component({
    selector: 'navbar',
    template: ``,
  })
  class NavbarComponentMock {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    })
      .overrideComponent(AppComponent, {
        add: {
          imports: [NavbarComponentMock],
        },
        remove: {
          imports: [NavbarComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navbar', () => {
    expect(compiled.querySelector('navbar')).toBeTruthy();
  });

  it('should render the router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});

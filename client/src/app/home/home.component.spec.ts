import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CustomModule} from '../custom.module';

describe('Home', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;
  let df: DebugElement;
  let el: HTMLElement;
  let fl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [HomeComponent], // declare the test component
    });

    fixture = TestBed.createComponent(HomeComponent);

    component = fixture.componentInstance; // BannerComponent test instance

    // query for the link (<a> tag) by CSS element selector
    de = fixture.debugElement.query(By.css('#userslink'));
    el = de.nativeElement;

    df = fixture.debugElement.query(By.css('#todoslink'));
    fl = df.nativeElement;

  });

  it('displays a link to users', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain("Users");
  });

  it('displays a link to todos', () => {
    fixture.detectChanges();
    expect(fl.textContent).toContain("Todos");
  });
});

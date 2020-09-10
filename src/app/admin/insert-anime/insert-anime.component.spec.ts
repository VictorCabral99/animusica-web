import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertAnimeComponent } from './insert-anime.component';

describe('InsertAnimeComponent', () => {
  let component: InsertAnimeComponent;
  let fixture: ComponentFixture<InsertAnimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertAnimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

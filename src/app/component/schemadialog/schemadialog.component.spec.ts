import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemadialogComponent } from './schemadialog.component';

describe('SchemadialogComponent', () => {
  let component: SchemadialogComponent;
  let fixture: ComponentFixture<SchemadialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemadialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemadialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

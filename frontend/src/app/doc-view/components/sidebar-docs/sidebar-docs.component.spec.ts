import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDocsComponent } from './sidebar-docs.component';

describe('SidebarDocsComponent', () => {
  let component: SidebarDocsComponent;
  let fixture: ComponentFixture<SidebarDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarDocsComponent]
    });
    fixture = TestBed.createComponent(SidebarDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

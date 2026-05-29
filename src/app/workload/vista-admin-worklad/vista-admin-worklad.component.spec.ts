import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VistaAdminWorkladComponent } from './vista-admin-worklad.component';

describe('VistaAdminWorkladComponent', () => {
  let component: VistaAdminWorkladComponent;
  let fixture: ComponentFixture<VistaAdminWorkladComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaAdminWorkladComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VistaAdminWorkladComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

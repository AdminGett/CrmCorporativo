import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { userRegisterAltaComponent } from './user-register-alta.component';

describe('userRegisterAltaComponent', () => {
  let component: userRegisterAltaComponent;
  let fixture: ComponentFixture<userRegisterAltaComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ userRegisterAltaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(userRegisterAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

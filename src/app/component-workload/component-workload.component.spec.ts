import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { componentWorkloadComponent } from './component-workload.component';


describe('componentWorkloadComponent', () => {
  let component: componentWorkloadComponent;
  let fixture: ComponentFixture<componentWorkloadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [componentWorkloadComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(componentWorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); // Cierre del describe
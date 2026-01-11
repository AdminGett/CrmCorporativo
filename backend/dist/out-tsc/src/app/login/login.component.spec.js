import { TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login.component';
describe('LoginComponent', () => {
    let component;
    let fixture;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=login.component.spec.js.map
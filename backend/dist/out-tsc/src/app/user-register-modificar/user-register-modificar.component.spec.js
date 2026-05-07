import { TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { updateUsersComponent } from './user-register-modificar.component';
describe('UserRegisterModificarComponent', () => {
    let component;
    let fixture;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [updateUsersComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(updateUsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=user-register-modificar.component.spec.js.map
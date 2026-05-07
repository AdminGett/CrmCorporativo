import { TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { deleteUsersComponent } from './user-register-baja.component';
describe('deleteUsersComponent', () => {
    let component;
    let fixture;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [deleteUsersComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(deleteUsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=user-register-baja.component.spec.js.map
import { TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MarketingPermissionsComponent } from './marketing-permissions.component';
describe('MarketingPermissionsComponent', () => {
    let component;
    let fixture;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MarketingPermissionsComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(MarketingPermissionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=marketing-permissions.component.spec.js.map
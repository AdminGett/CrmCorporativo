import { __decorate } from "tslib";
import { Component } from '@angular/core';
let UpdatePanelComponent = class UpdatePanelComponent {
    constructor(authService, _updateServie, toastr, router, routes) {
        this.authService = authService;
        this._updateServie = _updateServie;
        this.toastr = toastr;
        this.router = router;
        this.routes = routes;
        this.users = [];
        this.editingUser = null;
        this.loading = false;
        this.showPassword = false;
    }
    ngOnInit() {
        this.userId = Number(this.routes.snapshot.paramMap.get('userId'));
        console.log('Id:', this.userId);
        if (this.userId) {
            this.loadUser();
        }
    }
    togglePassword() {
        this.showPassword = !this.showPassword;
    }
    loadUser() {
        this._updateServie.getUserInfo(this.userId).subscribe({
            next: (users) => {
                console.log(users);
                this.editingUser = users;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
    saveUser() {
        if (!this.editingUser)
            return;
        this.loading = true;
        this._updateServie.updateUser(this.userId, this.editingUser).subscribe({
            next: () => {
                this.toastr.success('Usuario actualizado');
            },
            error: () => {
                this.toastr.error('Ha ocurrido un error');
            }
        });
    }
    clearInputs() {
        const textInputs = document.querySelectorAll('input[type="text"]');
        textInputs.forEach((input) => {
            input.value = '';
        });
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        passwordInputs.forEach((input) => {
            input.value = '';
        });
        const dateInputs = document.querySelectorAll('input[type="date"]');
        dateInputs.forEach((input) => {
            input.value = '';
        });
    }
    onActivoChange(event) {
        const checked = event.target.checked;
        if (this.editingUser) {
            this.editingUser.activo = checked ? 1 : 0;
        }
    }
};
UpdatePanelComponent = __decorate([
    Component({
        selector: 'app-update-panel',
        templateUrl: './update-panel.component.html',
        styleUrls: ['./update-panel.component.scss'],
        standalone: false
    })
], UpdatePanelComponent);
export { UpdatePanelComponent };
//# sourceMappingURL=update-panel.component.js.map
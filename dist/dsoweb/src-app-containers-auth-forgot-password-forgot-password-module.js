(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-containers-auth-forgot-password-forgot-password-module"],{

/***/ "./src/app/containers/auth/forgot-password/forgot-password.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/containers/auth/forgot-password/forgot-password.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"whiteNav\">\n  <div class=\"pageTitle\">\n    FORGOT PASSWORD?\n  </div>\n</nav>\n<main>\n  <div class=\"container\">\n    <div class=\"forgotPasswordBox\">\n      <h3>Don't panic,</h3>\n      <p>\n        Just let us know your email address that you used to create an account.\n      </p>\n      <form [formGroup]=\"form\">\n        <div class=\"form-group\">\n          <div *ngIf=\"isError\" class=\"inputError\">The email address you provided does not match any email in our database</div>\n          <input formControlName=\"email\" type=\"text\" class=\"form-control withBg\" placeholder=\"Email..\">\n          <div *ngIf=\"email.invalid && (email.dirty || email.touched)\">\n            <div class=\"invalid-input\" *ngIf=\"email.errors.required\">The email can't be blank.</div>\n            <div class=\"invalid-input\" *ngIf=\"email.errors.email\">Please input correct email format.</div>\n          </div>\n        </div>\n\n        <button [disabled]=\"!form.valid\"\n                (click)=\"sendEmail()\"\n                class=\"btn btn-default btn-full btn-primary\">\n          Send me a new password\n        </button>\n\n        <p class=\"textCenter\">Nevermind, <a [routerLink]=\"['/auth','login']\" style=\"font-weight: 600;text-decoration: underline\">Take me back</a></p>\n      </form>\n    </div>\n  </div>\n</main>\n"

/***/ }),

/***/ "./src/app/containers/auth/forgot-password/forgot-password.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/containers/auth/forgot-password/forgot-password.component.ts ***!
  \******************************************************************************/
/*! exports provided: ForgotPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function() { return ForgotPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_custom_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-custom-validators */ "./node_modules/ngx-custom-validators/fesm5/ngx-custom-validators.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/index */ "./src/app/services/index.ts");
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/alert.service */ "./src/app/services/alert.service.ts");
/* harmony import */ var _services_sharing_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/sharing.service */ "./src/app/services/sharing.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(fb, authService, router, alertService, sharingService) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.alertService = alertService;
        this.sharingService = sharingService;
        this.sharingService.showLoading(true);
        this.isError = false;
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        setTimeout(function () {
            _this.sharingService.showLoading(false);
        });
    };
    Object.defineProperty(ForgotPasswordComponent.prototype, "email", {
        get: function () {
            return this.form.get('email');
        },
        enumerable: true,
        configurable: true
    });
    ForgotPasswordComponent.prototype.initForm = function () {
        this.form = this.fb.group({
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    ngx_custom_validators__WEBPACK_IMPORTED_MODULE_2__["CustomValidators"].email
                ])]
        });
    };
    ForgotPasswordComponent.prototype.sendEmail = function () {
        var _this = this;
        this.sharingService.showLoading(true);
        var subEmail = this.authService.sendEmail(this.form.value).subscribe(function (data) {
            if (!data.code) {
                _this.alertService.successAlert('Your new password is on its way to your email address.')
                    .then(function () {
                    _this.router.navigate(['/auth', 'reset-password'], { queryParams: {
                            email: _this.form.value.email,
                        } });
                });
            }
            else if (data.code === 1003) {
                _this.isError = true;
            }
            _this.sharingService.showLoading(false);
            subEmail.unsubscribe();
        }, function (err) {
            _this.sharingService.showLoading(false);
            subEmail.unsubscribe();
        });
    };
    ForgotPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dso-forgot-password',
            template: __webpack_require__(/*! ./forgot-password.component.html */ "./src/app/containers/auth/forgot-password/forgot-password.component.html")
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _services_index__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            _services_sharing_service__WEBPACK_IMPORTED_MODULE_6__["SharingService"]])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());



/***/ }),

/***/ "./src/app/containers/auth/forgot-password/forgot-password.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/containers/auth/forgot-password/forgot-password.module.ts ***!
  \***************************************************************************/
/*! exports provided: ForgotPasswordModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordModule", function() { return ForgotPasswordModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _forgot_password_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forgot-password.component */ "./src/app/containers/auth/forgot-password/forgot-password.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: _forgot_password_component__WEBPACK_IMPORTED_MODULE_3__["ForgotPasswordComponent"]
    },
];
var ForgotPasswordModule = /** @class */ (function () {
    function ForgotPasswordModule() {
    }
    ForgotPasswordModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
            ],
            declarations: [
                _forgot_password_component__WEBPACK_IMPORTED_MODULE_3__["ForgotPasswordComponent"]
            ],
        })
    ], ForgotPasswordModule);
    return ForgotPasswordModule;
}());



/***/ })

}]);
//# sourceMappingURL=src-app-containers-auth-forgot-password-forgot-password-module.js.map
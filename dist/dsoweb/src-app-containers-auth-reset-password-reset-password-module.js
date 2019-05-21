(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-containers-auth-reset-password-reset-password-module"],{

/***/ "./src/app/containers/auth/reset-password/reset-password.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/containers/auth/reset-password/reset-password.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"whiteNav\">\n  <div class=\"pageTitle\">\n    RESET PASSWORD?\n  </div>\n</nav>\n<main>\n  <div class=\"container\">\n    <div class=\"mt-2\">\n      <form [formGroup]=\"form\">\n        <div class=\"form-group\">\n          <input type=\"text\" formControlName=\"email_token\" class=\"form-control withBg\" placeholder=\"Enter your temporary password\">\n          <div *ngIf=\"email_token.invalid && (email_token.dirty || email_token.touched)\">\n            <div class=\"invalid-input\" *ngIf=\"email_token.errors.required\">The temporary password can't be blank.</div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <input type=\"password\" formControlName=\"password\" class=\"form-control withBg\" placeholder=\"New Password\">\n          <div *ngIf=\"password.invalid && (password.dirty || password.touched)\">\n            <div class=\"invalid-input\" *ngIf=\"password.errors.required\">Password can't be blank.</div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <input type=\"password\" formControlName=\"confirmPass\" class=\"form-control withBg\" placeholder=\"Confirm password\">\n          <div *ngIf=\"confirmPass.errors?.notSame && confirmPass.invalid && (confirmPass.dirty || confirmPass.touched)\">\n            <div class=\"invalid-input\" *ngIf=\"confirmPass.errors?.notSame\">Password does not match.</div>\n          </div>\n        </div>\n        <p class=\"form-warning\" (click)=\"isShowRequirement = !isShowRequirement\">\n          Password Requirements\n        </p>\n\n        <div class=\"form-helper\" *ngIf=\"isShowRequirement\">\n          <div class=\"content\">\n            Your password should be at least 8-16 characters in length with at least one uppercase letter and one number\n          </div>\n          <div class=\"close\" (click)=\"isShowRequirement = false\">\n            <img src=\"assets/images/icons/error-icon.png\">\n          </div>\n        </div>\n        <button class=\"btn btn-default btn-full btn-primary mt-2 mb-2\" (click)=\"onResetPwd()\" [disabled]=\"!form.valid\">\n          Reset Password\n        </button>\n\n        <p class=\"textCenter mt-1\">Still having issues? <a style=\"color: #879aa8;\">Contact Us</a></p>\n      </form>\n    </div>\n  </div>\n</main>"

/***/ }),

/***/ "./src/app/containers/auth/reset-password/reset-password.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/containers/auth/reset-password/reset-password.component.ts ***!
  \****************************************************************************/
/*! exports provided: ResetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordComponent", function() { return ResetPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/index */ "./src/app/services/index.ts");
/* harmony import */ var _services_sharing_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/sharing.service */ "./src/app/services/sharing.service.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(router, route, fb, authService, apiError, sharingService) {
        this.router = router;
        this.route = route;
        this.fb = fb;
        this.authService = authService;
        this.apiError = apiError;
        this.sharingService = sharingService;
        this.sharingService.showLoading(true);
        this.isShowRequirement = false;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        var queryParams = this.route.snapshot.queryParams;
        if (!queryParams.email) {
            this.router.navigate(['/auth', 'forgot-password']);
        }
        this.email = queryParams.email;
        setTimeout(function () {
            _this.sharingService.showLoading(false);
        });
    };
    Object.defineProperty(ResetPasswordComponent.prototype, "email_token", {
        get: function () {
            return this.form.get('email_token');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResetPasswordComponent.prototype, "password", {
        get: function () {
            return this.form.get('password');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResetPasswordComponent.prototype, "confirmPass", {
        get: function () {
            return this.form.get('confirmPass');
        },
        enumerable: true,
        configurable: true
    });
    ResetPasswordComponent.prototype.initForm = function () {
        this.form = this.fb.group({
            email_token: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
                ])],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
                ])],
            confirmPass: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
                ])]
        }, { validator: this.checkPasswords });
    };
    ResetPasswordComponent.prototype.checkPasswords = function (ac) {
        var pass = ac.get('password').value;
        var confirmPass = ac.get('confirmPass').value;
        return pass === confirmPass ? null : ac.get('confirmPass').setErrors({ notSame: true });
    };
    ResetPasswordComponent.prototype.onResetPwd = function () {
        var _this = this;
        this.sharingService.showLoading(true);
        var subResetPwd = this.authService.resetPassword(__assign({ username: this.email }, this.form.value)).subscribe(function (data) {
            if (!data.code) {
                _this.authService.login({
                    username: _this.email,
                    password: _this.form.value.password,
                }).subscribe(function (loginResponse) {
                    _this.sharingService.showLoading(false);
                    subResetPwd.unsubscribe();
                    if (!data.code) {
                        _this.authService.loginSuccess(loginResponse);
                        _this.router.navigate(['/posts']);
                    }
                }, function (err) {
                    _this.sharingService.showLoading(false);
                    subResetPwd.unsubscribe();
                });
            }
            else {
                _this.sharingService.showLoading(false);
                subResetPwd.unsubscribe();
                _this.apiError.checkError(data.code, _this.form.value, 'reset_password');
            }
        });
    };
    ResetPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dso-reset-password',
            template: __webpack_require__(/*! ./reset-password.component.html */ "./src/app/containers/auth/reset-password/reset-password.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _services_index__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _services_index__WEBPACK_IMPORTED_MODULE_3__["ApiErrorService"],
            _services_sharing_service__WEBPACK_IMPORTED_MODULE_4__["SharingService"]])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/containers/auth/reset-password/reset-password.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/containers/auth/reset-password/reset-password.module.ts ***!
  \*************************************************************************/
/*! exports provided: ResetPasswordModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordModule", function() { return ResetPasswordModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _reset_password_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reset-password.component */ "./src/app/containers/auth/reset-password/reset-password.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: _reset_password_component__WEBPACK_IMPORTED_MODULE_3__["ResetPasswordComponent"]
    },
];
var ResetPasswordModule = /** @class */ (function () {
    function ResetPasswordModule() {
    }
    ResetPasswordModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
            ],
            declarations: [
                _reset_password_component__WEBPACK_IMPORTED_MODULE_3__["ResetPasswordComponent"]
            ],
        })
    ], ResetPasswordModule);
    return ResetPasswordModule;
}());



/***/ })

}]);
//# sourceMappingURL=src-app-containers-auth-reset-password-reset-password-module.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-containers-auth-register-register-module"],{

/***/ "./src/app/containers/auth/register/register.component.html":
/*!******************************************************************!*\
  !*** ./src/app/containers/auth/register/register.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"main-nav\">\n  <div class=\"container main-nav-fix\">\n    <div class=\"main-nav-wrap-icon\">\n      <a [routerLink]=\"['/auth', 'welcome']\" href=\"javascript:void(0);\">\n        <p class=\"main-nav-icon-back\"></p>\n      </a>\n    </div>\n  </div>\n</nav>\n<section class=\"login\">\n  <div class=\"login-overlay-primary\">\n    <div class=\"logoBox\">\n      <div class=\"logo\"></div>\n    </div>\n    <div #registerContent class=\"login-content\">\n      <div class=\"container\">\n        <h2 class=\"form-title\">Sign Up</h2>\n        <form [formGroup]=\"form\">\n          <div class=\"form-group\">\n            <input formControlName=\"full_name\" class=\"form-control\" type=\"text\" placeholder=\"Full name\" />\n            <div *ngIf=\"full_name.invalid && (full_name.dirty || full_name.touched)\">\n              <div class=\"invalid-input\" *ngIf=\"full_name.errors.required\">The fullname can't be blank.</div>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <input formControlName=\"username\" class=\"form-control\" type=\"email\" placeholder=\"Email address\" \n                  autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\"/>\n            <div *ngIf=\"username.invalid && (username.dirty || username.touched)\">\n              <div class=\"invalid-input\" *ngIf=\"username.errors.required\">The email can't be blank.</div>\n              <div class=\"invalid-input\" *ngIf=\"username.errors.email\">Please input correct email format!</div>\n            </div>\n          </div>\n          <div class=\"form-group withActionRight\">\n            <input [type]=\"isShowPassword ? 'text' : 'password'\" formControlName=\"password\" class=\"form-control\" type=\"text\" placeholder=\"Set password\" />\n            <a (click)=\"isShowPassword = !isShowPassword\" class=\"action\">{{isShowPassword ? 'Hide' : 'Show'}}</a>\n            <div *ngIf=\"password.invalid && (password.dirty || password.touched)\">\n              <div class=\"invalid-input\" *ngIf=\"password.errors.required\">The password can't be blank.</div>\n            </div>\n          </div>\n        </form>\n        <p id=\"form-warning\" class=\"form-warning\" (click)=\"isShowRequirement = !isShowRequirement\">Password Requirements</p>\n        <div class=\"form-helper\" *ngIf=\"isShowRequirement\">\n          <div class=\"content\">\n            Your password should be at least 8-16 characters in length with at least one uppercase letter and one number\n          </div>\n          <div class=\"close\" (click)=\"isShowRequirement = false\">\n            <img src=\"assets/images/icons/error-icon.png\">\n          </div>\n        </div>\n        <div class=\"signupActions\">\n          <p id=\"form-content\" class=\"form-content\">\n            By creating an account, you agree to DSODentist’s\n            <a id=\"tos\" (click)=\"showDialog('term')\" class=\"link underline\">Terms of Service</a> and <a id=\"pp\" (click)=\"showDialog('policy')\" class=\"link underline\">Privacy Policy</a>.\n          </p>\n          <div class=\"mt-1\">\n            <button (click)=\"submit()\"\n                    [disabled]=\"!form.valid\"\n                    class=\"btn btn-default btn-full btn-signup\"\n                    type=\"button\">Sign Up</button>\n            <div *ngIf=\"is_student\" class=\"btn btn-linkedin-icon btn-full\">\n              <button class=\"btn btn-linkedin btn-full\" type=\"button\">\n                Sign up using LinkedIn\n              </button>\n            </div>\n          </div>\n          <p class=\"form-footer\">Already a user?\n            <a [routerLink]=\"['/auth/', 'login']\"\n               class=\"link underline\">Log In</a>\n          </p>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/containers/auth/register/register.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/containers/auth/register/register.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-password-requirement {\n  display: flex;\n  padding: 15px;\n  margin-top: 20px;\n  background-color: #5E6E7A;\n  font-size: 12px;\n  line-height: 1.4em; }\n  .form-password-requirement .form-requirement-close {\n    color: rgba(255, 255, 255, 0.4); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2VjMi11c2VyL3JraGFuL2Rzb3dlYi1wcm9qZWN0LXdvcmtzL3NlY29uZC1hdHRlbXAvZHNvd2ViL3NyYy9hcHAvY29udGFpbmVycy9hdXRoL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixrQkFBa0IsRUFBQTtFQU5wQjtJQVFJLCtCQUEyQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29udGFpbmVycy9hdXRoL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tcGFzc3dvcmQtcmVxdWlyZW1lbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBwYWRkaW5nOiAxNXB4O1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNUU2RTdBO1xuICBmb250LXNpemU6IDEycHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjRlbTtcbiAgLmZvcm0tcmVxdWlyZW1lbnQtY2xvc2Uge1xuICAgIGNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LC40KTtcbiAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/containers/auth/register/register.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/containers/auth/register/register.component.ts ***!
  \****************************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_custom_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-custom-validators */ "./node_modules/ngx-custom-validators/fesm5/ngx-custom-validators.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_dialogs_term_policy_dialog_term_policy_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/dialogs/term-policy-dialog/term-policy-dialog.component */ "./src/app/shared/dialogs/term-policy-dialog/term-policy-dialog.component.ts");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/index */ "./src/app/services/index.ts");
/* harmony import */ var _services_sharing_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/sharing.service */ "./src/app/services/sharing.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, authService, fb, dialog, apiError, sharingService) {
        this.router = router;
        this.authService = authService;
        this.fb = fb;
        this.dialog = dialog;
        this.apiError = apiError;
        this.sharingService = sharingService;
        this.sharingService.showLoading(true);
        this.isShowPassword = false;
        this.isShowRequirement = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.is_student = +localStorage.getItem('is_student');
        this.initForm();
        setTimeout(function () {
            _this.sharingService.showLoading(false);
        });
        var device = this.sharingService.getMyDevice();
        if (device === 'desktop') {
            this.registerContent.nativeElement.style.maxWidth = src_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].fixedWidth;
        }
    };
    RegisterComponent.prototype.showDialog = function (type) {
        this.dialog.open(_shared_dialogs_term_policy_dialog_term_policy_dialog_component__WEBPACK_IMPORTED_MODULE_5__["TermPolicyDialogComponent"], {
            width: '600px',
            height: '500px',
            data: {
                type: type
            }
        });
    };
    Object.defineProperty(RegisterComponent.prototype, "full_name", {
        get: function () {
            return this.form.get('full_name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "username", {
        get: function () {
            return this.form.get('username');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "password", {
        get: function () {
            return this.form.get('password');
        },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.initForm = function () {
        this.form = this.fb.group({
            full_name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
                ])],
            is_student: [this.is_student],
            is_linkedin: [1],
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                    ngx_custom_validators__WEBPACK_IMPORTED_MODULE_3__["CustomValidators"].email
                ])],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
                ])]
        });
    };
    RegisterComponent.prototype.submit = function () {
        var _this = this;
        this.sharingService.showLoading(true);
        this.form.value.username = this.form.value.username.toLowerCase();
        var subRegister = this.authService.register(this.form.value).subscribe(function (data) {
            _this.sharingService.showLoading(false);
            if (!data.code) {
                _this.authService.loginSuccess(data);
                subRegister.unsubscribe();
                _this.router.navigate(['/posts']);
            }
            else {
                _this.apiError.checkError(data.code, _this.form.value, 'register');
            }
        }, function (err) {
            _this.sharingService.showLoading(false);
            subRegister.unsubscribe();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('registerContent'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], RegisterComponent.prototype, "registerContent", void 0);
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dso-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/containers/auth/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.scss */ "./src/app/containers/auth/register/register.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_index__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _services_index__WEBPACK_IMPORTED_MODULE_6__["ApiErrorService"],
            _services_sharing_service__WEBPACK_IMPORTED_MODULE_7__["SharingService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/containers/auth/register/register.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/containers/auth/register/register.module.ts ***!
  \*************************************************************/
/*! exports provided: RegisterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterModule", function() { return RegisterModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _register_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./register.component */ "./src/app/containers/auth/register/register.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: _register_component__WEBPACK_IMPORTED_MODULE_3__["RegisterComponent"]
    },
];
var RegisterModule = /** @class */ (function () {
    function RegisterModule() {
    }
    RegisterModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
            ],
            declarations: [
                _register_component__WEBPACK_IMPORTED_MODULE_3__["RegisterComponent"]
            ],
        })
    ], RegisterModule);
    return RegisterModule;
}());



/***/ })

}]);
//# sourceMappingURL=src-app-containers-auth-register-register-module.js.map
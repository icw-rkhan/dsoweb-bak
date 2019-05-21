(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-containers-auth-login-login-module"],{

/***/ "./node_modules/rxjs-compat/_esm5/add/operator/switchMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/add/operator/switchMap.js ***!
  \******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _operator_switchMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../operator/switchMap */ "./node_modules/rxjs-compat/_esm5/operator/switchMap.js");


rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype.switchMap = _operator_switchMap__WEBPACK_IMPORTED_MODULE_1__["switchMap"];
//# sourceMappingURL=switchMap.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/operator/switchMap.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/operator/switchMap.js ***!
  \**************************************************************/
/*! exports provided: switchMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchMap", function() { return switchMap; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

function switchMap(project) {
    return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["switchMap"])(project)(this);
}
//# sourceMappingURL=switchMap.js.map

/***/ }),

/***/ "./src/app/containers/auth/login/login.component.html":
/*!************************************************************!*\
  !*** ./src/app/containers/auth/login/login.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav *ngIf=\"!checkIsStudent\" class=\"main-nav\">\n  <div class=\"container main-nav-fix\">\n    <div class=\"main-nav-wrap-icon\">\n      <a [routerLink]=\"['/auth', 'welcome']\" href=\"javascript:void(0);\">\n        <p class=\"main-nav-icon-back\"></p>\n      </a>\n    </div>\n  </div>\n</nav>\n<section #loginContainer class=\"login\">\n  <div *ngIf=\"!checkIsStudent; else isStudentOrNot\" class=\"login-overlay-primary\">\n    <div class=\"logoBox\">\n      <div class=\"logo\"></div>\n    </div>\n    <div #loginContent1 class=\"login-content\">\n      <div class=\"container\">\n        <h2 class=\"form-title\">Log In</h2>\n        <form [formGroup]=\"form\">\n          <div class=\"form-group\">\n            <input formControlName=\"username\" class=\"form-control\" type=\"email\" placeholder=\"Email address\"\n                  autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\"/>\n            <div *ngIf=\"username.invalid && (username.dirty || username.touched)\">\n              <div class=\"invalid-input\" *ngIf=\"username.errors.required\">The email can't be blank.</div>\n              <div class=\"invalid-input\" *ngIf=\"username.errors.email\">Please input correct email format.</div>\n            </div>\n          </div>\n          <div class=\"form-group withActionRight\">\n            <input [type]=\"isShowPassword ? 'text' : 'password'\" formControlName=\"password\" class=\"form-control\"\n               placeholder=\"Password\" />\n            <a (click)=\"isShowPassword = !isShowPassword\" class=\"action\">{{isShowPassword ? 'Hide' : 'Show'}}</a>\n            <div *ngIf=\"password.invalid && (password.dirty || password.touched)\">\n              <div class=\"invalid-input\" *ngIf=\"password.errors.required\">The password can't be blank.</div>\n            </div>\n          </div>\n        </form>\n        <div class=\"form-btn\">\n          <a [routerLink]=\"['/auth', 'forgot-password']\"><p>Forgot password</p></a>\n        </div>\n        <div class=\"loginActions\">\n          <button [disabled]=\"false\"\n                  (click)=\"submit()\"\n                  class=\"btn btn-primary btn-full margin-10\"\n                  type=\"button\">Log In</button>\n          <div *ngIf=\"is_student\" class=\"btn btn-linkedin-icon btn-full\">\n            <button class=\"btn btn-linkedin btn-full\" type=\"button\" (click)=\"onLoginLinkedIn()\" *ngIf=\"!(isUserAuthenticated | async)\">\n              Login with LinkedIn\n            </button>\n            <!--<button class=\"btn btn-linkedin btn-full\" type=\"button\" (click)=\"logoutLinkedIn()\" *ngIf=\"isUserAuthenticated | async\">\n              Logout from LinkedIn\n            </button>-->\n          </div>\n        </div>\n        <div class=\"textCenter\">\n          <a [routerLink]=\"\" class=\"link underline\" (click)=\"signUp()\">Create an account</a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <ng-template #isStudentOrNot>\n    <div class=\"login-overlay-primary\">\n      <div class=\"logoBox\">\n        <div class=\"logo\"></div>\n      </div>\n      <div #loginContent2 class=\"login-content\">\n        <div class=\"container\">\n          <h2 class=\"login-title2\">Are you a student?</h2>\n          <p class=\"login-detail\">We use this information to show personalized content that is relevant to you.</p>\n          <div class=\"margin-20\">\n            <button (click)=\"redirect('0')\" class=\"btn btn-default btn-full margin-10\" type=\"button\">\n              Yes\n            </button>\n            <button (click)=\"redirect('1')\" class=\"btn btn-default btn-full\" type=\"button\">\n              No\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-template>\n</section>\n\n"

/***/ }),

/***/ "./src/app/containers/auth/login/login.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/containers/auth/login/login.component.ts ***!
  \**********************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_custom_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-custom-validators */ "./node_modules/ngx-custom-validators/fesm5/ngx-custom-validators.js");
/* harmony import */ var _services_sharing_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/sharing.service */ "./src/app/services/sharing.service.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services */ "./src/app/services/index.ts");
/* harmony import */ var rxjs_add_operator_switchMap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/add/operator/switchMap */ "./node_modules/rxjs-compat/_esm5/add/operator/switchMap.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, fb, authService, apiError, sharingService, activatedRoute) {
        this.router = router;
        this.fb = fb;
        this.authService = authService;
        this.apiError = apiError;
        this.sharingService = sharingService;
        this.activatedRoute = activatedRoute;
        this.sharingService.showLoading(true);
        this.isShowPassword = false;
        this.checkIsStudent = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sharingService.showLoading(true);
        this.activatedRoute.queryParams.subscribe(function (params) {
            var code = params['code']; // login with linkedin
            if (code && code !== '') {
                _this.getAccessToken(code);
            }
            else {
                setTimeout(function () {
                    _this.sharingService.showLoading(false);
                });
            }
        });
        this.initForm();
        this.is_student = +localStorage.getItem('is_student');
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        this.device = this.sharingService.getMyDevice();
        if (this.device === 'desktop') {
            var element = this.loginContent1.nativeElement;
            element.style.maxWidth = _environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].fixedWidth;
        }
    };
    Object.defineProperty(LoginComponent.prototype, "username", {
        get: function () {
            return this.form.get('username');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "password", {
        get: function () {
            return this.form.get('password');
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.initForm = function () {
        this.form = this.fb.group({
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                    ngx_custom_validators__WEBPACK_IMPORTED_MODULE_3__["CustomValidators"].email
                ])],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
                ])]
        });
    };
    LoginComponent.prototype.submit = function () {
        var _this = this;
        this.sharingService.showLoading(true);
        this.form.value.username = this.form.value.username.toLowerCase();
        var subLogin = this.authService.login(this.form.value).subscribe(function (data) {
            _this.sharingService.showLoading(false);
            if (!data.code) {
                _this.authService.loginSuccess(data);
                subLogin.unsubscribe();
                _this.router.navigate(['/posts']);
            }
            else {
                _this.apiError.checkError(data.code, _this.form.value, 'login');
                subLogin.unsubscribe();
            }
        }, function (err) {
            _this.sharingService.showLoading(false);
            subLogin.unsubscribe();
        });
    };
    LoginComponent.prototype.onLoginLinkedIn = function () {
        var redirectUri = document.location.origin + "/auth/login";
        var url = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=" +
            (_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].linkedinClientId + "&redirect_uri=" + redirectUri + "&state=1234567");
        window.location.href = url;
    };
    LoginComponent.prototype.getAccessToken = function (code) {
        var _this = this;
        var linkedinLogin = this.authService.requestAccessToken({ code: code,
            redirectUrl: document.location.origin + "/auth/login" })
            .subscribe(function (data) {
            _this.sharingService.showLoading(false);
            if (!data.code) {
                _this.authService.linkedInLoginSuccess(data);
                linkedinLogin.unsubscribe();
                _this.router.navigate(['/posts']);
            }
            else {
                // this.apiError.checkError(data.code, this.form.value, 'login');
                linkedinLogin.unsubscribe();
            }
        });
    };
    LoginComponent.prototype.signUp = function () {
        var _this = this;
        this.checkIsStudent = true;
        setTimeout(function () {
            if (_this.device === 'desktop') {
                var element = _this.loginContent2.nativeElement;
                element.style.maxWidth = _environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].fixedWidth;
            }
        }, 0);
    };
    LoginComponent.prototype.redirect = function (is_student) {
        localStorage.setItem('is_student', is_student);
        this.router.navigate(['/auth', 'register']);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('loginContent1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LoginComponent.prototype, "loginContent1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('loginContent2'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LoginComponent.prototype, "loginContent2", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('loginContainer'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LoginComponent.prototype, "loginContainer", void 0);
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dso-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/containers/auth/login/login.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _services__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            _services__WEBPACK_IMPORTED_MODULE_5__["ApiErrorService"],
            _services_sharing_service__WEBPACK_IMPORTED_MODULE_4__["SharingService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/containers/auth/login/login.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/containers/auth/login/login.module.ts ***!
  \*******************************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login.component */ "./src/app/containers/auth/login/login.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: _login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
    },
];
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
            ],
            declarations: [
                _login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
            ],
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ })

}]);
//# sourceMappingURL=src-app-containers-auth-login-login-module.js.map
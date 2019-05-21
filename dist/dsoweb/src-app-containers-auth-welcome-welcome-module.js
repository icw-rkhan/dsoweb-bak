(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-containers-auth-welcome-welcome-module"],{

/***/ "./src/app/containers/auth/welcome/welcome.component.html":
/*!****************************************************************!*\
  !*** ./src/app/containers/auth/welcome/welcome.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section #container class=\"login\">\n  <div *ngIf=\"!checkIsStudent; else isStudentOrNot\" class=\"login-overlay\">\n    <div class=\"logoBox\">\n      <div class=\"logo\"></div>\n    </div>\n    <div #authContent1 class=\"login-content\">\n      <div class=\"container\">\n        <h2 class=\"login-title\">Welcome!</h2>\n        <!--p class=\"login-subTitle\">Say hello to a new way to connect!</p--!> -->\n        <p class=\"login-detail\">DSODentist is a new platform where dental professionals interested in group practice can come together as a community for training, professional development, and peer mentoring.</p>\n        <div class=\"margin-20\">\n          <button (click)=\"signUpOrLogin(true)\" class=\"btn btn-default btn-full margin-10\" type=\"button\">\n            Get Started\n          </button>\n          <button (click)=\"signUpOrLogin(false)\" class=\"btn btn-primary btn-full\" type=\"button\">\n            Log In\n          </button>\n        </div>\n        <!-- <div class=\"login-toggle\">\n            <input class=\"btn btn-toggle\" type=\"button\" />\n            <input class=\"btn btn-toggle\" type=\"button\" />\n            <input class=\"btn btn-toggle\" type=\"button\" />\n            <input class=\"btn btn-toggle\" type=\"button\" />\n        </div> -->\n      </div>\n    </div>\n  </div>\n  <ng-template #isStudentOrNot>\n    <div class=\"login-overlay-primary\">\n      <div class=\"logoBox\">\n        <div class=\"logo\"></div>\n      </div>\n      <div #authContent2 class=\"login-content\">\n        <div class=\"container\">\n          <h2 class=\"login-title\">Are you a student?</h2>\n          <p class=\"login-detail\">We use this information to show personalized content that is relevant to you.</p>\n          <div class=\"margin-20\">\n            <button (click)=\"redirect('0')\" class=\"btn btn-default btn-full margin-10\" type=\"button\">\n              Yes\n            </button>\n            <button (click)=\"redirect('1')\" class=\"btn btn-default btn-full\" type=\"button\">\n              No\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-template>\n</section>\n"

/***/ }),

/***/ "./src/app/containers/auth/welcome/welcome.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/containers/auth/welcome/welcome.component.ts ***!
  \**************************************************************/
/*! exports provided: WelcomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeComponent", function() { return WelcomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/auth/auth.service */ "./src/app/services/auth/auth.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_services_sharing_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/sharing.service */ "./src/app/services/sharing.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WelcomeComponent = /** @class */ (function () {
    function WelcomeComponent(router, authService, sharingService) {
        this.router = router;
        this.authService = authService;
        this.sharingService = sharingService;
    }
    WelcomeComponent.prototype.ngOnInit = function () {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/profile']);
        }
        this.container.nativeElement.style.height = window.innerHeight + "px";
    };
    WelcomeComponent.prototype.ngAfterViewInit = function () {
        this.device = this.sharingService.getMyDevice();
        if (this.device === 'desktop') {
            var element = this.authContent1.nativeElement;
            element.style.maxWidth = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].fixedWidth;
        }
    };
    WelcomeComponent.prototype.signUpOrLogin = function (signup) {
        var _this = this;
        if (signup === void 0) { signup = false; }
        this.signup = signup;
        if (signup === false) {
            localStorage.setItem('is_student', '1');
            this.router.navigate(['/auth', 'login']);
        }
        this.checkIsStudent = true;
        setTimeout(function () {
            if (_this.device === 'desktop' && _this.authContent2) {
                var element = _this.authContent2.nativeElement;
                element.style.maxWidth = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].fixedWidth;
            }
        }, 0);
    };
    WelcomeComponent.prototype.redirect = function (is_student) {
        localStorage.setItem('is_student', is_student);
        var url = this.signup ? ['/auth', 'register'] : ['/auth', 'login'];
        this.router.navigate(url);
    };
    WelcomeComponent.prototype.onResize = function () {
        this.container.nativeElement.style.height = window.innerHeight + "px";
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('container'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], WelcomeComponent.prototype, "container", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('authContent1'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], WelcomeComponent.prototype, "authContent1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('authContent2'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], WelcomeComponent.prototype, "authContent2", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:resize', []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], WelcomeComponent.prototype, "onResize", null);
    WelcomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dso-welcome',
            template: __webpack_require__(/*! ./welcome.component.html */ "./src/app/containers/auth/welcome/welcome.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            src_app_services_sharing_service__WEBPACK_IMPORTED_MODULE_4__["SharingService"]])
    ], WelcomeComponent);
    return WelcomeComponent;
}());



/***/ }),

/***/ "./src/app/containers/auth/welcome/welcome.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/containers/auth/welcome/welcome.module.ts ***!
  \***********************************************************/
/*! exports provided: WelcomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeModule", function() { return WelcomeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _welcome_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./welcome.component */ "./src/app/containers/auth/welcome/welcome.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: _welcome_component__WEBPACK_IMPORTED_MODULE_3__["WelcomeComponent"]
    },
];
var WelcomeModule = /** @class */ (function () {
    function WelcomeModule() {
    }
    WelcomeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
            ],
            declarations: [
                _welcome_component__WEBPACK_IMPORTED_MODULE_3__["WelcomeComponent"]
            ],
        })
    ], WelcomeModule);
    return WelcomeModule;
}());



/***/ })

}]);
//# sourceMappingURL=src-app-containers-auth-welcome-welcome-module.js.map
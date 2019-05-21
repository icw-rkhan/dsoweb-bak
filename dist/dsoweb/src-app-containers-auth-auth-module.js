(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-containers-auth-auth-module"],{

/***/ "./src/app/containers/auth/auth.component.html":
/*!*****************************************************!*\
  !*** ./src/app/containers/auth/auth.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div #authContainer>\n    <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./src/app/containers/auth/auth.component.ts":
/*!***************************************************!*\
  !*** ./src/app/containers/auth/auth.component.ts ***!
  \***************************************************/
/*! exports provided: AuthComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthComponent", function() { return AuthComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_sharing_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/sharing.service */ "./src/app/services/sharing.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthComponent = /** @class */ (function () {
    function AuthComponent(sharingService) {
        this.sharingService = sharingService;
    }
    AuthComponent.prototype.ngOnInit = function () {
        var device = this.sharingService.getMyDevice();
        if (device === 'desktop') {
            var element = this.authContainer.nativeElement;
            element.style.maxWidth = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].fixedWidth;
            element.style.position = 'relative';
            element.style.margin = 'auto';
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('authContainer'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AuthComponent.prototype, "authContainer", void 0);
    AuthComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dso-auth',
            template: __webpack_require__(/*! ./auth.component.html */ "./src/app/containers/auth/auth.component.html")
        }),
        __metadata("design:paramtypes", [src_app_services_sharing_service__WEBPACK_IMPORTED_MODULE_1__["SharingService"]])
    ], AuthComponent);
    return AuthComponent;
}());



/***/ }),

/***/ "./src/app/containers/auth/auth.module.ts":
/*!************************************************!*\
  !*** ./src/app/containers/auth/auth.module.ts ***!
  \************************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _auth_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.component */ "./src/app/containers/auth/auth.component.ts");
/* harmony import */ var _login_login_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.routing */ "./src/app/containers/auth/login/login.routing.ts");
/* harmony import */ var _welcome_welcome_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./welcome/welcome.routing */ "./src/app/containers/auth/welcome/welcome.routing.ts");
/* harmony import */ var _register_register_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./register/register.routing */ "./src/app/containers/auth/register/register.routing.ts");
/* harmony import */ var _forgot_password_forgot_password_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./forgot-password/forgot-password.routing */ "./src/app/containers/auth/forgot-password/forgot-password.routing.ts");
/* harmony import */ var _reset_password_reset_password_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./reset-password/reset-password.routing */ "./src/app/containers/auth/reset-password/reset-password.routing.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var routes = [
    {
        path: '',
        component: _auth_component__WEBPACK_IMPORTED_MODULE_3__["AuthComponent"],
        children: _welcome_welcome_routing__WEBPACK_IMPORTED_MODULE_5__["welcomeRoutes"].concat(_login_login_routing__WEBPACK_IMPORTED_MODULE_4__["loginRoutes"], _register_register_routing__WEBPACK_IMPORTED_MODULE_6__["registerRoutes"], _forgot_password_forgot_password_routing__WEBPACK_IMPORTED_MODULE_7__["forgotPasswordRoutes"], _reset_password_reset_password_routing__WEBPACK_IMPORTED_MODULE_8__["resetPasswordRoutes"])
    }
];
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)
            ],
            declarations: [
                _auth_component__WEBPACK_IMPORTED_MODULE_3__["AuthComponent"]
            ],
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ }),

/***/ "./src/app/containers/auth/forgot-password/forgot-password.routing.ts":
/*!****************************************************************************!*\
  !*** ./src/app/containers/auth/forgot-password/forgot-password.routing.ts ***!
  \****************************************************************************/
/*! exports provided: forgotPasswordRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forgotPasswordRoutes", function() { return forgotPasswordRoutes; });
var forgotPasswordRoutes = [
    {
        path: 'forgot-password',
        loadChildren: 'src/app/containers/auth/forgot-password/forgot-password.module#ForgotPasswordModule'
    }
];


/***/ }),

/***/ "./src/app/containers/auth/login/login.routing.ts":
/*!********************************************************!*\
  !*** ./src/app/containers/auth/login/login.routing.ts ***!
  \********************************************************/
/*! exports provided: loginRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginRoutes", function() { return loginRoutes; });
var loginRoutes = [
    {
        path: 'login',
        loadChildren: 'src/app/containers/auth/login/login.module#LoginModule'
    }
];


/***/ }),

/***/ "./src/app/containers/auth/register/register.routing.ts":
/*!**************************************************************!*\
  !*** ./src/app/containers/auth/register/register.routing.ts ***!
  \**************************************************************/
/*! exports provided: registerRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerRoutes", function() { return registerRoutes; });
var registerRoutes = [
    {
        path: 'register',
        loadChildren: 'src/app/containers/auth/register/register.module#RegisterModule'
    }
];


/***/ }),

/***/ "./src/app/containers/auth/reset-password/reset-password.routing.ts":
/*!**************************************************************************!*\
  !*** ./src/app/containers/auth/reset-password/reset-password.routing.ts ***!
  \**************************************************************************/
/*! exports provided: resetPasswordRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetPasswordRoutes", function() { return resetPasswordRoutes; });
var resetPasswordRoutes = [
    {
        path: 'reset-password',
        loadChildren: 'src/app/containers/auth/reset-password/reset-password.module#ResetPasswordModule'
    }
];


/***/ }),

/***/ "./src/app/containers/auth/welcome/welcome.routing.ts":
/*!************************************************************!*\
  !*** ./src/app/containers/auth/welcome/welcome.routing.ts ***!
  \************************************************************/
/*! exports provided: welcomeRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "welcomeRoutes", function() { return welcomeRoutes; });
var welcomeRoutes = [
    {
        path: 'welcome',
        loadChildren: 'src/app/containers/auth/welcome/welcome.module#WelcomeModule'
    }
];


/***/ })

}]);
//# sourceMappingURL=src-app-containers-auth-auth-module.js.map
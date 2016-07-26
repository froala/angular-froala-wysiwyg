"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var FroalaEditorDirective = (function () {
    function FroalaEditorDirective(el) {
        this._defaultConfigs = {};
        this.froalaModel = new core_1.EventEmitter();
        this._jqueryElement = $(el.nativeElement);
    }
    Object.defineProperty(FroalaEditorDirective.prototype, "froalaEditor", {
        set: function (configs) {
            this._configs = configs || this._defaultConfigs;
            this._editor = this._jqueryElement.froalaEditor();
            var self = this;
            this._jqueryElement.on('froalaEditor.contentChanged', function () {
                var returnedHtml = self._jqueryElement.froalaEditor('html.get');
                if (typeof returnedHtml === 'string') {
                    self.froalaModel.emit(returnedHtml);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FroalaEditorDirective.prototype, "froalaModel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], FroalaEditorDirective.prototype, "froalaEditor", null);
    FroalaEditorDirective = __decorate([
        core_1.Directive({
            selector: '[froalaEditor]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], FroalaEditorDirective);
    return FroalaEditorDirective;
}());
exports.FroalaEditorDirective = FroalaEditorDirective;
var FroalaViewDirective = (function () {
    function FroalaViewDirective(renderer, element) {
        this.renderer = renderer;
        this._element = element.nativeElement;
        this.renderer.setElementClass(this._element, "fr-view", true);
    }
    Object.defineProperty(FroalaViewDirective.prototype, "froalaView", {
        // update content model as it comes
        set: function (content) {
            //this._el.value = content;
            this._element.innerHTML = content;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], FroalaViewDirective.prototype, "froalaView", null);
    FroalaViewDirective = __decorate([
        core_1.Directive({
            selector: '[froalaView]'
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], FroalaViewDirective);
    return FroalaViewDirective;
}());
exports.FroalaViewDirective = FroalaViewDirective;
//# sourceMappingURL=froala.directives.js.map
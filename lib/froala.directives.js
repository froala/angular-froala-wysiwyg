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
        this._defaultOpts = {};
        this._initialized = false;
        this.froalaModelChange = new core_1.EventEmitter();
        this._jqueryElement = $(el.nativeElement);
    }
    Object.defineProperty(FroalaEditorDirective.prototype, "froalaEditor", {
        set: function (opts) {
            this._opts = opts || this._defaultOpts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FroalaEditorDirective.prototype, "froalaModel", {
        set: function (content) {
            if (!this._initialized) {
                this._initContent = content;
                this._initialized = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    FroalaEditorDirective.prototype.ngAfterViewInit = function () {
        // init editor
        this._editor = this._jqueryElement.froalaEditor(this._opts);
        // set initial content
        if (this._initContent) {
            this._jqueryElement.froalaEditor('html.set', this._initContent || '', true);
            //This will reset the undo stack everytime the model changes externally. Can we fix this?
            this._jqueryElement.froalaEditor('undo.reset');
            this._jqueryElement.froalaEditor('undo.saveStep');
        }
        // bind contentChange event to froalaModel
        var self = this;
        this._jqueryElement.on('froalaEditor.contentChanged', function () {
            var returnedHtml = self._jqueryElement.froalaEditor('html.get');
            if (typeof returnedHtml === 'string') {
                self.froalaModelChange.emit(returnedHtml);
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], FroalaEditorDirective.prototype, "froalaEditor", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], FroalaEditorDirective.prototype, "froalaModel", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FroalaEditorDirective.prototype, "froalaModelChange", void 0);
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
    }
    Object.defineProperty(FroalaViewDirective.prototype, "froalaView", {
        // update content model as it comes
        set: function (content) {
            this._element.innerHTML = content;
        },
        enumerable: true,
        configurable: true
    });
    FroalaViewDirective.prototype.ngAfterViewInit = function () {
        this.renderer.setElementClass(this._element, "fr-view", true);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
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
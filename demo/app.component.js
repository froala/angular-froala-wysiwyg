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
var froala_directives_1 = require('../lib/froala.directives');
var AppComponent = (function () {
    function AppComponent() {
        // Sample 1 models
        this.titleOptions = {
            placeholderText: 'Edit Your Content Here!',
            charCounterCount: false,
            toolbarInline: true,
            events: {
                'froalaEditor.initialized': function () {
                    console.log('initialized');
                }
            }
        };
        // Sample 2 model
        this.content = '<span>My Document\'s Title</span>';
    }
    AppComponent.prototype.initialize = function (initControls) {
        this.initControls = initControls;
        this.deleteAll = function () {
            this.initControls.getEditor()('html.set', '');
        };
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n\n  <h1>Angular adapter for the Froala WYSIWYG editor</h1>\n    <div class=\"sample\">\n      <h2>Sample 1: Inline Edit</h2>\n      <div [froalaEditor]=\"titleOptions\" [(froalaModel)]=\"myTitle\"></div>\n      <input [ngModel]=\"myTitle\" />\n    </div>\n\n    <div class=\"sample\">\n      <h2>Sample2: Full Editor</h2>\n      <div [froalaEditor] [(froalaModel)]=\"content\"></div>\n      <h4>Rendered Content:</h4>\n      <div [froalaView]=\"content\"></div>\n    </div>\n\n    <div class=\"sample\">\n      <h2>Sample 3: Manual Initialization</h2>\n      <button class=\"manual\" (click)=\"initControls.initialize()\">Initialize Editor</button>\n      <button (click)=\"initControls.destroy()\" [hidden]=\"!initControls || initControls.getEditor() == null\">Close Editor</button>\n      <button (click)=\"deleteAll()\" [hidden]=\"!initControls || initControls.getEditor() == null\">Delete All</button>\n      <div [froalaEditor] (froalaInit)=\"initialize($event)\" [(froalaModel)]=\"sample3Text\">Check out the <a href=\"https://www.froala.com/wysiwyg-editor\">Froala Editor</a></div>\n    </div>\n\n  ",
            directives: [froala_directives_1.FroalaEditorDirective, froala_directives_1.FroalaViewDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
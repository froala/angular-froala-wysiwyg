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
        // Sample 4 model
        this.imgModel = {
            src: '../src/image.jpg'
        };
        // Sample 5 model
        this.buttonModel = {
            innerHTML: 'Click Me'
        };
        // Sample 6 models
        this.inputModel = {
            placeholder: 'I am an input!'
        };
        this.inputOptions = {
            angularIgnoreAttrs: ['class', 'ng-model', 'id', 'froala', 'ng-reflect-froala-editor', 'ng-reflect-froala-model']
        };
        // Sample 6 model
        this.initializeLink = function (linkInitControls) {
            this.linkInitControls = linkInitControls;
        };
        this.linkModel = {
            href: 'https://www.froala.com/wysiwyg-editor'
        };
    }
    AppComponent.prototype.initialize = function (initControls) {
        this.initControls = initControls;
        this.deleteAll = function () {
            this.initControls.getEditor()('html.set', '');
            this.initControls.getEditor()('undo.reset');
            this.initControls.getEditor()('undo.saveStep');
        };
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n\n  <h1>Angular adapter for the Froala WYSIWYG editor</h1>\n    <div class=\"sample\">\n      <h2>Sample 1: Inline Edit</h2>\n      <div [froalaEditor]=\"titleOptions\" [(froalaModel)]=\"myTitle\"></div>\n      <input [ngModel]=\"myTitle\" />\n    </div>\n\n    <div class=\"sample\">\n      <h2>Sample2: Full Editor</h2>\n      <div [froalaEditor] [(froalaModel)]=\"content\"></div>\n      <h4>Rendered Content:</h4>\n      <div [froalaView]=\"content\"></div>\n    </div>\n\n    <div class=\"sample\">\n      <h2>Sample 3: Manual Initialization</h2>\n      <button class=\"manual\" (click)=\"initControls.initialize()\">Initialize Editor</button>\n      <button (click)=\"initControls.destroy()\" [hidden]=\"!initControls || initControls.getEditor() == null\">Close Editor</button>\n      <button (click)=\"deleteAll()\" [hidden]=\"!initControls || initControls.getEditor() == null\">Delete All</button>\n      <div [froalaEditor] (froalaInit)=\"initialize($event)\" [(froalaModel)]=\"sample3Text\">Check out the <a href=\"https://www.froala.com/wysiwyg-editor\">Froala Editor</a></div>\n    </div>\n\n    <div class=\"sample\">\n      <h2>Sample 4: Editor on 'img' tag</h2>\n      <img [froalaEditor] [(froalaModel)]=\"imgModel\"/>\n      <h4>Model Obj:</h4>\n      <div>{{imgModel | json}}</div>\n    </div>\n\n    <div class=\"sample\">\n      <h2>Sample 5: Editor on 'button' tag</h2>\n      <button [froalaEditor] [(froalaModel)]=\"buttonModel\"></button>\n      <h4>Model Obj:</h4>\n      <div>{{buttonModel | json}}</div>\n    </div>\n\n    <div class=\"sample\">\n      <h2>Sample 6: Editor on 'input' tag</h2>\n      <input [froalaEditor]=\"inputOptions\" [(froalaModel)]=\"inputModel\"/>\n      <h4>Model Obj:</h4>\n      <div>{{inputModel | json}}</div>\n    </div>\n\n    <div class=\"sample\">\n      <h2>Sample 7: Editor on 'a' tag. Manual Initialization</h2>\n      <button class=\"manual\" (click)=\"linkInitControls.initialize()\">Initialize Editor</button>\n      <button (click)=\"linkInitControls.destroy()\" [hidden]=\"!linkInitControls || linkInitControls.getEditor() == null\">Close Editor</button>\n      <div>\n        <a [froalaEditor] (froalaInit)=\"initializeLink($event)\" [(froalaModel)]=\"linkModel\">Froala Editor</a>\n      </div>\n      <h4>Model Obj:</h4>\n      <div>{{linkModel | json}}</div>\n    </div>\n\n  ",
            directives: [froala_directives_1.FroalaEditorDirective, froala_directives_1.FroalaViewDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
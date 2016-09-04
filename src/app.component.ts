import { Component } from '@angular/core';
import { FroalaEditorDirective, FroalaViewDirective } from '../lib/froala.directives';

@Component({
  selector: 'app',
  template: `

  <h1>Angular adapter for the Froala WYSIWYG editor</h1>
    <div class="sample">
      <h2>Sample 1: Inline Edit</h2>
      <div [froalaEditor]="titleOptions" [(froalaModel)]="myTitle"></div>
      <input [(ngModel)]="myTitle" />
    </div>

    <div class="sample">
      <h2>Sample 2: Full Editor</h2>
      <div [froalaEditor] [(froalaModel)]="content"></div>
      <h4>Rendered Content:</h4>
      <div [froalaView]="content"></div>
    </div>

    <div class="sample">
      <h2>Sample 3: Two way binding</h2>
      <div [froalaEditor] [(froalaModel)]="twoWayContent"></div>
      <div [froalaEditor] [(froalaModel)]="twoWayContent"></div>
    </div>

    <div class="sample">
      <h2>Sample 4: Manual Initialization</h2>
      <button class="manual" (click)="initControls.initialize()">Initialize Editor</button>
      <button (click)="initControls.destroy()" [hidden]="!initControls || initControls.getEditor() == null">Close Editor</button>
      <button (click)="deleteAll()" [hidden]="!initControls || initControls.getEditor() == null">Delete All</button>
      <div [froalaEditor] (froalaInit)="initialize($event)" [(froalaModel)]="sample3Text">Check out the <a href="https://www.froala.com/wysiwyg-editor">Froala Editor</a></div>
    </div>

    <div class="sample">
      <h2>Sample 5: Editor on 'img' tag. Two way binding.</h2>
      <img [froalaEditor] [(froalaModel)]="imgModel"/>
      <img [froalaEditor] [(froalaModel)]="imgModel"/>
      <h4>Model Obj:</h4>
      <div>{{imgModel | json}}</div>
    </div>

    <div class="sample">
      <h2>Sample 6: Editor on 'button' tag</h2>
      <button [froalaEditor] [(froalaModel)]="buttonModel"></button>
      <h4>Model Obj:</h4>
      <div>{{buttonModel | json}}</div>
    </div>

    <div class="sample">
      <h2>Sample 7: Editor on 'input' tag</h2>
      <input [froalaEditor]="inputOptions" [(froalaModel)]="inputModel"/>
      <h4>Model Obj:</h4>
      <div>{{inputModel | json}}</div>
    </div>

    <div class="sample">
      <h2>Sample 8: Editor on 'a' tag. Manual Initialization</h2>
      <button class="manual" (click)="linkInitControls.initialize()">Initialize Editor</button>
      <button (click)="linkInitControls.destroy()" [hidden]="!linkInitControls || linkInitControls.getEditor() == null">Close Editor</button>
      <div>
        <a [froalaEditor] (froalaInit)="initializeLink($event)" [(froalaModel)]="linkModel">Froala Editor</a>
      </div>
      <h4>Model Obj:</h4>
      <div>{{linkModel | json}}</div>
    </div>

  `,
  directives: [FroalaEditorDirective, FroalaViewDirective]
})

export class AppComponent {

  // Sample 1 models
  public titleOptions: Object = { 
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    toolbarInline: true,
    events: {
      'froalaEditor.initialized': function() {
        console.log('initialized');
      }
    }
  }
  public myTitle: string;


  // Sample 2 model
  public content: string = '<span>My Document\'s Title</span>';


  // Sample 3 model
   public twoWayContent;

  // Sample 4 models
  public sample3Text;
  public initControls;
  public deleteAll;
  public initialize(initControls) {
    this.initControls = initControls;
    this.deleteAll = function() {
        this.initControls.getEditor()('html.set', '');
        this.initControls.getEditor()('undo.reset');
        this.initControls.getEditor()('undo.saveStep');
    };
  }

  // Sample 5 model
  public imgModel: Object = {
    src: '../src/image.jpg'
  };
 
  // Sample 6 model
  public buttonModel: Object = {
    innerHTML: 'Click Me'
  };

  // Sample 7 models
  public inputModel: Object = {
    placeholder: 'I am an input!'
  };
  public inputOptions: Object = {
   angularIgnoreAttrs: ['class', 'ng-model', 'id', 'froala', 'ng-reflect-froala-editor', 'ng-reflect-froala-model']
  }

  // Sample 8 model
  public initializeLink = function(linkInitControls) {
   this.linkInitControls = linkInitControls;
  };
  public linkModel: Object = {
    href: 'https://www.froala.com/wysiwyg-editor'
  };
}

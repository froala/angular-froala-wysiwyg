import { Component } from '@angular/core';
import { FroalaEditorDirective, FroalaViewDirective } from '../lib/froala.directives';

@Component({
  selector: 'app',
  template: `

  <h1>Angular adapter for the Froala WYSIWYG editor</h1>
    <div class="sample">
      <h2>Sample 1: Inline Edit</h2>
      <div [froalaEditor]="titleOptions" [(froalaModel)]="myTitle"></div>
      <input [ngModel]="myTitle" />
    </div>

    <div class="sample">
      <h2>Sample2: Full Editor</h2>
      <div [froalaEditor] [(froalaModel)]="content"></div>
      <h4>Rendered Content:</h4>
      <div [froalaView]="content"></div>
    </div>

    <div class="sample">
      <h2>Sample 3: Manual Initialization</h2>
      <button class="manual" (click)="initControls.initialize()">Initialize Editor</button>
      <button (click)="initControls.destroy()" [hidden]="!initControls || initControls.getEditor() == null">Close Editor</button>
      <button (click)="deleteAll()" [hidden]="!initControls || initControls.getEditor() == null">Delete All</button>
      <div [froalaEditor] (froalaInit)="initialize($event)" [(froalaModel)]="sample3Text">Check out the <a href="https://www.froala.com/wysiwyg-editor">Froala Editor</a></div>
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
  public myTitle;


  // Sample 2 model
  public content = '<span>My Document\'s Title</span>';


  // Sample 3 models
  public sample3Text;
  public initControls;
  public deleteAll;
  public initialize(initControls) {
    this.initControls = initControls;
    this.deleteAll = function() {
        this.initControls.getEditor()('html.set', '');
    };
  }
}

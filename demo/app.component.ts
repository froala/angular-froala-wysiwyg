import { Component } from '@angular/core';
import { FroalaEditorDirective, FroalaViewDirective } from '../lib/froala.directives';

@Component({
  selector: 'app',
  template: `
  <div class="sample">
    <h2>Sample: Full Editor</h2>
    <div [froalaEditor]="configs" [(froalaModel)]="content"></div>
    <h4>Rendered Content:</h4>
    <div [froalaView]="content"></div>
  </div>
  `,
  directives: [FroalaEditorDirective, FroalaViewDirective]
})
export class AppComponent {

  public configs: Object = { 
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    toolbarInline: true,
    events: {
      'froalaEditor.initialized': function() {
        console.log('initialized');
      }
    }
  }
  public content = '<span>My Document\'s Title</span>';
}

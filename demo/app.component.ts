import { Component, Input } from '@angular/core';
import { FroalaEditorDirective, FroalaViewDirective } from '../lib/froala.directives';

@Component({
  selector: 'app',
  template: `
  <div class="sample">
    <h2>Sample: Full Editor</h2>
    <div [froalaEditor]="configs" (froalaModel)="handleFroalaModelChanged($event)"></div>
    <h4>Rendered Content:</h4>
    <div [froalaView]="content"></div>
  </div>
  `,
  directives: [FroalaEditorDirective, FroalaViewDirective]
})
export class AppComponent {

  public configs: Object = { 
    placeholderText: 'Edit Your Content Here!' 
  }
  public content: string = '';

  public handleFroalaModelChanged(content: string) {
    this.content = content;
  }
}

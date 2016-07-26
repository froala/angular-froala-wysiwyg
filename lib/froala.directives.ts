import { Directive, ElementRef, Renderer, Input, Output, EventEmitter } from '@angular/core';

// non-typescript definitions
declare var $:JQueryStatic;

@Directive({
  selector: '[froalaEditor]'
})
export class FroalaEditorDirective {
  
  private _defaultConfigs = {
    // TODO
  };
  private _configs;
  private _jqueryElement: any;
  private _editor: any;

  constructor(el: ElementRef) {
    this._jqueryElement = (<any>$(el.nativeElement));
  }

  @Output() 
  froalaModel: EventEmitter<string> = new EventEmitter();

  @Input() set froalaEditor(configs: Object){

    this._configs = configs || this._defaultConfigs;
    this._editor = this._jqueryElement.froalaEditor();

    let self = this;
    this._jqueryElement.on('froalaEditor.contentChanged', function () {

        let returnedHtml: any = self._jqueryElement.froalaEditor('html.get');
        if (typeof returnedHtml === 'string') {
          self.froalaModel.emit(returnedHtml);
        }
        
    });
  }
}

@Directive({
  selector: '[froalaView]'
})
export class FroalaViewDirective {

  private _element: HTMLElement;

  constructor(private renderer: Renderer, element: ElementRef) {

    this._element = element.nativeElement;
    this.renderer.setElementClass(this._element, "fr-view", true);
  }

  // update content model as it comes
  @Input() set froalaView(content: any){
    //this._el.value = content;
    this._element.innerHTML = content;
  }
}
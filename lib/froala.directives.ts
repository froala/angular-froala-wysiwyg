import { Directive, ElementRef, Renderer, Input, Output, EventEmitter } from '@angular/core';

// non-typescript definitions
declare var $:JQueryStatic;

@Directive({
  selector: '[froalaEditor]'
})
export class FroalaEditorDirective {

  private _defaultOpts = {
    // TODO
  };
  private _opts;
  private _jqueryElement: any;
  private _editor: any;
  private _initialized: boolean = false;

  constructor(el: ElementRef) {
    this._jqueryElement = (<any>$(el.nativeElement));
  }

  @Output() 
  froalaModel: EventEmitter<string> = new EventEmitter();

  @Input() set froalaEditor(opts: Object){

    this._opts = opts || this._defaultOpts;
    this._editor = this._jqueryElement.froalaEditor(this._opts);

    let self = this;
    this._jqueryElement.on('froalaEditor.contentChanged', function () {

        let returnedHtml: any = self._jqueryElement.froalaEditor('html.get');
        if (typeof returnedHtml === 'string') {
          self.froalaModel.emit(returnedHtml);
        }
        
    });
  }

  @Input() set froalaInit(content: any){

    if (!this._initialized) {
      this._jqueryElement.froalaEditor('html.set', content || '', true);
      //This will reset the undo stack everytime the model changes externally. Can we fix this?
      this._jqueryElement.froalaEditor('undo.reset');
      this._jqueryElement.froalaEditor('undo.saveStep');
      this._initialized = true;
    }
    
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
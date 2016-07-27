import { Directive, ElementRef, Renderer, Input, Output, Optional, EventEmitter } from '@angular/core';

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
  private _initContent: string
  private _initialized: boolean = false;

  constructor(el: ElementRef) {
    this._jqueryElement = (<any>$(el.nativeElement));
  }

  @Input() set froalaEditor(opts: Object) {
    this._opts = opts || this._defaultOpts;
  }

  @Input() set froalaModel(content: string) {

    if (!this._initialized) {

      this._initContent = content;
      this._initialized = true;
    }
  }
  @Output() froalaModelChange: EventEmitter<string> = new EventEmitter<string>();

  ngAfterViewInit() {

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
    let self = this;
    this._jqueryElement.on('froalaEditor.contentChanged', function () {

        let returnedHtml: any = self._jqueryElement.froalaEditor('html.get');
        if (typeof returnedHtml === 'string') {
             self.froalaModelChange.emit(returnedHtml);
        }
        
    });
  }
}

@Directive({
  selector: '[froalaView]'
})
export class FroalaViewDirective {

  private _element: HTMLElement;
  private _content: any;

  constructor(private renderer: Renderer, element: ElementRef) {
    this._element = element.nativeElement;
  }

  // update content model as it comes
  @Input() set froalaView(content: string){
    this._element.innerHTML = content;
  }

  ngAfterViewInit() {
    this.renderer.setElementClass(this._element, "fr-view", true);
  }
}
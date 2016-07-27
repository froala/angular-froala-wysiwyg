import { Directive, ElementRef, Renderer, Input, Output, Optional, EventEmitter } from '@angular/core';

// non-typescript definitions
declare var $:JQueryStatic;

@Directive({
  selector: '[froalaEditor]'
})
export class FroalaEditorDirective {

  // editor options
  private _opts: any = {
    immediateAngularModelUpdate: false
  };

  // jquery wrapped element
  private _jqueryElement: any;

  // editor element
  private _editor: any;

  // initial editor content
  private _initContent: string

  // flag to tell if _initContent is populated
  private _gotContent: boolean = false;

  private _listeningEvents: string[] = [];

  constructor(el: ElementRef) {

    // jquery wrap and store element 
    this._jqueryElement = (<any>$(el.nativeElement));
  }

  // froalaEditor directive as input: store the editor options
  @Input() set froalaEditor(opts: any) {
    this._opts = opts || this._opts;
  }

  // froalaModel directive as input: store initial editor content
  @Input() set froalaModel(content: string) {

    if (!this._gotContent) {

      this._initContent = content;
      this._gotContent = true;
    }
  }
  // froalaModel directive as output: update model if editor contentChanged
  @Output() froalaModelChange: EventEmitter<string> = new EventEmitter<string>();

  // froalaInit directive as output: send manual editor initialization
  @Output() froalaInit: EventEmitter<Object> = new EventEmitter<Object>();

  // update model if editor contentChanged
  private updateModel() {

    let returnedHtml: any = this._jqueryElement.froalaEditor('html.get');
    if (typeof returnedHtml === 'string') {
         this.froalaModelChange.emit(returnedHtml);
    }
  }

  // register event on jquery element
  private registerEvent(element, eventName, callback) {

    if (!element || !eventName || !callback) {
      return;
    }

    this._listeningEvents.push(eventName);
    element.on(eventName, callback);
  }

  private initListeners() {

    let self = this;

    // bind contentChange and keyup event to froalaModel
    this.registerEvent(this._jqueryElement, 'froalaEditor.contentChanged',function () {
      self.updateModel();
    });
    if (this._opts.immediateAngularModelUpdate) {
      this.registerEvent(this._editor, 'keyup', function () {
        self.updateModel(); 
      });
    }
  }

  // register events from editor options
  private registerFroalaEvents() {

    if (!this._opts.events) {
      return;
    }

    for (var eventName in this._opts.events) {

      if (this._opts.events.hasOwnProperty(eventName)) {
          this.registerEvent(this._jqueryElement, eventName, this._opts.events[eventName]);
      }
    }
  }

  private createEditor() {

    let self = this;

    // set initial content
    if (this._initContent) {

      this.registerEvent(this._jqueryElement, 'froalaEditor.initialized', function () {

        self._jqueryElement.froalaEditor('html.set', self._initContent || '', true);
        //This will reset the undo stack everytime the model changes externally. Can we fix this?
        self._jqueryElement.froalaEditor('undo.reset');
        self._jqueryElement.froalaEditor('undo.saveStep');
      });
    }

    // Registering events before initializing the editor will bind the initialized event correctly.
    this.registerFroalaEvents();

    // init editor
    this._editor = this._jqueryElement.froalaEditor(this._opts).data('froala.editor').$el;

    this.initListeners();
  }

  private destroyEditor() {

    if (this._jqueryElement) {

      this._jqueryElement.off(this._listeningEvents.join(" "));
      this._editor.off('keyup');
      this._jqueryElement.froalaEditor('destroy');
      this._listeningEvents.length = 0;
    }
  }

  private getEditor() {

    if (this._jqueryElement) {
      return this._jqueryElement.froalaEditor.bind(this._jqueryElement);
    }
    return null;
  }

  // send manual editor initialization
  private generateManualController() {

    var self = this;
    var controls = {
      initialize: this.createEditor.bind(this),
      destroy: this.destroyEditor.bind(this),
      getEditor: this.getEditor.bind(this),
    };
    this.froalaInit.emit(controls);
  }

  // TODO not sure if ngOnInit is executed after @inputs
  ngOnInit() {

    // check if output froalaInit is present. Maybe observers is private and should not be used?? TODO how to better test that an output directive is present. 
    if (!this.froalaInit.observers.length) {
      this.createEditor();
    } else {
      this.generateManualController();
    }
  }

  ngOnDestroy() {
    this.destroyEditor();
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
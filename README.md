# angular2-froala-wyswiyg
>angular2-froala-wyswiyg provides Angular2 bindings to the froala WYSIWYG editor VERSION 2.

## Version 2
This repository contains bindings for the latest version of the Froala Editor (version 2). Checkout the `V1` branch for support of Version 1 of the editor.

## Installation

1. Clone this repo or download the zip.

2. Run `bower install` or Download the editor from [https://www.froala.com/wysiwyg-editor/](https://www.froala.com/wysiwyg-editor/) and jQuery

3. Load Froala WYSIWYG editor (and all desired plugins), jQuery and the angular2 directives file into your project.  
  - lib/froala.directives.ts
  
 ***NB***: You must ensure jQuery is included *before* angular2. 

## Usage

1. Import froala directives: <br /> `import { FroalaEditorDirective, FroalaViewDirective } from 'path/to/froala.directives';`

2. Use them in your component:

```typescript
@Component({
  selector: 'app',
  template: `
    <div [froalaEditor]="options" [(froalaModel)]="content"></div>
  `,
  directives: [FroalaEditorDirective]
})
```

You can check **src/app.component.ts** file for a more detailed usage example.

* 'src' directory contains a working example that will need a server to run. To run them: `npm start`.

* 'demo' directory contains a minified working example that can run without a server. To build demo/app.js in case you've modified the sources(src dir): `npm run build`. To run: open demo/index.html directly into browser.

## Directives, Inputs, Outputs

### FroalaEditorDirective:

#### [froalaEditor] 
**Description**: Handles the editor initialization. You can pass editor options as Input (optional).

**Usage**: `[froalaEditor]='options'` or `[froalaEditor]`

**Options**:

You can pass any existing Froala option. Consult the [Froala documentation](https://www.froala.com/wysiwyg-editor/docs/options) to view the list of all the available options:

```typescript
  public options: Object = { 
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false
  }
```

Aditional option is used:
 * **immediateAngularModelUpdate**: (default: false) This option synchronizes the angular model as soon as a key is released in the editor. Note that it may affect performances.

**Events and Methods**: 

Events can be passed in with the options, with a key events and object where the key is the event name and the value is the callback function.

```typescript
  public options: Object = {
    placeholder: "Edit Me",
    events : {
      'froalaEditor.focus' : function(e, editor) {
        console.log(editor.selection.get());
      }
    }
```

Using the editor instance from the arguments of the callback you can call editor methods as described in the [method docs](http://froala.com/wysiwyg-editor/docs/methods).

Froala events are described in the [events docs](https://froala.com/wysiwyg-editor/docs/events).

#### [(froalaModel)] 

**Description**: Editor content model.

**Usage**:  `[(froalaModel)]="editorContent"`

Pass initial content:

```typescript
  public editorContent: string = 'My Document\'s Title'
```

Use the content in other places:

```html
  <input [ngModel]="editorContent"/>
```

#### (froalaInit)

**Description**: Gets the functionality to operate on the editor: create, destroy and get editor instance. Use it if you want to manually initialize the editor.

**Usage**: `(froalaInit)="initialize($event)"`

```typescript
  public initialize(initControls) {
    this.initControls = initControls;
    this.deleteAll = function() {
        this.initControls.getEditor()('html.set', '');
    };
  }
```

Where *initialize* is the name of a function in your component which will receive an object with different methods to control the editor initialization process.

The object received by the function will contain the following methods:

- **initialize**: Call this method to initialize the Froala Editor
- **destroy**: Call this method to destroy the Froala Editor
- **getEditor**: Call this method to retrieve the editor that was created. This method will return *null* if the editor was not yet created


### FroalaViewDirective:

#### [froalaView]

**Description**: Display content created with the froala editor

**Usage**: `[froalaView]="editorContent"`

```html
<div [froalaEditor] [(froalaModel)]="editorContent"></div>
<div [froalaView]="editorContent"></div>
```

## License

The `angular2-froala-wyswiyg` project is under MIT license. However, in order to use Froala WYSIWYG HTML Editor plugin you should purchase a license for it.

Froala Editor has [3 different licenses](http://froala.com/wysiwyg-editor/pricing) for commercial use.
For details please see [License Agreement](http://froala.com/wysiwyg-editor/terms).

## Development environment setup

If you want to contribute to angular2-froala-wyswiyg, you will first need to install the required tools to get the project going.

#### Prerequisites

* [Node Package Manager](https://npmjs.org/) (NPM)
* [Git](http://git-scm.com/)

#### Dependencies

* [Bower](http://bower.io/) (package management)

##### 1. Install Bower

    $ npm install -g grunt-cli bower

##### 2. Install project dependencies

    $ npm install
    $ bower install

##### 3. Run in development mode. Is loads the src files that make use of lib/froala.directives
    $ npm start

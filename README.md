# Angular Froala WYSIWYG Editor - [Demo](https://www.froala.com/wysiwyg-editor)

[![npm](https://img.shields.io/npm/v/angular-froala-wysiwyg.svg)](https://www.npmjs.com/package/angular-froala-wysiwyg)
[![npm](https://img.shields.io/npm/dm/angular-froala-wysiwyg.svg)](https://www.npmjs.com/package/angular-froala-wysiwyg)
[![npm](https://img.shields.io/npm/l/angular-froala-wysiwyg.svg)](https://www.npmjs.com/package/angular-froala-wysiwyg)

>Angular 19+ bindings for Froala WYSIWYG Editor.

![WYSIWYG HTML Editor](https://raw.githubusercontent.com/froala/wysiwyg-editor/v2/editor.jpg)

## Table of contents
1. [Installation instructions](#installation-instructions)
2. [Update editor instructions](#update-editor-instructions)
3. [Integration](#integration)
   - [Angular CLI](#use-with-angular-cli)
   - [Standalone components](#standalone-components)
   - [NgModule applications](#ngmodule-applications)
   - [Server-side rendering](#server-side-rendering)
4. [Usage](#usage)
5. [Manual Initialization](#manual-initialization)
6. [Displaying HTML](#displaying-html)
7. [License](#license)
8. [Development environment setup](#development-environment-setup)

## Installation instructions

Install `angular-froala-wysiwyg` from `npm`

```bash
npm install angular-froala-wysiwyg
```

This also installs the matching version of `froala-editor`, which `angular-froala-wysiwyg` depends on.

You will need the editor CSS. Add it to the `styles` array in `angular.json`, as shown in [Use with Angular CLI](#use-with-angular-cli).

>Note: if you want to use Font Awesome icons (for example with the `font_awesome` third-party plugin), install it as well:
- Run `npm install font-awesome`
- Or add the CDN link to `src/index.html`:
 `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">`


## Update editor instructions

`angular-froala-wysiwyg` pins the exact `froala-editor` version it was built and tested against, so update the wrapper to get a newer editor:

```bash
npm install angular-froala-wysiwyg@latest
```

## Integration

### Use with Angular CLI

#### Installing @angular/cli

*Note*: you can skip this part if you already have an application generated.

```bash
npm install -g @angular/cli
ng new my-app
cd my-app
```

#### Add angular-froala-wysiwyg

- install `angular-froala-wysiwyg`

```bash
npm install angular-froala-wysiwyg
```

- open `angular.json` and add the editor styles to the `styles` array of your project's `build` options

```json
"styles": [
  "src/styles.css",
  "node_modules/froala-editor/css/froala_editor.pkgd.min.css",
  "node_modules/froala-editor/css/froala_style.min.css"
]
```

- import the editor modules — see [Standalone components](#standalone-components) (the default for new Angular apps) or [NgModule applications](#ngmodule-applications)

- add the editor to a template, for example `src/app/app.html` (`src/app/app.component.html` in projects generated before Angular 20)

```html
<div [froalaEditor]>Hello, Froala!</div>
```

#### Run angular-cli
```bash
ng serve
```

### Standalone components

New Angular CLI applications use standalone components and have no `app.module.ts`. The Froala directives are provided through `FroalaEditorModule` and `FroalaViewModule`, which you import directly into the component that uses them:

```typescript
import { Component } from '@angular/core';

// Import all Froala Editor plugins.
// import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
// import 'froala-editor/js/plugins/align.min.js';

// Import a Froala Editor language file.
// import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
// import 'froala-editor/js/third_party/font_awesome.min';
// import 'froala-editor/js/third_party/image_tui.min';
// import 'froala-editor/js/third_party/spell_checker.min';
// import 'froala-editor/js/third_party/embedly.min';

// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'app-root',
  imports: [FroalaEditorModule, FroalaViewModule],
  templateUrl: './app.html'
})
export class App {}
```

In projects generated before Angular 20 the component is `AppComponent` in `app.component.ts`, with its template in `app.component.html`.

#### Production builds

Importing plugins at the top of a file puts the whole editor in the initial bundle. With `plugins.pkgd.min.js` that's about 2.5 MB, and even a single plugin is over the 1 MB error budget a new project starts with, so `ng build` fails. Raise the `initial` budget in the `production` configuration in `angular.json`:

```json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "3MB",
    "maximumError": "4MB"
  },
  ...
]
```

`froala-editor` is a CommonJS package, so the build also warns about it. To silence that, add it to the `build` options in `angular.json`:

```json
"allowedCommonJsDependencies": ["froala-editor"]
```

### NgModule applications

If your application is bootstrapped with an `NgModule`, open the module (for example `src/app/app-module.ts`, or `src/app/app.module.ts` in projects generated before Angular 20) and add:

```typescript
// Import all Froala Editor plugins.
// import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
// import 'froala-editor/js/plugins/align.min.js';

// Import a Froala Editor language file.
// import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
// import 'froala-editor/js/third_party/font_awesome.min';
// import 'froala-editor/js/third_party/image_tui.min';
// import 'froala-editor/js/third_party/spell_checker.min';
// import 'froala-editor/js/third_party/embedly.min';

// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
...

@NgModule({
   ...
   imports: [FroalaEditorModule.forRoot(), FroalaViewModule.forRoot() ... ],
   ...
})
```

`FERootModule` is also exported as a shortcut: importing it is the same as importing both modules with `forRoot()`.

### Server-side rendering

The editor needs a browser, so it is only created in the browser: the directive checks the platform and loads `froala-editor` dynamically. Plugin, language and third-party files must be loaded the same way, otherwise they run on the server. Import them from the component instead of at the top of the file.

An editor only picks up the plugins that are loaded when it's created, so wait for the imports to finish before rendering it:

```typescript
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'app-root',
  imports: [FroalaEditorModule, FroalaViewModule],
  templateUrl: './app.html'
})
export class App implements OnInit {
  // Render the editor only once its plugins have loaded.
  pluginsLoaded = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit() {
    // Import Froala plugins dynamically only in the browser context
    if (isPlatformBrowser(this.platformId)) {
      await Promise.all([
        // Import all Froala Editor plugins.
        // @ts-ignore
        import('froala-editor/js/plugins.pkgd.min.js'),

        // Import a single Froala Editor plugin.
        // @ts-ignore
        // import('froala-editor/js/plugins/align.min.js'),

        // Import a Froala Editor language file.
        // @ts-ignore
        // import('froala-editor/js/languages/de.js'),

        // Import a third-party plugin.
        // @ts-ignore
        // import('froala-editor/js/third_party/font_awesome.min'),
        // @ts-ignore
        // import('froala-editor/js/third_party/image_tui.min'),
        // @ts-ignore
        // import('froala-editor/js/third_party/spell_checker.min'),
        // @ts-ignore
        // import('froala-editor/js/third_party/embedly.min'),
      ]);
      this.pluginsLoaded.set(true);
    }
  }
}
```

```html
@if (pluginsLoaded()) {
  <div [froalaEditor]>Hello, Froala!</div>
}
```

`froalaView` doesn't need the editor, so it renders on the server as usual.


## Usage

### Options

You can pass editor options as Input (optional).

`[froalaEditor]='options'`

You can pass any existing Froala option. Consult the [Froala documentation](https://froala.com/wysiwyg-editor/docs/options/) to view the list of all the available options:

```typescript
public options: Object = {
  placeholderText: 'Edit Your Content Here!',
  charCounterCount: false
}
```

Additional option is used:
* **immediateAngularModelUpdate**: (default: false) This option synchronizes the angular model as soon as a key is released in the editor. Note that it may affect performance.



### Events and Methods

Events can be passed in with the options, with a key events and object where the key is the event name and the value is the callback function. Inside the callback, `this` is the editor instance, so use a regular `function` rather than an arrow function:

```typescript
public options: Object = {
  placeholderText: 'Edit Me',
  events : {
    'focus' : function(this: any) {
      console.log(this.selection.get());
    }
  }
}
```

Using the editor instance you can call editor methods as described in the [method docs](https://froala.com/wysiwyg-editor/docs/methods/).

Froala events are described in the [events docs](https://froala.com/wysiwyg-editor/docs/events/).



### Model

The WYSIWYG HTML editor content model.

`[(froalaModel)]="editorContent"`

Pass initial content:

```typescript
public editorContent: string = 'My Document\'s Title'
```

Use the content in other places (`ngModel` needs `FormsModule` from `@angular/forms` in the component's `imports`):

```html
<input [ngModel]="editorContent"/>
<input [(ngModel)]="editorContent"/> <!-- For two way binding -->
```

Other two way binding example:

```html
<div [froalaEditor] [(froalaModel)]="editorContent"></div>
<div [froalaEditor] [(froalaModel)]="editorContent"></div>
```

Use it with reactive forms (add `ReactiveFormsModule` from `@angular/forms` to the component's `imports`):

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <textarea [froalaEditor] formControlName="formModel"></textarea>
  <button type="submit">Submit</button>
</form>
```

To display the form value in other places, read it from the form. With typed forms the value can be `null` or `undefined`, so give `froalaView` a fallback:

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <textarea [froalaEditor] formControlName="formModel"></textarea>
  <div [froalaView]="form.value.formModel ?? ''"></div>
  <button type="submit">Submit</button>
</form>
```

If you want to wrap froalaEditor directive into a component that supports reactive forms please see [froala.component.ts](https://github.com/froala/angular-froala-wysiwyg/blob/master/projects/demo/src/app/froala.component.ts) from demo.

### Extend functionality

You can extend the functionality by adding a custom button like below:

```typescript
// Import Froala Editor.
import FroalaEditor from 'froala-editor';

// We will make usage of the Init hook and make the implementation there.
import { Component, OnInit } from '@angular/core';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'app-demo',
  imports: [FroalaEditorModule],
  template: `<div class="sample">
               <h2>Sample 11: Add Custom Button</h2>
               <div [froalaEditor]="options" [(froalaModel)]="content"></div>
             </div>`
})
export class AppComponent implements OnInit {

  public content: string = '';

  ngOnInit () {
    FroalaEditor.DefineIcon('alert', {NAME: 'info', SVG_KEY: 'help'});
    FroalaEditor.RegisterCommand('alert', {
      title: 'Hello',
      focus: false,
      undo: false,
      refreshAfterCallback: false,

      callback: () => {
        alert('Hello!');
      }
    });
  }

  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };
}
```

On the server, `froala-editor` cannot be imported at the top of a file — see [Server-side rendering](#server-side-rendering).


### Special tags
Note: In order to use special tags, import the editor plugins where you import the Froala modules:
```typescript
// Import all Froala Editor plugins.
import 'froala-editor/js/plugins.pkgd.min.js';
```

You may also use the editor on **img**, **button**, **input** and **a** tags:

```html
<img [froalaEditor] [(froalaModel)]="imgObj"/>
```

The model must be an object containing the attributes for your special tags. Example:

```typescript
public imgObj: Object = {
  src: 'path/to/image.jpg'
};
```

The froalaModel will change as the attributes change during usage.

* froalaModel can contain a special attribute named **innerHTML** which inserts innerHTML in the element: If you are using 'button' tag, you can specify the button text like this:

```typescript
public buttonModel: Object = {
  innerHTML: 'Click Me'
};
```
As the button text is modified by the editor, the **innerHTML** attribute from `buttonModel` will be modified too.



### Specific option for special tags

* **angularIgnoreAttrs**: (default: null) This option is an array of attributes that you want to ignore when the editor updates the froalaModel:

```typescript
public inputOptions: Object = {
  angularIgnoreAttrs: ['class', 'id']
};
```



## Manual Initialization

Gets the functionality to operate on the editor: create, destroy and get editor instance. Use it if you want to manually initialize the editor.

`(froalaInit)="initialize($event)"`

Where `initialize` is the name of a function in your component which will receive an object with different methods to control the editor initialization process.

```typescript
public initControls: any;

public initialize(initControls: any) {
  this.initControls = initControls;
}

public deleteAll() {
  this.initControls.getEditor().html.set('');
}
```

The object received by the function will contain the following methods:

- **initialize**: Call this method to initialize the Froala Editor
- **destroy**: Call this method to destroy the Froala Editor
- **getEditor**: Call this method to retrieve the editor that was created. There is no editor instance to return until `initialize` has been called



## Displaying HTML

To display content created with the froala editor use the froalaView directive.

`[froalaView]="editorContent"`

```html
<div [froalaEditor] [(froalaModel)]="editorContent"></div>
<div [froalaView]="editorContent"></div>
```



## License

The `angular-froala-wysiwyg` project is under MIT license. However, in order to use Froala WYSIWYG HTML Editor plugin you should purchase a license for it.

Froala Editor has [3 different licenses](https://froala.com/wysiwyg-editor/pricing/) for commercial use.
For details please see [License Agreement](https://froala.com/wysiwyg-editor/terms/).



## Development environment setup

If you want to contribute to angular-froala-wysiwyg, you will first need to install the required tools to get the project going.

#### Prerequisites

* [Node Package Manager](https://www.npmjs.com/) (NPM)
* [Git](https://git-scm.com/)

#### Install dependencies

    $ npm install

#### Build the library

    $ npm run build

#### Build the demo

    $ npm run demo.build

#### Run Demo

    $ npm run start

import 'froala-editor/js/plugins.pkgd.min.js';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FroalaComponent } from "./froala.component";
import { FroalaEditorModule } from '../../../src/editor/index';
import { FroalaViewModule } from '../../../src/view/index';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ AppComponent, FroalaComponent ],
  imports:      [ BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, FroalaEditorModule, FroalaViewModule ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
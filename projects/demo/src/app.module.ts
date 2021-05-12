import 'froala-editor/js/plugins.pkgd.min.js';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FroalaComponent } from "./app/froala.component";
import { FroalaEditorModule } from 'angular-fraola-wysiwyg';
import { FroalaViewModule } from 'angular-fraola-wysiwyg';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent, FroalaComponent],
  imports: [BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, FroalaEditorModule, FroalaViewModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}

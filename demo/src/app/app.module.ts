import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { FroalaEditorModule } from 'angular2-froala-wysiwyg/editor';
import { FroalaViewModule } from 'angular2-froala-wysiwyg/view';

@NgModule({
  declarations: [ AppComponent ],
  imports:      [ BrowserModule, CommonModule, FormsModule, FroalaEditorModule, FroalaViewModule ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
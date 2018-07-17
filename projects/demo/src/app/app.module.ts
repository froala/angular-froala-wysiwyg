import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FroalaComponent } from './froala.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [ AppComponent, FroalaComponent ],
  imports:      [ BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, FroalaEditorModule, FroalaViewModule ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }

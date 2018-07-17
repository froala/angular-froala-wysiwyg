import { NgModule } from '@angular/core';

import { FroalaEditorModule } from './editor/editor.module';
import { FroalaViewModule } from './view/view.module';

const MODULES = [
  FroalaEditorModule,
  FroalaViewModule,
];

@NgModule({
  imports: [
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  exports: MODULES,
})
export class FroalaModule {
}

import { NgModule } from '@angular/core';
import { FroalaEditorModule } from './editor/editor.module';
import { FroalaViewModule } from './view/view.module';

@NgModule({
  imports: [
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  exports: [
    FroalaEditorModule,
    FroalaViewModule
  ]
})
export class FERootModule {

}

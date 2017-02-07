import { ModuleWithProviders, NgModule } from '@angular/core';

import {FroalaEditorModule} from './editor';
import {FroalaViewModule} from './view';

export {
  FroalaEditorDirective,
  FroalaEditorModule
} from './editor';

export {
  FroalaViewDirective,
  FroalaViewModule
} from './view';

const MODULES = [
  FroalaEditorModule,
  FroalaViewModule
]

@NgModule({
 imports: [
   FroalaEditorModule.forRoot(),
   FroalaViewModule.forRoot()
 ],
 exports: MODULES
})
export class FERootModule {

}
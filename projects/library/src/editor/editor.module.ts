import { NgModule, ModuleWithProviders } from '@angular/core';

import { FroalaEditorDirective } from './editor.directive';

@NgModule({
  declarations: [FroalaEditorDirective],
  exports: [FroalaEditorDirective]
})

export class FroalaEditorModule {
  public static forRoot(): ModuleWithProviders<FroalaEditorModule> {
    return {ngModule: FroalaEditorModule, providers: []};
  }
}

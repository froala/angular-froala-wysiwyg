import { ModuleWithProviders, NgModule } from "@angular/core";

import { FROALA_EDITOR_CONFIG, FroalaEditorConfig } from "./editor.config";
import { FroalaEditorDirective } from "./editor.directive";

@NgModule({
  declarations: [FroalaEditorDirective],
  exports: [FroalaEditorDirective],
})
export class FroalaEditorModule {
  public static forRoot(
    config: FroalaEditorConfig = {},
  ): ModuleWithProviders<FroalaEditorModule> {
    return {
      ngModule: FroalaEditorModule,
      providers: [{ provide: FROALA_EDITOR_CONFIG, useValue: config }],
    };
  }
}

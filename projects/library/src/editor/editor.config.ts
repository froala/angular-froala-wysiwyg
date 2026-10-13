import { InjectionToken } from "@angular/core";

export interface FroalaEditorConfig {
  key?: string;
}

export const FROALA_EDITOR_CONFIG = new InjectionToken<FroalaEditorConfig>(
  "FROALA_EDITOR_CONFIG",
);

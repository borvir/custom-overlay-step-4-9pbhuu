import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
} from '@angular/material';

import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { FilePreviewOverlayComponent } from './file-preview-overlay.component';
import { FilePreviewOverlayService } from './file-preview-overlay.service';
import { FilePreview2OverlayComponent } from './overlay2.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    OverlayModule,
  ],
  declarations: [
    AppComponent,
    FilePreviewOverlayComponent,
    FilePreview2OverlayComponent,
  ],
  bootstrap: [AppComponent],
  providers: [FilePreviewOverlayService],
  entryComponents: [FilePreviewOverlayComponent, FilePreview2OverlayComponent],
})
export class AppModule {}

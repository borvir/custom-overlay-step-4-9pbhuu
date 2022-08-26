import { Component } from '@angular/core';
import { FilePreviewOverlayService } from './file-preview-overlay.service';

import { FilePreviewOverlayRef } from './file-preview-overlay-ref';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  files = [
    { name: 'image_1.jpg', path: '' },
    { name: 'image_2.jpg', path: '' },
    { name: 'image_3.jpg', path: '' },
    { name: 'image_4.jpg', path: '' },
    { name: 'image_5.jpg', path: '' },
  ];

  constructor(private previewDialog: FilePreviewOverlayService) {}

  showPreview() {
    let dialogRef: FilePreviewOverlayRef = this.previewDialog.open(
      {},
      this.previewDialog
    );
  }

  showPreview2() {
    let dialogRef: FilePreviewOverlayRef = this.previewDialog.opensecond(
      {},
      this.previewDialog
    );
  }
}

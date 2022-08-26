import { Component, Input, Inject, Injector } from '@angular/core';
import { INIT_DATA } from './file-preview-overlay.service';

@Component({
  selector: 'file-preview-overlay',
  templateUrl: './overlay1.html',
  styleUrls: ['./overlay1.scss'],
})
export class FilePreviewOverlayComponent {
  constructor(private inj: Injector) {
    // console.log('initialData ', this.inj.get(INIT_DATA));
  }
  closeModal() {
    this.inj.get(INIT_DATA)._service.close();
    console.log('Close modal');
  }
}

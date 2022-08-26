import {
  Injectable,
  Inject,
  OnInit,
  Injector,
  InjectionToken,
} from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { FilePreviewOverlayComponent } from './file-preview-overlay.component';

import { FilePreviewOverlayRef } from './file-preview-overlay-ref';
import { FilePreview2OverlayComponent } from './overlay2.component';

export const INIT_DATA = new InjectionToken<ContainerData>('INIT_DATA');

export interface ContainerData {
  _service: FilePreviewOverlayService;
}

interface FilePreviewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel',
};

@Injectable()
export class FilePreviewOverlayService {
  dialogRef;
  constructor(private injector: Injector, private overlay: Overlay) {}

  createInjector(data): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(INIT_DATA, data);
    return new PortalInjector(this.injector, injectorTokens);
  }

  open(config: FilePreviewDialogConfig = {}, initialData: any) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    this.dialogRef = new FilePreviewOverlayRef(overlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(
      FilePreviewOverlayComponent,
      null,
      this.createInjector(Object.assign(initialData, { _service: this }))
    );

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);

    overlayRef.backdropClick().subscribe((_) => this.dialogRef.close());

    return this.dialogRef;
  }

  opensecond(config: FilePreviewDialogConfig = {}, initialData: any) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    this.dialogRef = new FilePreviewOverlayRef(overlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(
      FilePreview2OverlayComponent,
      null,
      this.createInjector(Object.assign(initialData, { _service: this }))
    );

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);

    overlayRef.backdropClick().subscribe((_) => this.dialogRef.close());

    return this.dialogRef;
  }

  close() {
    this.dialogRef.close();
  }

  private createOverlay(config: FilePreviewDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }
}

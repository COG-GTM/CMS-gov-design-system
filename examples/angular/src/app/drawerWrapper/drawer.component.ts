import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  isOpen = input<string>();
  readonly isOpenChange = output<void>();
  footerBody = input<string>();
  footerTitle = input<string>();
  drawerHeading = input<string>();

  closeDrawer() {
    this.isOpenChange.emit();
  }
}

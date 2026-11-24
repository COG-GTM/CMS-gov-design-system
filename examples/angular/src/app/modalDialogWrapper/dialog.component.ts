import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  isOpen = input<string>();
  root_id = input<string>();
  size = input<string>();
  backdrop_click_exits = input<string>();
  heading = input<string>();

  readonly isOpenChange = output<void>();

  close() {
    this.isOpenChange.emit();
  }

  analyticsEvent() {
    console.log('Dialog analytics event');
  }
}

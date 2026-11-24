import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { AccordionComponent } from './accordionWrapper/accordion.component';
import { AccordionItemComponent } from './accordionItemWrapper/accordionItem.component';
import { AlertComponent } from './alertWrapper/alert.component';
import { AutocompleteComponent } from './autocompleteWrapper/autocomplete.component';
import { ButtonComponent } from './buttonWrapper/button.component';
import { DialogComponent } from './modalDialogWrapper/dialog.component';
import { ReviewComponent } from './reviewWrapper/review.component';
import { DrawerComponent } from './drawerWrapper/drawer.component';
import { ThirdPartyExternalLinkComponent } from './thirdPartyExternalLinkWrapper/thirdPartyExternalLink.component';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    AlertComponent,
    AutocompleteComponent,
    ButtonComponent,
    DialogComponent,
    DrawerComponent,
    ThirdPartyExternalLinkComponent,
    ReviewComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Angular Web Components';

  // Alert Data:
  alertVariation: string | null = null;
  unwrappedAlertHeading = 'Unwrapped Alert';
  unwrappedAlertMessage = 'This alert is not wrapped';
  unWrappedAlertVariation = 'warn';
  wrappedAlertHeading = signal('Wrapped Alert');
  wrappedAlertMessage = 'This alert is wrapped!';
  wrappedAlertVariation = signal('success');

  // Button Data:
  buttonVariation = signal<string | null>(null);
  outlineVariation = 'outline';
  ghostVariation = 'ghost';
  solidVariation = 'solid';
  buttonWarn = signal(false);
  buttonText = signal("I'm only gonna tell you once.");
  toggleClasses = 'ds-c-drawer__toggle';

  setToWarning(warning: string) {
    this.wrappedAlertVariation.set(warning);
    this.wrappedAlertHeading.set('Whoa clicked');
    this.buttonWarn.set(true);
    this.buttonText.set("You've been warned.");
    this.buttonVariation.set(this.solidVariation);
  }

  // Accordion Data:
  bordered = 'true';

  // Accordion Item data:
  headingLevel = '2';
  liked = signal(true);

  setLiked(e: Event) {
    const value = ((e as any).detail.target as HTMLInputElement).value === 'true';
    this.liked.set(value);
  }

  alertLiked() {
    if (this.liked()) {
      alert('Glad you liked this!');
    } else {
      alert('Sorry you did not like this content.');
    }
  }

  // Autocomplete Data:
  ariaClearLabel = 'Clear search';
  ariaCompleteLabel = 'Autocomplete';
  // autofocus = 'true';
  className = 'ds-u-padding-bottom--7';
  clearSearchButton = 'true';
  disabled = 'false';
  errorId = 'autocomplete-error';
  // errorMessage = 'This is an error message';
  errorMessageClassName = 'ds-c-autocomplete__error-message';
  errorPlacement = 'top';
  hint =
    'Type a letter to see results, then use ARROW keys to change options, ENTER key to make a selection, ESC to dismiss.';
  hintClassName = 'ds-c-autocomplete__hint';
  hintId = 'autocomplete-hint';
  id = 'the-autocomplete';
  items = JSON.stringify([
    {
      id: 'group-a',
      label: 'Group A',
      items: [
        {
          id: 'alabama',
          name: 'Alabama',
        },
        { id: 'alaska', name: 'Alaska' },
        { id: 'arizona', name: 'Arizona' },
        { id: 'arkansas', name: 'Arkansas' },
      ],
    },
    {
      id: 'group-c',
      label: 'Group C',
      items: [
        { id: 'california', name: 'California' },
        { id: 'colorado', name: 'Colorado' },
        { id: 'connecticut', name: 'Connecticut' },
      ],
    },
    { id: 'group-d', label: 'Group D', items: [{ id: 'delaware', name: 'Delaware' }] },
  ]);
  label = 'Select a state.';
  labelClassName = 'ds-c-autocomplete__label';
  labelId = 'autocomplete-label';
  loading = 'false';
  menuHeading = 'States by letter';
  menuHeadingId = 'autocomplete-menu-heading';
  name = 'autocomplete';
  requirementLabel = 'Required';
  rootId = 'autocomplete-root';

  // Modal Dialog Data:
  is_open = signal('false');
  root_id = 'modal-dialog';
  size = 'wide';
  backdrop_click_exits = 'true';
  dialogHeading = 'This is the modal heading.';

  openDialog() {
    this.is_open.set('true');
  }

  closeDialog() {
    this.is_open.set('false');
  }

  // Review Data:
  href = '#';
  reviewElements = [
    {
      heading: 'Review item one',
      content: 'This is the first review.',
      editText: 'Edit if you dare!',
      id: '1',
    },
    {
      heading: 'Review item two',
      content: 'This is the second review.',
      editText: 'Edit if you dare, again!',
      id: '2',
    },
    {
      heading: 'Review item three',
      content: 'This is the third review.',
      editText: 'Triple-dog-dare you to edit me!',
      id: '3',
    },
  ];

  // Drawer Data:
  drawerHeading = 'Drawer Heading';
  footerTitle = 'Footer Title';
  footerBody = 'Footer content';
  drawerOpen = signal('false');
  openDrawer() {
    this.drawerOpen.set('true');
  }
  closeDrawer() {
    this.drawerOpen.set('false');
  }

  // Third Party Link Data:
  tplHref = 'https://www.google.com/';
  learnMoreUrl = 'https://design.cms.gov/components/third-party-external-link/';
  origin = 'CMS Design System';
}

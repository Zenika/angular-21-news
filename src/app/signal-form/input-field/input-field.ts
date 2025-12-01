import { Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.html',
})
export class InputField implements FormValueControl<string> {
  label = input.required<string>();

  // ----- FormValueControl -----

  name = input('');

  value = model('');

  touched = model(false);

  disabled = model(false);

  required = input(false);

  invalid = input(false);

  errors = input<readonly WithOptionalField<ValidationError>[]>([]);

  /*
  checked?: undefined;
  disabled?: InputSignal<boolean> | undefined;
  disabledReasons?: InputSignal<readonly WithOptionalField<DisabledReason>[]> | undefined;
  readonly?: InputSignal<boolean> | undefined;
  hidden?: InputSignal<boolean> | undefined;
  pending?: InputSignal<boolean> | undefined;
  dirty?: InputSignal<boolean> | undefined;
  min?: InputSignal<number | undefined> | undefined;
  minLength?: InputSignal<number | undefined> | undefined;
  max?: InputSignal<number | undefined> | undefined;
  maxLength?: InputSignal<number | undefined> | undefined;
  pattern?: InputSignal<readonly RegExp[]> | undefined;
  */
}

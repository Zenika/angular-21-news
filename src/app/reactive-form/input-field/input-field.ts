import { Component, computed, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputField),
      multi: true,
    },
  ],
})
export class InputField implements ControlValueAccessor {
  label = input.required<string>();

  name = input.required<string>();

  type = input<'text' | 'password'>('text');

  value = model('');

  touched = model(false);

  disabled = model(false);

  required = input(false);

  errorMessage = input<string>();

  invalid = computed(() => !!this.errorMessage());

  protected updateValue(value: string) {
    this.value.set(value);
    this.onChange(value);
  }

  protected updateTouched() {
    if (this.touched()) {
      return;
    }
    this.touched.set(true);
    this.onTouched();
  }

  // ----- ControlValueAccessor -----

  protected onChange = (value: string): void => undefined; // eslint-disable-line @typescript-eslint/no-unused-vars

  protected onTouched = (): void => undefined;

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled.set(disabled);
  }
}

import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessagePipe } from './error-message-pipe';
import { InputField } from './input-field/input-field';

@Component({
  selector: 'app-reactive-form',
  imports: [JsonPipe, ReactiveFormsModule, ErrorMessagePipe, InputField],
  templateUrl: './reactive-form.html',
})
export class ReactiveForm {
  private fb = inject(NonNullableFormBuilder);

  protected form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],

    location: this.fb.group({
      name: ['', [Validators.required]],
      address: [''],
    }),
  });

  protected errorMessageMap: Record<string, string> = {
    required: 'Field required',
    email: 'Must be a valid email',
    minlength: 'Must contain at least 5 characters',
  };

  protected submit() {
    this.form.disable();

    setTimeout(() => {
      console.log('Form submitted', this.form.value);
      this.form.enable();
    }, 2000);
  }
}

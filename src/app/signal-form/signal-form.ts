import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { disabled, email, Field, form, minLength, required, submit } from '@angular/forms/signals';
import { InputField } from './input-field/input-field';

@Component({
  selector: 'app-signal-form',
  imports: [JsonPipe, Field, InputField],
  templateUrl: './signal-form.html',
})
export class SignalForm {
  protected formModel = signal({
    email: '',
    password: '',

    location: {
      name: '',
      address: '',
    },
  });

  protected form = form(this.formModel, (path) => {
    required(path.email, { message: 'Feld required' });
    email(path.email, { message: 'Invalid email' });

    required(path.password, { message: 'Feld required' });
    minLength(path.password, 5, { message: 'Must contain at least 5 characters' });

    required(path.location.name, { message: 'Feld required' });

    disabled(path, () => this.form().submitting());
  });

  submit(event: SubmitEvent) {
    event.preventDefault();

    submit(this.form, async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Form submitted', this.form().value());
          resolve();
        }, 2000);
      });
    });
  }
}

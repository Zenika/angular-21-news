# Angular 21 - Signal Forms vs Reactive Forms

This project demonstrates the new **Signal Forms** feature introduced in Angular 21 and compares it with traditional **Reactive Forms**. It showcases the same form implementation using both approaches, highlighting the differences in API, syntax, and developer experience.

[View demo](https://zenika.github.io/angular-21-news/signal-form)

## Overview

This demo application implements a user registration form with validation using both form paradigms:

- **Signal Form**: Angular 21's new signal-based forms API
- **Reactive Form**: Traditional reactive forms with FormBuilder

Both implementations feature:

- Email and password validation
- Nested form groups (location with name and address)
- Custom validation messages
- Form submission with loading state
- Server error emulation and handling
- Reusable input field components
- Real-time form value display

## Getting Started

### Prerequisites

- Angular CLI 21.0.0 or higher

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`.

## Signal Form VS Reactive Form

### Key Differences

#### 1. **Setup and Configuration**

**Signal Form:**

```typescript
import { email, Field, form, minLength, required, submit } from '@angular/forms/signals';

@Component({
  imports: [Field],
  ...
})
export class SignalForm {
  formModel = signal({
    email: '',
    password: '',

    location: {
      name: '',
      address: ''
    }
  });

  form = form(this.formModel, (path) => {
    required(path.email, { message: 'Field required' });
    email(path.email, { message: 'Invalid email' });
    minLength(path.password, 5, { message: 'Must contain at least 5 characters' });
  });

  register(event: SubmitEvent) {
    event.preventDefault();

    submit(this.form, async () => {
      try {
        await fetch('/api/update/data', { method: 'POST', body: JSON.stringify(this.form().value()) });
        return null;
      } catch {
        return { kind: 'server', message: 'An error occured' }
      }
    });
  }
}
```

**Reactive Form:**

```typescript
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  ...
})
export class SignalForm {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],

    location: this.fb.group({
      name: ['', [Validators.required]],
      address: ['']
    })
  });

  async register() {
    this.form.disable();

    try {
      await fetch('/api/update/data', { method: 'POST', body: JSON.stringify(this.form.value) });
      this.form.enable();
    } catch {
      this.form.enable();
      this.form.controls.email.setErrors({ server: true });
    }
  }
}
```

#### 2. **Validation**

- **Signal Forms**: Validators are functions applied to paths with custom error messages inline
- **Reactive Forms**: Validators are composed as arrays, requiring separate error message mapping

#### 3. **State Access**

- **Signal Forms**: Access state via signals (`form().value()`, `form().invalid()`)
- **Reactive Forms**: Direct property access (`form.value`, `form.invalid`)

#### 4. **Template Integration**

- **Signal Forms**: Use the `Field` directive for automatic two-way binding
- **Reactive Forms**: Use `ReactiveFormsModule` with `FormControl` and `FormGroup` directives

#### 5. **Submission Handling**

- **Signal Forms**: Built-in `submit()` function with async support and automatic loading state
- **Reactive Forms**: Manual disable/enable during async operations

#### 6. **Server Error Handling**

- **Signal Forms**: Return error objects from the submit function with structured error information
- **Reactive Forms**: Manually set errors on form controls using `setErrors()`

#### 7. **Custom control**

**Signal Forms:**

```typescript
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
}
```

**Reactive Forms:**

```typescript
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

  value = model('');
  touched = model(false);
  disabled = model(false);

  onChange = (value: string) => {};
  onTouched = () => {};

  // ----- ControlValueAccessor -----
  writeValue(value: string) {
    this.value.set(value);
  }
  registerOnChange(onChange: (value: string) => void) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }
  setDisabledState?(disabled: boolean) {
    this.disabled.set(disabled);
  }
}
```

- **Signal Forms**: Implement `FormValueControl<T>` interface with signal-based inputs and models. No provider configuration needed, and automatic integration with the `Field` directive.
- **Reactive Forms**: Implement `ControlValueAccessor` interface with manual `NG_VALUE_ACCESSOR` provider setup, callback registration, and lifecycle methods.

## Project Structure

```
src/app/
├── app.ts                          # Root component with navigation
├── app.html                        # Main layout template
├── app.routes.ts                   # Route configuration
├── signal-form/
│   ├── signal-form.ts              # Signal form implementation
│   ├── signal-form.html            # Signal form template
│   └── input-field/
│       ├── input-field.ts          # Reusable input component (signal-based)
│       └── input-field.html
└── reactive-form/
    ├── reactive-form.ts            # Reactive form implementation
    ├── reactive-form.html          # Reactive form template
    ├── error-message-pipe.ts       # Error message transformation
    └── input-field/
        ├── input-field.ts          # Reusable input component (reactive)
        └── input-field.html
```

## Features Demonstrated

### Signal Forms ([signal-form.ts](src/app/signal-form/signal-form.ts))

- Signal-based state management
- Path-based validator configuration
- Inline error messages
- Built-in submission handling
- Automatic form disabling during submission
- Structured server error handling via submit function return values

### Reactive Forms ([reactive-form.ts](src/app/reactive-form/reactive-form.ts))

- FormBuilder API
- Validator composition
- Error message pipe for mapping
- Manual submission state management
- Nested form groups
- Server error handling via `setErrors()` on form controls

### Both Implementations Include

- Email validation
- Password minimum length validation
- Required field validation
- Nested location object
- Form reset functionality
- Server error emulation toggle
- Real-time form value preview
- Accessible form controls

## Learn More

- [Angular Forms Documentation](https://angular.dev/guide/forms)
- [Angular Signals](https://angular.dev/guide/signals)

## License

This project is for demonstration purposes only.

import { UserRegister } from '../../../models/user-register';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  form!: FormGroup;
  loading!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  public ngOnInit(): void {
    this.createForm(new UserRegister());
  };

  public createForm(user: UserRegister): void {
    this.form = this.formBuilder.group({
      firstName: [
        user.firstName,
        Validators.required
      ],
      lastName: [
        user.lastName,
        Validators.required
      ],
      email: [
        user.email,
        Validators.required
      ],
      password: [
        user.password,
        Validators.required
      ]
    });
  };

  public onSubmit(): void {
    this.toggleLoading();

    const user = this.form.getRawValue() as UserRegister;

    this.authService.signUp(user).subscribe({

      next: () => {
        this.toggleLoading();
        this.alertService.showSuccessAlert("user resgistered")
        this.router.navigate([""])
      },
      error: (err) => {
        this.toggleLoading();
        this.alertService.showErrorAlert("register error")
      },

    });
  };

  private toggleLoading(): void {
    this.loading = !this.loading;
  };

  public hasErrors(field: string): boolean {
    const formField = this.form.get(field);
    return formField!.invalid && formField!.dirty;
  };
}

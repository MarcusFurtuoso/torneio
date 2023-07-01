import { AlertService } from '../../../services/alert.service';
import { UserCredentials } from '../../../models/user-credentials';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  loading!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  public ngOnInit(): void {
    this.createForm(new UserCredentials())
  };

  // validate password and email
  private createForm(credentials: UserCredentials): void {
    this.form = this.formBuilder.group({
      email: [
        credentials.email,
        Validators.required
      ],
      password: [
        credentials.password,
        Validators.required
      ],
    });
  };

  public onSubmit(): void {
    this.toggleLoading();

    const credentials = this.form.getRawValue() as UserCredentials;

    this.authService.signIn(credentials).subscribe({

      next: () => {
        this.toggleLoading();
        this.alertService.showSuccessAlert("login successful")
        this.router.navigate([""]);
      },
      error: (err) => {
        this.toggleLoading();
        this.alertService.showErrorAlert("login error")
      }

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

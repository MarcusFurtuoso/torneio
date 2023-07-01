import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ResetPasswordRequest} from "../../../dto/reset-password-request";
import {Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";
import {ResetPasswordResponse} from "../../../dto/reset-password-response";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form!: FormGroup;
  loading!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: [ "", Validators.required ],
      confirmPassword: [ "", Validators.required ],
    }, { validators: this.passwordMatchValidator });
  }

  public onSubmit(): void {
    this.toggleLoading();
    const data = this.form.getRawValue() as ResetPasswordRequest;

    this.authService.resetPassword(data)
      .subscribe({
        next: (response: ResetPasswordResponse) => {
          this.toggleLoading();
          this.alertService.showSuccessAlert(response.message);
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          this.toggleLoading();
          this.alertService.showErrorAlert(err.message);
        }
      });
  }

  public passwordMatchValidator(form: FormGroup) : { [key : string] : true } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { "mismatch": true };
  }

  private toggleLoading(): void {
    this.loading = !this.loading;
  };

  public hasErrors(field: string): boolean {
    const formField = this.form.get(field);
    return formField!.invalid && formField!.dirty;
  };

}

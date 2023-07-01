import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../../services/alert.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ForgotPasswordResponse} from "../../../dto/forgot-password-response";
import {ForgotPasswordRequest} from "../../../dto/forgot-password-request";
import {Router} from "@angular/router";
import {CheckResetCodeRequest} from "../../../dto/check-reset-code-request";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  form!: FormGroup;
  loading!: boolean;
  inputCode!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [ "", Validators.required ],
      resetCode: [ "", Validators.required]
    });
  }

  public onSubmit(): void {
    this.toggleLoading();
    const email = this.form.getRawValue() as ForgotPasswordRequest;

    this.authService.forgotPassword(email)
      .subscribe({
        next: (response: ForgotPasswordResponse) => {
          this.toggleLoading();
          this.inputCode = true;
          this.alertService.showSuccessAlert(response.message);
        },
        error: (err) => {
          this.toggleLoading();
          this.alertService.showErrorAlert("send mail fail");
        }
      });
  }

  public checkResetCodeMatch(): void {
    this.toggleLoading();

    const data = this.form.getRawValue() as CheckResetCodeRequest;

    this.authService.checkResetCode(data)
      .subscribe({
        next: () => {
          this.toggleLoading();
          this.alertService.showSuccessAlert("matcher code");
          this.router.navigate(["/reset-password"])
        },
        error: () => {
          this.toggleLoading();
          this.alertService.showErrorAlert("reset code invalid");
        }
      });
  }

  private toggleLoading(): void {
    this.loading = !this.loading;
  };

  public hasErrors(field: string): boolean {
    const formField = this.form.get(field);
    return formField!.invalid && formField!.dirty;
  };

}

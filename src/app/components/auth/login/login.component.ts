import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/dto/model';

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
    this.createForm(new LoginForm())
  };

  private createForm(loginForm: LoginForm): void {
    this.form = this.formBuilder.group({
      login: [
        loginForm.login,
        Validators.required
      ],
      senha: [
        loginForm.senha,
        Validators.required
      ],
    });
  };

  public onSubmit(): void {
    this.toggleLoading();

    const credentials = this.form.getRawValue() as LoginForm;

    this.authService.login(credentials).subscribe({

      next: () => {
        this.toggleLoading();
        this.alertService.showSuccessAlert("successo ao fazer login")
        this.router.navigate([""]);
      },
      error: (err) => {
        this.toggleLoading();
        this.alertService.showErrorAlert("erro ao fazer login")
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

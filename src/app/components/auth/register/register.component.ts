import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { CadastroForm } from 'src/app/dto/model';

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
    this.createForm(new CadastroForm());
  };

  public createForm(cadastroForm: CadastroForm): void {
    this.form = this.formBuilder.group({
      nome: [
        cadastroForm.nome,
        Validators.required
      ],
      login: [
        cadastroForm.login,
        Validators.required
      ],
      senha: [
        cadastroForm.senha,
        Validators.required
      ]
    });
  };

  public onSubmit(): void {
    this.toggleLoading();

    const user = this.form.getRawValue() as CadastroForm;

    this.authService.cadastro(user).subscribe({

      next: () => {
        this.toggleLoading();
        this.alertService.showSuccessAlert("Usuário registrado com sucesso!")
        this.router.navigate([""])
      },
      error: (err) => {
        this.toggleLoading();
        this.alertService.showErrorAlert("Erro de cadastro!")
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

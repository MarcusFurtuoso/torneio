import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categoria, InscricaoForm, Torneio, Usuario } from 'src/app/dto/model';
import { AlertService } from 'src/app/services/alert.service';
import { InscricaoService } from 'src/app/services/inscricao.service';
import { TorneioService } from 'src/app/services/torneio.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.css']
})
export class InscricaoComponent implements OnInit {

  loading: boolean = false;

  torneioAtual!: Torneio;

  form!: FormGroup;

  categorias: Categoria[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private inscricaoService: InscricaoService,
    private torneioService: TorneioService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const torneioId = this.activateRoute.snapshot.paramMap.get("id");

    this.torneioService.buscarTorneioPorId(torneioId).subscribe({
      next: (res) => {
        this.torneioAtual = res
        this.categorias = res.categorias
      },
      error: () => this.alertService.showErrorAlert("erro ao buscar torneio")
    });

    this.usuarioService.buscarUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res
      },
      error: () => this.alertService.showErrorAlert("erro ao buscar usuários")
    });

    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      categoriaSelecionada: [null],
      usuarioSelecionado: [null]
    });
  };

  onSubmit() {
    const inscricao = new InscricaoForm();

    const categoriaId = this.form.get('categoriaSelecionada')?.value;
    inscricao.categoriaId = categoriaId.id;

    const usuario1 = JSON.parse(localStorage.getItem('usuario-logado')!);
    inscricao.usuario1Id = usuario1.id;

    const usuario2 = this.form.get('usuarioSelecionado')?.value;
    inscricao.usuario2Id = usuario2.id;

    this.inscricaoService.realizarInscricao(inscricao).subscribe({

      next: () => {
        this.alertService.showSuccessAlert("Inscrição realizada com sucesso")
      },
      error: (err) => {
        this.alertService.showErrorAlert("erro na inscrição")
      },

    });
  }

  public hasErrors(field: string): boolean {
    const formField = this.form.get(field);
    return formField!.invalid && formField!.dirty;
  };

}

import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Categoria, Torneio, Usuario } from 'src/app/dto/model';
import { AlertService } from 'src/app/services/alert.service';
import { TorneioService } from 'src/app/services/torneio.service';

@Component({
  selector: 'app-torneios',
  templateUrl: './torneios.component.html',
  styleUrls: ['./torneios.component.css']
})
export class TorneiosComponent implements OnInit {

    torneios: Torneio[] = [
      {
        id: 1,
        nome: 'teste',
        premiacao: '',
        categorias: []
      }
    ];

    form!: FormGroup;

  constructor(
    private service: TorneioService,
    private alert: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.service.buscarTorneios().subscribe({
      next: (res) => {
        this.torneios = res
        console.log(this.torneios);
      },
      error: (err) => {

      }
    })

    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      categoriaSelecionada: [null],
      usuarioSelecionado: [null]
    });
  };
}

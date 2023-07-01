import { Component, OnInit } from '@angular/core';
import { Torneio } from 'src/app/dto/model';
import { AlertService } from 'src/app/services/alert.service';
import { TorneioService } from 'src/app/services/torneio.service';

@Component({
  selector: 'app-torneios',
  templateUrl: './torneios.component.html',
  styleUrls: ['./torneios.component.css']
})
export class TorneiosComponent implements OnInit {

    visible: boolean = false;
    torneios!: Torneio[];
    selecteTorneio!: Torneio;

  constructor(
    private service: TorneioService,
    private alert: AlertService
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
  }

  showDialog() {
    this.visible = !this.visible;
  }
}

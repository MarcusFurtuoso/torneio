import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  items!: MenuItem[];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        style: { 'font-size' : '14px' },
        command: () => {
          this.authService.logout();
          this.router.navigate(["login"])
        },
      },
    ];
  }
}

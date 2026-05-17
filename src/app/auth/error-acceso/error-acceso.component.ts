import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-error-acceso',
  templateUrl: './error-acceso.component.html',
  styleUrls: ['./error-acceso.component.scss'],
})
export class ErrorAccesoComponent  implements OnInit {

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit() {}

  goBack(): void {
    this.router.navigate(['/Home']);
  }

}

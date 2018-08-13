import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({ templateUrl: 'public.component.html' })

export class PublicComponent {

  constructor(private router: Router) {}

  private uno(): void {
    this.router.navigate(['']);
  }

  private dos(): void {
    this.router.navigate(['dos']);
  }

  private enterVault(): void {
    this.router.navigate(['login']);
  }
}

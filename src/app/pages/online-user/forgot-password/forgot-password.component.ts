import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public action: string;

  constructor(private activatedActivated: ActivatedRoute) {
    let mode = this.activatedActivated.snapshot.queryParams['mode'];
    this.action = mode === 'resetPassword' ? mode : 'sendResetPasswordEmail';
  }

  ngOnInit(): void {
  }
}

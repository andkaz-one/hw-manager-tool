import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    CardModule, 
    ButtonModule, 
    InputTextModule, 
    ReactiveFormsModule, 
    MessagesModule,  
  ],
  providers: [MessageService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);

  ngOnInit(): void {
    if (
      localStorage.hasOwnProperty('access_token') &&
      localStorage.hasOwnProperty('refresh_token')
    ) {
      this.router.navigateByUrl('/main-view');
    } else {
      this.router.navigateByUrl('/auth');
    }
  }


  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  login(): void {
    console.log(this.authForm.value);
    if (this.authForm.valid) {
      const email = this.authForm.get('email')?.value
      const password = this.authForm.get('password')?.value
      email && password ? this.authService.login(email, password).subscribe({
        next: (res: any) => {
          if (res.tokens) {
            this.router.navigateByUrl('/main-view')
          } else {
            this.messageService.add({
              key: 'auth',
              severity: 'error',
              summary: 'Error',
              detail: res.message,
              life: 3000,
              closable: true,
            })
          }
        },
        error: (err: any) => {         
          this.messageService.add({
            key: 'auth',
            severity: 'error',
            summary: err.error,
            detail: err.message,
            life: 3000,
            closable: true,
          })
          
        }
      }): console.error('An error ocured.')
    }
  }

  resetForm(): void {
    this.authForm.reset();
  }

}

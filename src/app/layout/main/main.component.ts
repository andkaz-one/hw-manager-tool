import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user.interface';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenubarModule,
    MenuModule,
    AvatarModule,
    SidebarComponent,
    ButtonModule,
    RippleModule
  ],
  providers: [UserService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private UserService: UserService = inject(UserService);

  public isSidebarCollapsed = signal<boolean>(true);
  public currentLoggedUserSignal = this.UserService.currentUserSignal;
  public avatarPopupMenuItems: MenuItem[] = [
    {
      label: this.currentLoggedUserSignal()?.name,
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => this.authService.logout()
        }
      ]
    }

  ];

  ngOnInit(): void {
    


  }

  sidebarEffect = effect(() => {
    if (this.isSidebarCollapsed()) {
      console.log('Sidebar collapsed');
    } else {
      console.log('Sidebar expanded');
    }
  })



  toggleSidebar() {
    this.isSidebarCollapsed.update(value => !value);
  }


}

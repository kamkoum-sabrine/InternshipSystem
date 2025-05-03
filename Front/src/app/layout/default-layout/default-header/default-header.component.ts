import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  ProgressBarDirective,
  ProgressComponent,
  SidebarToggleDirective,
  TextColorDirective,
  ThemeDirective
} from '@coreui/angular-pro';
import { IconDirective } from '@coreui/icons-angular';
import { NotificationService } from 'src/app/layout/default-layout/default-header/notification.service';
import { AuthService } from 'src/app/views/pages/login/auth.service';
import { SoutenancesServiceService } from 'src/app/views/soutenances/soutenances-service.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  imports: [ContainerComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, NavItemComponent, NavLinkDirective, RouterLink, RouterLinkActive, NgTemplateOutlet, BreadcrumbRouterComponent, ThemeDirective, DropdownComponent, DropdownToggleDirective, TextColorDirective, AvatarComponent, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective, BadgeComponent, DropdownDividerDirective, ProgressBarDirective, ProgressComponent, NgStyle]
})

export class DefaultHeaderComponent extends HeaderComponent {
  isetudiant: any = false;
  etudiant: any;
  soutenance: any;
  soutenances: any;

  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];
  user: any;
  public newNotifications: any[] = [];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });

  constructor(
    public authService: AuthService,
    private notificationService: NotificationService,
    private SoutenancesServiceService: SoutenancesServiceService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadCurrentUser();

    this.SoutenancesServiceService.getSoutenances().subscribe(data => {
      this.soutenances = data;
      this.checkStudentNotifications();
      this.setupNotificationSubscription();
    });
  }

  private checkStudentNotifications(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role?.nom === 'ETUDIANT') {
      this.isetudiant = true;
      this.etudiant = user;
      this.soutenances = this.soutenances.filter((soutenance: any) => soutenance.etudiant.id === this.etudiant.id);

      if (this.soutenances.length > 0) {
        this.notificationService.addNotification({
          id: 1,
          title: 'Nouvelle soutenance',
          icon: 'cilCalendar',
          color: 'danger',
          link: 'soutenances'
        });
      }
    }
  }

  private setupNotificationSubscription(): void {
    this.notificationService.currentNotifications.subscribe(notifs => {
      this.newNotifications = notifs.filter(n => n); // Filtre les valeurs null
    });
  }

  loadCurrentUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user;  // Récupérer l'utilisateur depuis localStorage
  }


  isLogged() {
    return this.authService.isLoggedIn();
  }

  logout() {
    console.log("logouuuuuuuuuuuuuuut")
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  sidebarId = input('sidebar1');

  public newMessages = [
    {
      id: 0,
      from: 'Jessica Williams',
      avatar: '7.jpg',
      status: 'success',
      title: 'Urgent: System Maintenance Tonight',
      time: 'Just now',
      link: 'apps/email/inbox/message',
      message: 'Attention team, we\'ll be conducting critical system maintenance tonight from 10 PM to 2 AM. Plan accordingly...'
    },
    {
      id: 1,
      from: 'Richard Johnson',
      avatar: '6.jpg',
      status: 'warning',
      title: 'Project Update: Milestone Achieved',
      time: '5 minutes ago',
      link: 'apps/email/inbox/message',
      message: 'Kudos on hitting sales targets last quarter! Let\'s keep the momentum. New goals, new victories ahead...'
    },
    {
      id: 2,
      from: 'Angela Rodriguez',
      avatar: '5.jpg',
      status: 'danger',
      title: 'Social Media Campaign Launch',
      time: '1:52 PM',
      link: 'apps/email/inbox/message',
      message: 'Exciting news! Our new social media campaign goes live tomorrow. Brace yourselves for engagement...'
    },
    {
      id: 3,
      from: 'Jane Lewis',
      avatar: '4.jpg',
      status: 'info',
      title: 'Inventory Checkpoint',
      time: '4:03 AM',
      link: 'apps/email/inbox/message',
      message: 'Team, it\'s time for our monthly inventory check. Accurate counts ensure smooth operations. Let\'s nail it...'
    },
    {
      id: 4,
      from: 'Ryan Miller',
      avatar: '4.jpg',
      status: 'info',
      title: 'Customer Feedback Results',
      time: '3 days ago',
      link: 'apps/email/inbox/message',
      message: 'Our latest customer feedback is in. Let\'s analyze and discuss improvements for an even better service...'
    }
  ];




  /*
  public newStatus = [
    { id: 0, title: 'CPU Usage', value: 25, color: 'info', details: '348 Processes. 1/4 Cores.' },
    { id: 1, title: 'Memory Usage', value: 70, color: 'warning', details: '11444GB/16384MB' },
    { id: 2, title: 'SSD 1 Usage', value: 90, color: 'danger', details: '243GB/256GB' }
  ];*/

  public newTasks = [
    { id: 0, title: 'Upgrade NPM', value: 0, color: 'info' },
    { id: 1, title: 'ReactJS Version', value: 25, color: 'danger' },
    { id: 2, title: 'VueJS Version', value: 50, color: 'warning' },
    { id: 3, title: 'Add new layouts', value: 75, color: 'info' },
    { id: 4, title: 'Angular Version', value: 100, color: 'success' }
  ];

}

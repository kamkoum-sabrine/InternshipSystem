import { INavData } from '@coreui/angular-pro';

export const navItems: INavData[] = [
  {
    name: 'Compose',
    url: '/apps/email/compose',
    iconComponent: { name: 'cil-pen' },
    variant: 'success'
  },
  {
    name: 'Inbox',
    url: '/apps/email/inbox',
    iconComponent: { name: 'cil-inbox' },
    badge: {
      color: 'danger',
      text: '4'
    }
  },
  {
    name: 'Stared',
    url: '/apps/email/stared',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Sent',
    url: '/apps/email/sent',
    iconComponent: { name: 'cil-paper-plane' }
  },
  {
    name: 'Trash',
    url: '/apps/email/trash',
    iconComponent: { name: 'cil-trash' }
  },
  {
    name: 'Important',
    url: '/apps/email/important',
    iconComponent: { name: 'cil-bookmark' },
    badge: {
      color: 'info',
      text: '5'
    }
  },
  {
    name: 'Spam',
    url: '/apps/email/spam',
    iconComponent: { name: 'cil-report-slash' },
    badge: {
      color: 'warning',
      text: '5'
    }
  },
  {
    divider: true,
    class: 'mt-auto'
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  }
];

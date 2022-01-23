import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  



  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Category',
    url: 'widget/category',
    icon: 'icon-list'
  },

  {
    name: 'Portfolio',
    url: 'widget/portfolio',
    icon: 'fa fa-briefcase'
   
  },
  {
    name: 'Contact',
    url: 'widget/contact',
    icon: 'fa fa-envelope'
   
  }

];

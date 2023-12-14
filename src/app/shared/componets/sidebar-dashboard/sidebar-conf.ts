import { modelSidebarMenu } from "src/app/models/shared/sidebar-dashboard.models";

export const ROUTES_MENU: modelSidebarMenu[] = [

  {
    path: '/dashboard', title: 'Dashboard', icon: 'bi bi-house-door', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/notificacion-email', title: 'Noti Email', icon: 'bi bi-envelope-check', class: 'sub', badge: '5', badgeClass: 'badge bg-secondary', isExternalLink: false,
    submenu: [
      { path: '/dashboard/notificacion-email/plantillas', title: 'Plantillas de Correo', icon: 'bi bi-journal-richtext', class: '', badge: '2', badgeClass: 'badge bg-secondary', isExternalLink: false, submenu: [] },
      { path: '/dashboard/notificacion-email/contactos', title: 'Lista de Contactos', icon: 'bi bi-person-vcard', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/notificacion-email/lista-negra', title: 'Contactos Bloqueados', icon: 'bi bi-person-x', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/notificacion-email/envio', title: 'Envio Manual', icon: 'bi bi-envelope-plus', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '/notificacion-whatsapp', title: 'Noti WhatsApp', icon: 'bi bi-whatsapp', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/dashboard/notificacion-whatsapp/cuentas', title: 'Cuenta de WhatsApp', icon: 'bi bi-qr-code', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/notificacion-whatsapp/contactos', title: 'Lista de Contactos', icon: 'bi bi-person-video2', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/notificacion-whatsapp/envio', title: 'Envio Manual', icon: 'bi bi-send', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/notificacion-whatsapp/programados', title: 'Envio Programados', icon: 'bi bi-calendar2-date', class: '', badge: '5', badgeClass: 'badge bg-secondary', isExternalLink: false, submenu: [] },
      
    ]
  },
  
];
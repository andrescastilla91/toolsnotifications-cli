export interface modelSidebarMenu {
  path: string;
  title: string;
  icon: string;
  class: string;
  badge: string;
  badgeClass: string;
  isExternalLink: boolean;
  submenu: modelSidebarMenu[];
}
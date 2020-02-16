import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import icoTableList from "views/TableList/icotablelist.jsx";
import icoPublished from "views/TableList/icopublish.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";

import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  LocationOn,
  Notifications
} from "material-ui-icons";

const appRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "CryptoLive Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/table",
    sidebarName: "Crypto Currencies List",
    navbarName: "Crypto Currencies List",
    icon: LibraryBooks,
    component: TableList
  },
  {
    path: "/icoTable",
    sidebarName: "ICO's List Exchange",
    navbarName: "ICO's List Exchange",
    icon: LibraryBooks,
    component: icoTableList
  },
  {
    path: "/icopublish",
    sidebarName: "ICO's List Published",
    navbarName: "ICO's List Published",
    icon: LibraryBooks,
    component: icoPublished
  },
  // {
  //   path: "/icoTable",
  //   sidebarName: "ICO's List",
  //   navbarName: "ICO's List",
  //   icon: LibraryBooks,
  //   component: TableList
  // },
  // {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default appRoutes;

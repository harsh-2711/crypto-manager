import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";

import {
  Dashboard,
  Person,
  Notifications,
  Help,
  Receipt,
  Assessment,
  Bookmark,
  AttachMoney
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
    path: "/table",
    sidebarName: "Watch List",
    navbarName: "Crypto Currencies List",
    icon: Bookmark,
    component: TableList
  },
  {
    path: "/table",
    sidebarName: "Recommendations",
    navbarName: "Crypto Currencies List",
    icon: Assessment,
    component: TableList
  },
  {
    path: "/table",
    sidebarName: "Transactions",
    navbarName: "Crypto Currencies List",
    icon: AttachMoney,
    component: TableList
  },
  {
    path: "/table",
    sidebarName: "Orders",
    navbarName: "Crypto Currencies List",
    icon: Receipt,
    component: TableList
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage
  },
  {
    path: "/table",
    sidebarName: "Help",
    navbarName: "Crypto Currencies List",
    icon: Help,
    component: TableList
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default appRoutes;

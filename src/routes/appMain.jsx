import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Transactions from "views/Transactions/Transactions.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import Recommendations from "views/Recommendations/Recommendations.jsx";

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
    navbarName: "Crypto Manager Dashboard",
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
    path: "/recommendations",
    sidebarName: "Recommendations",
    navbarName: "Recommendations",
    icon: Assessment,
    component: Recommendations
  },
  {
    path: "/transactions",
    sidebarName: "Transactions",
    navbarName: "Transactions",
    icon: AttachMoney,
    component: Transactions
  },
  {
    path: "/temp",
    sidebarName: "Orders",
    navbarName: "Crypto Currencies List",
    icon: Receipt,
    component: NotificationsPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  {
    path: "/temp",
    sidebarName: "Help",
    navbarName: "Help",
    icon: Help,
    component: NotificationsPage
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default appRoutes;

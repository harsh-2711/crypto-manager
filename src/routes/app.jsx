import Login from "views/Register/Login.jsx"
import SignUp from "views/Register/Signup.jsx"
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Transactions from "views/Transactions/Transactions.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import Recommendations from "views/Recommendations/Recommendations.jsx";

const appRoutes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/signup",
    component: SignUp
  },
  {
    path: "/dashboard",
    component: DashboardPage
  },
  {
    path: "/table",
    component: TableList
  },
  {
    path: "/transactions",
    component: Transactions
  },
  {
    path: "/user",
    component: UserProfile
  },
  {
    path: "/recommendations",
    component: Recommendations
  },
  {
    path: "/temp",
    component: NotificationsPage
  },
  { redirect: true, path: "/", to: "/login", navbarName: "Redirect" }
];

export default appRoutes;

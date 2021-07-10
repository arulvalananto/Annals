import React from "react";
import "./Dashboard.style.scss";
// Other Components
import Sidebar from "../../components/Sidebar/Sidebar.component";
import Home from "./Home/Home.component";
import Diary from "./Diary/Diary.component";
import ViewPage from "../../components/ViewPage/ViewPage.component";
import AddPage from "../../components/AddPage/AddPage.component";
import Password from "./Password/Password.component";
import Ideas from "./Ideas/Ideas.component";
import TodoList from "./TodoList/TodoList.component";
// React Router
import { Link } from "@material-ui/core";
import { Route } from "react-router";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__right">
        <Link to="/" className="dashboard__rightLogoContainer">
          <p className="dashboard__rightLogo">_Annals</p>
        </Link>
        <div className="dashboard__rightContainer">
          <Route exact path="/" component={Home} />
          <Route exact path="/diary" component={Diary} />
          <Route path="/diary/view/:id" component={ViewPage} />
          <Route path="/diary/add" component={AddPage} />
          <Route path="/password-safe" component={Password} />
          <Route path="/routines">Hello Routines</Route>
          <Route path="/ideas" component={Ideas} />
          <Route path="/todo-list" component={TodoList} />
          <Route path="/notes">Coming Soon... (Notes)</Route>
          <Route path="/personal-info">Coming Soon... (Personal Info)</Route>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

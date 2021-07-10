import React, { Suspense } from "react";
import "./Dashboard.style.scss";
// React Router
import { Link, Route } from "react-router-dom";
// Other Components
import Sidebar from "../../components/Sidebar/Sidebar.component";
import Home from "./Home/Home.component";
import Spinner from "../../components/Spinner/Spinner.component";
const Diary = React.lazy(() => import("./Diary/Diary.component"))
const ViewPage = React.lazy(() => import("../../components/ViewPage/ViewPage.component"))
const AddPage = React.lazy(() => import("../../components/AddPage/AddPage.component"))
const Password = React.lazy(() => import("./Password/Password.component"))
const Ideas = React.lazy(() => import("./Ideas/Ideas.component"))
const TodoList = React.lazy(() => import("./TodoList/TodoList.component"))

const Dashboard = () => {
  return (
    <Suspense fallback={<Spinner invert />}>
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
    </Suspense>
  );
};

export default Dashboard;

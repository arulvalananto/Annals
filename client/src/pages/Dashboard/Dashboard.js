import React from "react";
import "./Dashboard.scss";
// Other Components
import Sidebar from "../../components/Sidebar/Sidebar";
import Diary from "./Diary/Diary";
import ViewPage from "../../components/ViewPage/ViewPage";
import AddPage from "../../components/AddPage/AddPage";
import Password from "./Password/Password";
import Home from "./Home/Home";
// React Router
import { Link } from "@material-ui/core";
import { Route } from "react-router";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard__right">
                <Link to="/" className="dashboard__rightAnchor">
                    <p className="dashboard__rightLogo">_Annals</p>
                </Link>
                <div className="dashboard__rightContainer">
                    <Route exact path="/" component={Home} />
                    <Route exact path="/diary" component={Diary} />
                    <Route path="/diary/view/:id" component={ViewPage} />
                    <Route path="/diary/add" component={AddPage} />
                    <Route path="/password-safe" component={Password} />
                    <Route path="/routines">Hello Routines</Route>
                    <Route path="/ideas">Coming Soon... (Ideas)</Route>
                    <Route path="/todo-list">Coming Soon... (Todo List)</Route>
                    <Route path="/notes">Coming Soon... (Notes)</Route>
                    <Route path="/personal-info">
                        Coming Soon... (Personal Info)
                    </Route>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

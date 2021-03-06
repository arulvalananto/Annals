import React, { Suspense, useState } from "react";
import "./Dashboard.style.scss";
// React Router
import { Link, Route } from "react-router-dom";
import logo from "../../assets/logo-with-icon-white.svg";
// Icons
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdClear } from "react-icons/md";
// Other Components
import Sidebar from "../../components/Sidebar/Sidebar.component";
import Home from "./Home/Home.component";
import Spinner from "../../components/Spinner/Spinner.component";
const Journals = React.lazy(() => import("./Journals/Journals.component"));
const PageView = React.lazy(() =>
  import("./Journals/PageView/PageView.component")
);
const PageAdd = React.lazy(() =>
  import("./Journals/PageAdd/PageAdd.component")
);
const Passwords = React.lazy(() => import("./Passwords/Passwords.component"));
const PasswordAdd = React.lazy(() =>
  import("./Passwords/PasswordAdd/PasswordAdd.component")
);
const PasswordView = React.lazy(() =>
  import("./Passwords/PasswordView/PasswordView.component")
);
const Reminders = React.lazy(() => import("./Reminders/Reminders.component"));

const Ideas = React.lazy(() => import("./Ideas/Ideas.component"));
const Tasks = React.lazy(() => import("./Tasks/Tasks.component"));
const TaskAdd = React.lazy(() => import("./Tasks/TaskAdd/TaskAdd.component"));

const Dashboard = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!visible);

  return (
    <Suspense fallback={<Spinner invert />}>
      {visible && (
        <div className='dashboard__overlay' onClick={toggleVisible}></div>
      )}
      <div className='dashboard'>
        <Sidebar />
        <div className='dashboard__right'>
          <div className='dashboard__rightHeader'>
            <Link to='/' className='dashboard__rightLogoContainer'>
              <img
                src={logo}
                alt='annals logo'
                className='dashboard__rightLogo'
              />
            </Link>
            <div
              className='dashboard__rightMenuCollapse'
              onClick={toggleVisible}
            >
              <HiOutlineMenuAlt3 size={24} />
            </div>
          </div>
          <div className='dashboard__rightContainer'>
            <Route exact path='/' component={Home} />
            <Route exact path='/journals' component={Journals} />
            <Route path='/journals/page-add' component={PageAdd} />
            <Route path='/journals/page-view/:id' component={PageView} />
            <Route exact path='/passwords' component={Passwords} />
            <Route path='/passwords/add' component={PasswordAdd} />
            <Route path='/passwords/view/:id' component={PasswordView} />
            <Route path='/reminders' component={Reminders} />
            <Route path='/ideas' component={Ideas} />
            <Route exact path='/tasks' component={Tasks} />
            <Route path='/tasks/add' component={TaskAdd} />
          </div>
        </div>
        {visible && (
          <div className='dashboard__rightMenu'>
            <MdClear
              size={20}
              className='dashboard__rightMenu--clear'
              onClick={toggleVisible}
            />
            <ul className='dashboard__rightMenuLists'>
              <Link to='/'>
                <li className='dashboard__rightMenuList'>Dashboard</li>
              </Link>
              <Link to='/journals'>
                <li className='dashboard__rightMenuList'>Journals</li>
              </Link>
              <Link to='/passwords'>
                <li className='dashboard__rightMenuList'>Passwords</li>
              </Link>
              <Link to='/routines'>
                <li className='dashboard__rightMenuList'>Routines</li>
              </Link>
              <Link to='/ideas'>
                <li className='dashboard__rightMenuList'>Ideas</li>
              </Link>
              <Link to='/todos'>
                <li className='dashboard__rightMenuList'>Todo Lists</li>
              </Link>
              <Link to='/notes'>
                <li className='dashboard__rightMenuList'>Notes</li>
              </Link>
              <Link to='/personal'>
                <li className='dashboard__rightMenuList'>Personal</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Dashboard;

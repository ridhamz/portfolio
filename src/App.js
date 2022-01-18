import React, { Suspense } from "react";
import MainNavigation from './shared/components/navigation/mainNavigation';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";


//auth-context
import { AuthContext } from './shared/context/auth-context'
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/uiElements/LoadingSpinner";




const Auth = React.lazy(() => import("./user/pages/auth"));
const Home = React.lazy(() => import("./home/home"));
const About = React.lazy(() => import("./about/pages/about"));
const Skills = React.lazy(() => import("./skills/pages/skills"));
const Awards = React.lazy(() => import("./awards/pages/awards"));
const Contact = React.lazy(() => import("./contact/pages/contact"));
const Projects = React.lazy(() => import("./projects/pages/pojects"));
const Dashboard = React.lazy(() => import("./dashboard/pages/dashboard"));
const ManageProjects = React.lazy(() => import('./dashboard/pages/projects/projects'));

const App = () => {
  const { token, userId, login, logout } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} exact />
        <Route path="/skills" component={Skills} exact />
        <Route path="/awards" component={Awards} exact />
        <Route path="/contact" component={Contact} exact />
        <Route path="/works" component={Projects} exact />
        <Route path="/admin" component={Dashboard} exact />
        <Route path="/addprojects" component={ManageProjects} exact />
        <Redirect to='/' />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} exact />
        <Route path="/skills" component={Skills} exact />
        <Route path="/awards" component={Awards} exact />
        <Route path="/contact" component={Contact} exact />
        <Route path="/works" component={Projects} exact />
        <Route path="/auth" component={Auth} exact />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}>
      <Router>
        <MainNavigation />
        <main className='app'>
          <Suspense fallback={
            <div className='center'>
              <LoadingSpinner  asOverlay/>
            </div>
          }>
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

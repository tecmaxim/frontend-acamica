import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// Import modules
import Form from './modules/Add';
import List from './modules/List';
import Edit from './modules/Edit';

/**
 *
 * Render de MAIN view whit student list
 *
 */
function App() {
  return (
    <Router>
      <div className="App">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link class="nav-link" to="/"> Student List </Link>
              </li>
            </ul>
            <Link class="btn btn-info " to="/form">New Student</Link>
          </div>
        </nav>

        <div className="container py-4">
          <div className="row">

            <Route path="/" exact component={List} />
            <Route path="/form" component={Form} />
            <Route path="/edit" component={Edit} />

          </div>
        </div>

      </div>
    </Router>
  );
}
export default App;

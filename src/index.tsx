import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { App } from "./components/App";
import { UserList } from "./components/UserList";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";

//medium.com/@richardprasad42/typescript-with-react-crash-course-7a81013a8f64

https: ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <App userType="admin" username="tania" {...props} />
          )}
        />
      </Switch>
      <Switch>
        <Route
          exact
          path="/userlist"
          render={(props) => <UserList {...props} />}
        />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();

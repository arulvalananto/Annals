import React, { useEffect, Suspense } from "react";
// React Router
import { BrowserRouter } from "react-router-dom";
// React Redux
import { useDispatch, useSelector } from "react-redux";
// Other Components
import AppRoutes from "./components/App/AppRoutes.component";
import SuccessMessage from "./components/SuccessMessage/SuccessMessage.component";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.component";
import Spinner from "./components/Spinner/Spinner.component";
// Reducers
import { selectLoading } from "./redux/reducers/auth.reducer";
import { selectMessage } from "./redux/reducers/message.reducer";

import { fetchUser } from "./redux/actions/auth.actions";

function App() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const loading = useSelector(selectLoading);
  const message = useSelector(selectMessage);

  console.log(state);

  useEffect(() => dispatch(fetchUser), [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='app'>
      {message.success && <SuccessMessage message={message.success} />}
      {message.failure && <ErrorMessage message={message.failure} />}
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

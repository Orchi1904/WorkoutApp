import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Workouts from './pages/Workouts/Workouts';
import Exercises from './pages/Exercises/Exercises';
import InfoBar from './components/InfoBar/InfoBar';
import AuthService from './services/auth.service';
import Error from './pages/Error/Error';

const queryClient = new QueryClient();

function App() {
  const { getUser } = AuthService;

  return (
    <QueryClientProvider client={queryClient}>
      {getUser() && <InfoBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/workoutPlans/:workout_planId/workouts" element={
          <PrivateRoute >
            <Workouts />
          </PrivateRoute>
        } />
        <Route path="/workoutPlans/:workout_planId/workouts/:workoutId/exercises" element={
          <PrivateRoute >
            <Exercises />
          </PrivateRoute>
        } />

        <Route path="/" element={
          <PrivateRoute >
            <Home />
          </PrivateRoute>
        } />

        <Route path="*" element={<Error />}/>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

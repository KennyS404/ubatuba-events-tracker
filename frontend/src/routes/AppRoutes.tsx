import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProtectedRoute from '../auth/ProtectedRoute';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import EventDetail from '../components/EventDetail';
import EventForm from '../components/EventForm';
import EventEdit from '../components/EventEdit';
import EventList from '../components/EventList';
import Welcome from '../components/Welcome';

interface AppRoutesProps {
  location: any;
  isAuthenticated: boolean;
  darkMode: boolean;
  pageVariants: any;
  pageTransition: any;
}

export default function AppRoutes({ 
  location, 
  isAuthenticated, 
  darkMode,
  pageVariants,
  pageTransition
}: AppRoutesProps) {
  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full h-full"
    >
      <Routes location={location}>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<EventList darkMode={darkMode} />} />
        <Route path="/events/:id" element={<EventDetail darkMode={darkMode} />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginForm darkMode={darkMode} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegisterForm darkMode={darkMode} />} />
        {/* <Route path="/categories" element={
          <div className="text-center py-12">
            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Categorias de Eventos</h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Em breve: explore eventos por categorias</p>
          </div>
        } /> */}
        
        <Route 
          path="/new" 
          element={
            <ProtectedRoute>
              <EventForm darkMode={darkMode} />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/events/:id/edit" 
          element={
            <ProtectedRoute>
              <EventEdit darkMode={darkMode} />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/my-events" 
          element={
            <ProtectedRoute>
              <EventList myEvents={true} darkMode={darkMode} />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={
          <div className="text-center py-12">
            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Página não encontrada</h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>O conteúdo que você está procurando não existe ou foi movido.</p>
          </div>
        } />
      </Routes>
    </motion.div>
  );
}
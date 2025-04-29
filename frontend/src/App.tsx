import { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Calendar, PlusCircle, Menu, X, User, LogOut, Globe } from 'lucide-react';

import { useAuth } from './context/AuthContext';
import { useTranslation } from './context/TranlationContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [firstVisit, setFirstVisit] = useState(false);
  const location = useLocation();
  
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, t } = useTranslation();

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setFirstVisit(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR');
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  if (firstVisit && !isAuthenticated && location.pathname !== '/welcome' && 
      location.pathname !== '/login' && location.pathname !== '/register') {
    return <Navigate to="/welcome" />;
  }

  if (location.pathname === '/welcome' && isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (location.pathname === '/welcome') {
    return (
      <AnimatePresence mode="wait">
        <AppRoutes 
          location={location} 
          isAuthenticated={isAuthenticated} 
          darkMode={darkMode}
          pageVariants={pageVariants}
          pageTransition={pageTransition}
        />
      </AnimatePresence>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white ${darkMode ? 'dark' : ''}`}>
      <header className={`sticky top-0 z-30 border-b ${darkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900 border-blue-800 text-white' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className={`h-8 w-8 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
            <span className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-blue-800'}`}>Ubatuba Events</span>
          </Link>
          
          <button 
            className={`lg:hidden p-2 rounded-full ${darkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-100'}`}
            onClick={toggleMenu}
          >
            {menuOpen ? <X className={darkMode ? 'text-white' : 'text-blue-700'} /> : <Menu className={darkMode ? 'text-white' : 'text-blue-700'} />}
          </button>

          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex items-center space-x-4">
              <Link to="/" className={`px-3 py-2 rounded-lg transition ${
                darkMode 
                  ? 'hover:bg-blue-800 text-white' 
                  : 'hover:bg-blue-100 text-blue-700'
              } ${location.pathname === '/' ? 'font-medium bg-blue-700 text-white hover:bg-blue-800' : ''}`}>
                {t('app.explore')}
              </Link>
              
              {isAuthenticated && (
                <Link to="/my-events" className={`px-3 py-2 rounded-lg transition ${
                  darkMode 
                    ? 'hover:bg-blue-800 text-white' 
                    : 'hover:bg-blue-100 text-blue-700'
                } ${location.pathname === '/my-events' ? 'font-medium bg-blue-700 text-white hover:bg-blue-800' : ''}`}>
                  {t('app.myEvents')}
                </Link>
              )}
              
              {/* <Link to="/categories" className={`px-3 py-2 rounded-lg transition ${
                darkMode 
                  ? 'hover:bg-blue-800 text-white' 
                  : 'hover:bg-blue-100 text-blue-700'
              } ${location.pathname === '/categories' ? 'font-medium bg-blue-700 text-white hover:bg-blue-800' : ''}`}>
                {t('app.categories')}
              </Link> */}
            </nav>
            
            <button 
              onClick={toggleLanguage}
              className={`p-2 rounded-lg flex items-center justify-center transition-colors shadow-md ${
                darkMode 
                  ? 'bg-blue-800 hover:bg-blue-700 text-blue-200' 
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-200'
              }`}
              aria-label={language === 'pt-BR' ? t('app.switchToEnglish') : t('app.switchToPortuguese')}
            >
              <Globe className="h-5 w-5" />
              <span className="ml-1 text-sm">{language === 'pt-BR' ? 'EN' : 'PT'}</span>
            </button>
            
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg flex items-center justify-center transition-colors shadow-md ${
                darkMode 
                  ? 'bg-blue-800 hover:bg-blue-700 text-yellow-300' 
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-200'
              }`}
              aria-label={darkMode ? t('app.lightMode') : t('app.darkMode')}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg shadow-md ${
                  darkMode 
                    ? 'bg-blue-800 hover:bg-blue-700 text-white border-blue-700' 
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-200'
                }`}>
                  <User className="h-5 w-5" />
                  <span>{user?.username}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-blue-900 rounded-lg shadow-lg py-1 z-10 hidden group-hover:block">
                  <div className="px-4 py-2 border-b border-blue-100 dark:border-blue-800">
                    <p className="text-sm font-medium text-blue-800 dark:text-white">{user?.full_name || user?.username}</p>
                    <p className="text-xs text-blue-500 dark:text-blue-300 truncate">{user?.email}</p>
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-blue-50 dark:hover:bg-blue-800 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('app.logout')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className={`px-3 py-2 rounded-lg shadow-md ${
                    darkMode 
                      ? 'bg-blue-800 hover:bg-blue-700 text-white' 
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-200'
                  }`}
                >
                  {t('app.login')}
                </Link>
                
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg shadow-md transition-colors"
                >
                  {t('app.register')}
                </Link>
              </div>
            )}
            
            {isAuthenticated && (
              <Link to="/new" className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg shadow-md transition-colors">
                <PlusCircle className="h-4 w-4" />
                <span>{t('app.newEvent')}</span>
              </Link>
            )}
          </div>
        </div>
        
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden ${darkMode ? 'bg-blue-900 border-blue-800' : 'bg-white border-blue-100'} border-t`}
          >
            <div className="container mx-auto px-4 py-3 space-y-3">
              <nav className="flex flex-col space-y-2">
                <Link 
                  to="/" 
                  className={`px-3 py-2 rounded-lg transition ${
                    darkMode 
                      ? 'hover:bg-blue-800 text-white' 
                      : 'hover:bg-blue-100 text-blue-700'
                  } ${location.pathname === '/' ? 'font-medium bg-blue-700 text-white hover:bg-blue-800' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {t('app.explore')}
                </Link>
                
                {isAuthenticated && (
                  <Link 
                    to="/my-events" 
                    className={`px-3 py-2 rounded-lg transition ${
                      darkMode 
                        ? 'hover:bg-blue-800 text-white' 
                        : 'hover:bg-blue-100 text-blue-700'
                    } ${location.pathname === '/my-events' ? 'font-medium bg-blue-700 text-white hover:bg-blue-800' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t('app.myEvents')}
                  </Link>
                )}
                
                {/* <Link 
                  to="/categories" 
                  className={`px-3 py-2 rounded-lg transition ${
                    darkMode 
                      ? 'hover:bg-blue-800 text-white' 
                      : 'hover:bg-blue-100 text-blue-700'
                  } ${location.pathname === '/categories' ? 'font-medium bg-blue-700 text-white hover:bg-blue-800' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {t('app.categories')}
                </Link> */}
              </nav>
              
              <div className="flex items-center space-x-2 pt-2 border-t border-blue-100 dark:border-blue-800">
                <button 
                  onClick={toggleLanguage}
                  className={`flex-1 p-2 rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-md ${
                    darkMode 
                      ? 'bg-blue-800 hover:bg-blue-700 text-blue-200' 
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-200'
                  }`}
                >
                  <Globe className="h-5 w-5" />
                  <span>{language === 'pt-BR' ? 'English' : 'Português'}</span>
                </button>
                
                <button
                  onClick={toggleDarkMode}
                  className={`flex-1 p-2 rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-md ${
                    darkMode 
                      ? 'bg-blue-800 hover:bg-blue-700 text-yellow-300' 
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-200'
                  }`}
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span>{darkMode ? t('app.lightMode') : t('app.darkMode')}</span>
                </button>
              </div>
              
              {isAuthenticated ? (
                <div className="space-y-2 pt-2 border-t border-blue-100 dark:border-blue-800">
                  <div className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-blue-800' : 'bg-blue-50'}`}>
                    <p className="font-medium text-blue-800 dark:text-white">{user?.full_name || user?.username}</p>
                    <p className="text-sm text-blue-500 dark:text-blue-300 truncate">{user?.email}</p>
                  </div>
                  
                  <Link 
                    to="/new" 
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg shadow-md transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>{t('app.newEvent')}</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-red-600 dark:text-red-400 w-full rounded-lg bg-white dark:bg-blue-800 hover:bg-red-50 dark:hover:bg-blue-700 text-left shadow-md"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('app.logout')}</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between pt-2 border-t border-blue-100 dark:border-blue-800">
                  <Link 
                    to="/login" 
                    className={`px-3 py-2 rounded-lg shadow-md ${
                      darkMode 
                        ? 'bg-blue-800 hover:bg-blue-700 text-white' 
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-200'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t('app.login')}
                  </Link>
                  
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg shadow-md transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t('app.register')}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 30" className="w-full">
            <path 
              fill={darkMode ? '#1e3a8a' : '#ffffff'} 
              fillOpacity="1" 
              d="M0,16L80,18.7C160,21,320,27,480,25.3C640,24,800,16,960,13.3C1120,11,1280,11,1360,10.7L1440,10.7L1440,30L1360,30C1280,30,1120,30,960,30C800,30,640,30,480,30C320,30,160,30,80,30L0,30Z"
            ></path>
          </svg>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <AnimatePresence mode="wait">
          <AppRoutes 
            location={location} 
            isAuthenticated={isAuthenticated} 
            darkMode={darkMode}
            pageVariants={pageVariants}
            pageTransition={pageTransition}
          />
        </AnimatePresence>
      </main>
      
      <footer className={`mt-auto ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-50 text-blue-800'}`}>
       
        <div className={`${darkMode ? 'bg-blue-950 border-blue-900' : 'bg-white border-blue-100'} border-t`}>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className={`h-6 w-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
                  <span className="text-lg font-bold">Ubatuba Events</span>
                </div>
                <p className="text-sm">{t('app.platform')}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">{t('app.quickLinks')}</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="hover:underline">{t('app.home')}</Link></li>
                  {isAuthenticated && <li><Link to="/my-events" className="hover:underline">{t('app.myEvents')}</Link></li>}
                  <li><Link to="/categories" className="hover:underline">{t('app.categories')}</Link></li>
                  {isAuthenticated ? (
                    <li><Link to="/new" className="hover:underline">{t('app.newEvent')}</Link></li>
                  ) : (
                    <>
                      <li><Link to="/login" className="hover:underline">{t('app.login')}</Link></li>
                      <li><Link to="/register" className="hover:underline">{t('app.register')}</Link></li>
                    </>
                  )}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">{t('app.contact')}</h3>
                <ul className="space-y-2 text-sm">
                  <li>contato@ubatubaevents.com</li>
                  <li>(12) 3456-7890</li>
                  <li>{t('app.address')}</li>
                </ul>
              </div>
            </div>
            
            <div className={`mt-8 pt-6 text-center text-sm ${darkMode ? 'border-t border-blue-900' : 'border-t border-blue-100'}`}>
              Ubatuba Events &copy; {new Date().getFullYear()} - {t('app.allRightsReserved')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
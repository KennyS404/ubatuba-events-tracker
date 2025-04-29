import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users, Waves, Camera, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranlationContext';


export default function Welcome() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">

      <section className="relative flex-grow flex flex-col justify-center items-center text-center py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-90"></div>
        <div className="absolute inset-0 z-0 bg-[url('/images/ubatuba-beach.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex justify-center items-center mb-6">
              <Calendar className="h-14 w-14 text-white" />
              <h1 className="text-5xl md:text-7xl font-bold text-white ml-3 tracking-tight">Ubatuba Events</h1>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-xl md:text-2xl text-white mb-10 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {t('welcome.title')}
          </motion.h2>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link 
              to="/register" 
              className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition-colors"
            >
              {t('welcome.register')}
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 transition-colors"
            >
              {t('welcome.login')}
            </Link>
            {/* <Link 
              to="/" 
              className="px-8 py-3 bg-transparent text-white border border-white font-semibold rounded-lg shadow-lg hover:bg-white/10 transition-colors"
            >
              {t('welcome.exploreEvents')}
            </Link> */}
          </motion.div>
        </motion.div>
        

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('welcome.whyChoose')}
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-blue-50 p-8 rounded-xl shadow-sm border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('welcome.localEvents')}</h3>
              <p className="text-gray-600">{t('welcome.localEventsDesc')}</p>
            </motion.div>
            
            <motion.div 
              className="bg-blue-50 p-8 rounded-xl shadow-sm border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('welcome.easyLocation')}</h3>
              <p className="text-gray-600">{t('welcome.easyLocationDesc')}</p>
            </motion.div>
            
            <motion.div 
              className="bg-blue-50 p-8 rounded-xl shadow-sm border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('welcome.activeCommunity')}</h3>
              <p className="text-gray-600">{t('welcome.activeCommunityDesc')}</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('welcome.discoverUbatuba')}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('welcome.ubatubaCityDesc')}
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              className="rounded-xl overflow-hidden shadow-md aspect-video bg-blue-700 relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-[url('/images/beach.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <Waves className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">{t('welcome.paradiseBeaches')}</h3>
                <p className="text-sm text-blue-100">{t('welcome.northCoastBeaches')}</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-xl overflow-hidden shadow-md aspect-video bg-blue-700 relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-[url('/images/festival.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <Camera className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">{t('welcome.culturalEvents')}</h3>
                <p className="text-sm text-blue-100">{t('welcome.festivalsShowsExhibitions')}</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-xl overflow-hidden shadow-md aspect-video bg-blue-700 relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-[url('/images/gastronomy.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <Coffee className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">{t('welcome.localGastronomy')}</h3>
                <p className="text-sm text-blue-100">{t('welcome.caicara')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('welcome.readyToDiscover')}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('welcome.joinUs')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/register" 
              className="group inline-flex items-center px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 transition-colors"
            >
              {t('welcome.startNow')} 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      <footer className="py-8 px-4 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <div className="flex justify-center items-center mb-4">
            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-bold text-gray-700">Ubatuba Events</span>
          </div>
          <p>© {new Date().getFullYear()} Ubatuba Events. {t('app.allRightsReserved')}</p>
        </div>
      </footer>
    </div>
  );
}
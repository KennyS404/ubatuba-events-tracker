import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'pt-BR' | 'en';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: Record<string, string>) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  'pt-BR': {
    'common.back': 'Voltar',
    'common.cancel': 'Cancelar',
    'common.save': 'Salvar',
    'common.submit': 'Enviar',
    'common.delete': 'Excluir',
    'common.edit': 'Editar',
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.required': 'Obrigatório',
    
    'app.explore': 'Explorar',
    'app.myEvents': 'Meus Eventos',
    'app.categories': 'Categorias',
    'app.lightMode': 'Modo claro',
    'app.darkMode': 'Modo escuro',
    'app.login': 'Entrar',
    'app.register': 'Cadastrar',
    'app.newEvent': 'Novo Evento',
    'app.logout': 'Sair',
    'app.home': 'Página Inicial',
    'app.contact': 'Contato',
    'app.quickLinks': 'Links Rápidos',
    'app.allRightsReserved': 'Todos os direitos reservados',
    'app.language': 'Idioma',
    'app.switchToEnglish': 'Mudar para Inglês',
    'app.switchToPortuguese': 'Mudar para Português',
    'app.platform': 'A melhor plataforma para descobrir eventos em Ubatuba e região.',
    'app.address': 'Rua da Praia, 123 - Ubatuba/SP',
    
    'welcome.title': 'Descubra e participe dos melhores eventos em Ubatuba e região',
    'welcome.register': 'Cadastrar-se',
    'welcome.login': 'Entrar',
    'welcome.exploreEvents': 'Explorar eventos',
    'welcome.whyChoose': 'Por que escolher Ubatuba Events?',
    'welcome.localEvents': 'Eventos Locais',
    'welcome.localEventsDesc': 'Descubra todos os eventos que acontecem em Ubatuba e região, de festas a workshops culturais.',
    'welcome.easyLocation': 'Fácil Localização',
    'welcome.easyLocationDesc': 'Encontre facilmente a localização dos eventos e obtenha direções para chegar sem problemas.',
    'welcome.activeCommunity': 'Comunidade Ativa',
    'welcome.activeCommunityDesc': 'Conecte-se com outras pessoas, compartilhe experiências e faça parte da comunidade local.',
    'welcome.discoverUbatuba': 'Descubra Ubatuba',
    'welcome.ubatubaCityDesc': 'Uma das mais belas cidades do litoral norte paulista, com mais de 100 praias e muitas atividades culturais',
    'welcome.paradiseBeaches': 'Praias Paradisíacas',
    'welcome.northCoastBeaches': 'As mais belas praias do litoral norte',
    'welcome.culturalEvents': 'Eventos Culturais',
    'welcome.festivalsShowsExhibitions': 'Festivais, shows e exposições',
    'welcome.localGastronomy': 'Gastronomia Local',
    'welcome.caicara': 'Sabores da culinária caiçara',
    'welcome.readyToDiscover': 'Pronto para descobrir o que está acontecendo em Ubatuba?',
    'welcome.joinUs': 'Junte-se a nós hoje e nunca mais perca um evento na região!',
    'welcome.startNow': 'Comece agora',
    
    'login.welcomeBack': 'Bem-vindo de volta',
    'login.enterAccount': 'Entre com sua conta para continuar',
    'login.username': 'Nome de usuário',
    'login.usernamePlace': 'Seu nome de usuário',
    'login.password': 'Senha',
    'login.passwordPlace': 'Sua senha',
    'login.loginButton': 'Entrar',
    'login.loggingIn': 'Entrando...',
    'login.noAccount': 'Não tem uma conta?',
    'login.fillAllFields': 'Preencha todos os campos',
    'login.backToHome': 'Voltar para a página inicial',
    'login.loginError': 'Erro ao fazer login. Verifique suas credenciais.',
    
    'register.createAccount': 'Criar uma conta',
    'register.joinPlatform': 'Junte-se à plataforma de eventos de Ubatuba',
    'register.username': 'Nome de usuário *',
    'register.usernamePlace': 'Escolha um nome de usuário',
    'register.email': 'Email *',
    'register.emailPlace': 'Seu endereço de email',
    'register.fullName': 'Nome completo',
    'register.fullNamePlace': 'Seu nome completo (opcional)',
    'register.password': 'Senha *',
    'register.passwordPlace': 'Crie uma senha (mínimo 6 caracteres)',
    'register.confirmPassword': 'Confirmar senha *',
    'register.confirmPasswordPlace': 'Digite a senha novamente',
    'register.registerButton': 'Registrar',
    'register.creatingAccount': 'Criando conta...',
    'register.haveAccount': 'Já tem uma conta?',
    'register.fillAllFields': 'Preencha todos os campos obrigatórios',
    'register.validEmail': 'Informe um email válido',
    'register.passwordLength': 'A senha deve ter pelo menos 6 caracteres',
    'register.passwordsMatch': 'As senhas não coincidem',
    'register.registerError': 'Erro ao criar conta. Tente novamente.',
    
    'eventList.myEvents': 'Meus Eventos',
    'eventList.exploreEvents': 'Explorar Eventos',
    'eventList.searchByTitle': 'Buscar por título...',
    'eventList.searchEvents': 'Buscar eventos',
    'eventList.filterByCategory': 'Filtrar por categoria',
    'eventList.allCategories': 'Todas as categorias',
    'eventList.noEventsFound': 'Nenhum evento encontrado',
    'eventList.noEventsCreated': 'Você ainda não criou nenhum evento. Que tal começar agora?',
    'eventList.noEventsWithFilters': 'Não encontramos eventos com os filtros aplicados. Tente outros critérios de busca.',
    'eventList.createFirstEvent': 'Criar evento',
    'eventList.viewDetails': 'Ver detalhes',
    
    'eventForm.createNewEvent': 'Criar Novo Evento',
    'eventForm.fillAllRequired': 'Por favor, preencha todos os campos obrigatórios',
    'eventForm.createEventError': 'Erro ao criar evento. Tente novamente.',
    'eventForm.title': 'Título *',
    'eventForm.eventNamePlaceholder': 'Nome do evento',
    'eventForm.description': 'Descrição',
    'eventForm.eventDetailsPlaceholder': 'Detalhes do evento',
    'eventForm.dateAndTime': 'Data e Hora *',
    'eventForm.selectDateAndTime': 'Selecione data e hora',
    'eventForm.location': 'Local *',
    'eventForm.eventAddressPlaceholder': 'Endereço do evento',
    'eventForm.category': 'Categoria',
    'eventForm.image': 'Imagem',
    'eventForm.clickToUpload': 'Clique para fazer upload ou arraste e solte',
    'eventForm.imageFormats': 'PNG, JPG, GIF (MAX. 10MB)',
    'eventForm.changeImage': 'Alterar imagem',
    'eventForm.createEvent': 'Criar Evento',
    'eventForm.creating': 'Criando...',
    'eventForm.requiredFieldsNote': 'Todos os campos marcados com * são obrigatórios',
    
    'eventDetail.errorLoadingEvent': 'Erro ao carregar evento',
    'eventDetail.eventNotFound': 'Evento não encontrado',
    'eventDetail.unableToLoadEvent': 'Não foi possível carregar o evento.',
    'eventDetail.published': 'Publicado',
    'eventDetail.edit': 'Editar',
    'eventDetail.delete': 'Excluir',
    'eventDetail.confirmDelete': 'Confirmar exclusão',
    'eventDetail.deleteConfirmMessage': 'Tem certeza que deseja excluir o evento "{title}"? Esta ação não pode ser desfeita.',
    'eventDetail.deleting': 'Excluindo...',
    'eventDetail.unableToDeleteEvent': 'Não foi possível excluir o evento.',
    'eventDetail.aboutEvent': 'Sobre o evento',
    'eventDetail.noDescription': 'Nenhuma descrição disponível.',
    'eventDetail.details': 'Detalhes',
    'eventDetail.location': 'Local',
    'eventDetail.category': 'Categoria',
    'eventDetail.organizer': 'Organizador',
    'eventDetail.you': 'Você',
    'eventDetail.user': 'Usuário',
    
    'categories.general': 'Geral',
    'categories.music': 'Música',
    'categories.sports': 'Esportes',
    'categories.art': 'Arte',
    'categories.technology': 'Tecnologia',
    'categories.food': 'Gastronomia',
    'categories.education': 'Educação',
    'categories.business': 'Negócios',
    'categories.health': 'Saúde',
    'categories.other': 'Outros',
  },
  'en': {
    'common.back': 'Back',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.submit': 'Submit',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.required': 'Required',
    
    'app.explore': 'Explore',
    'app.myEvents': 'My Events',
    'app.categories': 'Categories',
    'app.lightMode': 'Light mode',
    'app.darkMode': 'Dark mode',
    'app.login': 'Login',
    'app.register': 'Register',
    'app.newEvent': 'New Event',
    'app.logout': 'Logout',
    'app.home': 'Home',
    'app.contact': 'Contact',
    'app.quickLinks': 'Quick Links',
    'app.allRightsReserved': 'All rights reserved',
    'app.language': 'Language',
    'app.switchToEnglish': 'Switch to English',
    'app.switchToPortuguese': 'Switch to Portuguese',
    'app.platform': 'The best platform to discover events in Ubatuba and region.',
    'app.address': 'Beach Street, 123 - Ubatuba/SP',
    
    'welcome.title': 'Discover and join the best events in Ubatuba and region',
    'welcome.register': 'Register',
    'welcome.login': 'Login',
    'welcome.exploreEvents': 'Explore events',
    'welcome.whyChoose': 'Why choose Ubatuba Events?',
    'welcome.localEvents': 'Local Events',
    'welcome.localEventsDesc': 'Discover all events happening in Ubatuba and region, from parties to cultural workshops.',
    'welcome.easyLocation': 'Easy Location',
    'welcome.easyLocationDesc': 'Easily find event locations and get directions to arrive without problems.',
    'welcome.activeCommunity': 'Active Community',
    'welcome.activeCommunityDesc': 'Connect with other people, share experiences and be part of the local community.',
    'welcome.discoverUbatuba': 'Discover Ubatuba',
    'welcome.ubatubaCityDesc': 'One of the most beautiful cities on the north coast of São Paulo, with over 100 beaches and many cultural activities',
    'welcome.paradiseBeaches': 'Paradise Beaches',
    'welcome.northCoastBeaches': 'The most beautiful beaches on the north coast',
    'welcome.culturalEvents': 'Cultural Events',
    'welcome.festivalsShowsExhibitions': 'Festivals, shows and exhibitions',
    'welcome.localGastronomy': 'Local Gastronomy',
    'welcome.caicara': 'Flavors of caiçara cuisine',
    'welcome.readyToDiscover': 'Ready to discover what\'s happening in Ubatuba?',
    'welcome.joinUs': 'Join us today and never miss an event in the region!',
    'welcome.startNow': 'Start now',
    
    'login.welcomeBack': 'Welcome back',
    'login.enterAccount': 'Sign in to your account to continue',
    'login.username': 'Username',
    'login.usernamePlace': 'Your username',
    'login.password': 'Password',
    'login.passwordPlace': 'Your password',
    'login.loginButton': 'Login',
    'login.loggingIn': 'Logging in...',
    'login.noAccount': 'Don\'t have an account?',
    'login.fillAllFields': 'Please fill all fields',
    'login.backToHome': 'Back to home page',
    'login.loginError': 'Error logging in. Please check your credentials.',
    
    'register.createAccount': 'Create an account',
    'register.joinPlatform': 'Join the Ubatuba events platform',
    'register.username': 'Username *',
    'register.usernamePlace': 'Choose a username',
    'register.email': 'Email *',
    'register.emailPlace': 'Your email address',
    'register.fullName': 'Full name',
    'register.fullNamePlace': 'Your full name (optional)',
    'register.password': 'Password *',
    'register.passwordPlace': 'Create a password (minimum 6 characters)',
    'register.confirmPassword': 'Confirm password *',
    'register.confirmPasswordPlace': 'Type the password again',
    'register.registerButton': 'Register',
    'register.creatingAccount': 'Creating account...',
    'register.haveAccount': 'Already have an account?',
    'register.fillAllFields': 'Please fill all required fields',
    'register.validEmail': 'Please enter a valid email',
    'register.passwordLength': 'Password must be at least 6 characters',
    'register.passwordsMatch': 'Passwords do not match',
    'register.registerError': 'Error creating account. Please try again.',
    
    'eventList.myEvents': 'My Events',
    'eventList.exploreEvents': 'Explore Events',
    'eventList.searchByTitle': 'Search by title...',
    'eventList.searchEvents': 'Search events',
    'eventList.filterByCategory': 'Filter by category',
    'eventList.allCategories': 'All categories',
    'eventList.noEventsFound': 'No events found',
    'eventList.noEventsCreated': 'You haven\'t created any events yet. Want to start now?',
    'eventList.noEventsWithFilters': 'We couldn\'t find any events with the applied filters. Try other search criteria.',
    'eventList.createFirstEvent': 'Create event',
    'eventList.viewDetails': 'View details',
    
    'eventForm.createNewEvent': 'Create New Event',
    'eventForm.fillAllRequired': 'Please fill all required fields',
    'eventForm.createEventError': 'Error creating event. Please try again.',
    'eventForm.title': 'Title *',
    'eventForm.eventNamePlaceholder': 'Event name',
    'eventForm.description': 'Description',
    'eventForm.eventDetailsPlaceholder': 'Event details',
    'eventForm.dateAndTime': 'Date and Time *',
    'eventForm.selectDateAndTime': 'Select date and time',
    'eventForm.location': 'Location *',
    'eventForm.eventAddressPlaceholder': 'Event address',
    'eventForm.category': 'Category',
    'eventForm.image': 'Image',
    'eventForm.clickToUpload': 'Click to upload or drag and drop',
    'eventForm.imageFormats': 'PNG, JPG, GIF (MAX. 10MB)',
    'eventForm.changeImage': 'Change image',
    'eventForm.createEvent': 'Create Event',
    'eventForm.creating': 'Creating...',
    'eventForm.requiredFieldsNote': 'All fields marked with * are required',
    
    'eventDetail.errorLoadingEvent': 'Error loading event',
    'eventDetail.eventNotFound': 'Event not found',
    'eventDetail.unableToLoadEvent': 'Unable to load the event.',
    'eventDetail.published': 'Published',
    'eventDetail.edit': 'Edit',
    'eventDetail.delete': 'Delete',
    'eventDetail.confirmDelete': 'Confirm deletion',
    'eventDetail.deleteConfirmMessage': 'Are you sure you want to delete the event "{title}"? This action cannot be undone.',
    'eventDetail.deleting': 'Deleting...',
    'eventDetail.unableToDeleteEvent': 'Unable to delete the event.',
    'eventDetail.aboutEvent': 'About the event',
    'eventDetail.noDescription': 'No description available.',
    'eventDetail.details': 'Details',
    'eventDetail.location': 'Location',
    'eventDetail.category': 'Category',
    'eventDetail.organizer': 'Organizer',
    'eventDetail.you': 'You',
    'eventDetail.user': 'User',
    
    'categories.general': 'General',
    'categories.music': 'Music',
    'categories.sports': 'Sports',
    'categories.art': 'Art',
    'categories.technology': 'Technology',
    'categories.food': 'Food',
    'categories.education': 'Education',
    'categories.business': 'Business',
    'categories.health': 'Health',
    'categories.other': 'Other',
  }
};

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language;
    return browserLang.startsWith('en') ? 'en' : 'pt-BR';
  };

  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = localStorage.getItem('language');
    return (storedLang === 'en' || storedLang === 'pt-BR') ? storedLang as Language : getBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, options?: Record<string, string>): string => {
    let translation = translations[language][key] || key;
    
    if (options) {
      Object.entries(options).forEach(([placeholder, value]) => {
        translation = translation.replace(`{${placeholder}}`, value);
      });
    }
    
    return translation;
  };

  const contextValue: TranslationContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
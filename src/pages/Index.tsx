import React, { useState } from 'react';
import StrategicLevel from '@/components/levels/StrategicLevel';
import TacticalLevel from '@/components/levels/TacticalLevel';
import OperationalLevel from '@/components/levels/OperationalLevel';
import LoginScreen from '@/components/LoginScreen';
import { BarChart3, Settings, Wrench, Building2, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import pcpLogo from '@/assets/pcp-lite-logo.png';
import GlossaryDialog from '@/components/GlossaryDialog';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<'home' | 'strategic' | 'tactical' | 'operational'>('home');

  const levels = [
    {
      id: 'strategic',
      title: 'Estratégico',
      description: 'Análises históricas e planejamento',
      icon: BarChart3,
      color: 'text-strategic'
    },
    {
      id: 'tactical',
      title: 'Tático',
      description: 'Controle de estoques e produção',
      icon: Settings,
      color: 'text-tactical'
    },
    {
      id: 'operational',
      title: 'Operacional',
      description: 'Execução e acompanhamento',
      icon: Wrench,
      color: 'text-operational'
    }
  ];

  const handleLevelNavigation = (level: 'home' | 'strategic' | 'tactical' | 'operational') => {
    setCurrentLevel(level);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentLevel('home');
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentLevel !== 'home') {
    return (
      <div className="min-h-screen bg-background">
        {/* Responsive navbar for level views */}
        <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src={pcpLogo} alt="PCP lite" className="w-full h-full object-contain" />
                </div>
                <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-foreground">PCP lite</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <GlossaryDialog />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleLevelNavigation('home')}
                  className="hover-scale"
                >
                  <span className="hidden sm:inline">Menu Principal</span>
                  <span className="sm:hidden">Menu</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1 sm:gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
          {currentLevel === 'strategic' && (
            <StrategicLevel onNext={() => handleLevelNavigation('tactical')} />
          )}
          {currentLevel === 'tactical' && (
            <TacticalLevel 
              onNext={() => handleLevelNavigation('operational')} 
              onPrevious={() => handleLevelNavigation('strategic')} 
            />
          )}
          {currentLevel === 'operational' && (
            <OperationalLevel onPrevious={() => handleLevelNavigation('tactical')} />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Responsive navbar */}
      <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between w-full gap-2">
            <div className="flex items-center flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center overflow-hidden">
                <img src={pcpLogo} alt="PCP lite" className="w-full h-full object-contain" />
              </div>
              <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-foreground">PCP lite</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-lg">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Usuário Demo</span>
              </div>
              <GlossaryDialog />
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-1 sm:gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Mobile optimized */}
      <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16 max-w-4xl">
        {/* Company Logo and Motto */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="mb-6 sm:mb-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 p-3 sm:p-4">
              <img src={pcpLogo} alt="PCP lite" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-4">
              TechPro Manufacturing
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground italic px-4">
              "Inovação em cada produto, excelência em cada processo"
            </p>
          </div>
        </div>

        {/* Three Main Level Options - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {levels.map((level) => {
            const Icon = level.icon;
            
            return (
              <button
                key={level.id}
                onClick={() => handleLevelNavigation(level.id as 'strategic' | 'tactical' | 'operational')}
                className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-card/50 backdrop-blur-sm active:scale-95"
                aria-label={`Acessar nível ${level.title}`}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 bg-muted group-hover:bg-primary/10 transition-colors">
                    <Icon className={`h-10 w-10 sm:h-12 sm:w-12 ${level.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors">
                    {level.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {level.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* System info - Responsive */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16 p-3 sm:p-4 bg-primary/5 rounded-lg sm:rounded-xl border border-primary/20">
          <p className="text-xs sm:text-sm text-primary font-medium">
            📱 Fabricação de Celulares, Drones e Monitores • Sistema PCP Integrado
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
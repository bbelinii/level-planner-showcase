import React, { useState } from 'react';
import StrategicLevel from '@/components/levels/StrategicLevel';
import TacticalLevel from '@/components/levels/TacticalLevel';
import OperationalLevel from '@/components/levels/OperationalLevel';
import { BarChart3, Settings, Wrench, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import pcpLogo from '@/assets/pcp-lite-logo.png';
import GlossaryDialog from '@/components/GlossaryDialog';

const Index = () => {
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

  if (currentLevel !== 'home') {
    return (
      <div className="min-h-screen bg-background">
        {/* Simple navbar */}
        <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src={pcpLogo} alt="PCP lite" className="w-full h-full object-contain" />
                </div>
                <span className="ml-3 text-xl font-bold text-foreground">PCP lite</span>
              </div>
              <div className="flex items-center gap-2">
                <GlossaryDialog />
                <Button 
                  variant="outline" 
                  onClick={() => handleLevelNavigation('home')}
                  className="hover-scale"
                >
                  Menu Principal
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-7xl">
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
      {/* Simple navbar with just our logo */}
      <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                <img src={pcpLogo} alt="PCP lite" className="w-full h-full object-contain" />
              </div>
              <span className="ml-3 text-xl font-bold text-foreground">PCP lite</span>
            </div>
            <GlossaryDialog />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Company Logo and Motto */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 p-4">
              <img src={pcpLogo} alt="PCP lite" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Empresa Modelo
            </h1>
            <p className="text-xl text-muted-foreground italic">
              "Visar o presente pensando no futuro"
            </p>
          </div>
        </div>

        {/* Three Main Level Options */}
        <div className="grid md:grid-cols-3 gap-8">
          {levels.map((level) => {
            const Icon = level.icon;
            
            return (
              <button
                key={level.id}
                onClick={() => handleLevelNavigation(level.id as 'strategic' | 'tactical' | 'operational')}
                className="group p-8 rounded-3xl border-2 border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-card/50 backdrop-blur-sm"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6 bg-muted group-hover:bg-primary/10 transition-colors">
                    <Icon className={`h-12 w-12 ${level.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {level.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {level.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Educational note */}
        <div className="text-center mt-16 p-4 bg-muted/30 rounded-xl">
          <p className="text-sm text-muted-foreground">
            🎓 Projeto Educacional • Dados simulados para fins didáticos
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
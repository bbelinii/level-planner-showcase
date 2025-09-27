import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import LevelCard from '@/components/LevelCard';
import StrategicLevel from '@/components/levels/StrategicLevel';
import TacticalLevel from '@/components/levels/TacticalLevel';
import OperationalLevel from '@/components/levels/OperationalLevel';
import { ArrowDown, Lightbulb, Target, Zap } from 'lucide-react';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');

  // Scroll suave para seções
  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 120; // Compensation for fixed header
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  // Detect current section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['strategic', 'tactical', 'operational'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(sectionId);
            return;
          }
        }
      }

      // If not in any section, we're at home
      if (window.scrollY < 200) {
        setCurrentSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const levels = [
    {
      level: 'strategic' as const,
      title: 'Nível Estratégico',
      description: 'Planejamento de longo prazo, análise de demanda e decisões de capacidade. Define o PMP (Plano Mestre de Produção) baseado em previsões e políticas de estoque.',
      features: [
        'Dashboard de análises históricas',
        'Simulador de cenários PMP',
        'Calculadora EOQ/MC didática',
        'Glossário interativo de conceitos'
      ]
    },
    {
      level: 'tactical' as const,
      title: 'Nível Tático',
      description: 'Conversão do PMP em MPS (Master Production Schedule), gestão de estoques e planejamento de capacidade por máquina e período.',
      features: [
        'Fluxo visual PMP → MPS',
        'Dashboard de controle de estoque',
        'Planejamento por máquina',
        'Gestão de fornecedores'
      ]
    },
    {
      level: 'operational' as const,
      title: 'Nível Operacional',
      description: 'Execução diária da produção, sequenciamento de ordens, apontamentos de produção e controle de qualidade em tempo real.',
      features: [
        'Quadro diário por máquina',
        'Checklist pré-turno',
        'Apontamento de produção',
        'Controle de materiais'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentSection={currentSection} onNavigate={scrollToSection} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Lightbulb className="h-4 w-4" />
            Projeto Educacional • Engenharia de Software
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6 animate-slide-up">
            Níveis da Engenharia de Software
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in">
            Explore de forma interativa os três níveis hierárquicos da engenharia de produção:
            <span className="block mt-2 font-medium">Estratégico • Tático • Operacional</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-scale-in">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="h-4 w-4 text-strategic" />
              PMP, EOQ, KPIs
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-tactical" />
              MPS, BOM, Estoque
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-operational" />
              Produção, Checklists
            </div>
          </div>

          <button
            onClick={() => scrollToSection('strategic')}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors animate-bounce"
          >
            <span>Começar exploração</span>
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Pyramid Layout */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8">
            {/* Strategic Level - Top/Full Width */}
            <div className="grid grid-cols-1 gap-8">
              <LevelCard
                {...levels[0]}
                onNavigate={() => scrollToSection('strategic')}
              />
            </div>
            
            {/* Tactical Level - Middle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:px-12">
              <LevelCard
                {...levels[1]}
                onNavigate={() => scrollToSection('tactical')}
              />
              <div className="hidden md:block"></div>
            </div>
            
            {/* Operational Level - Bottom */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:px-24">
              <LevelCard
                {...levels[2]}
                onNavigate={() => scrollToSection('operational')}
              />
              <div className="hidden md:block"></div>
              <div className="hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Level Sections */}
      <div id="strategic">
        <StrategicLevel />
      </div>
      
      <div id="tactical">
        <TacticalLevel />
      </div>
      
      <div id="operational">
        <OperationalLevel />
      </div>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4 mt-16">
        <div className="container mx-auto text-center max-w-4xl">
          <h3 className="text-lg font-semibold mb-4">Como editar este projeto</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Textos e Conteúdo</h4>
              <p>Use o editor visual do Lovable para editar textos, títulos e descrições diretamente na interface.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Cores e Design</h4>
              <p>Personalize cores, gradientes e estilos no arquivo <code>index.css</code> e <code>tailwind.config.ts</code>.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Dados Mock</h4>
              <p>Edite dados simulados no arquivo <code>src/data/mockData.ts</code> para personalizar SKUs, máquinas e valores.</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Desenvolvido com Lovable • React + TypeScript + Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
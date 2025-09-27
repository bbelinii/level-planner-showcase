import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StrategicLevel from '@/components/levels/StrategicLevel';
import TacticalLevel from '@/components/levels/TacticalLevel';
import OperationalLevel from '@/components/levels/OperationalLevel';
import { BarChart3, Settings, Wrench, Factory } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('strategic');

  const levels = [
    {
      id: 'strategic',
      title: 'Planejamento Estratégico',
      description: 'Análise de demanda, cenários e políticas de longo prazo',
      icon: BarChart3,
      color: 'text-strategic'
    },
    {
      id: 'tactical',
      title: 'Controle Tático',
      description: 'Gestão de estoques e planejamento de produção',
      icon: Settings,
      color: 'text-tactical'
    },
    {
      id: 'operational',
      title: 'Execução Operacional',
      description: 'Produção diária e controle de qualidade',
      icon: Wrench,
      color: 'text-operational'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
                <Factory className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Sistema de Produção</h1>
                <p className="text-xs text-muted-foreground">Gestão Integrada de Manufatura</p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              🎓 Projeto Educacional • Dados simulados
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Plataforma de Gestão de Produção
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sistema integrado para planejamento, controle e execução da produção industrial
          </p>
        </div>

        {/* Navigation Icons */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {levels.map((level) => {
            const Icon = level.icon;
            const isActive = activeTab === level.id;
            
            return (
              <button
                key={level.id}
                onClick={() => setActiveTab(level.id)}
                className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  isActive 
                    ? 'border-primary bg-primary/5 shadow-lg' 
                    : 'border-border hover:border-primary/50 hover:bg-accent/50'
                }`}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'bg-muted group-hover:bg-primary/10'
                  }`}>
                    <Icon className={`h-10 w-10 ${isActive ? 'text-white' : level.color}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${isActive ? 'text-primary' : 'text-foreground'}`}>
                    {level.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {level.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="hidden" />
          
          <TabsContent value="strategic" className="mt-0">
            <StrategicLevel />
          </TabsContent>
          
          <TabsContent value="tactical" className="mt-0">
            <TacticalLevel />
          </TabsContent>
          
          <TabsContent value="operational" className="mt-0">
            <OperationalLevel />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-8 px-4 mt-16">
        <div className="container mx-auto text-center max-w-4xl">
          <h3 className="text-lg font-semibold mb-4">Personalização do Sistema</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Interface</h4>
              <p>Utilize o editor visual para personalizar textos e elementos da interface</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Dados</h4>
              <p>Configure SKUs, máquinas e parâmetros no arquivo de dados simulados</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Aparência</h4>
              <p>Ajuste cores, gradientes e estilos nos arquivos de configuração</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Sistema desenvolvido com tecnologias modernas • React + TypeScript + Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
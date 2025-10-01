import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Package, Settings2, ArrowRight, Factory, Users } from 'lucide-react';
import ProductList from '@/components/ProductList';

interface StrategicLevelProps {
  onNext?: () => void;
}

const StrategicLevel = ({ onNext }: StrategicLevelProps) => {
  const [selectedScenario, setSelectedScenario] = useState('atual');

  const scenarios = {
    atual: { multiplier: 1, label: 'Cenário Atual' },
    otimista: { multiplier: 1.2, label: 'Crescimento 20%' },
    pessimista: { multiplier: 0.8, label: 'Retração 20%' }
  };

  const salesData = [
    { month: 'Jan', sales: 45000, stock: 12000, capacity: 85 },
    { month: 'Fev', sales: 52000, stock: 11500, capacity: 92 },
    { month: 'Mar', sales: 48000, stock: 13200, capacity: 88 },
    { month: 'Abr', sales: 55000, stock: 10800, capacity: 95 },
    { month: 'Mai', sales: 49000, stock: 12800, capacity: 89 }
  ];

  const pmpData = [
    { period: 'Sem 1', demand: 12000, production: 12500, inventory: 8500 },
    { period: 'Sem 2', demand: 11500, production: 12000, inventory: 9000 },
    { period: 'Sem 3', demand: 13000, production: 13200, inventory: 9200 },
    { period: 'Sem 4', demand: 12800, production: 13000, inventory: 9400 }
  ];

  return (
    <div className="py-4 sm:py-6 md:py-8">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 bg-strategic/10 text-strategic px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
          <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
          Nível Estratégico
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
          Planejamento Estratégico
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
          Análises históricas e definição de políticas de produção
        </p>
      </div>

      {/* Lista de Produtos */}
      <ProductList />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
        {/* Análises Históricas */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-strategic" />
              Análises Históricas
            </CardTitle>
            <CardDescription>
              Vendas, estoques e capacidade dos últimos períodos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-medium text-xs sm:text-sm">Histórico de Vendas e Capacidade</h4>
              <div className="table-responsive">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-1.5 sm:p-2">Mês</th>
                      <th className="text-right p-1.5 sm:p-2">Vendas</th>
                      <th className="text-right p-1.5 sm:p-2 hidden sm:table-cell">Estoque</th>
                      <th className="text-right p-1.5 sm:p-2">Cap.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-1.5 sm:p-2 font-medium">{item.month}</td>
                        <td className="p-1.5 sm:p-2 text-right">{item.sales.toLocaleString()}</td>
                        <td className="p-1.5 sm:p-2 text-right hidden sm:table-cell">{item.stock.toLocaleString()}</td>
                        <td className="p-1.5 sm:p-2 text-right">{item.capacity}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Decisão Estratégica */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-strategic" />
              Base para Decisão
            </CardTitle>
            <CardDescription>
              Produzir para estoque ou sob demanda?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-xs sm:text-sm mb-2">Para Estoque</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Demanda estável</li>
                    <li>• Produtos padronizados</li>
                    <li>• Economia de escala</li>
                  </ul>
                </div>
                <div className="p-3 border rounded-lg bg-strategic/5">
                  <h4 className="font-medium text-xs sm:text-sm mb-2">Sob Demanda</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Demanda variável</li>
                    <li>• Produtos customizados</li>
                    <li>• Menor capital imobilizado</li>
                  </ul>
                  <Badge className="mt-2 bg-strategic text-strategic-foreground text-xs">
                    Recomendado
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verificação de Capacidade */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5 text-strategic" />
              Verificação de Capacidade
            </CardTitle>
            <CardDescription>
              Máquinas e pessoas dão conta da meta?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Capacidade de Máquinas</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Disponibilidade de Pessoas</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Meta de Produção</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
              <div className="p-3 bg-tactical/5 rounded-lg">
                <p className="text-sm">
                  <span className="font-medium text-tactical">Conclusão:</span> Capacidade suficiente para atender a meta com folga de 14%.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Geração do PMP */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-strategic" />
              Plano Mestre de Produção (PMP)
            </CardTitle>
            <CardDescription>
              Guia de quanto produzir em cada período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <Button
                  key={key}
                  variant={selectedScenario === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedScenario(key)}
                  className={selectedScenario === key ? "bg-strategic text-strategic-foreground" : ""}
                >
                  {scenario.label}
                </Button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Período</th>
                    <th className="text-right p-2">Demanda</th>
                    <th className="text-right p-2">Produção</th>
                    <th className="text-center p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pmpData.map((item, index) => {
                    const multiplier = scenarios[selectedScenario as keyof typeof scenarios].multiplier;
                    const demand = Math.round(item.demand * multiplier);
                    const production = Math.round(item.production * multiplier);
                    
                    return (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{item.period}</td>
                        <td className="p-2 text-right">{demand.toLocaleString()}</td>
                        <td className="p-2 text-right">{production.toLocaleString()}</td>
                        <td className="p-2 text-center">
                          <Badge variant={production >= demand ? "default" : "destructive"}>
                            {production >= demand ? "OK" : "Déficit"}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Button - Mobile optimized */}
      {onNext && (
        <div className="text-center mt-6 sm:mt-8">
          <Button 
            onClick={onNext} 
            size="lg" 
            className="bg-strategic text-strategic-foreground hover:bg-strategic/90 w-full sm:w-auto"
          >
            Avançar para Nível Tático
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default StrategicLevel;
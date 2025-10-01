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
    <div className="py-3 h-screen overflow-hidden flex flex-col">
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-2 bg-strategic/10 text-strategic px-3 py-1 rounded-full text-sm font-medium mb-2">
          <BarChart3 className="h-4 w-4" />
          Nível Estratégico
        </div>
        <h2 className="text-2xl font-bold mb-1">
          Planejamento Estratégico
        </h2>
        <p className="text-sm text-muted-foreground">
          Análises históricas e definição de políticas
        </p>
      </div>

      {/* Lista de Produtos */}
      <div className="mb-3">
        <ProductList />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-2 flex-1 overflow-hidden">
        {/* Análises Históricas */}
        <Card className="shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-strategic" />
              Análises Históricas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Mês</th>
                    <th className="text-right p-2">Vendas</th>
                    <th className="text-right p-2">Estoque</th>
                    <th className="text-right p-2">Cap.</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium">{item.month}</td>
                      <td className="p-2 text-right">{(item.sales/1000).toFixed(0)}k</td>
                      <td className="p-2 text-right">{(item.stock/1000).toFixed(1)}k</td>
                      <td className="p-2 text-right">{item.capacity}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Decisão Estratégica */}
        <Card className="shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Settings2 className="h-4 w-4 text-strategic" />
              Base para Decisão
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm mb-2">Para Estoque</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Demanda estável</li>
                  <li>• Produtos padrão</li>
                  <li>• Economia escala</li>
                </ul>
              </div>
              <div className="p-3 border rounded-lg bg-strategic/5">
                <h4 className="font-medium text-sm mb-2">Sob Demanda</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Demanda variável</li>
                  <li>• Customizado</li>
                  <li>• Baixo capital</li>
                </ul>
                <Badge className="mt-2 bg-strategic text-strategic-foreground text-xs px-2 py-0.5">
                  Recomendado
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verificação de Capacidade */}
        <Card className="shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Factory className="h-4 w-4 text-strategic" />
              Capacidade
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Máquinas</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Pessoas</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Meta Produção</span>
                  <span className="font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="p-2 bg-tactical/5 rounded text-xs">
                <span className="font-medium text-tactical">Conclusão:</span> Capacidade OK com folga de 14%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Geração do PMP */}
        <Card className="shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-4 w-4 text-strategic" />
              PMP
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex gap-2 mb-3">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <Button
                  key={key}
                  variant={selectedScenario === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedScenario(key)}
                  className={`text-xs h-7 px-3 ${selectedScenario === key ? "bg-strategic text-strategic-foreground" : ""}`}
                >
                  {key === 'atual' ? 'Atual' : key === 'otimista' ? '+20%' : '-20%'}
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
                        <td className="p-2 text-right">{(demand/1000).toFixed(1)}k</td>
                        <td className="p-2 text-right">{(production/1000).toFixed(1)}k</td>
                        <td className="p-2 text-center">
                          <Badge variant={production >= demand ? "default" : "destructive"} className="text-xs px-2 py-0.5">
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

      {/* Navigation Button */}
      {onNext && (
        <div className="text-center mt-2">
          <Button 
            onClick={onNext} 
            size="sm"
            className="bg-strategic text-strategic-foreground hover:bg-strategic/90 text-sm h-8 px-4"
          >
            Avançar para Tático
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default StrategicLevel;
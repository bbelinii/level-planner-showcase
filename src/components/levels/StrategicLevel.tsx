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
    <div className="py-2 max-h-screen overflow-hidden">
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-1.5 bg-strategic/10 text-strategic px-2.5 py-1 rounded-full text-xs font-medium mb-2">
          <BarChart3 className="h-3 w-3" />
          Nível Estratégico
        </div>
        <h2 className="text-xl font-bold mb-1 px-4">
          Planejamento Estratégico
        </h2>
        <p className="text-xs text-muted-foreground max-w-2xl mx-auto px-4">
          Análises históricas e definição de políticas de produção
        </p>
      </div>

      {/* Lista de Produtos */}
      <div className="mb-2">
        <ProductList />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2">
        {/* Análises Históricas */}
        <Card className="shadow-lg">
          <CardHeader className="p-2">
            <CardTitle className="flex items-center gap-1.5 text-sm">
              <TrendingUp className="h-3.5 w-3.5 text-strategic" />
              Análises Históricas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-1">Mês</th>
                    <th className="text-right p-1">Vendas</th>
                    <th className="text-right p-1">Est.</th>
                    <th className="text-right p-1">Cap.</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-1 font-medium">{item.month}</td>
                      <td className="p-1 text-right">{(item.sales/1000).toFixed(0)}k</td>
                      <td className="p-1 text-right">{(item.stock/1000).toFixed(1)}k</td>
                      <td className="p-1 text-right">{item.capacity}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Decisão Estratégica */}
        <Card className="shadow-lg">
          <CardHeader className="p-2">
            <CardTitle className="flex items-center gap-1.5 text-sm">
              <Settings2 className="h-3.5 w-3.5 text-strategic" />
              Base para Decisão
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 border rounded-lg">
                <h4 className="font-medium text-xs mb-1">Para Estoque</h4>
                <ul className="text-[10px] text-muted-foreground space-y-0.5">
                  <li>• Demanda estável</li>
                  <li>• Produtos padrão</li>
                  <li>• Economia escala</li>
                </ul>
              </div>
              <div className="p-2 border rounded-lg bg-strategic/5">
                <h4 className="font-medium text-xs mb-1">Sob Demanda</h4>
                <ul className="text-[10px] text-muted-foreground space-y-0.5">
                  <li>• Demanda variável</li>
                  <li>• Customizado</li>
                  <li>• Baixo capital</li>
                </ul>
                <Badge className="mt-1 bg-strategic text-strategic-foreground text-[9px] px-1 py-0">
                  Recomendado
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verificação de Capacidade */}
        <Card className="shadow-lg">
          <CardHeader className="p-2">
            <CardTitle className="flex items-center gap-1.5 text-sm">
              <Factory className="h-3.5 w-3.5 text-strategic" />
              Verificação de Capacidade
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-0.5">
                  <span>Máquinas</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-0.5">
                  <span>Pessoas</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-0.5">
                  <span>Meta Produção</span>
                  <span className="font-medium">78%</span>
                </div>
                <Progress value={78} className="h-1.5" />
              </div>
              <div className="p-1.5 bg-tactical/5 rounded text-[10px]">
                <span className="font-medium text-tactical">Conclusão:</span> Capacidade OK com folga de 14%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Geração do PMP */}
        <Card className="shadow-lg">
          <CardHeader className="p-2">
            <CardTitle className="flex items-center gap-1.5 text-sm">
              <Package className="h-3.5 w-3.5 text-strategic" />
              PMP
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <div className="flex gap-1 mb-2">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <Button
                  key={key}
                  variant={selectedScenario === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedScenario(key)}
                  className={`text-[10px] h-6 px-2 ${selectedScenario === key ? "bg-strategic text-strategic-foreground" : ""}`}
                >
                  {key === 'atual' ? 'Atual' : key === 'otimista' ? '+20%' : '-20%'}
                </Button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-1">Per.</th>
                    <th className="text-right p-1">Dem.</th>
                    <th className="text-right p-1">Prod.</th>
                    <th className="text-center p-1">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pmpData.map((item, index) => {
                    const multiplier = scenarios[selectedScenario as keyof typeof scenarios].multiplier;
                    const demand = Math.round(item.demand * multiplier);
                    const production = Math.round(item.production * multiplier);
                    
                    return (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-1 font-medium">{item.period}</td>
                        <td className="p-1 text-right">{(demand/1000).toFixed(1)}k</td>
                        <td className="p-1 text-right">{(production/1000).toFixed(1)}k</td>
                        <td className="p-1 text-center">
                          <Badge variant={production >= demand ? "default" : "destructive"} className="text-[9px] px-1 py-0">
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
            className="bg-strategic text-strategic-foreground hover:bg-strategic/90 w-full sm:w-auto text-xs h-7"
          >
            Avançar para Nível Tático
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default StrategicLevel;
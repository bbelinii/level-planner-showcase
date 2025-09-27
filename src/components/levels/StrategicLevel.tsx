import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Package, Settings2, ArrowRight, Factory, Users, AlertTriangle, Send } from 'lucide-react';
import { mockSKUs, mockMachines } from '@/data/mockData';

interface StrategicLevelProps {
  onNext?: () => void;
}

const StrategicLevel = ({ onNext }: StrategicLevelProps) => {
  const [selectedScenario, setSelectedScenario] = useState('atual');
  const [selectedFamily, setSelectedFamily] = useState('Todos');

  const scenarios = {
    atual: { multiplier: 1, label: 'Cenário Atual' },
    otimista: { multiplier: 1.2, label: 'Crescimento 20%' },
    pessimista: { multiplier: 0.8, label: 'Retração 20%' }
  };

  // Histórico detalhado por SKU/família
  const salesHistoryBySKU = [
    { sku: 'SKU001', family: 'Parafusos', jan: 4500, fev: 5200, mar: 4800, abr: 5500, mai: 4900 },
    { sku: 'SKU002', family: 'Porcas', jan: 3200, fev: 3800, mar: 3500, abr: 4100, mai: 3600 },
    { sku: 'SKU004', family: 'Chapas', jan: 1200, fev: 1350, mar: 1180, abr: 1420, mai: 1300 },
    { sku: 'SKU006', family: 'Motores', jan: 25, fev: 30, mar: 28, abr: 35, mai: 32 }
  ];

  const families = ['Todos', ...new Set(salesHistoryBySKU.map(item => item.family))];

  const filteredSalesHistory = selectedFamily === 'Todos' 
    ? salesHistoryBySKU 
    : salesHistoryBySKU.filter(item => item.family === selectedFamily);

  // Análise de gargalos por máquina
  const bottleneckAnalysis = mockMachines.map(machine => ({
    name: machine.name,
    utilization: machine.utilizationRate * 100,
    efficiency: machine.efficiency * 100,
    capacity: machine.capacity,
    isBottleneck: machine.isBottleneck,
    setupTime: machine.setupTime
  }));

  const pmpData = [
    { period: 'Sem 1', demand: 12000, production: 12500, initialStock: 8000, finalStock: 8500, safetyBuffer: 1200 },
    { period: 'Sem 2', demand: 11500, production: 12000, initialStock: 8500, finalStock: 9000, safetyBuffer: 1150 },
    { period: 'Sem 3', demand: 13000, production: 13200, initialStock: 9000, finalStock: 9200, safetyBuffer: 1300 },
    { period: 'Sem 4', demand: 12800, production: 13000, initialStock: 9200, finalStock: 9400, safetyBuffer: 1280 }
  ];

  const handleSendToMPS = () => {
    // Simular envio ao MPS
    alert('Dados do PMP enviados ao MPS com sucesso! O nível tático foi atualizado.');
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-strategic/10 text-strategic px-4 py-2 rounded-full text-sm font-medium mb-4">
          <BarChart3 className="h-4 w-4" />
          Nível Estratégico
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Planejamento Estratégico
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Análises históricas detalhadas e definição de políticas de produção
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Histórico Detalhado por SKU/Família */}
        <Card className="shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-strategic" />
              Histórico Detalhado por SKU/Família
            </CardTitle>
            <CardDescription>
              Análise de vendas por produto e família nos últimos períodos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2 mb-4">
                {families.map((family) => (
                  <Button
                    key={family}
                    variant={selectedFamily === family ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFamily(family)}
                    className={selectedFamily === family ? "bg-strategic text-strategic-foreground" : ""}
                  >
                    {family}
                  </Button>
                ))}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">SKU</th>
                      <th className="text-left p-2">Família</th>
                      <th className="text-right p-2">Jan</th>
                      <th className="text-right p-2">Fev</th>
                      <th className="text-right p-2">Mar</th>
                      <th className="text-right p-2">Abr</th>
                      <th className="text-right p-2">Mai</th>
                      <th className="text-right p-2">Tendência</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSalesHistory.map((item, index) => {
                      const trend = ((item.mai - item.jan) / item.jan * 100).toFixed(1);
                      return (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">{item.sku}</td>
                          <td className="p-2">
                            <Badge variant="outline" className="text-xs">{item.family}</Badge>
                          </td>
                          <td className="p-2 text-right">{item.jan.toLocaleString()}</td>
                          <td className="p-2 text-right">{item.fev.toLocaleString()}</td>
                          <td className="p-2 text-right">{item.mar.toLocaleString()}</td>
                          <td className="p-2 text-right">{item.abr.toLocaleString()}</td>
                          <td className="p-2 text-right">{item.mai.toLocaleString()}</td>
                          <td className="p-2 text-right">
                            <Badge variant={parseFloat(trend) > 0 ? "default" : "secondary"}>
                              {trend}%
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Análise de Gargalos por Máquina */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5 text-strategic" />
              Análise de Gargalos por Máquina
            </CardTitle>
            <CardDescription>
              Capacidade individual e identificação de restrições
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bottleneckAnalysis.map((machine, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{machine.name}</span>
                      {machine.isBottleneck && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Gargalo
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {machine.utilization.toFixed(0)}%
                    </span>
                  </div>
                  <Progress 
                    value={machine.utilization} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Capacidade: {machine.capacity}h/dia</span>
                    <span>Setup: {machine.setupTime}min</span>
                  </div>
                </div>
              ))}
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
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Para Estoque</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Demanda estável</li>
                    <li>• Produtos padronizados</li>
                    <li>• Economia de escala</li>
                  </ul>
                </div>
                <div className="p-3 border rounded-lg bg-strategic/5">
                  <h4 className="font-medium text-sm mb-2">Sob Demanda</h4>
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

        {/* PMP Aprimorado */}
        <Card className="shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-strategic" />
              Plano Mestre de Produção (PMP) - Aprimorado
            </CardTitle>
            <CardDescription>
              Incluindo estoques inicial/final e folga por falhas
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
                    <th className="text-right p-2">Est. Inicial</th>
                    <th className="text-right p-2">Est. Final</th>
                    <th className="text-right p-2">Folga</th>
                    <th className="text-center p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pmpData.map((item, index) => {
                    const multiplier = scenarios[selectedScenario as keyof typeof scenarios].multiplier;
                    const demand = Math.round(item.demand * multiplier);
                    const production = Math.round(item.production * multiplier);
                    const initialStock = Math.round(item.initialStock * multiplier);
                    const finalStock = Math.round(item.finalStock * multiplier);
                    const safetyBuffer = Math.round(item.safetyBuffer * multiplier);
                    
                    return (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{item.period}</td>
                        <td className="p-2 text-right">{demand.toLocaleString()}</td>
                        <td className="p-2 text-right">{production.toLocaleString()}</td>
                        <td className="p-2 text-right text-muted-foreground">{initialStock.toLocaleString()}</td>
                        <td className="p-2 text-right text-muted-foreground">{finalStock.toLocaleString()}</td>
                        <td className="p-2 text-right">
                          <Badge variant="outline" className="text-xs">
                            {safetyBuffer.toLocaleString()}
                          </Badge>
                        </td>
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
            
            <div className="mt-4 pt-4 border-t">
              <Button 
                onClick={handleSendToMPS}
                className="bg-strategic text-strategic-foreground hover:bg-strategic/90"
              >
                <Send className="mr-2 h-4 w-4" />
                Enviar ao MPS
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Button */}
      {onNext && (
        <div className="text-center">
          <Button onClick={onNext} size="lg" className="bg-strategic text-strategic-foreground hover:bg-strategic/90">
            Avançar para Nível Tático
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default StrategicLevel;
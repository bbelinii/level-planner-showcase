import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { mockPMP, mockSKUs, calculateEOQ, glossaryTerms, type EOQParams } from '@/data/mockData';
import { BarChart3, Calculator, BookOpen, TrendingUp, Package, DollarSign } from 'lucide-react';

const StrategicLevel = () => {
  const [selectedScenario, setSelectedScenario] = useState('atual');
  const [eoqParams, setEOQParams] = useState<EOQParams>({
    demand: 12000,
    orderCost: 250,
    holdingCost: 15
  });
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const eoqResults = calculateEOQ(eoqParams);

  const scenarios = {
    atual: { multiplier: 1, label: 'Cenário Atual' },
    otimista: { multiplier: 1.2, label: 'Crescimento 20%' },
    pessimista: { multiplier: 0.8, label: 'Retração 20%' }
  };

  const pmpData = mockPMP.map(item => ({
    ...item,
    demand: Math.round(item.demand * scenarios[selectedScenario as keyof typeof scenarios].multiplier),
    production: Math.round(item.production * scenarios[selectedScenario as keyof typeof scenarios].multiplier)
  }));

  return (
    <section className="py-8 bg-strategic-muted/5">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-strategic/10 text-strategic px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BarChart3 className="h-4 w-4" />
            Planejamento Estratégico
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Análise de Demanda e Políticas de Produção
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Configure cenários, calcule parâmetros otimizados e defina políticas para decisões de longo prazo.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Painel de Análises PMP */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-strategic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-strategic" />
                  Plano Mestre de Produção (PMP)
                </CardTitle>
                <CardDescription>
                  Análise de demanda vs produção por período com simulação de cenários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-6">
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
                        <th className="text-right p-2">Estoque</th>
                        <th className="text-center p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pmpData.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">{item.period}</td>
                          <td className="p-2 text-right">{item.demand.toLocaleString()}</td>
                          <td className="p-2 text-right">{item.production.toLocaleString()}</td>
                          <td className="p-2 text-right">{item.inventory.toLocaleString()}</td>
                          <td className="p-2 text-center">
                            <Badge variant={item.production >= item.demand ? "default" : "destructive"}>
                              {item.production >= item.demand ? "OK" : "Déficit"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Calculadora EOQ */}
            <Card className="shadow-strategic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-strategic" />
                  Calculadora EOQ/MC (Lote Econômico)
                </CardTitle>
                <CardDescription>
                  Determine a quantidade ótima de pedido para minimizar custos totais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Demanda Anual: {eoqParams.demand.toLocaleString()} unidades
                    </label>
                    <Slider
                      value={[eoqParams.demand]}
                      onValueChange={([value]) => setEOQParams(prev => ({ ...prev, demand: value }))}
                      min={1000}
                      max={50000}
                      step={500}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Custo por Pedido: R$ {eoqParams.orderCost}
                    </label>
                    <Slider
                      value={[eoqParams.orderCost]}
                      onValueChange={([value]) => setEOQParams(prev => ({ ...prev, orderCost: value }))}
                      min={50}
                      max={1000}
                      step={25}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Custo de Manutenção: R$ {eoqParams.holdingCost}/unidade/ano
                    </label>
                    <Slider
                      value={[eoqParams.holdingCost]}
                      onValueChange={([value]) => setEOQParams(prev => ({ ...prev, holdingCost: value }))}
                      min={5}
                      max={50}
                      step={2.5}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-strategic">{eoqResults.optimalQuantity}</div>
                    <div className="text-sm text-muted-foreground">Lote Ótimo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-strategic">R$ {eoqResults.totalAnnualCost.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Custo Total/Ano</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-strategic">{eoqResults.ordersPerYear}</div>
                    <div className="text-sm text-muted-foreground">Pedidos/Ano</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-strategic">{eoqResults.safetyStock}</div>
                    <div className="text-sm text-muted-foreground">Estoque Segurança</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Glossário */}
          <div className="space-y-6">
            <Card className="shadow-strategic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-strategic" />
                  Glossário Interativo
                </CardTitle>
                <CardDescription>
                  Conceitos fundamentais de gestão de produção
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {glossaryTerms.map((term) => (
                    <div key={term.id} className="border rounded-lg">
                      <button
                        onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
                        className="w-full p-3 text-left hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-strategic">{term.term}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              {term.fullName}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {expandedTerm === term.id ? 'Ocultar' : 'Ver'}
                          </Badge>
                        </div>
                      </button>
                      
                      {expandedTerm === term.id && (
                        <div className="p-3 border-t bg-muted/20 animate-slide-up">
                          <p className="text-sm text-muted-foreground mb-3">
                            {term.definition}
                          </p>
                          <div className="space-y-1">
                            <p className="text-xs font-medium">Exemplos:</p>
                            {term.examples.map((example, idx) => (
                              <p key={idx} className="text-xs text-muted-foreground">
                                • {example}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* KPIs Estratégicos */}
            <Card className="shadow-strategic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-strategic" />
                  KPIs Estratégicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Giro de Estoque</span>
                    <Badge className="bg-strategic text-strategic-foreground">8.5x/ano</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cobertura Média</span>
                    <Badge className="bg-strategic text-strategic-foreground">6.2 semanas</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Acuracidade PMP</span>
                    <Badge className="bg-strategic text-strategic-foreground">94.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ROI Estoque</span>
                    <Badge className="bg-strategic text-strategic-foreground">18.5%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicLevel;
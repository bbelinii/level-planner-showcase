import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wrench, ArrowLeft, Package, Users, BarChart3, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import TimelineDiagram from '@/components/TimelineDiagram';

interface OperationalLevelProps {
  onPrevious?: () => void;
}

const OperationalLevel = ({ onPrevious }: OperationalLevelProps) => {
  const [selectedMachine, setSelectedMachine] = useState('Máquina 1');

  const machineProduction = {
    'Máquina 1': [
      { order: 'OP001', sku: 'SKU001', qty: 500, time: '08:00-12:00', status: 'em-andamento' },
      { order: 'OP003', sku: 'SKU001', qty: 400, time: '13:00-16:00', status: 'programado' }
    ],
    'Máquina 2': [
      { order: 'OP002', sku: 'SKU002', qty: 300, time: '08:00-14:00', status: 'concluído' },
      { order: 'OP005', sku: 'SKU003', qty: 200, time: '14:30-18:00', status: 'programado' }
    ],
    'Máquina 3': [
      { order: 'OP004', sku: 'SKU003', qty: 250, time: '09:00-13:00', status: 'programado' }
    ]
  };

  const suppliersStatus = [
    { supplier: 'Fornecedor Alpha', items: ['Matéria-prima A', 'Componente X'], status: 'entregue', date: '25/09' },
    { supplier: 'Fornecedor Beta', items: ['Componente B'], status: 'pendente', date: '26/09' },
    { supplier: 'Fornecedor Gamma', items: ['Parafusos', 'Porcas'], status: 'em-trânsito', date: '26/09' }
  ];

  const dashboardMetrics = [
    { title: 'Eficiência Geral', value: '87%', status: 'normal' },
    { title: 'Qualidade', value: '98.5%', status: 'excelente' },
    { title: 'Disponibilidade', value: '92%', status: 'normal' },
    { title: 'Entregas no Prazo', value: '94%', status: 'bom' }
  ];

  const stockReport = [
    { item: 'Matéria-prima A', current: 2400, min: 1000, max: 5000, status: 'normal' },
    { item: 'Componente B', current: 150, min: 200, max: 800, status: 'baixo' },
    { item: 'Produto Acabado SKU001', current: 850, min: 500, max: 1500, status: 'normal' },
    { item: 'Produto Acabado SKU002', current: 320, min: 300, max: 1000, status: 'normal' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluído': case 'entregue': case 'excelente': return 'default';
      case 'em-andamento': case 'em-trânsito': case 'bom': return 'secondary';
      case 'programado': case 'pendente': case 'normal': return 'outline';
      case 'baixo': return 'destructive';
      default: return 'outline';
    }
  };

  const getProgressValue = (current: number, min: number, max: number) => {
    return ((current - min) / (max - min)) * 100;
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-operational/10 text-operational px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Wrench className="h-4 w-4" />
          Nível Operacional
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Execução Operacional
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Definição de produção por máquina e acompanhamento em tempo real
        </p>
      </div>

      {/* Timeline Diagram */}
      <div className="mb-8">
        <TimelineDiagram />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Definição por Máquina */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-operational" />
              Definição do que cada Máquina vai Produzir
            </CardTitle>
            <CardDescription>
              Programação detalhada por equipamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2 overflow-x-auto">
                {Object.keys(machineProduction).map((machine) => (
                  <Button
                    key={machine}
                    variant={selectedMachine === machine ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMachine(machine)}
                    className={selectedMachine === machine ? "bg-operational text-operational-foreground" : ""}
                  >
                    {machine}
                  </Button>
                ))}
              </div>

              <div className="space-y-3">
                {machineProduction[selectedMachine as keyof typeof machineProduction].map((order, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{order.order}</h4>
                        <p className="text-xs text-muted-foreground">{order.sku} • {order.qty} unidades</p>
                      </div>
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Horário: {order.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status dos Fornecedores */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-operational" />
              Envio da Lista para Fornecedores
            </CardTitle>
            <CardDescription>
              Acompanhamento de entregas programadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suppliersStatus.map((supplier, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{supplier.supplier}</h4>
                    <Badge variant={getStatusColor(supplier.status)}>
                      {supplier.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Itens: {supplier.items.join(', ')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Previsão: {supplier.date}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Button className="w-full bg-operational text-operational-foreground hover:bg-operational/90">
                Solicitar Atualizações
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard de Acompanhamento */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-operational" />
              Dashboard - Tudo está Certo?
            </CardTitle>
            <CardDescription>
              Indicadores principais de desempenho
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {dashboardMetrics.map((metric, index) => (
                <div key={index} className="p-3 border rounded-lg text-center">
                  <div className="text-2xl font-bold text-operational mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {metric.title}
                  </div>
                  <Badge variant={getStatusColor(metric.status)} className="text-xs">
                    {metric.status}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-operational/5 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-tactical" />
                <span className="text-sm font-medium">Status Geral: Sistema Operando Normalmente</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Relatórios de Estoque */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-operational" />
              Relatórios de Estoque
            </CardTitle>
            <CardDescription>
              Níveis atuais de materiais e produtos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockReport.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.item}</span>
                    <Badge variant={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Atual: {item.current}</span>
                    <span>Min: {item.min} | Max: {item.max}</span>
                  </div>
                  <Progress 
                    value={getProgressValue(item.current, item.min, item.max)} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 text-xs">
                  Gerar Relatório
                </Button>
                <Button className="flex-1 bg-operational text-operational-foreground hover:bg-operational/90 text-xs">
                  Solicitar Reposição
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Button */}
      {onPrevious && (
        <div className="text-left">
          <Button variant="outline" onClick={onPrevious}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Nível Tático
          </Button>
        </div>
      )}
    </div>
  );
};

export default OperationalLevel;
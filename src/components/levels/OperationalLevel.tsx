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
  const [selectedMachine, setSelectedMachine] = useState('Linha SMT Panasonic');

  const machineProduction = {
    'Linha SMT Panasonic': [
      { order: 'OP001', sku: 'CELL001', qty: 450, time: '08:00-12:00', status: 'em-andamento' },
      { order: 'OP004', sku: 'CELL001', qty: 350, time: '13:00-17:00', status: 'programado' }
    ],
    'Pick & Place Yamaha': [
      { order: 'OP003', sku: 'MON001', qty: 180, time: '08:00-14:00', status: 'concluído' },
      { order: 'OP006', sku: 'DRONE001', qty: 120, time: '14:30-18:00', status: 'programado' }
    ],
    'Mesa Montagem Final': [
      { order: 'OP002', sku: 'DRONE001', qty: 200, time: '09:00-16:00', status: 'programado' }
    ],
    'Estação Teste ICT': [
      { order: 'OP007', sku: 'CELL001', qty: 300, time: '10:00-15:00', status: 'programado' }
    ]
  };

  const suppliersStatus = [
    { supplier: 'Foxconn Electronics', items: ['Placa-mãe Celular', 'Controlador de Voo'], status: 'entregue', date: '25/09' },
    { supplier: 'Samsung Display', items: ['Tela OLED 6.5"', 'Painel LED 27"'], status: 'pendente', date: '26/09' },
    { supplier: 'CATL Battery', items: ['Bateria Li-ion', 'Bateria Drone'], status: 'em-trânsito', date: '26/09' }
  ];

  const dashboardMetrics = [
    { title: 'OEE - Eficiência Geral', value: '87%', status: 'normal' },
    { title: 'Yield - Taxa de Aprovação', value: '98.2%', status: 'excelente' },
    { title: 'Disponibilidade SMT', value: '94%', status: 'bom' },
    { title: 'Entregas no Prazo', value: '96%', status: 'excelente' }
  ];

  const stockReport = [
    { item: 'Placa-mãe Celular', current: 850, min: 500, max: 1500, status: 'normal' },
    { item: 'Bateria Li-ion 4000mAh', current: 320, min: 400, max: 1200, status: 'baixo' },
    { item: 'Tela OLED 6.5"', current: 680, min: 300, max: 1000, status: 'normal' },
    { item: 'Controlador de Voo', current: 190, min: 200, max: 600, status: 'baixo' },
    { item: 'Motor Brushless', current: 1280, min: 800, max: 2400, status: 'normal' },
    { item: 'Painel LED 27"', current: 420, min: 250, max: 800, status: 'normal' },
    { item: 'Câmera Drone 4K', current: 95, min: 150, max: 500, status: 'crítico' },
    { item: 'Produto Acabado Celular', current: 1200, min: 800, max: 2000, status: 'normal' },
    { item: 'Produto Acabado Drone', current: 650, min: 400, max: 1200, status: 'normal' },
    { item: 'Produto Acabado Monitor', current: 380, min: 300, max: 900, status: 'normal' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluído': case 'entregue': case 'excelente': return 'default';
      case 'em-andamento': case 'em-trânsito': case 'bom': return 'secondary';
      case 'programado': case 'pendente': case 'normal': return 'outline';
      case 'baixo': return 'destructive';
      case 'crítico': return 'destructive';
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
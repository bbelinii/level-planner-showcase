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
    <div className="py-3 h-screen overflow-hidden flex flex-col">
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-2 bg-operational/10 text-operational px-3 py-1 rounded-full text-sm font-medium mb-2">
          <Wrench className="h-4 w-4" />
          Nível Operacional
        </div>
        <h2 className="text-2xl font-bold mb-1">
          Execução Operacional
        </h2>
        <p className="text-sm text-muted-foreground">
          Produção por máquina e acompanhamento
        </p>
      </div>

      {/* Timeline Diagram */}
      <div className="mb-3">
        <TimelineDiagram />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mb-2 flex-1 overflow-hidden">
        {/* Definição por Máquina */}
        <Card className="shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Wrench className="h-4 w-4 text-operational" />
              Máquinas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex gap-2 mb-3 overflow-x-auto">
              {Object.keys(machineProduction).map((machine) => (
                <Button
                  key={machine}
                  variant={selectedMachine === machine ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMachine(machine)}
                  className={`text-xs h-7 px-3 whitespace-nowrap ${selectedMachine === machine ? "bg-operational text-operational-foreground" : ""}`}
                >
                  {machine.split(' ').slice(0,2).join(' ')}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              {machineProduction[selectedMachine as keyof typeof machineProduction].map((order, index) => (
                <div key={index} className="p-2 border rounded">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h4 className="font-medium text-sm">{order.order}</h4>
                      <p className="text-xs text-muted-foreground">{order.sku} • {order.qty}</p>
                    </div>
                    <Badge variant={getStatusColor(order.status)} className="text-xs px-2 py-0.5">
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {order.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Dashboard de Acompanhamento */}
        <Card className="shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4 text-operational" />
              Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="grid grid-cols-2 gap-2">
              {dashboardMetrics.map((metric, index) => (
                <div key={index} className="p-2 border rounded text-center">
                  <div className="text-lg font-bold text-operational mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1 leading-tight">
                    {metric.title}
                  </div>
                  <Badge variant={getStatusColor(metric.status)} className="text-xs px-2 py-0.5">
                    {metric.status}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="mt-3 p-2 bg-operational/5 rounded">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-tactical" />
                <span className="text-xs font-medium">Status: OK</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Relatórios de Estoque */}
        <Card className="shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-4 w-4 text-operational" />
              Estoque
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {stockReport.slice(0, 6).map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium leading-tight">{item.item.split(' ').slice(0, 3).join(' ')}</span>
                    <Badge variant={getStatusColor(item.status)} className="text-xs px-2 py-0.5">
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{item.current}</span>
                    <span>{item.min}-{item.max}</span>
                  </div>
                  <Progress 
                    value={getProgressValue(item.current, item.min, item.max)} 
                    className="h-1.5"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 mt-3">
              <Button variant="outline" className="flex-1 text-sm h-8">
                Relatório
              </Button>
              <Button className="flex-1 bg-operational text-operational-foreground hover:bg-operational/90 text-sm h-8">
                Reposição
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Button */}
      {onPrevious && (
        <div className="text-left mt-2">
          <Button variant="outline" onClick={onPrevious} size="sm" className="text-sm h-8 px-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Tático
          </Button>
        </div>
      )}
    </div>
  );
};

export default OperationalLevel;
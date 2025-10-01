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
    <div className="py-1 h-screen overflow-hidden flex flex-col">
      <div className="text-center mb-1">
        <div className="inline-flex items-center gap-1.5 bg-operational/10 text-operational px-2.5 py-0.5 rounded-full text-xs font-medium mb-1">
          <Wrench className="h-3 w-3" />
          Nível Operacional
        </div>
        <h2 className="text-lg font-bold mb-0.5">
          Execução Operacional
        </h2>
        <p className="text-[10px] text-muted-foreground">
          Produção por máquina e acompanhamento
        </p>
      </div>

      {/* Timeline Diagram */}
      <div className="mb-1">
        <TimelineDiagram />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 mb-1 flex-1 overflow-hidden">
        {/* Definição por Máquina */}
        <Card className="shadow-lg">
          <CardHeader className="p-2">
            <CardTitle className="flex items-center gap-1.5 text-sm">
              <Wrench className="h-3.5 w-3.5 text-operational" />
              Máquinas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <div className="flex gap-1 mb-2 overflow-x-auto">
              {Object.keys(machineProduction).map((machine) => (
                <Button
                  key={machine}
                  variant={selectedMachine === machine ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMachine(machine)}
                  className={`text-[10px] h-6 px-2 whitespace-nowrap ${selectedMachine === machine ? "bg-operational text-operational-foreground" : ""}`}
                >
                  {machine.split(' ')[0]}
                </Button>
              ))}
            </div>

            <div className="space-y-1.5">
              {machineProduction[selectedMachine as keyof typeof machineProduction].map((order, index) => (
                <div key={index} className="p-1.5 border rounded">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h4 className="font-medium text-xs">{order.order}</h4>
                      <p className="text-[10px] text-muted-foreground">{order.sku} • {order.qty}</p>
                    </div>
                    <Badge variant={getStatusColor(order.status)} className="text-[9px] px-1 py-0">
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {order.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Dashboard de Acompanhamento */}
        <Card className="shadow-lg">
          <CardHeader className="p-2">
            <CardTitle className="flex items-center gap-1.5 text-sm">
              <BarChart3 className="h-3.5 w-3.5 text-operational" />
              Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <div className="grid grid-cols-2 gap-1.5">
              {dashboardMetrics.map((metric, index) => (
                <div key={index} className="p-1.5 border rounded text-center">
                  <div className="text-base font-bold text-operational mb-0.5">
                    {metric.value}
                  </div>
                  <div className="text-[9px] text-muted-foreground mb-1 leading-tight">
                    {metric.title}
                  </div>
                  <Badge variant={getStatusColor(metric.status)} className="text-[8px] px-1 py-0">
                    {metric.status}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="mt-2 p-1.5 bg-operational/5 rounded">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-tactical" />
                <span className="text-[10px] font-medium">Status: OK</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Relatórios de Estoque */}
        <Card className="shadow-lg">
          <CardHeader className="p-2">
            <CardTitle className="flex items-center gap-1.5 text-sm">
              <Package className="h-3.5 w-3.5 text-operational" />
              Estoque
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <div className="space-y-1.5 max-h-[180px] overflow-y-auto">
              {stockReport.slice(0, 6).map((item, index) => (
                <div key={index} className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium leading-tight">{item.item.split(' ').slice(0, 2).join(' ')}</span>
                    <Badge variant={getStatusColor(item.status)} className="text-[8px] px-1 py-0">
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-[9px] text-muted-foreground">
                    <span>{item.current}</span>
                    <span>{item.min}-{item.max}</span>
                  </div>
                  <Progress 
                    value={getProgressValue(item.current, item.min, item.max)} 
                    className="h-1"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex gap-1 mt-2">
              <Button variant="outline" className="flex-1 text-[10px] h-6">
                Relatório
              </Button>
              <Button className="flex-1 bg-operational text-operational-foreground hover:bg-operational/90 text-[10px] h-6">
                Reposição
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Button */}
      {onPrevious && (
        <div className="text-left mt-1">
          <Button variant="outline" onClick={onPrevious} size="sm" className="text-xs h-6">
            <ArrowLeft className="mr-1 h-3 w-3" />
            Tático
          </Button>
        </div>
      )}
    </div>
  );
};

export default OperationalLevel;
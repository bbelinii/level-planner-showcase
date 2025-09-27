import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wrench, ArrowLeft, Package, BarChart3, AlertTriangle, CheckCircle, Clock, Zap, Users, AlertOctagon, Settings } from 'lucide-react';
import { mockProductionOrders, mockMachines } from '@/data/mockData';

interface OperationalLevelProps {
  onPrevious?: () => void;
}

const OperationalLevel = ({ onPrevious }: OperationalLevelProps) => {
  const [selectedMachine, setSelectedMachine] = useState('MAC001');

  // Produção por máquina com detalhes aprimorados
  const enhancedMachineProduction = {
    'MAC001': [
      { 
        order: 'OP001', 
        sku: 'SKU001', 
        qty: 500, 
        time: '08:00-12:00', 
        status: 'em-andamento',
        completedPercentage: 65,
        estimatedTime: 240,
        actualTime: 180,
        scrapQuantity: 8,
        wipQuantity: 325
      },
      { 
        order: 'OP004', 
        sku: 'SKU004', 
        qty: 100, 
        time: '14:00-17:00', 
        status: 'programado',
        completedPercentage: 0,
        estimatedTime: 180,
        actualTime: 0,
        scrapQuantity: 0,
        wipQuantity: 0
      }
    ],
    'MAC002': [
      { 
        order: 'OP002', 
        sku: 'SKU002', 
        qty: 300, 
        time: '08:00-14:00', 
        status: 'concluído',
        completedPercentage: 100,
        estimatedTime: 360,
        actualTime: 340,
        scrapQuantity: 5,
        wipQuantity: 0
      }
    ],
    'MAC005': [
      { 
        order: 'OP005', 
        sku: 'SKU005', 
        qty: 150, 
        time: '09:00-11:30', 
        status: 'em-andamento',
        completedPercentage: 40,
        estimatedTime: 150,
        actualTime: 95,
        scrapQuantity: 2,
        wipQuantity: 60
      }
    ]
  };

  // Painel de Exceções Operacionais (substitui fornecedores)
  const operationalExceptions = [
    { 
      type: 'material', 
      title: 'Falta de Material', 
      description: 'Barra de Aço Ø6mm - Estoque crítico', 
      machine: 'MAC001',
      priority: 'alta',
      impact: 'Parada de produção em 2h',
      action: 'Solicitar entrega urgente'
    },
    { 
      type: 'maintenance', 
      title: 'Manutenção Pendente', 
      description: 'Prensa 50T - Revisão programada atrasada', 
      machine: 'MAC004',
      priority: 'média',
      impact: 'Redução de 15% na eficiência',
      action: 'Agendar para fim de semana'
    },
    { 
      type: 'operator', 
      title: 'Operador Ausente', 
      description: 'João Silva - Solda MIG - Atestado médico', 
      machine: 'MAC003',
      priority: 'alta',
      impact: 'Sem produção no turno da tarde',
      action: 'Realocar operador reserva'
    }
  ];

  // Sequenciamento otimizado
  const optimizedSequence = [
    { family: 'Parafusos', orders: ['OP001', 'OP006'], setupReduction: '60%', totalTime: '4h20min' },
    { family: 'Chapas', orders: ['OP004', 'OP007'], setupReduction: '45%', totalTime: '3h15min' },
    { family: 'Motores', orders: ['OP005'], setupReduction: '0%', totalTime: '2h30min' }
  ];

  // WIP em tempo real
  const wipByMachine = [
    { machine: 'Torno CNC Alpha', wipQuantity: 325, capacity: 500, utilization: 65 },
    { machine: 'Fresa Universal Beta', wipQuantity: 0, capacity: 300, utilization: 0 },
    { machine: 'Solda MIG Delta', wipQuantity: 60, capacity: 200, utilization: 30 },
    { machine: 'Prensa 50T Gamma', wipQuantity: 0, capacity: 400, utilization: 0 },
    { machine: 'Furadeira Radial', wipQuantity: 45, capacity: 150, utilization: 30 }
  ];

  const dashboardMetrics = [
    { title: 'OEE', value: '82%', status: 'bom', target: '85%' },
    { title: 'Qualidade', value: '98.2%', status: 'excelente', target: '95%' },
    { title: 'Disponibilidade', value: '89%', status: 'normal', target: '90%' },
    { title: 'Performance', value: '93%', status: 'bom', target: '90%' }
  ];

  const stockReport = [
    { item: 'Matéria-prima A', current: 2400, min: 1000, max: 5000, status: 'normal', coverage: '12 dias' },
    { item: 'Componente B', current: 150, min: 200, max: 800, status: 'baixo', coverage: '3 dias' },
    { item: 'Produto Acabado SKU001', current: 850, min: 500, max: 1500, status: 'normal', coverage: '8 dias' },
    { item: 'Produto Acabado SKU002', current: 320, min: 300, max: 1000, status: 'normal', coverage: '7 dias' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluído': case 'excelente': return 'default';
      case 'em-andamento': case 'bom': return 'secondary';
      case 'programado': case 'normal': return 'outline';
      case 'baixo': return 'destructive';
      default: return 'outline';
    }
  };

  const getExceptionColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'destructive';
      case 'média': return 'secondary';
      case 'baixa': return 'outline';
      default: return 'outline';
    }
  };

  const getExceptionIcon = (type: string) => {
    switch (type) {
      case 'material': return Package;
      case 'maintenance': return Settings;
      case 'operator': return Users;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-operational/10 text-operational px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Wrench className="h-4 w-4" />
          Nível Operacional
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Execução Operacional Avançada
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Monitoramento em tempo real com WIP, exceções e sequenciamento otimizado
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Programação Detalhada por Máquina */}
        <Card className="shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-operational" />
              Programação Detalhada por Máquina
            </CardTitle>
            <CardDescription>
              Ordens com % concluído, tempo previsto x realizado e sucata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 overflow-x-auto mb-4">
              {Object.keys(enhancedMachineProduction).map((machineId) => {
                const machine = mockMachines.find(m => m.id === machineId);
                return (
                  <Button
                    key={machineId}
                    variant={selectedMachine === machineId ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMachine(machineId)}
                    className={selectedMachine === machineId ? "bg-operational text-operational-foreground" : ""}
                  >
                    {machine?.name || machineId}
                  </Button>
                );
              })}
            </div>

            <div className="space-y-4">
              {enhancedMachineProduction[selectedMachine as keyof typeof enhancedMachineProduction]?.map((order, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-sm">{order.order}</h4>
                      <p className="text-xs text-muted-foreground">{order.sku} • {order.qty} unidades</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {order.completedPercentage}%
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-3">
                    <div>
                      <span className="font-medium text-muted-foreground">Horário:</span>
                      <div className="font-medium">{order.time}</div>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Tempo Prev.:</span>
                      <div className="font-medium">{order.estimatedTime} min</div>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Tempo Real:</span>
                      <div className="font-medium">{order.actualTime} min</div>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Sucata:</span>
                      <div className="font-medium text-destructive">{order.scrapQuantity} pcs</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progresso</span>
                      <span>{order.completedPercentage}% • WIP: {order.wipQuantity}</span>
                    </div>
                    <Progress value={order.completedPercentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Painel de Exceções Operacionais */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertOctagon className="h-5 w-5 text-operational" />
              Painel de Exceções Operacionais
            </CardTitle>
            <CardDescription>
              Falta de material, manutenção pendente, operador ausente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {operationalExceptions.map((exception, index) => {
                const IconComponent = getExceptionIcon(exception.type);
                return (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <IconComponent className="h-4 w-4 text-operational mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{exception.title}</h4>
                          <Badge variant={getExceptionColor(exception.priority)}>
                            {exception.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{exception.description}</p>
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">Impacto:</span> {exception.impact}</div>
                          <div><span className="font-medium">Ação:</span> {exception.action}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Button className="w-full bg-operational text-operational-foreground hover:bg-operational/90">
                Resolver Exceções Críticas
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* WIP em Tempo Real */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-operational" />
              WIP em Tempo Real
            </CardTitle>
            <CardDescription>
              Work in Progress por máquina/célula
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wipByMachine.map((machine, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{machine.machine}</span>
                    <span className="text-xs text-muted-foreground">
                      {machine.wipQuantity}/{machine.capacity}
                    </span>
                  </div>
                  <Progress value={machine.utilization} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Utilização: {machine.utilization}%</span>
                    <span>WIP: {machine.wipQuantity} pcs</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sequenciamento Otimizado */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-operational" />
              Sequenciamento Otimizado
            </CardTitle>
            <CardDescription>
              Agrupamento por família para reduzir setups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {optimizedSequence.map((sequence, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Família: {sequence.family}</h4>
                    <Badge variant="default" className="text-xs">
                      -{sequence.setupReduction} setup
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Ordens: {sequence.orders.join(', ')}</div>
                    <div>Tempo Total: {sequence.totalTime}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                Aplicar Sequenciamento
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Aprimorado */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-operational" />
              Dashboard - KPIs Operacionais
            </CardTitle>
            <CardDescription>
              Indicadores em tempo real com metas
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
                  <div className="flex items-center justify-between text-xs">
                    <span>Meta: {metric.target}</span>
                    <Badge variant={getStatusColor(metric.status)} className="text-xs">
                      {metric.status}
                    </Badge>
                  </div>
                </div>
              ))}
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
              Níveis com cobertura de dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockReport.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.item}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{item.coverage}</span>
                      <Badge variant={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Atual: {item.current}</span>
                    <span>Min: {item.min} | Max: {item.max}</span>
                  </div>
                  <Progress 
                    value={((item.current - item.min) / (item.max - item.min)) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 text-xs">
                  Relatório Completo
                </Button>
                <Button className="flex-1 bg-operational text-operational-foreground hover:bg-operational/90 text-xs">
                  Reposição Automática
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
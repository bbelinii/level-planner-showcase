import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockMPS, mockStock, mockMachines, mockProductionOrders } from '@/data/mockData';
import { Settings, ArrowRight, Package, AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react';

const TacticalLevel = () => {
  const [draggedOrder, setDraggedOrder] = useState<string | null>(null);
  const [machineOrders, setMachineOrders] = useState(mockProductionOrders);

  const handleDragStart = (orderId: string) => {
    setDraggedOrder(orderId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, machineId: string) => {
    e.preventDefault();
    if (draggedOrder) {
      setMachineOrders(prev => 
        prev.map(order => 
          order.id === draggedOrder 
            ? { ...order, machineId }
            : order
        )
      );
      setDraggedOrder(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-tactical text-tactical-foreground';
      case 'in-progress': return 'bg-operational text-operational-foreground';
      case 'planned': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'low': return 'secondary';
      case 'normal': return 'default';
      case 'excess': return 'outline';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <section className="py-8 bg-tactical-muted/5">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-tactical/10 text-tactical px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Settings className="h-4 w-4" />
            Controle Tático
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Gestão de Estoques e Planejamento de Produção
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Converta o PMP em ordens de produção, gerencie estoques e planeje capacidade por máquina.
          </p>
        </div>

        {/* Fluxo PMP → MPS */}
        <Card className="mb-8 shadow-tactical">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-tactical" />
              Fluxo de Conversão PMP → MPS
            </CardTitle>
            <CardDescription>
              Processo de transformação do Plano Mestre em cronograma detalhado de produção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-muted/30 rounded-lg">
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-16 h-16 bg-tactical/20 rounded-full flex items-center justify-center mb-3">
                  <Package className="h-8 w-8 text-tactical" />
                </div>
                <h3 className="font-semibold mb-2">1. Análise BOM</h3>
                <p className="text-sm text-muted-foreground">Explosão da estrutura de materiais</p>
                <Badge className="mt-2 bg-tactical text-tactical-foreground">Concluído</Badge>
              </div>
              
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
              
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-16 h-16 bg-tactical/20 rounded-full flex items-center justify-center mb-3">
                  <Users className="h-8 w-8 text-tactical" />
                </div>
                <h3 className="font-semibold mb-2">2. Fornecedores</h3>
                <p className="text-sm text-muted-foreground">Envio de lista de materiais</p>
                <Badge className="mt-2 bg-tactical text-tactical-foreground">Concluído</Badge>
              </div>
              
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
              
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-16 h-16 bg-operational/20 rounded-full flex items-center justify-center mb-3">
                  <Clock className="h-8 w-8 text-operational" />
                </div>
                <h3 className="font-semibold mb-2">3. Previsão</h3>
                <p className="text-sm text-muted-foreground">Cálculo de lead times</p>
                <Badge variant="secondary" className="mt-2">Em andamento</Badge>
              </div>
              
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
              
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">4. Liberação</h3>
                <p className="text-sm text-muted-foreground">Ordens para máquinas</p>
                <Badge variant="outline" className="mt-2">Pendente</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Dashboard de Estoque */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-tactical">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-tactical" />
                  Dashboard de Controle de Estoque
                </CardTitle>
                <CardDescription>
                  Monitoramento de itens críticos e cobertura de estoque
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockStock.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{item.name}</h4>
                        <Badge variant={getStockStatusColor(item.status)}>
                          {item.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estoque Atual:</span>
                          <span className="font-medium">{item.currentStock.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cobertura:</span>
                          <span className="font-medium">{item.weeksCoverage} semanas</span>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Min: {item.minStock}</span>
                            <span>Max: {item.maxStock}</span>
                          </div>
                          <Progress 
                            value={(item.currentStock / item.maxStock) * 100} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* MPS Table */}
            <Card className="shadow-tactical">
              <CardHeader>
                <CardTitle>Master Production Schedule (MPS)</CardTitle>
                <CardDescription>
                  Cronograma detalhado de produção por SKU e período
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">SKU</th>
                        <th className="text-left p-2">Período</th>
                        <th className="text-right p-2">Planejado</th>
                        <th className="text-right p-2">Realizado</th>
                        <th className="text-center p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockMPS.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">{item.skuId}</td>
                          <td className="p-2">{item.period}</td>
                          <td className="p-2 text-right">{item.plannedProduction.toLocaleString()}</td>
                          <td className="p-2 text-right">{item.actualProduction.toLocaleString()}</td>
                          <td className="p-2 text-center">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Planejamento por Máquina */}
          <div className="space-y-6">
            <Card className="shadow-tactical">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-tactical" />
                  Planejamento por Máquina
                </CardTitle>
                <CardDescription>
                  Arraste ordens para reorganizar a programação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMachines.map((machine) => (
                    <div
                      key={machine.id}
                      className="p-3 border-2 border-dashed border-muted rounded-lg min-h-[100px]"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, machine.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{machine.name}</h4>
                        <Badge variant={machine.status === 'available' ? 'default' : 'secondary'}>
                          {machine.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        {machineOrders
                          .filter(order => order.machineId === machine.id)
                          .map((order) => (
                            <div
                              key={order.id}
                              draggable
                              onDragStart={() => handleDragStart(order.id)}
                              className="p-2 bg-muted/50 rounded cursor-move hover:bg-muted transition-colors"
                            >
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-medium">{order.id}</span>
                                <Badge variant={getPriorityColor(order.priority)}>
                                  {order.priority}
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {order.quantity} un • {order.startTime}-{order.endTime}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status das Máquinas */}
            <Card className="shadow-tactical">
              <CardHeader>
                <CardTitle>Status das Máquinas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockMachines.map((machine) => (
                    <div key={machine.id} className="flex items-center justify-between p-2 rounded border">
                      <div>
                        <div className="font-medium text-sm">{machine.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Eficiência: {(machine.efficiency * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={machine.status === 'available' ? 'default' : 'secondary'}>
                          {machine.status}
                        </Badge>
                        {machine.currentJob && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {machine.currentJob}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TacticalLevel;
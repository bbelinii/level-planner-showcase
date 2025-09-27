import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Breadcrumbs from '@/components/Breadcrumbs';
import { mockMachines, mockProductionOrders, mockSKUs } from '@/data/mockData';
import { Wrench, CheckSquare, Clock, Users, AlertCircle, Package } from 'lucide-react';

const OperationalLevel = () => {
  const [checklist, setChecklist] = useState([
    { id: 1, task: 'Verificar nível de óleo das máquinas', completed: true },
    { id: 2, task: 'Conferir ferramentas e dispositivos', completed: true },
    { id: 3, task: 'Validar matéria-prima disponível', completed: false },
    { id: 4, task: 'Confirmar operadores no turno', completed: false },
    { id: 5, task: 'Testar equipamentos de segurança', completed: false }
  ]);

  const [production, setProduction] = useState([
    { orderId: 'OP001', planned: 500, produced: 485, defects: 3 },
    { orderId: 'OP002', planned: 300, produced: 0, defects: 0 },
    { orderId: 'OP003', planned: 200, produced: 200, defects: 1 },
    { orderId: 'OP004', planned: 100, produced: 0, defects: 0 },
    { orderId: 'OP005', planned: 150, produced: 75, defects: 2 }
  ]);

  const [selectedMachine, setSelectedMachine] = useState('MAC001');

  const handleChecklistToggle = (id: number) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleProductionUpdate = (orderId: string, produced: number) => {
    setProduction(prev =>
      prev.map(item =>
        item.orderId === orderId ? { ...item, produced } : item
      )
    );
  };

  const getMachineOrders = (machineId: string) => {
    return mockProductionOrders.filter(order => order.machineId === machineId);
  };

  const getEfficiency = (planned: number, produced: number) => {
    if (planned === 0) return 0;
    return Math.round((produced / planned) * 100);
  };

  return (
    <section className="py-16 px-4 bg-operational-muted/5">
      <div className="container mx-auto max-w-7xl">
        <Breadcrumbs 
          items={[
            { label: 'Home', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
            { label: 'Nível Operacional' }
          ]} 
        />

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-operational/10 text-operational px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Wrench className="h-4 w-4" />
            Nível Operacional
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Execução e Controle Operacional
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Gerencie a produção diária, execute checklists e controle apontamentos em tempo real.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quadro Diário por Máquina */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-operational">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-operational" />
                  Quadro Diário de Produção
                </CardTitle>
                <CardDescription>
                  Sequenciamento e acompanhamento de ordens por máquina
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-6 overflow-x-auto">
                  {mockMachines.map((machine) => (
                    <Button
                      key={machine.id}
                      variant={selectedMachine === machine.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMachine(machine.id)}
                      className={selectedMachine === machine.id ? "bg-operational text-operational-foreground" : ""}
                    >
                      {machine.name}
                    </Button>
                  ))}
                </div>

                <div className="space-y-4">
                  {getMachineOrders(selectedMachine).map((order) => {
                    const productionData = production.find(p => p.orderId === order.id);
                    const efficiency = productionData ? getEfficiency(productionData.planned, productionData.produced) : 0;
                    
                    return (
                      <div key={order.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{order.id}</h4>
                            <p className="text-sm text-muted-foreground">SKU: {order.skuId}</p>
                          </div>
                          <Badge variant={order.status === 'completed' ? 'default' : order.status === 'in-progress' ? 'secondary' : 'outline'}>
                            {order.status}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Programado:</span>
                            <div className="font-medium">{order.startTime} - {order.endTime}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Quantidade:</span>
                            <div className="font-medium">{order.quantity} unidades</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Produzido:</span>
                            <div className="font-medium">{productionData?.produced || 0} unidades</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Eficiência:</span>
                            <div className={`font-medium ${efficiency >= 90 ? 'text-tactical' : efficiency >= 70 ? 'text-operational' : 'text-destructive'}`}>
                              {efficiency}%
                            </div>
                          </div>
                        </div>

                        {/* Indicadores de Recursos */}
                        <div className="flex gap-4 mt-4 pt-3 border-t">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-tactical" />
                            <span className="text-xs">Material OK</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-tactical" />
                            <span className="text-xs">Operador Presente</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-tactical" />
                            <span className="text-xs">Máquina OK</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Apontamento de Produção */}
            <Card className="shadow-operational">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-operational" />
                  Apontamento de Produção
                </CardTitle>
                <CardDescription>
                  Registre quantidades produzidas e ocorrências
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {production.map((item) => (
                    <div key={item.orderId} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{item.orderId}</h4>
                        <Badge variant="outline">
                          {item.produced}/{item.planned}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium mb-1 block">
                            Quantidade Produzida
                          </label>
                          <Input
                            type="number"
                            value={item.produced}
                            onChange={(e) => handleProductionUpdate(item.orderId, parseInt(e.target.value) || 0)}
                            max={item.planned}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Defeitos: {item.defects}
                          </span>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Eficiência: {getEfficiency(item.planned, item.produced)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checklist e Controles */}
          <div className="space-y-6">
            <Card className="shadow-operational">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-operational" />
                  Checklist Pré-Turno
                </CardTitle>
                <CardDescription>
                  Verificações obrigatórias antes do início da produção
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-2 rounded hover:bg-muted/50">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => handleChecklistToggle(item.id)}
                        className="mt-1"
                      />
                      <span className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {item.task}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progresso:</span>
                    <Badge className="bg-operational text-operational-foreground">
                      {checklist.filter(item => item.completed).length}/{checklist.length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formulário de Ocorrências */}
            <Card className="shadow-operational">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-operational" />
                  Registro de Ocorrências
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Tipo de Ocorrência
                    </label>
                    <select className="w-full p-2 border rounded">
                      <option>Quebra de Máquina</option>
                      <option>Falta de Material</option>
                      <option>Problema de Qualidade</option>
                      <option>Ausência de Operador</option>
                      <option>Manutenção Preventiva</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Descrição
                    </label>
                    <Textarea
                      placeholder="Descreva o problema e ações tomadas..."
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Hora Início
                      </label>
                      <Input type="time" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Hora Fim
                      </label>
                      <Input type="time" />
                    </div>
                  </div>
                  
                  <Button className="w-full bg-operational text-operational-foreground hover:bg-operational/90">
                    Registrar Ocorrência
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Resumo do Turno */}
            <Card className="shadow-operational">
              <CardHeader>
                <CardTitle>Resumo do Turno</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ordens Programadas:</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ordens Concluídas:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Eficiência Média:</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Defeitos Total:</span>
                    <span className="font-medium">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paradas Não Programadas:</span>
                    <span className="font-medium">0</span>
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

export default OperationalLevel;
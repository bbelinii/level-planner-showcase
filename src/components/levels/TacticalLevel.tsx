import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Settings, ArrowRight, ArrowLeft, Package, Users, Clock, CheckCircle, AlertTriangle, Calculator, Truck, Wrench } from 'lucide-react';
import { mockBOM, mockSKUs } from '@/data/mockData';

interface TacticalLevelProps {
  onNext?: () => void;
  onPrevious?: () => void;
}

const TacticalLevel = ({ onNext, onPrevious }: TacticalLevelProps) => {
  const [selectedSKU, setSelectedSKU] = useState('SKU001');

  // Explosão de materiais - necessidades brutas → líquidas → data de necessidade
  const materialExplosion = [
    { 
      component: 'Barra de Aço Ø6mm', 
      grossNeed: 1000, 
      onHand: 250, 
      netNeed: 750, 
      lotSize: 500,
      finalOrder: 1000,
      needDate: '02/10/2024',
      orderDate: '27/09/2024',
      leadTime: 5,
      supplier: 'Aços Brasil',
      lotRule: 'EOQ'
    },
    { 
      component: 'Barra Sextavada M6', 
      grossNeed: 750, 
      onHand: 150, 
      netNeed: 600, 
      lotSize: 100,
      finalOrder: 600,
      needDate: '03/10/2024',
      orderDate: '30/09/2024',
      leadTime: 3,
      supplier: 'MetalCorp',
      lotRule: 'minimum'
    }
  ];

  const suppliersData = [
    { 
      supplier: 'Aços Brasil', 
      status: 'confirmado', 
      items: 2, 
      lastSent: '25/09/2024',
      leadTime: 5,
      expectedDate: '02/10/2024',
      reliability: 'Alta'
    },
    { 
      supplier: 'MetalCorp', 
      status: 'pendente', 
      items: 1, 
      lastSent: '24/09/2024',
      leadTime: 3,
      expectedDate: '27/09/2024',
      reliability: 'Média'
    },
    { 
      supplier: 'SiderSteel', 
      status: 'enviado', 
      items: 3, 
      lastSent: '25/09/2024',
      leadTime: 7,
      expectedDate: '04/10/2024',
      reliability: 'Alta'
    }
  ];

  const demandForecast = [
    { sku: 'SKU001', week1: 1200, week2: 1350, week3: 1100, week4: 1400 },
    { sku: 'SKU002', week1: 800, week2: 750, week3: 900, week4: 850 },
    { sku: 'SKU003', week1: 600, week2: 650, week3: 580, week4: 720 }
  ];

  // Liberação de lotes com duração e setup por máquina
  const productionLots = [
    { 
      id: 'L001', 
      sku: 'SKU001', 
      quantity: 500, 
      machine: 'Torno CNC Alpha', 
      status: 'liberado', 
      priority: 'alta',
      duration: 240, // minutos
      setupTime: 45,
      estimatedStart: '08:00',
      estimatedEnd: '12:45'
    },
    { 
      id: 'L002', 
      sku: 'SKU002', 
      quantity: 300, 
      machine: 'Fresa Universal Beta', 
      status: 'pendente', 
      priority: 'média',
      duration: 180,
      setupTime: 30,
      estimatedStart: '13:00',
      estimatedEnd: '16:30'
    },
    { 
      id: 'L003', 
      sku: 'SKU001', 
      quantity: 400, 
      machine: 'Torno CNC Alpha', 
      status: 'planejado', 
      priority: 'alta',
      duration: 200,
      setupTime: 15, // setup reduzido por ser mesmo produto
      estimatedStart: '13:00',
      estimatedEnd: '16:35'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enviado': case 'confirmado': case 'liberado': return 'default';
      case 'pendente': case 'planejado': return 'secondary';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'destructive';
      case 'média': return 'secondary';
      case 'baixa': return 'outline';
      default: return 'outline';
    }
  };

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'Alta': return 'default';
      case 'Média': return 'secondary';
      case 'Baixa': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-tactical/10 text-tactical px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Settings className="h-4 w-4" />
          Nível Tático
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Controle Tático Aprimorado
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explosão de materiais, gestão de fornecedores e planejamento detalhado
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Explosão de Materiais */}
        <Card className="shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-tactical" />
              Explosão de Materiais (MRP)
            </CardTitle>
            <CardDescription>
              Necessidades brutas → líquidas → data de necessidade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Componente</th>
                    <th className="text-right p-2">Nec. Bruta</th>
                    <th className="text-right p-2">Estoque</th>
                    <th className="text-right p-2">Nec. Líquida</th>
                    <th className="text-right p-2">Lote Final</th>
                    <th className="text-left p-2">Regra</th>
                    <th className="text-center p-2">Data Pedido</th>
                    <th className="text-center p-2">Data Necessidade</th>
                  </tr>
                </thead>
                <tbody>
                  {materialExplosion.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium">{item.component}</td>
                      <td className="p-2 text-right">{item.grossNeed}</td>
                      <td className="p-2 text-right text-muted-foreground">{item.onHand}</td>
                      <td className="p-2 text-right font-medium">{item.netNeed}</td>
                      <td className="p-2 text-right font-bold text-strategic">{item.finalOrder}</td>
                      <td className="p-2">
                        <Badge variant="outline" className="text-xs">{item.lotRule}</Badge>
                      </td>
                      <td className="p-2 text-center text-sm">{item.orderDate}</td>
                      <td className="p-2 text-center text-sm font-medium">{item.needDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Fornecedores com Lead Time */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-tactical" />
              Fornecedores - Lead Time e Confiabilidade
            </CardTitle>
            <CardDescription>
              Status detalhado com prazos e datas previstas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suppliersData.map((supplier, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{supplier.supplier}</h4>
                    <div className="flex gap-2">
                      <Badge variant={getStatusColor(supplier.status)}>
                        {supplier.status}
                      </Badge>
                      <Badge variant={getReliabilityColor(supplier.reliability)}>
                        {supplier.reliability}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium">Lead Time:</span> {supplier.leadTime} dias
                    </div>
                    <div>
                      <span className="font-medium">Data Prevista:</span> {supplier.expectedDate}
                    </div>
                    <div>
                      <span className="font-medium">Itens:</span> {supplier.items} solicitados
                    </div>
                    <div>
                      <span className="font-medium">Último Envio:</span> {supplier.lastSent}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Button className="w-full bg-tactical text-tactical-foreground hover:bg-tactical/90">
                Atualizar Status dos Fornecedores
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Previsão de Demanda */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-tactical" />
              Previsão de Demanda
            </CardTitle>
            <CardDescription>
              Projeção de demanda para as próximas semanas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">SKU</th>
                    <th className="text-right p-2">Sem 1</th>
                    <th className="text-right p-2">Sem 2</th>
                    <th className="text-right p-2">Sem 3</th>
                    <th className="text-right p-2">Sem 4</th>
                  </tr>
                </thead>
                <tbody>
                  {demandForecast.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium">{item.sku}</td>
                      <td className="p-2 text-right">{item.week1}</td>
                      <td className="p-2 text-right">{item.week2}</td>
                      <td className="p-2 text-right">{item.week3}</td>
                      <td className="p-2 text-right">{item.week4}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-3 bg-tactical/5 rounded-lg">
              <p className="text-sm">
                <span className="font-medium">Tendência:</span> Demanda crescente de 8% para SKU001, estável para demais produtos.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Liberação de Lotes Aprimorada */}
        <Card className="shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-tactical" />
              Liberação de Lotes - Duração e Setup
            </CardTitle>
            <CardDescription>
              Ordens com tempo de produção e setup previsto por máquina
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {productionLots.map((lot, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-sm">{lot.id}</h4>
                      <p className="text-xs text-muted-foreground">{lot.sku} • {lot.quantity} unidades</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getPriorityColor(lot.priority)}>
                        {lot.priority}
                      </Badge>
                      <Badge variant={getStatusColor(lot.status)}>
                        {lot.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="font-medium text-muted-foreground">Máquina:</span>
                      <div className="font-medium">{lot.machine}</div>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Setup:</span>
                      <div className="font-medium">{lot.setupTime} min</div>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Duração:</span>
                      <div className="font-medium">{lot.duration} min</div>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Período:</span>
                      <div className="font-medium">{lot.estimatedStart} - {lot.estimatedEnd}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progresso Estimado</span>
                      <span>{lot.status === 'liberado' ? '100%' : lot.status === 'pendente' ? '0%' : '50%'}</span>
                    </div>
                    <Progress value={lot.status === 'liberado' ? 100 : lot.status === 'pendente' ? 0 : 50} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Otimizar Sequenciamento
                </Button>
                <Button className="flex-1 bg-tactical text-tactical-foreground hover:bg-tactical/90">
                  Liberar Todos os Lotes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {onPrevious && (
          <Button variant="outline" onClick={onPrevious}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Estratégico
          </Button>
        )}
        
        {onNext && (
          <Button onClick={onNext} className="bg-tactical text-tactical-foreground hover:bg-tactical/90 ml-auto">
            Avançar para Operacional
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TacticalLevel;
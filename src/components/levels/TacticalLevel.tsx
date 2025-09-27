import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, ArrowRight, ArrowLeft, Package, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface TacticalLevelProps {
  onNext?: () => void;
  onPrevious?: () => void;
}

const TacticalLevel = ({ onNext, onPrevious }: TacticalLevelProps) => {
  const [selectedSKU, setSelectedSKU] = useState('CELL001');

  const bomData = [
    { item: 'Placa-mãe Celular', quantity: 1, unit: 'un', supplier: 'Foxconn Electronics' },
    { item: 'Bateria Li-ion 4000mAh', quantity: 1, unit: 'un', supplier: 'CATL Battery' },
    { item: 'Tela OLED 6.5"', quantity: 1, unit: 'un', supplier: 'Samsung Display' },
    { item: 'Câmera 64MP', quantity: 1, unit: 'un', supplier: 'Sony Imaging' },
    { item: 'Carcaça Celular', quantity: 1, unit: 'un', supplier: 'Precision Mold' }
  ];

  const suppliersData = [
    { supplier: 'Foxconn Electronics', status: 'enviado', items: 2, lastSent: '25/09/2024' },
    { supplier: 'Samsung Display', status: 'pendente', items: 2, lastSent: '24/09/2024' },
    { supplier: 'CATL Battery', status: 'confirmado', items: 2, lastSent: '25/09/2024' },
    { supplier: 'Sony Imaging', status: 'enviado', items: 1, lastSent: '25/09/2024' }
  ];

  const demandForecast = [
    { sku: 'CELL001', week1: 1350, week2: 1200, week3: 1500, week4: 1400 },
    { sku: 'DRONE001', week1: 800, week2: 900, week3: 750, week4: 950 },
    { sku: 'MON001', week1: 600, week2: 650, week3: 580, week4: 720 }
  ];

  const productionLots = [
    { id: 'L001', sku: 'CELL001', quantity: 450, machine: 'Linha SMT', status: 'liberado', priority: 'alta' },
    { id: 'L002', sku: 'DRONE001', quantity: 200, machine: 'Mesa Montagem', status: 'pendente', priority: 'média' },
    { id: 'L003', sku: 'CELL001', quantity: 350, machine: 'Teste ICT', status: 'liberado', priority: 'alta' },
    { id: 'L004', sku: 'MON001', quantity: 180, machine: 'Pick & Place', status: 'planejado', priority: 'baixa' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enviado': return 'default';
      case 'confirmado': return 'default';
      case 'pendente': return 'secondary';
      case 'liberado': return 'default';
      case 'planejado': return 'outline';
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

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-tactical/10 text-tactical px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Settings className="h-4 w-4" />
          Nível Tático
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Controle Tático
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Gestão de materiais e planejamento detalhado de produção
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* BOM - Lista de Materiais */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-tactical" />
              BOM - Lista de Materiais
            </CardTitle>
            <CardDescription>
              Estrutura de materiais para produção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">SKU Selecionado</label>
                <select 
                  value={selectedSKU}
                  onChange={(e) => setSelectedSKU(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="CELL001">CELL001 - Celular Galaxy X1</option>
                  <option value="DRONE001">DRONE001 - Drone Pro FPV</option>
                  <option value="MON001">MON001 - Monitor 4K Gaming</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Item</th>
                      <th className="text-right p-2">Qtd</th>
                      <th className="text-left p-2">Fornecedor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bomData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2">{item.item}</td>
                        <td className="p-2 text-right">{item.quantity} {item.unit}</td>
                        <td className="p-2 text-sm text-muted-foreground">{item.supplier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Envio para Fornecedores */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-tactical" />
              Envio da Lista para Fornecedores
            </CardTitle>
            <CardDescription>
              Status do envio de solicitações de materiais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suppliersData.map((supplier, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{supplier.supplier}</h4>
                    <Badge variant={getStatusColor(supplier.status)}>
                      {supplier.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{supplier.items} itens solicitados</span>
                    <span>Último envio: {supplier.lastSent}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Button className="w-full bg-tactical text-tactical-foreground hover:bg-tactical/90">
                Reenviar Solicitações Pendentes
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
                <span className="font-medium">Tendência:</span> Demanda crescente de 12% para CELL001, sazonalidade positiva para DRONE001 no fim do ano.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Liberação de Lotes */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-tactical" />
              Liberação de Lotes para Máquinas
            </CardTitle>
            <CardDescription>
              Ordens de produção liberadas e programadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {productionLots.map((lot, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
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
                  <div className="text-xs text-muted-foreground">
                    Máquina: {lot.machine}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Programar Lotes
                </Button>
                <Button className="flex-1 bg-tactical text-tactical-foreground hover:bg-tactical/90">
                  Liberar Produção
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
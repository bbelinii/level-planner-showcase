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
    <div className="py-3 h-screen overflow-hidden flex flex-col">
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-2 bg-tactical/10 text-tactical px-3 py-1 rounded-full text-sm font-medium mb-2">
          <Settings className="h-4 w-4" />
          Nível Tático
        </div>
        <h2 className="text-2xl font-bold mb-1">
          Controle Tático
        </h2>
        <p className="text-sm text-muted-foreground">
          Gestão de materiais e planejamento detalhado
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-2 flex-1 overflow-hidden">
        {/* BOM - Lista de Materiais */}
        <Card className="shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-4 w-4 text-tactical" />
              BOM
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <select 
              value={selectedSKU}
              onChange={(e) => setSelectedSKU(e.target.value)}
              className="w-full p-2 border rounded text-sm mb-3"
            >
              <option value="CELL001">CELL001</option>
              <option value="DRONE001">DRONE001</option>
              <option value="MON001">MON001</option>
            </select>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Item</th>
                    <th className="text-right p-2">Qtd</th>
                  </tr>
                </thead>
                <tbody>
                  {bomData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2">{item.item.split(' ').slice(0,2).join(' ')}</td>
                      <td className="p-2 text-right">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Envio para Fornecedores */}
        <Card className="shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-tactical" />
              Fornecedores
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="space-y-2">
              {suppliersData.map((supplier, index) => (
                <div key={index} className="p-2 border rounded">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{supplier.supplier.split(' ')[0]}</h4>
                    <Badge variant={getStatusColor(supplier.status)} className="text-xs px-2 py-0.5">
                      {supplier.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {supplier.items} itens • {supplier.lastSent}
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full bg-tactical text-tactical-foreground hover:bg-tactical/90 mt-3 text-sm h-8">
              Reenviar Pendentes
            </Button>
          </CardContent>
        </Card>

        {/* Previsão de Demanda */}
        <Card className="shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-tactical" />
              Previsão Demanda
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">SKU</th>
                    <th className="text-right p-2">S1</th>
                    <th className="text-right p-2">S2</th>
                    <th className="text-right p-2">S3</th>
                    <th className="text-right p-2">S4</th>
                  </tr>
                </thead>
                <tbody>
                  {demandForecast.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium">{item.sku}</td>
                      <td className="p-2 text-right">{(item.week1/1000).toFixed(1)}k</td>
                      <td className="p-2 text-right">{(item.week2/1000).toFixed(1)}k</td>
                      <td className="p-2 text-right">{(item.week3/1000).toFixed(1)}k</td>
                      <td className="p-2 text-right">{(item.week4/1000).toFixed(1)}k</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-3 p-2 bg-tactical/5 rounded text-xs">
              <span className="font-medium">Tendência:</span> +12% CELL001
            </div>
          </CardContent>
        </Card>

        {/* Liberação de Lotes */}
        <Card className="shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle className="h-4 w-4 text-tactical" />
              Lotes de Produção
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="space-y-2">
              {productionLots.map((lot, index) => (
                <div key={index} className="p-2 border rounded">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h4 className="font-medium text-sm">{lot.id}</h4>
                      <p className="text-xs text-muted-foreground">{lot.sku} • {lot.quantity}</p>
                    </div>
                    <div className="flex gap-1">
                      <Badge variant={getPriorityColor(lot.priority)} className="text-xs px-2 py-0.5">
                        {lot.priority}
                      </Badge>
                      <Badge variant={getStatusColor(lot.status)} className="text-xs px-2 py-0.5">
                        {lot.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {lot.machine}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 mt-3">
              <Button variant="outline" className="flex-1 text-sm h-8">
                Programar
              </Button>
              <Button className="flex-1 bg-tactical text-tactical-foreground hover:bg-tactical/90 text-sm h-8">
                Liberar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-2 mt-2">
        {onPrevious && (
          <Button variant="outline" onClick={onPrevious} size="sm" className="text-sm h-8 px-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Estratégico
          </Button>
        )}
        
        {onNext && (
          <Button 
            onClick={onNext} 
            size="sm"
            className="bg-tactical text-tactical-foreground hover:bg-tactical/90 ml-auto text-sm h-8 px-4"
          >
            Avançar para Operacional
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TacticalLevel;
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Play, Pause, AlertTriangle } from 'lucide-react';

interface TimelineItem {
  id: string;
  machine: string;
  operation: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'completed' | 'in-progress' | 'scheduled' | 'delayed';
  sku: string;
  quantity: number;
}

const TimelineDiagram = () => {
  const [selectedDay, setSelectedDay] = useState('today');
  const [selectedMachine, setSelectedMachine] = useState('all');

  const timelineData: TimelineItem[] = [
    {
      id: 'OP001',
      machine: 'Linha SMT Panasonic',
      operation: 'Montagem PCB Celular',
      startTime: '08:00',
      endTime: '12:00',
      duration: 4,
      status: 'completed',
      sku: 'CELL001',
      quantity: 450
    },
    {
      id: 'OP002',
      machine: 'Linha SMT Panasonic',
      operation: 'Setup + SMT Monitor',
      startTime: '13:00',
      endTime: '17:00',
      duration: 4,
      status: 'in-progress',
      sku: 'MON001',
      quantity: 180
    },
    {
      id: 'OP003',
      machine: 'Pick & Place Yamaha',
      operation: 'Montagem Drone PCB',
      startTime: '08:00',
      endTime: '14:00',
      duration: 6,
      status: 'completed',
      sku: 'DRONE001',
      quantity: 200
    },
    {
      id: 'OP004',
      machine: 'Mesa Montagem Final',
      operation: 'Montagem Final Celular',
      startTime: '14:30',
      endTime: '18:00',
      duration: 3.5,
      status: 'scheduled',
      sku: 'CELL001',
      quantity: 350
    },
    {
      id: 'OP005',
      machine: 'Estação Teste ICT',
      operation: 'Teste Funcional Drone',
      startTime: '09:00',
      endTime: '16:00',
      duration: 7,
      status: 'delayed',
      sku: 'DRONE001',
      quantity: 120
    }
  ];

  const machines = ['Linha SMT Panasonic', 'Pick & Place Yamaha', 'Mesa Montagem Final', 'Estação Teste ICT'];
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-tactical/20 border-tactical text-tactical';
      case 'in-progress': return 'bg-operational/20 border-operational text-operational';
      case 'scheduled': return 'bg-muted border-border text-muted-foreground';
      case 'delayed': return 'bg-destructive/20 border-destructive text-destructive';
      default: return 'bg-muted border-border text-muted-foreground';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in-progress': return 'secondary';
      case 'scheduled': return 'outline';
      case 'delayed': return 'destructive';
      default: return 'outline';
    }
  };

  const filteredData = selectedMachine === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.machine === selectedMachine);

  const getTimePosition = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalMinutes = (hours - 8) * 60 + minutes; // Starting from 8:00
    return (totalMinutes / (10 * 60)) * 100; // 10 hours total (8:00-18:00)
  };

  const getItemWidth = (duration: number) => {
    return (duration / 10) * 100; // 10 hours total
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-operational" />
          Diagrama de Tempos - Programação de Produção
        </CardTitle>
        <CardDescription>
          Visualização temporal das operações por máquina
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Filtros */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <Button
                variant={selectedDay === 'today' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDay('today')}
              >
                <Calendar className="h-4 w-4 mr-1" />
                Hoje
              </Button>
              <Button
                variant={selectedDay === 'tomorrow' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDay('tomorrow')}
              >
                Amanhã
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedMachine === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMachine('all')}
              >
                Todas as Máquinas
              </Button>
              {machines.map(machine => (
                <Button
                  key={machine}
                  variant={selectedMachine === machine ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMachine(machine)}
                >
                  {machine}
                </Button>
              ))}
            </div>
          </div>

          {/* Timeline Header */}
          <div className="relative">
            <div className="flex border-b pb-2 mb-4">
              <div className="w-24 text-sm font-medium">Máquina</div>
              <div className="flex-1 relative">
                <div className="flex justify-between text-xs text-muted-foreground">
                  {timeSlots.map(time => (
                    <span key={time} className="w-8 text-center">{time}</span>
                  ))}
                </div>
                {/* Time grid lines */}
                <div className="absolute top-6 left-0 right-0 h-full">
                  {timeSlots.map((_, index) => (
                    <div 
                      key={index} 
                      className="absolute h-full border-l border-border/30"
                      style={{ left: `${(index / (timeSlots.length - 1)) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline Content */}
            <div className="space-y-4">
              {machines.map(machine => {
                const machineOperations = filteredData.filter(item => item.machine === machine);
                
                return (
                  <div key={machine} className="flex">
                    <div className="w-24 py-2 text-sm font-medium text-center border border-border rounded-l bg-muted/30">
                      {machine}
                    </div>
                    <div className="flex-1 relative h-16 border border-l-0 border-border rounded-r">
                      {/* Timeline bars for operations */}
                      {machineOperations.map(operation => (
                        <div
                          key={operation.id}
                          className={`absolute h-12 m-1 rounded border-2 ${getStatusColor(operation.status)} cursor-pointer hover:opacity-80 transition-opacity`}
                          style={{
                            left: `${getTimePosition(operation.startTime)}%`,
                            width: `${getItemWidth(operation.duration)}%`
                          }}
                          title={`${operation.operation} (${operation.startTime}-${operation.endTime})`}
                        >
                          <div className="p-1 h-full flex flex-col justify-center">
                            <div className="text-xs font-medium truncate">
                              {operation.id}
                            </div>
                            <div className="text-xs truncate opacity-75">
                              {operation.sku} - {operation.quantity}un
                            </div>
                          </div>
                          
                          {/* Status indicator */}
                          {operation.status === 'in-progress' && (
                            <Play className="absolute top-1 right-1 h-3 w-3" />
                          )}
                          {operation.status === 'delayed' && (
                            <AlertTriangle className="absolute top-1 right-1 h-3 w-3" />
                          )}
                        </div>
                      ))}
                      
                      {/* Empty state for machines with no operations */}
                      {machineOperations.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                          Sem operações programadas
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend and Summary */}
          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <h4 className="font-medium text-sm mb-3">Legenda de Status</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Concluído</Badge>
                <Badge variant="secondary">Em Andamento</Badge>
                <Badge variant="outline">Programado</Badge>
                <Badge variant="destructive">Atrasado</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-3">Resumo do Dia</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>• Total de operações: {filteredData.length}</div>
                <div>• Concluídas: {filteredData.filter(op => op.status === 'completed').length}</div>
                <div>• Em andamento: {filteredData.filter(op => op.status === 'in-progress').length}</div>
                <div>• Atrasadas: {filteredData.filter(op => op.status === 'delayed').length}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineDiagram;
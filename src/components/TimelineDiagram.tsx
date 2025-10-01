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
      <CardHeader className="p-2">
        <CardTitle className="flex items-center gap-1.5 text-sm">
          <Clock className="h-3.5 w-3.5 text-operational" />
          Timeline de Produção
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <div className="space-y-2">
          {/* Filtros compactos */}
          <div className="flex gap-1 flex-wrap">
            <Button
              variant={selectedMachine === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedMachine('all')}
              className="text-[10px] h-5 px-2"
            >
              Todas
            </Button>
            {machines.slice(0, 2).map(machine => (
              <Button
                key={machine}
                variant={selectedMachine === machine ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMachine(machine)}
                className="text-[10px] h-5 px-2"
              >
                {machine.split(' ')[0]}
              </Button>
            ))}
          </div>

          {/* Timeline simplificado */}
          <div className="space-y-1">
            {machines.slice(0, 3).map(machine => {
              const machineOperations = filteredData.filter(item => item.machine === machine);
              
              return (
                <div key={machine} className="flex items-center gap-1">
                  <div className="w-16 text-[9px] font-medium truncate">
                    {machine.split(' ')[0]}
                  </div>
                  <div className="flex-1 relative h-6 border border-border rounded bg-muted/10">
                    {machineOperations.map(operation => (
                      <div
                        key={operation.id}
                        className={`absolute h-5 m-0.5 rounded text-[8px] ${getStatusColor(operation.status)} cursor-pointer`}
                        style={{
                          left: `${getTimePosition(operation.startTime)}%`,
                          width: `${getItemWidth(operation.duration)}%`
                        }}
                        title={`${operation.operation}`}
                      >
                        <div className="px-1 flex items-center h-full">
                          <span className="truncate">{operation.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legenda compacta */}
          <div className="flex gap-1 pt-1 border-t">
            <Badge variant="default" className="text-[8px] px-1 py-0">OK</Badge>
            <Badge variant="secondary" className="text-[8px] px-1 py-0">Ativo</Badge>
            <Badge variant="outline" className="text-[8px] px-1 py-0">Prog.</Badge>
            <Badge variant="destructive" className="text-[8px] px-1 py-0">Atraso</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineDiagram;
export interface SKU {
  id: string;
  name: string;
  description: string;
  price: number;
  leadTime: number;
  category: string;
  family: string;
}

export interface Machine {
  id: string;
  name: string;
  capacity: number;
  status: 'available' | 'busy' | 'maintenance';
  currentJob?: string;
  efficiency: number;
  utilizationRate: number;
  isBottleneck: boolean;
  setupTime: number;
}

export interface BOMItem {
  skuId: string;
  componentId: string;
  componentName: string;
  quantity: number;
  cost: number;
  leadTime: number;
  supplier: string;
  lotRule: 'EOQ' | 'minimum' | 'multiple';
  lotSize: number;
}

export interface PMPItem {
  period: string;
  demand: number;
  production: number;
  inventory: number;
  initialStock: number;
  finalStock: number;
  safetyBuffer: number;
}

export interface MPSItem {
  skuId: string;
  period: string;
  plannedProduction: number;
  actualProduction: number;
  status: 'planned' | 'in-progress' | 'completed';
}

export interface StockItem {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  weeksCoverage: number;
  status: 'normal' | 'low' | 'critical' | 'excess';
}

export interface ProductionOrder {
  id: string;
  skuId: string;
  machineId: string;
  quantity: number;
  startTime: string;
  endTime: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  completedPercentage: number;
  estimatedTime: number;
  actualTime: number;
  scrapQuantity: number;
  wipQuantity: number;
}

// Dados mockados
export const mockSKUs: SKU[] = [
  { id: 'SKU001', name: 'Parafuso M6x20', description: 'Parafuso sextavado M6 x 20mm', price: 0.15, leadTime: 3, category: 'Fixação', family: 'Parafusos' },
  { id: 'SKU002', name: 'Porca M6', description: 'Porca sextavada M6', price: 0.08, leadTime: 2, category: 'Fixação', family: 'Porcas' },
  { id: 'SKU003', name: 'Arruela Lisa M6', description: 'Arruela lisa 6mm', price: 0.03, leadTime: 1, category: 'Fixação', family: 'Arruelas' },
  { id: 'SKU004', name: 'Chapa Aço 200x100', description: 'Chapa de aço carbono 200x100x3mm', price: 12.50, leadTime: 7, category: 'Matéria-prima', family: 'Chapas' },
  { id: 'SKU005', name: 'Tubo Ø25mm', description: 'Tubo redondo Ø25mm parede 2mm', price: 8.75, leadTime: 5, category: 'Matéria-prima', family: 'Tubos' },
  { id: 'SKU006', name: 'Motor 1HP', description: 'Motor elétrico 1HP 1750rpm', price: 450.00, leadTime: 14, category: 'Componente', family: 'Motores' },
  { id: 'SKU007', name: 'Redutor 1:20', description: 'Redutor de velocidade 1:20', price: 320.00, leadTime: 10, category: 'Componente', family: 'Redutores' },
  { id: 'SKU008', name: 'Mancal SKF', description: 'Mancal rolamento SKF 6206', price: 85.00, leadTime: 8, category: 'Componente', family: 'Mancais' },
  { id: 'SKU009', name: 'Correia V', description: 'Correia em V seção A42', price: 25.00, leadTime: 4, category: 'Componente', family: 'Correias' },
  { id: 'SKU010', name: 'Suporte Base', description: 'Suporte de base soldado', price: 180.00, leadTime: 12, category: 'Subconjunto', family: 'Suportes' }
];

export const mockMachines: Machine[] = [
  { id: 'MAC001', name: 'Torno CNC Alpha', capacity: 100, status: 'available', efficiency: 0.85, utilizationRate: 0.95, isBottleneck: true, setupTime: 45 },
  { id: 'MAC002', name: 'Fresa Universal Beta', capacity: 80, status: 'busy', currentJob: 'OP-2024-001', efficiency: 0.92, utilizationRate: 0.88, isBottleneck: false, setupTime: 30 },
  { id: 'MAC003', name: 'Solda MIG Delta', capacity: 120, status: 'available', efficiency: 0.78, utilizationRate: 0.75, isBottleneck: false, setupTime: 15 },
  { id: 'MAC004', name: 'Prensa 50T Gamma', capacity: 200, status: 'maintenance', efficiency: 0.88, utilizationRate: 0.85, isBottleneck: false, setupTime: 20 },
  { id: 'MAC005', name: 'Furadeira Radial Epsilon', capacity: 60, status: 'available', efficiency: 0.95, utilizationRate: 0.70, isBottleneck: false, setupTime: 10 }
];

export const mockBOM: BOMItem[] = [
  { skuId: 'SKU001', componentId: 'RAW001', componentName: 'Barra de Aço Ø6mm', quantity: 0.02, cost: 0.05, leadTime: 5, supplier: 'Aços Brasil', lotRule: 'EOQ', lotSize: 500 },
  { skuId: 'SKU002', componentId: 'RAW002', componentName: 'Barra Sextavada M6', quantity: 0.015, cost: 0.04, leadTime: 3, supplier: 'MetalCorp', lotRule: 'minimum', lotSize: 100 },
  { skuId: 'SKU003', componentId: 'RAW003', componentName: 'Chapa Aço 1mm', quantity: 0.001, cost: 0.015, leadTime: 7, supplier: 'SiderSteel', lotRule: 'multiple', lotSize: 50 },
  { skuId: 'SKU004', componentId: 'RAW004', componentName: 'Chapa Aço Laminada', quantity: 1, cost: 8.50, leadTime: 10, supplier: 'Usiminas', lotRule: 'EOQ', lotSize: 25 },
  { skuId: 'SKU005', componentId: 'RAW005', componentName: 'Tubo Trefilado Ø25', quantity: 1, cost: 6.20, leadTime: 8, supplier: 'TuboCorp', lotRule: 'minimum', lotSize: 20 }
];

export const mockPMP: PMPItem[] = [
  { period: 'S01/2024', demand: 1200, production: 1300, inventory: 450, initialStock: 350, finalStock: 450, safetyBuffer: 120 },
  { period: 'S02/2024', demand: 1350, production: 1400, inventory: 500, initialStock: 450, finalStock: 500, safetyBuffer: 135 },
  { period: 'S03/2024', demand: 1180, production: 1200, inventory: 520, initialStock: 500, finalStock: 520, safetyBuffer: 118 },
  { period: 'S04/2024', demand: 1420, production: 1500, inventory: 600, initialStock: 520, finalStock: 600, safetyBuffer: 142 },
  { period: 'S05/2024', demand: 1380, production: 1400, inventory: 620, initialStock: 600, finalStock: 620, safetyBuffer: 138 },
  { period: 'S06/2024', demand: 1250, production: 1300, inventory: 670, initialStock: 620, finalStock: 670, safetyBuffer: 125 }
];

export const mockMPS: MPSItem[] = [
  { skuId: 'SKU001', period: 'S01/2024', plannedProduction: 500, actualProduction: 485, status: 'completed' },
  { skuId: 'SKU002', period: 'S01/2024', plannedProduction: 400, actualProduction: 410, status: 'completed' },
  { skuId: 'SKU003', period: 'S01/2024', plannedProduction: 300, actualProduction: 295, status: 'completed' },
  { skuId: 'SKU001', period: 'S02/2024', plannedProduction: 550, actualProduction: 520, status: 'in-progress' },
  { skuId: 'SKU002', period: 'S02/2024', plannedProduction: 450, actualProduction: 0, status: 'planned' },
  { skuId: 'SKU004', period: 'S02/2024', plannedProduction: 200, actualProduction: 0, status: 'planned' }
];

export const mockStock: StockItem[] = [
  { id: 'STK001', name: 'Parafuso M6x20', currentStock: 2500, minStock: 1000, maxStock: 5000, weeksCoverage: 2.1, status: 'normal' },
  { id: 'STK002', name: 'Porca M6', currentStock: 800, minStock: 1200, maxStock: 4000, weeksCoverage: 0.6, status: 'critical' },
  { id: 'STK003', name: 'Arruela Lisa M6', currentStock: 1500, minStock: 800, maxStock: 3000, weeksCoverage: 3.8, status: 'normal' },
  { id: 'STK004', name: 'Chapa Aço 200x100', currentStock: 150, minStock: 100, maxStock: 300, weeksCoverage: 1.2, status: 'low' },
  { id: 'STK005', name: 'Motor 1HP', currentStock: 25, minStock: 10, maxStock: 50, weeksCoverage: 5.2, status: 'normal' }
];

export const mockProductionOrders: ProductionOrder[] = [
  { id: 'OP001', skuId: 'SKU001', machineId: 'MAC001', quantity: 500, startTime: '08:00', endTime: '12:00', status: 'in-progress', priority: 'high', completedPercentage: 65, estimatedTime: 240, actualTime: 180, scrapQuantity: 8, wipQuantity: 325 },
  { id: 'OP002', skuId: 'SKU002', machineId: 'MAC002', quantity: 300, startTime: '13:00', endTime: '16:00', status: 'pending', priority: 'medium', completedPercentage: 0, estimatedTime: 180, actualTime: 0, scrapQuantity: 0, wipQuantity: 0 },
  { id: 'OP003', skuId: 'SKU003', machineId: 'MAC003', quantity: 200, startTime: '08:00', endTime: '10:00', status: 'completed', priority: 'low', completedPercentage: 100, estimatedTime: 120, actualTime: 125, scrapQuantity: 3, wipQuantity: 0 },
  { id: 'OP004', skuId: 'SKU004', machineId: 'MAC001', quantity: 100, startTime: '14:00', endTime: '17:00', status: 'pending', priority: 'high', completedPercentage: 0, estimatedTime: 180, actualTime: 0, scrapQuantity: 0, wipQuantity: 0 },
  { id: 'OP005', skuId: 'SKU005', machineId: 'MAC005', quantity: 150, startTime: '09:00', endTime: '11:30', status: 'in-progress', priority: 'medium', completedPercentage: 40, estimatedTime: 150, actualTime: 95, scrapQuantity: 2, wipQuantity: 60 }
];

// Dados para cálculo EOQ/MC
export interface EOQParams {
  demand: number;
  orderCost: number;
  holdingCost: number;
}

export const calculateEOQ = ({ demand, orderCost, holdingCost }: EOQParams) => {
  const eoq = Math.sqrt((2 * demand * orderCost) / holdingCost);
  const totalCost = Math.sqrt(2 * demand * orderCost * holdingCost);
  const orderFrequency = demand / eoq;
  
  return {
    optimalQuantity: Math.round(eoq),
    totalAnnualCost: Math.round(totalCost),
    ordersPerYear: Math.round(orderFrequency * 10) / 10,
    safetyStock: Math.round(eoq * 0.2) // 20% como exemplo
  };
};

// Glossário de termos
export const glossaryTerms = [
  {
    id: 'pmp',
    term: 'PMP',
    fullName: 'Plano Mestre de Produção',
    definition: 'Documento que especifica o que deve ser produzido, quando e em que quantidade, considerando a demanda prevista e a capacidade disponível.',
    examples: ['Planejamento semanal de 1.200 unidades', 'Definição de mix de produtos por período']
  },
  {
    id: 'mps',
    term: 'MPS',
    fullName: 'Master Production Schedule',
    definition: 'Cronograma detalhado que converte o PMP em ordens específicas de produção por SKU, máquina e período.',
    examples: ['500 parafusos M6 na semana 1', 'Programação por máquina e turno']
  },
  {
    id: 'sku',
    term: 'SKU',
    fullName: 'Stock Keeping Unit',
    definition: 'Unidade de manutenção de estoque que identifica cada produto único no sistema, incluindo variações de tamanho, cor, modelo.',
    examples: ['SKU001: Parafuso M6x20', 'SKU002: Porca M6']
  },
  {
    id: 'bom',
    term: 'BOM',
    fullName: 'Bill of Materials',
    definition: 'Lista estruturada de todos os componentes, matérias-primas e quantidades necessárias para fabricar um produto acabado.',
    examples: ['1 motor + 2 mancais + 1 correia', 'Estrutura hierárquica de componentes']
  },
  {
    id: 'eoq',
    term: 'EOQ/MC',
    fullName: 'Economic Order Quantity / Modelo de Compra',
    definition: 'Quantidade ótima de pedido que minimiza os custos totais de estoque (custo de pedido + custo de manutenção).',
    examples: ['Lote econômico: 245 unidades', 'Ponto de reposição: 150 unidades']
  },
  {
    id: 'erp',
    term: 'ERP',
    fullName: 'Enterprise Resource Planning',
    definition: 'Sistema integrado que gerencia todos os processos de negócio em tempo real, conectando vendas, produção, estoque e finanças.',
    examples: ['SAP, Oracle, Protheus', 'Integração entre módulos']
  },
  {
    id: 'kpi',
    term: 'KPI',
    fullName: 'Key Performance Indicator',
    definition: 'Métricas quantificáveis que avaliam o desempenho de processos críticos e apoiam a tomada de decisão estratégica.',
    examples: ['OEE: 85%', 'Giro de estoque: 12x/ano']
  }
];
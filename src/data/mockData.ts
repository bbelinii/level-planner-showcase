export interface SKU {
  id: string;
  name: string;
  description: string;
  price: number;
  leadTime: number;
  category: string;
}

export interface Machine {
  id: string;
  name: string;
  capacity: number;
  status: 'available' | 'busy' | 'maintenance';
  currentJob?: string;
  efficiency: number;
}

export interface BOMItem {
  skuId: string;
  componentId: string;
  componentName: string;
  quantity: number;
  cost: number;
}

export interface PMPItem {
  period: string;
  demand: number;
  production: number;
  inventory: number;
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
}

// Dados mockados
export const mockSKUs: SKU[] = [
  // Produtos Acabados
  { id: 'CELL001', name: 'Celular Galaxy X1', description: 'Smartphone Android 6.5" 128GB 5G', price: 1899.90, leadTime: 15, category: 'Produto Acabado' },
  { id: 'DRONE001', name: 'Drone Pro FPV', description: 'Drone com câmera 4K e gimbal 3 eixos', price: 2499.90, leadTime: 20, category: 'Produto Acabado' },
  { id: 'MON001', name: 'Monitor 4K Gaming', description: 'Monitor LED 27" 4K 144Hz HDR', price: 1299.90, leadTime: 12, category: 'Produto Acabado' },
  
  // Componentes Eletrônicos
  { id: 'PCB001', name: 'Placa-mãe Celular', description: 'PCB principal com processador Snapdragon', price: 285.50, leadTime: 21, category: 'Eletrônico' },
  { id: 'PCB002', name: 'Controlador de Voo', description: 'Flight controller com giroscópio 6 eixos', price: 120.00, leadTime: 14, category: 'Eletrônico' },
  { id: 'PCB003', name: 'Placa de Vídeo Monitor', description: 'GPU integrada para processamento 4K', price: 180.75, leadTime: 18, category: 'Eletrônico' },
  { id: 'BAT001', name: 'Bateria Li-ion 4000mAh', description: 'Bateria recarregável para celular', price: 85.00, leadTime: 10, category: 'Energia' },
  { id: 'BAT002', name: 'Bateria Drone 5200mAh', description: 'Bateria LiPo 3S para drone', price: 145.00, leadTime: 8, category: 'Energia' },
  { id: 'LCD001', name: 'Tela OLED 6.5"', description: 'Display OLED Full HD+ touch', price: 195.00, leadTime: 16, category: 'Display' },
  { id: 'LCD002', name: 'Painel LED 27"', description: 'Painel IPS 4K com backlight LED', price: 420.00, leadTime: 22, category: 'Display' },
  { id: 'CAM001', name: 'Câmera 64MP', description: 'Sensor CMOS principal do celular', price: 75.50, leadTime: 12, category: 'Óptico' },
  { id: 'CAM002', name: 'Câmera Drone 4K', description: 'Câmera estabilizada com gimbal', price: 350.00, leadTime: 25, category: 'Óptico' },
  { id: 'MOT001', name: 'Motor Brushless', description: 'Motor BLDC 2300KV para drone', price: 45.00, leadTime: 7, category: 'Mecânico' },
  { id: 'CASE001', name: 'Carcaça Celular', description: 'Frame de alumínio anodizado', price: 35.00, leadTime: 9, category: 'Estrutural' },
  { id: 'CASE002', name: 'Frame Drone Carbon', description: 'Chassi em fibra de carbono', price: 95.00, leadTime: 14, category: 'Estrutural' },
  { id: 'CASE003', name: 'Gabinete Monitor', description: 'Carcaça plástica ABS preta', price: 28.00, leadTime: 6, category: 'Estrutural' },
  
  // Componentes de Embalagem
  { id: 'PKG001', name: 'Caixa Celular Premium', description: 'Embalagem cartonada com espuma', price: 12.50, leadTime: 5, category: 'Embalagem' },
  { id: 'PKG002', name: 'Case Drone Rígido', description: 'Maleta rígida para transporte', price: 89.90, leadTime: 8, category: 'Embalagem' },
  { id: 'PKG003', name: 'Caixa Monitor Eco', description: 'Embalagem sustentável papelão', price: 15.75, leadTime: 3, category: 'Embalagem' },
  
  // Cabos e Acessórios
  { id: 'CAB001', name: 'Cabo USB-C', description: 'Cabo de carregamento e dados USB-C', price: 18.00, leadTime: 4, category: 'Acessório' },
  { id: 'CAB002', name: 'Cabo HDMI 2.1', description: 'Cabo HDMI 4K 60Hz para monitor', price: 25.00, leadTime: 6, category: 'Acessório' },
  { id: 'PROP001', name: 'Hélices Drone', description: 'Set 4 hélices em fibra de carbono', price: 32.00, leadTime: 5, category: 'Acessório' }
];

export const mockMachines: Machine[] = [
  { id: 'SMT001', name: 'Linha SMT Panasonic', capacity: 120, status: 'available', efficiency: 0.92 },
  { id: 'SMT002', name: 'Pick & Place Yamaha', capacity: 150, status: 'busy', currentJob: 'OP-2024-001', efficiency: 0.88 },
  { id: 'ASM001', name: 'Mesa Montagem Final', capacity: 80, status: 'available', efficiency: 0.85 },
  { id: 'TEST001', name: 'Estação Teste ICT', capacity: 60, status: 'available', efficiency: 0.95 },
  { id: 'PKG001', name: 'Linha Embalagem Auto', capacity: 100, status: 'maintenance', efficiency: 0.90 },
  { id: 'WELD001', name: 'Soldadora Ultrassônica', capacity: 200, status: 'available', efficiency: 0.87 }
];

export const mockBOM: BOMItem[] = [
  // BOM Celular Galaxy X1
  { skuId: 'CELL001', componentId: 'PCB001', componentName: 'Placa-mãe Celular', quantity: 1, cost: 285.50 },
  { skuId: 'CELL001', componentId: 'BAT001', componentName: 'Bateria Li-ion 4000mAh', quantity: 1, cost: 85.00 },
  { skuId: 'CELL001', componentId: 'LCD001', componentName: 'Tela OLED 6.5"', quantity: 1, cost: 195.00 },
  { skuId: 'CELL001', componentId: 'CAM001', componentName: 'Câmera 64MP', quantity: 1, cost: 75.50 },
  { skuId: 'CELL001', componentId: 'CASE001', componentName: 'Carcaça Celular', quantity: 1, cost: 35.00 },
  { skuId: 'CELL001', componentId: 'PKG001', componentName: 'Caixa Celular Premium', quantity: 1, cost: 12.50 },
  { skuId: 'CELL001', componentId: 'CAB001', componentName: 'Cabo USB-C', quantity: 1, cost: 18.00 },
  
  // BOM Drone Pro FPV
  { skuId: 'DRONE001', componentId: 'PCB002', componentName: 'Controlador de Voo', quantity: 1, cost: 120.00 },
  { skuId: 'DRONE001', componentId: 'BAT002', componentName: 'Bateria Drone 5200mAh', quantity: 1, cost: 145.00 },
  { skuId: 'DRONE001', componentId: 'CAM002', componentName: 'Câmera Drone 4K', quantity: 1, cost: 350.00 },
  { skuId: 'DRONE001', componentId: 'MOT001', componentName: 'Motor Brushless', quantity: 4, cost: 45.00 },
  { skuId: 'DRONE001', componentId: 'CASE002', componentName: 'Frame Drone Carbon', quantity: 1, cost: 95.00 },
  { skuId: 'DRONE001', componentId: 'PROP001', componentName: 'Hélices Drone', quantity: 1, cost: 32.00 },
  { skuId: 'DRONE001', componentId: 'PKG002', componentName: 'Case Drone Rígido', quantity: 1, cost: 89.90 },
  
  // BOM Monitor 4K Gaming
  { skuId: 'MON001', componentId: 'PCB003', componentName: 'Placa de Vídeo Monitor', quantity: 1, cost: 180.75 },
  { skuId: 'MON001', componentId: 'LCD002', componentName: 'Painel LED 27"', quantity: 1, cost: 420.00 },
  { skuId: 'MON001', componentId: 'CASE003', componentName: 'Gabinete Monitor', quantity: 1, cost: 28.00 },
  { skuId: 'MON001', componentId: 'PKG003', componentName: 'Caixa Monitor Eco', quantity: 1, cost: 15.75 },
  { skuId: 'MON001', componentId: 'CAB002', componentName: 'Cabo HDMI 2.1', quantity: 1, cost: 25.00 }
];

export const mockPMP: PMPItem[] = [
  { period: 'S40/2024', demand: 2800, production: 2950, inventory: 890 },
  { period: 'S41/2024', demand: 3200, production: 3300, inventory: 990 },
  { period: 'S42/2024', demand: 2950, production: 3100, inventory: 1140 },
  { period: 'S43/2024', demand: 4200, production: 4350, inventory: 1290 },
  { period: 'S44/2024', demand: 3800, production: 3900, inventory: 1390 },
  { period: 'S45/2024', demand: 3400, production: 3500, inventory: 1490 }
];

export const mockMPS: MPSItem[] = [
  { skuId: 'CELL001', period: 'S40/2024', plannedProduction: 1200, actualProduction: 1185, status: 'completed' },
  { skuId: 'DRONE001', period: 'S40/2024', plannedProduction: 800, actualProduction: 795, status: 'completed' },
  { skuId: 'MON001', period: 'S40/2024', plannedProduction: 950, actualProduction: 970, status: 'completed' },
  { skuId: 'CELL001', period: 'S41/2024', plannedProduction: 1350, actualProduction: 1320, status: 'in-progress' },
  { skuId: 'DRONE001', period: 'S41/2024', plannedProduction: 900, actualProduction: 450, status: 'in-progress' },
  { skuId: 'MON001', period: 'S41/2024', plannedProduction: 1050, actualProduction: 0, status: 'planned' }
];

export const mockStock: StockItem[] = [
  { id: 'STK001', name: 'Placa-mãe Celular', currentStock: 850, minStock: 500, maxStock: 1500, weeksCoverage: 2.8, status: 'normal' },
  { id: 'STK002', name: 'Bateria Li-ion 4000mAh', currentStock: 320, minStock: 400, maxStock: 1200, weeksCoverage: 1.2, status: 'critical' },
  { id: 'STK003', name: 'Tela OLED 6.5"', currentStock: 680, minStock: 300, maxStock: 1000, weeksCoverage: 3.1, status: 'normal' },
  { id: 'STK004', name: 'Controlador de Voo', currentStock: 190, minStock: 200, maxStock: 600, weeksCoverage: 1.8, status: 'low' },
  { id: 'STK005', name: 'Motor Brushless', currentStock: 1280, minStock: 800, maxStock: 2400, weeksCoverage: 4.2, status: 'normal' },
  { id: 'STK006', name: 'Painel LED 27"', currentStock: 420, minStock: 250, maxStock: 800, weeksCoverage: 2.9, status: 'normal' },
  { id: 'STK007', name: 'Câmera Drone 4K', currentStock: 95, minStock: 150, maxStock: 500, weeksCoverage: 0.8, status: 'critical' },
  { id: 'STK008', name: 'Carcaça Celular', currentStock: 750, minStock: 400, maxStock: 1200, weeksCoverage: 3.5, status: 'normal' }
];

export const mockProductionOrders: ProductionOrder[] = [
  { id: 'OP001', skuId: 'CELL001', machineId: 'SMT001', quantity: 450, startTime: '08:00', endTime: '12:00', status: 'in-progress', priority: 'high' },
  { id: 'OP002', skuId: 'DRONE001', machineId: 'ASM001', quantity: 200, startTime: '13:00', endTime: '16:00', status: 'pending', priority: 'medium' },
  { id: 'OP003', skuId: 'MON001', machineId: 'SMT002', quantity: 180, startTime: '08:00', endTime: '14:00', status: 'completed', priority: 'low' },
  { id: 'OP004', skuId: 'CELL001', machineId: 'TEST001', quantity: 350, startTime: '14:00', endTime: '17:00', status: 'pending', priority: 'high' },
  { id: 'OP005', skuId: 'DRONE001', machineId: 'WELD001', quantity: 120, startTime: '09:00', endTime: '11:30', status: 'in-progress', priority: 'medium' }
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
    examples: ['Planejamento semanal de 3.200 celulares', 'Mix: 40% Celular, 30% Drone, 30% Monitor']
  },
  {
    id: 'mps',
    term: 'MPS',
    fullName: 'Master Production Schedule',
    definition: 'Cronograma detalhado que converte o PMP em ordens específicas de produção por SKU, máquina e período.',
    examples: ['1.350 Celulares Galaxy X1 na S41', 'Linha SMT: 450 unidades/dia']
  },
  {
    id: 'sku',
    term: 'SKU',
    fullName: 'Stock Keeping Unit',
    definition: 'Unidade de manutenção de estoque que identifica cada produto único no sistema, incluindo variações de tamanho, cor, modelo.',
    examples: ['CELL001: Celular Galaxy X1', 'DRONE001: Drone Pro FPV']
  },
  {
    id: 'bom',
    term: 'BOM',
    fullName: 'Bill of Materials',
    definition: 'Lista estruturada de todos os componentes, matérias-primas e quantidades necessárias para fabricar um produto acabado.',
    examples: ['1 PCB + 1 bateria + 1 tela + 1 câmera', 'Estrutura: Produto → Subconjunto → Componente']
  },
  {
    id: 'eoq',
    term: 'EOQ/MC',
    fullName: 'Economic Order Quantity / Modelo de Compra',
    definition: 'Quantidade ótima de pedido que minimiza os custos totais de estoque (custo de pedido + custo de manutenção).',
    examples: ['Lote econômico: 850 baterias', 'Ponto de reposição: 400 telas OLED']
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
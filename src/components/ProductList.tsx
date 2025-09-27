import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockSKUs, mockBOM } from '@/data/mockData';
import { Package, List, ArrowRight } from 'lucide-react';

const ProductList = () => {
  const [selectedSKU, setSelectedSKU] = useState<string | null>(null);
  
  const getBOMForSKU = (skuId: string) => {
    return mockBOM.filter(bom => bom.skuId === skuId);
  };

  return (
    <Card className="shadow-lg mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-strategic" />
          Produtos da Fábrica
        </CardTitle>
        <CardDescription>
          Lista completa de produtos fabricados e suas estruturas (BOM)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Lista de Produtos */}
          <div>
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <List className="h-4 w-4" />
              Catálogo de Produtos
            </h4>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {mockSKUs.map((sku) => (
                <div
                  key={sku.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedSKU === sku.id ? 'border-strategic bg-strategic/5' : ''
                  }`}
                  onClick={() => setSelectedSKU(sku.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm bg-muted px-2 py-0.5 rounded">
                          {sku.id}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {sku.category}
                        </Badge>
                      </div>
                      <h5 className="font-medium text-sm">{sku.name}</h5>
                      <p className="text-xs text-muted-foreground">{sku.description}</p>
                    </div>
                    {selectedSKU === sku.id && (
                      <ArrowRight className="h-4 w-4 text-strategic" />
                    )}
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>Preço: R$ {sku.price.toFixed(2)}</span>
                    <span>Lead Time: {sku.leadTime} dias</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOM do Produto Selecionado */}
          <div>
            <h4 className="font-medium mb-4">
              BOM - Lista de Materiais
            </h4>
            {selectedSKU ? (
              <div className="space-y-3">
                <div className="p-3 bg-strategic/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">
                      {mockSKUs.find(s => s.id === selectedSKU)?.name}
                    </span>
                    <Badge className="bg-strategic text-strategic-foreground">
                      {selectedSKU}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {mockSKUs.find(s => s.id === selectedSKU)?.description}
                  </p>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {getBOMForSKU(selectedSKU).length > 0 ? (
                    getBOMForSKU(selectedSKU).map((bomItem, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">
                            {bomItem.componentName}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {bomItem.componentId}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Qtd: {bomItem.quantity} unid.</span>
                          <span>Custo: R$ {bomItem.cost.toFixed(2)}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Produto acabado</p>
                      <p className="text-xs">Sem componentes cadastrados</p>
                    </div>
                  )}
                </div>

                {getBOMForSKU(selectedSKU).length > 0 && (
                  <div className="pt-3 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Custo Total dos Materiais:</span>
                      <span className="font-medium text-strategic">
                        R$ {getBOMForSKU(selectedSKU)
                          .reduce((total, item) => total + (item.cost * item.quantity), 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">Selecione um produto</p>
                <p className="text-xs">Clique em um produto à esquerda para ver sua estrutura (BOM)</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductList;
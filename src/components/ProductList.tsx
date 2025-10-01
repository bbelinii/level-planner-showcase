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
    <Card className="shadow-lg mb-1">
      <CardHeader className="p-2">
        <CardTitle className="flex items-center gap-1.5 text-sm">
          <Package className="h-3.5 w-3.5 text-strategic" />
          Produtos da Fábrica
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <div className="grid lg:grid-cols-2 gap-2">
          {/* Lista de Produtos */}
          <div>
            <h4 className="font-medium mb-1 flex items-center gap-1 text-xs">
              <List className="h-3 w-3" />
              Catálogo
            </h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {mockSKUs.map((sku) => (
                <div
                  key={sku.id}
                  className={`p-1.5 border rounded cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedSKU === sku.id ? 'border-strategic bg-strategic/5' : ''
                  }`}
                  onClick={() => setSelectedSKU(sku.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="font-mono text-[10px] bg-muted px-1 py-0 rounded">
                          {sku.id}
                        </span>
                        <Badge variant="outline" className="text-[8px] px-1 py-0">
                          {sku.category}
                        </Badge>
                      </div>
                      <h5 className="font-medium text-xs leading-tight">{sku.name}</h5>
                    </div>
                    {selectedSKU === sku.id && (
                      <ArrowRight className="h-3 w-3 text-strategic" />
                    )}
                  </div>
                  <div className="mt-0.5 flex justify-between text-[9px] text-muted-foreground">
                    <span>R$ {sku.price.toFixed(2)}</span>
                    <span>{sku.leadTime}d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOM do Produto Selecionado */}
          <div>
            <h4 className="font-medium mb-1 text-xs">
              BOM
            </h4>
            {selectedSKU ? (
              <div className="space-y-1">
                <div className="p-1.5 bg-strategic/5 rounded">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-medium text-xs leading-tight">
                      {mockSKUs.find(s => s.id === selectedSKU)?.name}
                    </span>
                    <Badge className="bg-strategic text-strategic-foreground text-[8px] px-1 py-0">
                      {selectedSKU}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1 max-h-24 overflow-y-auto">
                  {getBOMForSKU(selectedSKU).length > 0 ? (
                    getBOMForSKU(selectedSKU).map((bomItem, index) => (
                      <div key={index} className="p-1.5 border rounded">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-medium text-[10px] leading-tight">
                            {bomItem.componentName}
                          </span>
                          <Badge variant="outline" className="text-[8px] px-1 py-0">
                            {bomItem.componentId}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-[9px] text-muted-foreground">
                          <span>Qt: {bomItem.quantity}</span>
                          <span>R$ {bomItem.cost.toFixed(2)}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-muted-foreground">
                      <p className="text-[10px]">Produto acabado</p>
                    </div>
                  )}
                </div>

                {getBOMForSKU(selectedSKU).length > 0 && (
                  <div className="pt-1 border-t">
                    <div className="flex justify-between text-[10px]">
                      <span className="font-medium">Total:</span>
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
              <div className="p-3 text-center text-muted-foreground">
                <Package className="h-6 w-6 mx-auto mb-1 opacity-50" />
                <p className="text-[10px]">Selecione um produto</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductList;
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
    <Card className="shadow-lg mb-3">
      <CardHeader className="p-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Package className="h-4 w-4 text-strategic" />
          Produtos da Fábrica
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="grid lg:grid-cols-2 gap-3">
          {/* Lista de Produtos */}
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2 text-sm">
              <List className="h-4 w-4" />
              Catálogo
            </h4>
            <div className="space-y-2 max-h-36 overflow-y-auto">
              {mockSKUs.map((sku) => (
                <div
                  key={sku.id}
                  className={`p-2 border rounded cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedSKU === sku.id ? 'border-strategic bg-strategic/5' : ''
                  }`}
                  onClick={() => setSelectedSKU(sku.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                          {sku.id}
                        </span>
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                          {sku.category}
                        </Badge>
                      </div>
                      <h5 className="font-medium text-sm leading-tight">{sku.name}</h5>
                    </div>
                    {selectedSKU === sku.id && (
                      <ArrowRight className="h-4 w-4 text-strategic" />
                    )}
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>R$ {sku.price.toFixed(2)}</span>
                    <span>{sku.leadTime}d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOM do Produto Selecionado */}
          <div>
            <h4 className="font-medium mb-2 text-sm">
              BOM
            </h4>
            {selectedSKU ? (
              <div className="space-y-2">
                <div className="p-2 bg-strategic/5 rounded">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-medium text-sm leading-tight">
                      {mockSKUs.find(s => s.id === selectedSKU)?.name}
                    </span>
                    <Badge className="bg-strategic text-strategic-foreground text-xs px-1.5 py-0.5">
                      {selectedSKU}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1.5 max-h-28 overflow-y-auto">
                  {getBOMForSKU(selectedSKU).length > 0 ? (
                    getBOMForSKU(selectedSKU).map((bomItem, index) => (
                      <div key={index} className="p-2 border rounded">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-medium text-xs leading-tight">
                            {bomItem.componentName}
                          </span>
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                            {bomItem.componentId}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Qt: {bomItem.quantity}</span>
                          <span>R$ {bomItem.cost.toFixed(2)}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      <p className="text-xs">Produto acabado</p>
                    </div>
                  )}
                </div>

                {getBOMForSKU(selectedSKU).length > 0 && (
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-xs">
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
              <div className="p-4 text-center text-muted-foreground">
                <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">Selecione um produto</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductList;
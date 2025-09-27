import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Factory, ArrowLeft, ListTree } from 'lucide-react';
import { mockSKUs, mockBOM, type SKU, type BOMItem } from '@/data/mockData';

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState<SKU | null>(null);

  const getProductBOM = (skuId: string): BOMItem[] => {
    return mockBOM.filter(bom => bom.skuId === skuId);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fixação': return 'bg-blue-100 text-blue-800';
      case 'Matéria-prima': return 'bg-green-100 text-green-800';
      case 'Componente': return 'bg-purple-100 text-purple-800';
      case 'Subconjunto': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedProduct) {
    const bom = getProductBOM(selectedProduct.id);
    
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ListTree className="h-5 w-5 text-tactical" />
                BOM - {selectedProduct.name}
              </CardTitle>
              <CardDescription>
                Lista de materiais e componentes necessários
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedProduct(null)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Produto:</span> {selectedProduct.name}
                </div>
                <div>
                  <span className="font-medium">Categoria:</span> 
                  <Badge className={`ml-2 ${getCategoryColor(selectedProduct.category)}`}>
                    {selectedProduct.category}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Preço:</span> R$ {selectedProduct.price.toFixed(2)}
                </div>
                <div>
                  <span className="font-medium">Lead Time:</span> {selectedProduct.leadTime} dias
                </div>
              </div>
            </div>

            {bom.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Componentes Necessários:</h4>
                {bom.map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-sm">{item.componentName}</h5>
                        <p className="text-xs text-muted-foreground">ID: {item.componentId}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">Qtd: {item.quantity}</div>
                        <div className="text-xs text-muted-foreground">R$ {item.cost.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span>Custo Total dos Componentes:</span>
                    <span>R$ {bom.reduce((total, item) => total + item.cost, 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                <Package className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Nenhum componente cadastrado para este produto</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Factory className="h-5 w-5 text-primary" />
          Produtos da Fábrica
        </CardTitle>
        <CardDescription>
          Clique em um produto para visualizar sua lista de materiais (BOM)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {mockSKUs.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="p-3 text-left border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    <Badge className={getCategoryColor(product.category)}>
                      {product.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {product.description}
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>ID: {product.id}</span>
                    <span>Preço: R$ {product.price.toFixed(2)}</span>
                    <span>Lead Time: {product.leadTime}d</span>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Package className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductList;
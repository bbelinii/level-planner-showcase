import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { glossaryTerms } from '@/data/mockData';

const GlossaryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <BookOpen className="h-4 w-4 mr-2" />
          Siglas
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Glossário - Principais Siglas e Definições
          </DialogTitle>
          <DialogDescription>
            Entenda os principais termos utilizados no sistema PCP
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {glossaryTerms.map((item) => (
            <Card key={item.id} className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge variant="outline" className="text-sm font-bold">
                      {item.term}
                    </Badge>
                    <span className="text-base font-medium text-muted-foreground">
                      {item.fullName}
                    </span>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm mb-3 leading-relaxed">
                  {item.definition}
                </CardDescription>
                <div className="space-y-1">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Exemplos:
                  </h4>
                  <ul className="space-y-1">
                    {item.examples.map((example, index) => (
                      <li key={index} className="text-xs text-muted-foreground pl-2 border-l-2 border-muted">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlossaryDialog;
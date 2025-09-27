import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { glossaryTerms } from '@/data/mockData';
import { BookOpen } from 'lucide-react';

const GlossaryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Siglas
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Glossário de Termos - PCP
          </DialogTitle>
          <DialogDescription>
            Principais definições e conceitos utilizados no sistema de Planejamento e Controle da Produção
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {glossaryTerms.map((item) => (
            <Card key={item.id} className="border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded font-mono text-sm">
                    {item.term}
                  </span>
                  <span className="text-base font-medium text-muted-foreground">
                    {item.fullName}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {item.definition}
                </p>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-foreground">Exemplos:</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    {item.examples.map((example, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-primary">•</span>
                        <span>{example}</span>
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
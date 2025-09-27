import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Settings, Wrench } from 'lucide-react';

interface LevelCardProps {
  level: 'strategic' | 'tactical' | 'operational';
  title: string;
  description: string;
  features: string[];
  onNavigate: () => void;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, title, description, features, onNavigate }) => {
  const getIcon = () => {
    switch (level) {
      case 'strategic': return <BarChart3 className="h-8 w-8" />;
      case 'tactical': return <Settings className="h-8 w-8" />;
      case 'operational': return <Wrench className="h-8 w-8" />;
    }
  };

  const getGradient = () => {
    switch (level) {
      case 'strategic': return 'bg-gradient-strategic';
      case 'tactical': return 'bg-gradient-tactical';
      case 'operational': return 'bg-gradient-operational';
    }
  };

  const getShadow = () => {
    switch (level) {
      case 'strategic': return 'shadow-strategic';
      case 'tactical': return 'shadow-tactical';
      case 'operational': return 'shadow-operational';
    }
  };

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:scale-105 ${getShadow()} hover:shadow-elevated animate-fade-in`}>
      <div className={`absolute inset-0 ${getGradient()} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <CardHeader className="relative z-10 text-white">
        <div className="flex items-center gap-3 mb-2">
          {getIcon()}
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </div>
        <CardDescription className="text-white/80 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 text-white space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-80" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button 
          onClick={onNavigate}
          variant="secondary"
          className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300"
        >
          Explorar Nível
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default LevelCard;
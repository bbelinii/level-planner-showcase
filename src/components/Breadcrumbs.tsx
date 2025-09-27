import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={items[0]?.onClick}
        className="p-1 h-auto hover:text-foreground"
      >
        <Home className="h-4 w-4" />
      </Button>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4" />
          <Button
            variant="ghost"
            size="sm"
            onClick={item.onClick}
            disabled={index === items.length - 1}
            className={`p-1 h-auto ${
              index === items.length - 1 
                ? 'text-foreground font-medium cursor-default' 
                : 'hover:text-foreground'
            }`}
          >
            {item.label}
          </Button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
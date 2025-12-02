import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface ProductTierCardProps {
  tier: string;
  title: string;
  description: string;
  features: string[];
  onStartOrder: () => void;
  featured?: boolean;
}

export function ProductTierCard({ tier, title, description, features, onStartOrder, featured = false }: ProductTierCardProps) {
  return (
    <Card className={`flex flex-col h-full transition-all duration-300 hover:-translate-y-1 ${
      featured 
        ? 'shadow-xl border-primary/30 ring-2 ring-primary/20 hover:shadow-2xl' 
        : 'shadow-md hover:shadow-lg'
    }`}>
      <CardHeader className="relative">
        {featured && (
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4">
            Most Popular
          </Badge>
        )}
        <Badge variant="secondary" className="w-fit mb-2">{tier}</Badge>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <ul className="space-y-3 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button onClick={onStartOrder} className="w-full border-2 border-primary transition-all hover:bg-background hover:text-primary">
          Start order – {title}
        </Button>
      </CardContent>
    </Card>
  );
}

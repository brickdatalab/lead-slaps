import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from '@phosphor-icons/react';

interface ProductTierCardProps {
  tier: string;
  title: string;
  description: string;
  features: string[];
  onStartOrder: () => void;
}

export function ProductTierCard({
  tier,
  title,
  description,
  features,
  onStartOrder
}: ProductTierCardProps) {
  return (
    <Card
      className="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-slate-200 hover:border-slate-300 hover:shadow-md"
    >
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-300 to-slate-200" />

      <CardHeader className="pb-4 pt-6">
        {/* Tier Badge */}
        <Badge
          variant="secondary"
          className="w-fit mb-3 bg-slate-100 text-slate-600"
        >
          {tier}
        </Badge>

        <CardTitle className="text-xl font-bold text-slate-900">{title}</CardTitle>
        <CardDescription className="text-slate-600 mt-2 leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Features List */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-100">
                <Check className="w-3 h-3 text-slate-600" />
              </div>
              <span className="text-sm text-slate-700">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          onClick={onStartOrder}
          className="w-full group"
        >
          Start order – {title}
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}

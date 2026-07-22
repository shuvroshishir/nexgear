import { Users, ShoppingBag, Award, Clock } from "lucide-react";

export const StatisticsSection = () => {
  const stats = [
    { value: "10K+", label: "Happy Customers", icon: Users },
    { value: "500+", label: "Premium Products", icon: ShoppingBag },
    { value: "50+", label: "Top Brands", icon: Award },
    { value: "24/7", label: "Customer Support", icon: Clock },
  ];

  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center space-y-2">
              <stat.icon className="h-8 w-8 opacity-80 mb-2" />
              <h3 className="text-4xl font-bold tracking-tight">{stat.value}</h3>
              <p className="text-primary-foreground/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

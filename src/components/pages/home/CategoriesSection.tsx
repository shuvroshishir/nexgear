import { Smartphone, Shirt, Home, Dumbbell } from "lucide-react";
import Link from "next/link";

export const CategoriesSection = () => {
  const categories = [
    { name: "Electronics", icon: Smartphone, color: "bg-blue-100 text-blue-600" },
    { name: "Fashion", icon: Shirt, color: "bg-pink-100 text-pink-600" },
    { name: "Home & Garden", icon: Home, color: "bg-green-100 text-green-600" },
    { name: "Sports", icon: Dumbbell, color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <section className="container py-20 mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
        <p className="mt-2 text-muted-foreground">Find exactly what you are looking for.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/products?category=${cat.name}`}
            className="group flex flex-col items-center justify-center p-6 rounded-2xl border bg-card hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className={`p-4 rounded-full ${cat.color} mb-4 transition-transform group-hover:scale-110`}>
              <cat.icon className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-lg">{cat.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { AccessDenied } from "@/components/shared/AccessDenied";
import { mongoConnect } from "@/lib/mongoConnect";
import { DashboardOverview } from "@/components/pages/dashboard/DashboardOverview";
import { DashboardCharts } from "@/components/pages/dashboard/DashboardCharts";
import { RecentProductsTable } from "@/components/pages/dashboard/RecentProductsTable";
import { QuickActions } from "@/components/pages/dashboard/QuickActions";
import { TProduct } from "@/types/product";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session) {
    redirect("/login");
  }

  if (!isAdmin(session.user.email)) {
    return <AccessDenied />;
  }

  // Fetch data
  const { db } = await mongoConnect();
  const productsCollection = db.collection<TProduct>("products");

  // Overview Stats
  const [
    totalProducts,
    featuredProducts,
    categoriesResult,
    avgPriceResult,
    productsByCategory,
    recentProducts
  ] = await Promise.all([
    productsCollection.countDocuments(),
    productsCollection.countDocuments({ featured: true }),
    productsCollection.aggregate([{ $group: { _id: "$category" } }]).toArray(),
    productsCollection.aggregate([{ $group: { _id: null, avgPrice: { $avg: "$price" } } }]).toArray(),
    productsCollection.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray(),
    productsCollection.find().sort({ createdAt: -1 }).limit(5).toArray()
  ]);

  const uniqueCategoriesCount = categoriesResult.length;
  const avgPrice = avgPriceResult.length > 0 ? avgPriceResult[0].avgPrice : 0;

  // Chart Formatting
  const barChartData = productsByCategory.map(item => ({
    name: item._id,
    products: item.count
  }));

  const pieChartData = [
    { name: "Featured", value: featuredProducts },
    { name: "Regular", value: totalProducts - featuredProducts }
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your store's performance</p>
        </div>
        <QuickActions />
      </div>

      <div className="grid gap-6">
        <DashboardOverview 
          totalProducts={totalProducts}
          featuredProducts={featuredProducts}
          uniqueCategoriesCount={uniqueCategoriesCount}
          avgPrice={avgPrice}
        />

        <DashboardCharts 
          barChartData={barChartData} 
          pieChartData={pieChartData} 
        />

        <RecentProductsTable products={recentProducts} />
      </div>
    </div>
  );
}

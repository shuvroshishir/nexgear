import { mongoConnect } from "@/lib/mongoConnect";
import { TProduct } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

// GET all products
export async function GET(req: NextRequest) {
  try {
    const { db } = await mongoConnect();
    const searchParams = req.nextUrl.searchParams;
    
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const rating = parseFloat(searchParams.get("rating") || "0");
    const sort = searchParams.get("sort") || "";

    const query: any = {};
    
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    
    if (category && category !== "all") {
      query.category = category;
    }
    
    if (rating > 0) {
      query.rating = { $gte: rating };
    }
    
    let sortQuery: any = {};
    if (sort === "price_asc") sortQuery.price = 1;
    else if (sort === "price_desc") sortQuery.price = -1;
    else if (sort === "rating_desc") sortQuery.rating = -1;
    else sortQuery._id = -1; // Default to newest

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      db.collection("products").find(query).sort(sortQuery).skip(skip).limit(limit).toArray(),
      db.collection("products").countDocuments(query)
    ]);

    const formattedProducts = products.map((product) => ({
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      category: product.category,
      image: product.image,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      featured: product.featured,
    }));

    return NextResponse.json({
      data: formattedProducts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";

// POST new product
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    if (!isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { db } = await mongoConnect();

    const data: TProduct = await req.json();

    // Validate every field
    if (
      !data.title || 
      !data.shortDescription ||
      !data.description ||
      !data.category || 
      typeof data.price !== 'number' || 
      !data.image ||
      typeof data.stock !== 'number'
    ) {
      return NextResponse.json(
        {
          error: "All required fields must be provided and have correct types.",
        },
        { status: 400 },
      );
    }

    const newProduct = {
      title: data.title,
      shortDescription: data.shortDescription,
      description: data.description,
      category: data.category,
      price: data.price,
      image: data.image,
      stock: data.stock,
      rating: data.rating || 0,
      featured: data.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: session.user.email
    };

    const result = await db.collection("products").insertOne(newProduct);

    return NextResponse.json(
      {
        message: "Product created successfully.",
        id: result.insertedId,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create product." },
      { status: 500 },
    );
  }
}

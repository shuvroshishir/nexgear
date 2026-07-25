import { mongoConnect } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Get Product by ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const { db } = await mongoConnect();

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const formattedProduct = {
      id: product._id.toString(),
      title: product.title,
      shortDescription: product.shortDescription,
      description: product.description,
      image: product.image,
      category: product.category,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      featured: product.featured,
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";

// Update Product
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    if (!isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await context.params;
    const body = await req.json();

    // Validate every field
    if (
      !body.title || 
      !body.shortDescription ||
      !body.description ||
      !body.category || 
      typeof body.price !== 'number' || 
      !body.image ||
      typeof body.stock !== 'number'
    ) {
      return NextResponse.json(
        {
          error: "All required fields must be provided and have correct types.",
        },
        { status: 400 },
      );
    }

    const { db } = await mongoConnect();

    const updateData = {
      title: body.title,
      shortDescription: body.shortDescription,
      description: body.description,
      category: body.category,
      price: body.price,
      image: body.image,
      stock: body.stock,
      rating: body.rating || 0,
      featured: body.featured || false,
      updatedAt: new Date().toISOString(),
    };

    const result = await db.collection("products").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updateData,
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

// Delete Product
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    if (!isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await context.params;

    const { db } = await mongoConnect();

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}

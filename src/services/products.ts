export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: number;
    stock: number;
    brand: string;
    discountPercentage?: number;
    thumbnail?: string;
    images?: string[];
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

const BASE_URL = "https://dummyjson.com";

export async function fetchProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: ProductsResponse = await res.json();
        return data.products || [];
    } catch (error) {
        console.error("fetchProducts error:", error);
        return [];
    }
}

export async function fetchProductById(id: string | number): Promise<Product | null> {
    try {
        const res = await fetch(`${BASE_URL}/products/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch product");
        return await res.json();
    } catch (error) {
        console.error("fetchProductById error:", error);
        return null;
    }
}

export async function searchProducts(query: string): Promise<Product[]> {
    try {
        const q = query.trim();
        if (!q) return [];

        const res = await fetch(
            `${BASE_URL}/products/search?q=${encodeURIComponent(q)}`,
            { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to search products");
        const data: ProductsResponse = await res.json();
        return data.products || [];
    } catch (error) {
        console.error("searchProducts error:", error);
        return [];
    }
}

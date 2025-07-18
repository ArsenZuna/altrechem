export interface Product {
    _id: string;
    name: string;
    price: number;
    category?: string;
    featured?: boolean;
    isOnSale?: boolean;
    salePrice?: number;
    countInStock?: number;
    images: { url: string }[];
}

export interface Order {
    _id: string;
    user: {
        name: string;
    };
    guestInfo: {
        name: string;
        phone: string;
    };
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
    orderItems: OrderItem[]; // Add this line
}

export interface OrderItem {
    product: string;       // Product ID
    name: string;          // Product name
    price: number;         // Price per unit
    qty: number;           // Quantity ordered
    image?: string;        // Optional image URL
    countInStock?: number;
}

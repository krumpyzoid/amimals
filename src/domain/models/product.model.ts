class ProductProps {
    id: string;
    name: string;
    description: string;
    price: PriceM;
    createdAt: Date;
    updatedAt: Date;
}

class ProductState {
    id: string;
    name: string;
    description: string;
    price: PriceM;
    createdAt: Date;
    updatedAt: Date;
}

export class Product {
    constructor(private state: ProductState) {}

    static create(props: ProductProps) {
        const state = {
            ...props,
        };
        return new Product(state);
    }

    static restore(state: ProductState) {
        return new Product(state);
    }

    takeSnapshot() {
        return this.state;
    }
}

export class PriceM {
    id: number;
    basePrice: number;
    rules: PriceRule[];
    createDate: Date;
    updatedDate: Date;
}

export class PriceRule {
    id: number;
    name: string;
    min: number;
    max: number;
    price: number;
}

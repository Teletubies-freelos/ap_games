import Dexie,{ Table } from "dexie";

export interface ICartProduct {
    id?: number;
    imageUrl: string;
    name: string;
    price: number;
    priceDiscount: number;
    productId: number | string;
    quantity: number;
}

export class AppGamesDB extends Dexie {
    products!: Table<ICartProduct>

    constructor() {
        super("AppGamesDB");
        this.version(1).stores({
            products: "++id, imageUrl, name, price, priceDiscount, quantity, productId"
        });

    }
}

export const appGamesDbSingleton = new AppGamesDB();

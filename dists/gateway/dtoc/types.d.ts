export declare class AddressDTOC {
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    country: string;
    zip: number;
}
export declare class Success {
    title?: string;
    sentence?: string;
    redirect?: string;
}
export declare class User {
    name: string;
    email?: string;
    adress?: string;
    phone?: string;
}
export declare class userDTOC {
    id: String;
    name: string;
    email?: string;
    token: string;
    adress?: string;
    phone?: string;
    money?: number;
    bought_items?: number;
    seller: boolean;
    is_admin: boolean;
    created_at: Date;
    kwalaDcd5vrs: String;
    GRE5509jbgUU91: String;
}
export declare class basicERR {
    field?: string;
    msg?: string;
    status?: string;
    title?: string;
    sentence?: string;
}
export declare class ProductDTOC {
    id?: string;
    price?: number;
    title?: string;
    oldprice?: number;
    quantity?: number;
    sells?: number;
    category?: string;
    mark?: string;
    images?: string[];
    blured_images?: string[];
    description?: string;
    features?: string[];
    colors?: string[];
    sizes?: string[];
    created_at?: string;
    user?: userDTOC;
    reviews?: ReviewDTOC[];
    reviewsavg?: object;
}
export declare class UserResponse {
    errors?: basicERR[];
    success?: Success;
    user?: userDTOC;
}
export declare class ProductResponse {
    errors?: basicERR[];
    success?: Success;
    product?: ProductDTOC;
}
export declare class OfferDTOC {
    id?: string;
    description?: string;
    category?: string;
    mark?: string;
    sells?: number;
    title?: string;
    features?: string[];
    images?: string[];
    blured_images?: string[];
    products_ids?: string[];
    price?: string;
    quantity?: number;
    original_price?: number;
    created_at?: string;
    reviews?: ReviewDTOC[];
    reviewsavg?: object;
    products?: ProductDTOC[];
}
export declare class Child {
    id?: string;
    color?: string[];
    size?: string[];
}
export declare class ChildDTOC {
    id?: string;
    prod?: ProductDTOC;
    color?: string[];
    size?: string[];
}
export declare class Promo {
    code?: string;
    images?: string[];
    price?: number;
    reduction?: number;
}
export declare class OfferResponse {
    errors?: basicERR[];
    success?: Success;
    offer?: OfferDTOC;
}
export declare class OffersResponse {
    errors?: basicERR[];
    more?: boolean;
    offers?: OfferDTOC[];
}
export declare class ProductsResponse {
    errors?: basicERR[];
    more?: boolean;
    products?: ProductDTOC[];
}
export declare class UsersResponse {
    errors?: basicERR[];
    more?: boolean;
    users?: userDTOC[];
}
export declare class P_Options {
    limit?: number;
    skip?: number;
    cursor?: string;
    sortBy?: string;
    marks?: string[];
    status?: string[];
    categories?: string[];
    max?: number;
    min?: number;
    search_words?: string;
    notID?: string;
    mine?: boolean;
    ids?: string[];
    userId?: string;
    ids2?: string[][];
    select?: string[];
}
export declare class ProductOrderC {
    product?: ProductDTOC;
    offer?: ProductDTOC;
    quantity_ordered?: number;
    color: string;
    size: string;
    children: ChildDTOC;
}
export declare class orderDTOC {
    user: userDTOC;
    total_price: number;
    products: ProductOrderC[];
    created_at: Date;
    status: string;
    failedReason: string;
    shipping: string;
    code: Promo;
    id: string;
}
export declare class OrdersResponse {
    errors?: basicERR[];
    more?: boolean;
    orders?: orderDTOC[];
}
export declare class OrderResponse {
    errors?: basicERR[];
    success?: Success;
    order?: orderDTOC;
}
export declare class DTOSimpleArg {
    name?: string;
    link?: string;
    price?: number;
    time?: number;
    code?: string;
    reduction?: number;
    images?: string[];
}
export declare class SimpleArg {
    name?: string;
    link?: string;
    images?: string[];
}
export declare class Shipping {
    name?: string;
    id?: string;
    price?: number;
    time?: number;
    images?: string[];
}
export declare class SimpleState {
    mark?: SimpleArg;
    event?: SimpleArg;
    category?: SimpleArg;
    shipping?: Shipping;
    promo?: Promo;
    currency?: string;
    success?: Success;
    errors?: basicERR[];
}
export declare class statsResponse {
    errors?: basicERR[];
    marks?: SimpleArg[];
    events?: SimpleArg[];
    categories?: SimpleArg[];
    shippings?: Shipping[];
    promos?: Promo[];
    max_price?: number;
    max_price_offer?: number;
    currency?: string;
}
export declare class statisticsResponse {
    errors?: basicERR[];
    statistics?: Statistic[];
}
export declare class Statistic {
    id?: String;
    month?: number;
    year?: number;
    day?: number;
    sells_quantity: number;
    sells_price: number;
    sells_data: {
        products: {
            id: string;
            price: number;
            time: number;
        }[];
    };
}
export declare class Review {
    rate: number;
    description: string;
    productId: string;
    isOffer: boolean;
}
export declare class ReviewDTOC {
    rate: number;
    description: string;
    id: string;
    productId: string;
    isOffer: boolean;
    created_at: string;
    user?: userDTOC;
}
export declare class ReviewResponse {
    review: ReviewDTOC;
    success?: Success;
    errors?: basicERR[];
}
export declare class ReviewsResponse {
    reviews?: ReviewDTOC[];
    errors?: basicERR[];
    more?: boolean;
}
export declare class Event {
    title?: string;
    description?: string;
    creator?: string;
    link?: string;
    images?: string[];
    blured_images?: string[];
}
export declare class EventDTOC {
    title?: string;
    creator?: string;
    images?: string[];
    blured_images?: string[];
    description?: string;
    link?: string;
    created_at?: string;
    id?: string;
}
export declare class EventResponse {
    event?: EventDTOC;
    success?: Success;
    errors?: basicERR[];
}
export declare class EventsResponse {
    events?: EventDTOC[];
    errors?: basicERR[];
}
export declare class SimpleResponse {
    errors?: basicERR[];
    success?: Success;
}
export declare class Offer {
    title?: string;
    description?: string;
    category?: string;
    mark?: string;
    features?: string[];
    price?: number;
    quantity?: number;
    original_price?: number;
    products_ids?: string[];
}

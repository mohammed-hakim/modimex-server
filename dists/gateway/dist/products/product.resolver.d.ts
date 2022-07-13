import { ReviewsDataLoader } from './../loaders/reviews.loader';
import { P_Options } from './../dtoc/types';
import { MyContext } from './../users/types';
import { ProductDTO, UserDTO } from '@commerce/shared';
import { CreateProduct, UpdateProduct } from './create-product.validation';
import { ProductService } from './product.service';
import { FileUpload } from 'graphql-upload';
import { UserDataLoader } from '../loaders/user.loader';
export declare class ProductResolver {
    private readonly productService;
    private readonly usersDataLoader;
    private readonly revsDataLoader;
    private client;
    constructor(productService: ProductService, usersDataLoader: UserDataLoader, revsDataLoader: ReviewsDataLoader);
    user(product: ProductDTO): Promise<UserDTO>;
    reviews(product: ProductDTO): Promise<UserDTO>;
    products(args: P_Options, { req: { session: { userId }, }, }: MyContext, info: any): Promise<any>;
    fetchProductsByIds({ ids, ids2, select }: P_Options, { req: { session: { userId }, }, }: MyContext, info: any): Promise<{
        products: any;
    }>;
    search(args: P_Options): Promise<unknown>;
    mine_products(args: P_Options, { req: { session: { userId }, }, }: MyContext): Promise<any[]>;
    showProduct(id: string, info: any): Promise<any>;
    createProduct({ req: { session: { userId }, }, }: MyContext, data: CreateProduct, token: String, IMG: FileUpload[]): Promise<any>;
    updateProduct(data: UpdateProduct, { req }: MyContext, id: string): Promise<any>;
    deleteProduct({ req: { session: { userId }, }, }: any, id: string): Promise<unknown>;
}

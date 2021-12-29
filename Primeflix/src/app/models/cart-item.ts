import { ProductDto } from '../web-api-client';
import { Product } from './product.model';

// cart items
export interface CartItem {
  product: ProductDto;
  quantity: number;
}

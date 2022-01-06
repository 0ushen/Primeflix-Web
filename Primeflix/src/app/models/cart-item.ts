import { ProductDto } from '../web-api-client';

// cart items
export interface CartItem {
  product: ProductDto;
  quantity: number;
}

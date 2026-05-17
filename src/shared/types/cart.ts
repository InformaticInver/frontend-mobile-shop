export interface AddToCartPayload {
  id: string;
  colorCode: number;
  storageCode: number;
}

export interface CartCountResponse {
  count: number;
}

export interface CartItem {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
  colorCode: number;
  colorName: string;
  storageCode: number;
  storageName: string;
}

export interface AddToCartInput extends AddToCartPayload {
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
  colorName: string;
  storageName: string;
}

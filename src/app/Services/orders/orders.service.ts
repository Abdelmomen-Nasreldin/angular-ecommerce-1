import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private _httpClient: HttpClient) {}

  setCheckoutSession(cartId: string) {
    const address = {
      shippingAddress: {
        '   ': 'details',
        phone: '01010700999',
        city: 'Cairo',
      },
    };
    return this._httpClient.post(
      `${environment.BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${environment.APP_HOST}`,
      address
    );
  }

  getAllOrders() {
    return this._httpClient.get(
      `${environment.BASE_URL}/api/v1/orders/user/` + '650dd24045ed4b248c17c533'
    );
  }
}

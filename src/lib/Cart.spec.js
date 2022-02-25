import Cart from './Cart';

describe('Cart', () => {
  let cart;
  let product;
  let product2;
  beforeEach(() => {
    cart = new Cart();
    product = {
      title: 'Adidas running shoed - male',
      price: 35388, //353.88 || R$ 353,88
    };
    product2 = {
      title: 'Adidas running shoed - female',
      price: 25388, //253.88 || R$ 253,88
    };
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created cart', () => {
      expect(cart.getTotal()).toBe(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2, //70776
      };

      cart.add(item);

      expect(cart.getTotal()).toEqual(70776);
    });

    it('should ensure no more than one product exists at a time', () => {
      cart.add({
        product,
        quantity: 2, //70776
      });

      cart.add({
        product,
        quantity: 1, //70776
      });

      expect(cart.getTotal()).toEqual(35388);
    });

    it('should update total when a product is included in cart and then removed', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);
      //96164

      expect(cart.getTotal()).toBe(25388);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });
      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });
      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal()).toBeGreaterThan(0);
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      cart.checkout();

      expect(cart.getTotal()).toEqual(0);
    });
  });
});

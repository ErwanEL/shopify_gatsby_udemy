import React from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { ProductQuantityAdderWrapper } from './styles';

export function ProductQuantityAdder({ variantId, available }) {
  const [quantity, setQuantity] = React.useState(1);

  const handleQuantityChange = e => {
    setQuantity(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <ProductQuantityAdderWrapper>
      <strong>Quantity</strong>
      <form onSubmit={handleSubmit}>
        <Input
          disabled={!available}
          type="number"
          min="1"
          step="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <Button type="submit" disabled={!available} fullWidth>
          Add to cart
        </Button>
      </form>
    </ProductQuantityAdderWrapper>
  );
}

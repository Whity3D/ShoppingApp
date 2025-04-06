import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Button, TextInput } from 'react-native-paper';
import { cartManagement } from '../../../features/cart-managment/model';
import { cartStore } from '../../cart/model';
import type { Product } from '../../../shared/types';

interface ProductItemProps {
  product: Product;
  showQuantityInput?: boolean;
}

export const ProductItem = observer(({ product, showQuantityInput }: ProductItemProps) => {
  const cartItem = cartStore.items.find((ci) => ci.product.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value) ?? 0;
    if (num > 0) {
      if (cartItem) {
        cartStore.updateQuantity(product.id, num);
      } else {
        cartManagement.addToCart(product, num);
      }
    } else {
      cartManagement.removeFromCart(product.id);
    }
  };

  const handlePlus = useCallback(() => cartManagement.addToCart(product), [product]);
  const handleMinus = useCallback(() => cartManagement.removeFromCart(product.id), [product]);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Text variant="titleMedium">
          {product.name} - {product.price}₽
        </Text>
        <Card.Actions style={styles.controls}>
          <Button mode="outlined" style={styles.button} onPress={handleMinus}>
            -
          </Button>
          {showQuantityInput ? (
            <TextInput
              mode="outlined"
              style={styles.input}
              value={quantity.toString()}
              onChangeText={handleQuantityChange}
              keyboardType="numeric"
              dense
            />
          ) : (
            <Text variant="bodyLarge" style={styles.quantity}>
              {cartItem?.quantity ?? 0}
            </Text>
          )}
          <Button mode="outlined" style={styles.button} onPress={handlePlus}>
            +
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  );
});

const styles = StyleSheet.create({
  button: {
    minWidth: 48,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  content: {
    paddingVertical: 8,
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    textAlign: 'center',
    width: 60,
  },
  quantity: {
    minWidth: 48,
    textAlign: 'center',
  },
});

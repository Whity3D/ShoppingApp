import { observer } from 'mobx-react-lite';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { cartStore } from '../../../entities/cart/model';
import { orderStore } from '../../../entities/order/model';
import { orderSummary } from '../model';

interface OrderSummaryProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const OrderSummaryWidget = observer(({ onConfirm, onCancel }: OrderSummaryProps) => {
  const handleSubmit = async () => {
    const result = await orderSummary.submitOrder();
    if (result.success) {
      Alert.alert('Order successfully submitted!');
      onConfirm();
      cartStore.resetItems();
      orderStore.resetOptions();
    } else {
      Alert.alert(`Error: ${result.error}`);
    }
  };

  return (
    <>
      <Text variant="headlineSmall" style={styles.title}>
        Order Summary:
      </Text>
      {cartStore.items.map((item) => (
        <Text variant="bodyMedium" style={styles.summary} key={item.product.id}>
          {item.product.name} x{item.quantity} - {item.product.price * item.quantity}₽
        </Text>
      ))}
      <Text variant="bodyMedium" style={styles.summary}>
        Options: {orderStore.options.map((o) => o.name).join(', ')}
      </Text>
      <Text variant="bodyMedium" style={styles.summary}>
        Total: {cartStore.totalAmount}₽
      </Text>
      <Button mode="contained" style={styles.button} onPress={handleSubmit}>
        Confirm
      </Button>
      <Button mode="outlined" style={styles.button} onPress={onCancel}>
        Cancel
      </Button>
    </>
  );
});

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
  },
  summary: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
});

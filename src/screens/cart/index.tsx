import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { cartStore } from '../../entities/cart/model';
import { orderStore } from '../../entities/order/model';
import { ProductItem } from '../../entities/product/ui/ProductItem';
import { orderOptionsManagement } from '../../features/order-options/model';
import { OrderSummaryWidget } from '../../widgets/order-summary/ui/OrderSummary';
import type { CartItem, RootStackParamsList } from '../../shared/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';

type CartScreenProps = NativeStackScreenProps<RootStackParamsList, 'Cart'>;

export const CartScreen: FC<CartScreenProps> = observer(() => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const renderRightActions = (productId: string) => (
    <Button
      mode="contained"
      buttonColor="red"
      style={styles.deleteButton}
      onPress={() => cartStore.removeItem(productId)}
    >
      Delete
    </Button>
  );

  const renderItem = ({ item }: { item: CartItem }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.product.id)}>
      <ProductItem product={item.product} />
    </Swipeable>
  );

  return (
    <>
      <FlatList
        data={cartStore.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.product.id}
        ListHeaderComponent={
          <Text variant="headlineSmall" style={styles.header}>
            Cart Total: {cartStore.totalAmount}₽
          </Text>
        }
        ListEmptyComponent={
          <Text variant="bodyLarge" style={styles.empty}>
            Cart is empty
          </Text>
        }
        ListFooterComponent={
          <>
            <Text variant="titleMedium" style={styles.optionsTitle}>
              Order options:
            </Text>
            <View style={styles.optionsGroup}>
              {orderOptionsManagement.availableOptions.map((option) => (
                <Button
                  mode={
                    orderStore.options.some((o) => o.id === option.id) ? 'contained' : 'outlined'
                  }
                  onPress={() => orderOptionsManagement.toggleOption(option)}
                  key={option.id}
                  style={{ flex: 1 }}
                >
                  {option.name}
                </Button>
              ))}
            </View>
            <Button
              mode="contained"
              style={styles.footerButton}
              onPress={() => setShowConfirmation(true)}
            >
              Place Order
            </Button>
          </>
        }
        contentContainerStyle={styles.container}
      />
      <Portal>
        <Modal
          visible={showConfirmation}
          contentContainerStyle={styles.modal}
          onDismiss={() => setShowConfirmation(false)}
        >
          <OrderSummaryWidget
            onConfirm={() => setShowConfirmation(false)}
            onCancel={() => setShowConfirmation(false)}
          />
        </Modal>
      </Portal>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    height: '100%',
    justifyContent: 'center',
    width: 80,
  },
  empty: {
    marginVertical: 20,
    textAlign: 'center',
  },
  footerButton: {
    marginVertical: 8,
  },
  header: {
    marginBottom: 16,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 20,
    padding: 20,
  },
  optionsGroup: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-evenly',
    marginBottom: 16,
    width: '100%',
  },
  optionsTitle: {
    marginVertical: 8,
  },
});

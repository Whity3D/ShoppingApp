import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { cartStore } from '../../entities/cart/model';
import { productStore } from '../../entities/product/model';
import { ProductItem } from '../../entities/product/ui/ProductItem';
import type { Product, RootStackParamsList } from '../../shared/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';

type CatalogScreenProps = NativeStackScreenProps<RootStackParamsList, 'Catalog'>;

export const CatalogScreen: FC<CatalogScreenProps> = observer(() => {
  const renderProduct = ({ item }: { item: Product }) => (
    <ProductItem product={item} showQuantityInput />
  );

  return (
    <FlatList
      data={productStore.products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text variant="headlineSmall" style={styles.header}>
          Cart Total: {cartStore.totalAmount}₽
        </Text>
      }
      contentContainerStyle={styles.container}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
});

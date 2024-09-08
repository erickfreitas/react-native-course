import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Função para buscar produtos (simulação)
  const fetchProducts = async (pageNumber) => {
    if (loading || !hasMore) return; // Evitar múltiplas requisições

    setLoading(true);
    try {
      // Simulação de chamada de API
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const newProducts = Array.from({ length: 10 }, (_, i) => ({
            id: (pageNumber - 1) * 10 + i + 1,
            name: `Produto ${(pageNumber - 1) * 10 + i + 1}`,
          }));
          resolve(newProducts);
        }, 1000)
      );

      if (response.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...response]);
        setPage(pageNumber);
      } else {
        setHasMore(false); // Não há mais produtos a serem carregados
      }
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, []);

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      fetchProducts(page + 1);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.1} // Dispara o carregamento quando 10% da lista restante for visível
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
  loadingFooter: {
    paddingVertical: 20,
  },
});

export default ProductList;

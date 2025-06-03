import Card from "@/components/Card";
import { Product } from "@/types/products";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FetchScreen() {
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>();

    const [searchDisabled, setSearchDisabled] = useState<boolean>(true);

    const fetchData = () => {
        setProducts(undefined);
        setFilteredProducts(undefined);

        setTimeout(async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();

                if (data.length) {
                    setProducts(data);
                    setFilteredProducts(data);
                }
            } catch (error) {}
        }, 2000);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Home</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={[
                        styles.searchInput,
                        searchDisabled && styles.searchInputDisabled,
                    ]}
                    placeholder="Cerca un prodotto..."
                    editable={!searchDisabled}
                    onChangeText={(text) =>
                        setFilteredProducts(
                            products?.filter(({ title }) =>
                                title.toLowerCase().includes(text.toLowerCase())
                            )
                        )
                    }
                />

                <Switch
                    value={!searchDisabled}
                    onValueChange={(value) => setSearchDisabled(!value)}
                />
            </View>

            {filteredProducts ? (
                filteredProducts.length ? (
                    <FlatList
                        data={filteredProducts}
                        style={styles.cardsContainer}
                        renderItem={({ item }) => (
                            <Card
                                product={item}
                                onPress={() =>
                                    router.navigate(`/product/?id=${item.id.toString()}`)
                                }
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        refreshControl={
                            <RefreshControl
                                onRefresh={() => fetchData()}
                                refreshing={false}
                            />
                        }
                    />
                ) : (
                    <Text style={styles.fetchMessages}>
                        {!products?.length
                            ? "No products"
                            : "No results found from search"}
                    </Text>
                )
            ) : (
                <ActivityIndicator />
            )}
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
    },

    cardsContainer: {
        paddingHorizontal: 16,
        paddingBottom: 48,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        paddingHorizontal: 16,
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        marginHorizontal: 16,
    },

    searchInput: {
        flex: 1,
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    },

    searchInputDisabled: {
        backgroundColor: "#dddddd",
        color: "#888",
    },

    fetchMessages: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 16,
        color: "#888",
    },

    button: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#007AFF",
    },
});

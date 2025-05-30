import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FetchScreen() {
    const [products, setProducts] = useState<[]>();

    const fetchData = () => {
        setProducts(undefined);

        setTimeout(async () => {
            console.log("Timeout finished, fetching data...");

            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();

                console.log("Fetched data:", data);

                setProducts(data);
            } catch (error) {}
        }, 2000);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Home</Text>

            <ScrollView
                style={{ paddingHorizontal: 16 }}
                refreshControl={
                    <RefreshControl onRefresh={() => fetchData()} refreshing={false} />
                }
            >
                <View style={styles.cardsContainer}>
                    {products ? (
                        products.length ? (
                            products.map((product, index) => (
                                <Card key={index} product={product} />
                            ))
                        ) : (
                            <Text style={styles.fetchMessages}>No products</Text>
                        )
                    ) : (
                        <Text style={styles.fetchMessages}>Loading...</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    cardsContainer: {
        flex: 1,
        paddingBottom: 48,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 16,
        paddingHorizontal: 16,
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

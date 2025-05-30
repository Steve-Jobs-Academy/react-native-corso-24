import { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

const Card = ({ product }: { product: Product }) =>
    useMemo(() => {
        if (!product) return null;

        return (
            <TouchableOpacity style={styles.card}>
                <View style={styles.row}>
                    <Image source={{ uri: product.image }} style={styles.image} />
                    <View style={styles.content}>
                        <Text style={styles.title}>{product.title}</Text>
                        <Text style={styles.description}>{product.description}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => console.log("Card pressed")}
                        >
                            <Text style={styles.buttonText}>Aggiungi al carrello</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, [product]);

export default Card;

export const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#ddd",
        marginBottom: 16,
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 16,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    button: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#007AFF",
        alignItems: "center",
        alignSelf: "flex-start",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

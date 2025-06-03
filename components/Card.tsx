import { Product } from "@/types/products";
import { useMemo, useState } from "react";
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

const Card = ({ product, onPress }: { product: Product; onPress: () => void }) => {
    if (!product) return null;

    const [switchState, setSwitchState] = useState<boolean>(false);

    return useMemo(() => {
        return (
            <TouchableOpacity style={styles.card} onPress={onPress}>
                <View style={styles.row}>
                    <Image source={{ uri: product.image }} style={styles.image} />
                    <View style={styles.content}>
                        <Text style={styles.title}>{product.title}</Text>
                        <Text style={styles.description}>{product.description}</Text>

                        <Switch
                            trackColor={{ false: "#3e3e3e", true: "#007AFF" }}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setSwitchState(!switchState)}
                            value={switchState}
                        />

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
    }, [product, switchState]);
};

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
        gap: 8,
        flex: 1,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
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

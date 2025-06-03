import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { ThemedText } from "../components/ThemedText";

const Product = () => {
    const { id } = useLocalSearchParams();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
                Dettaglio Prodotto
            </ThemedText>
            <ThemedText style={{ marginTop: 16 }}>ID: {id}</ThemedText>
        </View>
    );
};

export default Product;

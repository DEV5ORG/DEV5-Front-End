import { ThemedText } from "@/components/themed-text";
import { useStores } from "@/context/root-store-provider";
import { TouchableOpacity, View } from "react-native";

const Profile = () => {
  const { authStore } = useStores();

  const onLogOut = () => {
    authStore.signOut();
  };

  return (
    <View>
      <ThemedText type="title">Esta pantalla va a mostrar mi perfil</ThemedText>
      <TouchableOpacity onPress={onLogOut}>
        <ThemedText>Cerrar sesión</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

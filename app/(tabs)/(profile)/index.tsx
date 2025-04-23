import { Colors } from "@/constants/Colors";
import { useStores } from "@/context/root-store-provider";
import { getEventsCountByUser } from "@/services/events.service";
import { MaterialIcons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Profile = observer(() => {
  const { authStore } = useStores();
  const [eventsCount, setEventsCount] = useState(0);
  const { user } = authStore;

  useEffect(() => {
    const fetchProfileInfo = async () => {
      if (user?.id) {
        try {
          const count = await getEventsCountByUser(user?.id);
          setEventsCount(count);
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          }
        }
      }
    };

    fetchProfileInfo();
  }, [user?.id]);

  const onLogOut = () => {
    authStore.signOut();
  };

  const firstLetter = user?.name?.[0]?.toUpperCase() ?? "?";

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {/* Avatar con inicial, no incluimos imagen de perfil en el scope */}
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={72} color="#fff" />
        </View>
        <Text style={styles.mainText}>{user?.name}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{eventsCount}</Text>
            </View>
            <Text style={styles.statLabel}>{"Eventos\nActivos"}</Text>
          </View>
        </View>

        <Pressable onPress={onLogOut} style={styles.logoutBtn}>
          <Text style={styles.mainText}>Cerrar sesión</Text>
          <MaterialIcons name="arrow-forward" size={24} />
        </Pressable>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 20,
  },
  cardContainer: {
    backgroundColor: "#E1E1E1",
    paddingVertical: 40,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#6399B6",
    width: 150,
    height: 150,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginVertical: 30,
    gap: 25,
  },
  statItem: {
    alignItems: "center",
  },
  statBox: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderRadius: 8,
    elevation: 2,
    minWidth: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray4,
    marginTop: 6,
    textAlign: "center",
  },
});

export default Profile;

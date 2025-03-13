import React from "react";
import { observer } from "mobx-react-lite";
import { View, Text, StyleSheet, PanResponder, Animated } from "react-native";
import { useStores } from "@/context/root-store-provider";
import { Colors } from "@/constants/Colors";

const Toast = observer(() => {
  const { toastStore } = useStores();
  const { toasts } = toastStore;

  const handleSwipe = (id: number) => {
    toastStore.removeToast(id);
  };

  return (
    <View style={styles.container}>
      {toasts.map((toast) => {
        const toastAnim = new Animated.Value(0);

        const animateToastSwipe = (dx: number) => {
          if (Math.abs(dx) > 150) {
            Animated.timing(toastAnim, {
              toValue: dx > 0 ? 500 : -500,
              duration: 200,
              useNativeDriver: true,
            }).start(() => handleSwipe(toast.id));
          } else {
            Animated.spring(toastAnim, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        };

        const panResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: (_, gestureState) =>
            Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
          onPanResponderMove: (_, gestureState) => {
            toastAnim.setValue(gestureState.dx);
          },
          onPanResponderRelease: (_, gestureState) => {
            animateToastSwipe(gestureState.dx);
          },
        });

        return (
          <Animated.View
            key={toast.id}
            style={[
              styles.toast,
              styles[toast.severity],
              { transform: [{ translateX: toastAnim }] },
            ]}
            {...panResponder.panHandlers}
          >
            <Text style={styles.text}>{toast.message}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  toast: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: Colors.gray2,
  },
  text: {
    color: Colors.white,
    fontWeight: "bold",
  },
  success: {
    backgroundColor: Colors.green,
  },
  error: {
    backgroundColor: Colors.red,
  },
  warning: {
    backgroundColor: Colors.yellow,
  },
  info: {
    backgroundColor: Colors.blue,
  },
});

export default Toast;

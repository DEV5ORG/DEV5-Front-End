import CustomButton from "@/components/custom-button";
import CustomTextInput from "@/components/custom-text-input";
import Logo from "@/components/logo";
import { Colors } from "@/constants/Colors";
import { useStores } from "@/context/root-store-provider";
import useForm from "@/hooks/use-form";
import { requestPasswordRecovery } from "@/services/auth.service";
import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const RequestPasswordReset = () => {
  const router = useRouter();
  const { toastStore, authStore } = useStores();

  const { formValues, setFieldValue, isLoading, errors, handleSubmit } =
    useForm({
      defaultValues: {
        email: "",
      },
      preventMultipleSubmissions: true,
      validationSchema: {
        email: {
          required: {
            value: true,
            message: "El correo es obligatorio.",
          },
          isEmail: { value: true, message: "Debe ser un correo válido." },
        },
      },
    });

  const onRequestResetSubmit = async (formData: typeof formValues) => {
    const { email } = formData;
    try {
      await requestPasswordRecovery(email);
      authStore.setPasswordResetDataFlow({ email });
      router.push("/(public)/code-verification");
    } catch (error) {
      if (error instanceof Error) {
        toastStore.addToast(error.message, "error", 2000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Logo size={120} style={styles.logo} />
      <CustomTextInput
        label="Correo"
        placeholder="Correo electrónico"
        value={formValues.email}
        onChangeText={(text) => setFieldValue("email", text)}
        containerStyle={styles.inputSpacing}
        error={errors.email}
      />
      <CustomButton
        title="Recuperar"
        loading={isLoading}
        loadingText="Recuperando..."
        onPress={() => handleSubmit(onRequestResetSubmit)}
        backgroundColor={Colors.turquoise}
        hasBorder={false}
        style={styles.buttonSpacing}
      />
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.goBackTextBtn}>Atrás</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    paddingHorizontal: 40,
  },
  logo: {
    marginBottom: 30,
  },
  goBackTextBtn: {
    fontSize: 16,
    padding: 15,
    color: Colors.tint,
  },
  inputSpacing: {
    marginBottom: 16.5,
  },
  buttonSpacing: {
    marginVertical: 11.5,
  },
});

export default RequestPasswordReset;

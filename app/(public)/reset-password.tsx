import CustomButton from "@/components/custom-button";
import CustomTextInput from "@/components/custom-text-input";
import Logo from "@/components/logo";
import { Colors } from "@/constants/Colors";
import { useStores } from "@/context/root-store-provider";
import useForm from "@/hooks/use-form";
import { resetPassword } from "@/services/auth.service";
import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";

const ResetPassword = () => {
  const router = useRouter();
  const { authStore, toastStore } = useStores();

  const { formValues, setFieldValue, isLoading, errors, handleSubmit } =
    useForm({
      defaultValues: {
        password: "",
        confirmPassword: "",
      },
      preventMultipleSubmissions: true,
      validationSchema: {
        password: {
          required: {
            value: true,
            message: "El correo es obligatorio.",
          },
          isSecurePassword: true,
        },
        confirmPassword: {
          required: {
            value: true,
            message: "Debes confirmar tu contraseña.",
          },
          test: {
            value: (value, formValues) => value === formValues.password,
            message: "Las contraseñas no coinciden.",
          },
        },
      },
    });

  const onPasswordResetSubmit = async (formData: typeof formValues) => {
    const { password } = formData;
    const { email, recoveryToken } = authStore.passwordResetDataFlow;
    try {
      await resetPassword(recoveryToken, email, password);
      authStore.resetPasswordResetDataFlow();
      toastStore.addToast("Contraseña actualizada", "success", 2000);
      router.replace("/(public)/login");
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
        label="Nueva Contraseña"
        placeholder="**********"
        value={formValues.password}
        secureTextEntry
        onChangeText={(text) => setFieldValue("password", text)}
        containerStyle={styles.inputSpacing}
        error={errors.password}
      />
      <CustomTextInput
        label="Confirmar Nueva Contraseña"
        placeholder="**********"
        value={formValues.confirmPassword}
        secureTextEntry
        onChangeText={(text) => setFieldValue("confirmPassword", text)}
        containerStyle={styles.inputSpacing}
        error={errors.confirmPassword}
      />
      <CustomButton
        title="Continuar"
        loading={isLoading}
        loadingText="Actualizando..."
        onPress={() => handleSubmit(onPasswordResetSubmit)}
        backgroundColor={Colors.blueButton}
        hasBorder={true}
        style={styles.buttonSpacing}
      />
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
  inputSpacing: {
    marginBottom: 16.5,
  },
  buttonSpacing: {
    marginVertical: 11.5,
  },
});

export default ResetPassword;

import CustomButton from "@/components/custom-button";
import CustomTextInput from "@/components/custom-text-input";
import Logo from "@/components/logo";
import { Colors } from "@/constants/Colors";
import { useStores } from "@/context/root-store-provider";
import useForm from "@/hooks/use-form";
import { validateRecoveryToken } from "@/services/auth.service";
import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const CodeVerification = () => {
  const router = useRouter();
  const { authStore, toastStore } = useStores();

  const { formValues, setFieldValue, isLoading, errors, handleSubmit } =
    useForm({
      defaultValues: {
        verificationCode: "",
      },
      preventMultipleSubmissions: true,
      validationSchema: {
        verificationCode: {
          required: {
            value: true,
            message: "El código de verificación es obligatorio.",
          },
        },
      },
    });

  const onVerifyCodeSubmit = async (formData: typeof formValues) => {
    const { verificationCode } = formData;
    try {
      await validateRecoveryToken(verificationCode);
      authStore.setPasswordResetDataFlow({ recoveryToken: verificationCode });
      router.push("/(public)/reset-password");
    } catch (error) {
      if (error instanceof Error) {
        toastStore.addToast(error.message, "error", 2000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Logo size={120} style={styles.logo} />
      <Text style={styles.text}>
        Por favor, ingrese el código enviado a su correo electrónico.
      </Text>
      <CustomTextInput
        placeholder="Código de verificación"
        value={formValues.verificationCode}
        keyBoardType="numeric"
        onChangeText={(text) => setFieldValue("verificationCode", text)}
        containerStyle={styles.inputSpacing}
        error={errors.verificationCode}
      />
      <CustomButton
        title="Verificar"
        loading={isLoading}
        loadingText="Verificando..."
        onPress={() => handleSubmit(onVerifyCodeSubmit)}
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
  text: {
    width: "100%",
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
    marginVertical: 20,
  },
  buttonSpacing: {
    marginVertical: 11.5,
  },
});

export default CodeVerification;

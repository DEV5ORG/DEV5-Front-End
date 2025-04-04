import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/custom-button";
import CustomTextInput from "@/components/custom-text-input";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { signIn } from "@/services/auth.service";
import { useRouter } from "expo-router";
import { useStores } from "@/context/root-store-provider";
import { observer } from "mobx-react-lite";
import useForm from "@/hooks/use-form";
import Logo from "@/components/logo";

const Login = observer(() => {
  const { authStore, toastStore } = useStores();
  const router = useRouter();

  const { formValues, setFieldValue, isLoading, errors, handleSubmit } =
    useForm({
      defaultValues: {
        email: "",
        password: "",
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
        password: {
          required: {
            value: true,
            message: "La contraseña es obligatoria.",
          },
        },
      },
    });

  const onLoginSubmit = async (formData: typeof formValues) => {
    try {
      const { email, password } = formData;
      const { token } = await signIn(email, password);
      await authStore.storeSignInData(token);
      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        toastStore.addToast(error.message, "error", 2000);
      } else {
        toastStore.addToast("Ocurrió un error desconocido.", "error", 2000);
      }
    }
  };

  const handleOnRegister = () => {
    router.push("/(public)/register");
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
      <CustomTextInput
        label="Contraseña"
        placeholder="**********"
        secureTextEntry
        value={formValues.password}
        onChangeText={(text) => setFieldValue("password", text)}
        containerStyle={styles.inputSpacing}
        error={errors.password}
      />
      <CustomButton
        title={"Inicio"}
        loading={isLoading}
        loadingText="Iniciando..."
        onPress={() => handleSubmit(onLoginSubmit)}
        backgroundColor={Colors.blueButton}
        style={styles.buttonSpacing}
      />
      <CustomButton
        title="Registro"
        onPress={handleOnRegister}
        backgroundColor={Colors.turquoise}
        hasBorder={false}
        style={styles.buttonSpacing}
      />

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.resetText}>Recuperar contraseña</Text>
      </TouchableOpacity>
    </View>
  );
});

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
  resetText: {
    marginTop: 15,
    fontSize: 14,
    color: Colors.tint,
  },
  inputSpacing: {
    marginBottom: 16.5,
  },
  buttonSpacing: {
    marginVertical: 11.5,
  },
});

export default Login;

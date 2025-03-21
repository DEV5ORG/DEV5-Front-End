import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import CustomButton from "@/components/custom-button";
import CustomTextInput from "@/components/custom-text-input";
import Logo from "@/components/logo";
import ToggleButtonGroup from "@/components/toggle-button-group";
import { Colors } from "@/constants/Colors";
import useForm from "@/hooks/use-form";
import { UserRole } from "@/interfaces/user.interface";
import { useRouter } from "expo-router";
import { signUp } from "@/services/auth.service";
import { useStores } from "@/context/root-store-provider";
import { observer } from "mobx-react-lite";

const roleOptions = [
  { label: "Proveedor", value: UserRole.PROVIDER },
  { label: "Organizador", value: UserRole.USER },
];

const Register = observer(() => {
  const router = useRouter();
  const { toastStore, authStore } = useStores();
  const { formValues, errors, isLoading, setFieldValue, handleSubmit } =
    useForm({
      defaultValues: {
        name: "",
        email: "",
        password: "",
        role: UserRole.USER,
      },
      preventMultipleSubmissions: true,
      validationSchema: {
        name: {
          required: {
            value: true,
            message: (formValues) =>
              formValues.role === UserRole.PROVIDER
                ? "El nombre de la empresa es obligatorio."
                : "El nombre es obligatorio.",
          },
        },
        email: {
          required: {
            value: true,
            message: "El correo es obligatorio.",
          },
          isEmail: {
            value: true,
            message: "Debe ser un correo válido.",
          },
        },
        password: {
          isSecurePassword: true,
        },
      },
    });

  const handleOnBackToLogin = () => {
    router.replace("/(public)/login");
  };

  const onRegisterSubmit = async (formData: typeof formValues) => {
    try {
      const { token } = await signUp(formData);
      await authStore.storeSignInData(token);
      router.replace("/");
      toastStore.addToast(`Bienvenido, ${authStore.user?.name}!`);
    } catch (error) {
      if (error instanceof Error) {
        toastStore.addToast(error.message, "error", 2000);
      }
    }
  };

  const isProviderRoleSelected = formValues.role === UserRole.PROVIDER;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Logo size={120} />
        <ToggleButtonGroup
          options={roleOptions}
          selectedValue={formValues.role}
          containerStyles={styles.roleToggle}
          onSelect={(value) => setFieldValue("role", value)}
        />
        <CustomTextInput
          label={isProviderRoleSelected ? "Nombre Empresa" : "Nombre"}
          placeholder={isProviderRoleSelected ? "Nombre empresa" : "Nombre"}
          value={formValues.name}
          onChangeText={(text) => setFieldValue("name", text)}
          containerStyle={styles.inputSpacing}
          error={errors.name}
        />
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
          title={"Registrar"}
          loading={isLoading}
          loadingText="Registrando..."
          onPress={() => handleSubmit(onRegisterSubmit)}
          backgroundColor={Colors.blueButton}
          style={styles.buttonSpacing}
        />
        <TouchableOpacity onPress={handleOnBackToLogin}>
          <Text style={styles.backToLoginText}>
            ¿Ya tiene cuenta? Ingrese aquí!
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  roleToggle: {
    marginVertical: 30,
    maxWidth: 300,
  },
  inputSpacing: {
    marginBottom: 16.5,
  },
  buttonSpacing: {
    marginTop: 25,
  },
  backToLoginText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.tint,
    padding: 10,
  },
});

export default Register;

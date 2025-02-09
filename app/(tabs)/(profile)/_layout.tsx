import HeaderLeftIcon from "@/components/navigation/header-left-icon";
import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => <HeaderLeftIcon />,
        headerTitle: "",
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default ProfileLayout;

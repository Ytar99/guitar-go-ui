import React from "react";
import { useForm } from "react-hook-form";
import { TextInput, PasswordInput, Button, Box } from "@mantine/core";
import { useUnit } from "effector-react";
import { authModel } from "../model/store";

type FormValues = { email: string; password: string };

export const LoginForm: React.FC = () => {
  const { loginFx } = authModel;
  const { handleSubmit, register } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (vals) => {
    try {
      await loginFx(vals);
    } catch (e) {
      // show error (toast)
      console.error(e);
    }
  });

  return (
    <Box style={{ maxWidth: 420, marginInline: "auto" }}>
      <form onSubmit={onSubmit}>
        <TextInput label="Email" {...register("email", { required: true })} />
        <PasswordInput label="Password" mt="md" {...register("password", { required: true })} />
        <Button type="submit" fullWidth mt="lg">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;

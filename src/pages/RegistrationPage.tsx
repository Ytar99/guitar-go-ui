import React from "react";
import { useForm } from "react-hook-form";
import { TextInput, PasswordInput, Button, Box } from "@mantine/core";
import { registerFx } from "../features/auth/model/effects";

const RegistrationPage: React.FC = () => {
  const { register, handleSubmit } = useForm<{ email: string; password: string; name?: string }>();
  const onSubmit = handleSubmit((vals) => registerFx(vals));
  return (
    <Box style={{ maxWidth: 420, marginInline: "auto", padding: 24 }}>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <TextInput label="Name" {...register("name")} />
        <TextInput label="Email" {...register("email", { required: true })} />
        <PasswordInput label="Password" {...register("password", { required: true })} />
        <Button type="submit" mt="md" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegistrationPage;

import { TypeOf, object, string } from "zod";

export const registerSchemaLoginForm = object({
  email: string()
    .nonempty("email must is provided")
    .email("This is not a valid email"),
  passWord: string().nonempty("password must is provided"),
});

export type IregisterInputLoginForm = TypeOf<typeof registerSchemaLoginForm>;

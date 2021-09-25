import React, { useState } from "react";
import router, { useRouter } from "next/router";
import Input from "../components/Input";
import Field from "../components/Field";
import Page from "../components/Page";
import Button from "../components/Button";
import { useSignIn } from "../hooks/user";

function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInError, signInLoading, signIn } = useSignIn();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = await signIn(email, password);
    if (valid) {
      router.push("/");
    }
  };

  return (
    <Page title="Sign in">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Field>
        {signInError && <p className="text-red-700">Invalid credentials</p>}
        {signInLoading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign in</Button>
        )}
      </form>
    </Page>
  );
}

export default SignInPage;

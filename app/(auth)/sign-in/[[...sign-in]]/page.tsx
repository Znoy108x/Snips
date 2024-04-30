import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return <SignIn afterSignInUrl={"/code-snippets"} afterSignUpUrl={"/code-snippets"} />;
}
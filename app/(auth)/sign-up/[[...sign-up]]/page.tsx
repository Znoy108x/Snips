import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return <SignUp afterSignInUrl={"/code-snippets"} afterSignUpUrl={"/code-snippets"} />;
}
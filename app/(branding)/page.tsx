import { auth } from "@clerk/nextjs";
import HeroInfo from "./_component/HeroInfo";

const BrandingPage = () => {

    const { userId } = auth()

    return (
        <HeroInfo userId={userId} />
    );
}

export default BrandingPage
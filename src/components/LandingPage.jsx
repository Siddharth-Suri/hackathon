import { useRecoilValue } from "recoil";
import { colourTheme } from "../cart/Theme";
import { CardComponent } from "./CardComponent";
export const LandingPage = () => {
    const currentTheme = useRecoilValue(colourTheme);
    return (
        <div
            className={`w-full h-dvh flex p-3 font-mono justify-between items-center text-xl gap-2 font-semibold ${
                currentTheme === "dark"
                    ? "bg-black  text-white"
                    : "bg-amber-50 text-black"
            }`}
        >
            <div>
                <CardComponent></CardComponent>
            </div>
        </div>
    );
};

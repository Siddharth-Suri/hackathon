import { memo } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { colourTheme } from "../cart/Theme";
import { useNavigate } from "react-router";
export const TopBar = memo(() => {
    const [currentTheme, setCurrentTheme] = useRecoilState(colourTheme);
    const navigate = useNavigate();
    return (
        <div>
            <div
                className={`w-full flex p-3 font-mono justify-between items-center text-xl gap-2 font-semibold ${
                    currentTheme === "dark"
                        ? "bg-black  text-white"
                        : "bg-amber-50 text-black"
                }`}
            >
                <div className="flex gap-5 p-2 ">
                    <div
                        className="pl-4 pr-4 p-2 cursor-pointer hover:text-yellow-400 hover:underline"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Home
                    </div>
                    <div
                        onClick={() => {
                            navigate("/workout");
                        }}
                        className="p-2 pl-4 pr-4 cursor-pointer hover:text-yellow-400 hover:underline"
                    >
                        Workout
                    </div>
                    <div
                        onClick={() => {
                            navigate("/meals");
                        }}
                        className="p-2 pl-4 pr-4 cursor-pointer hover:text-yellow-400 hover:underline"
                    >
                        Diet
                    </div>

                    <div
                        className="p-2 pl-4 pr-4 cursor-pointer hover:text-yellow-400 hover:underline"
                        onClick={() => {
                            navigate("/pose");
                        }}
                    >
                        Pose
                    </div>
                </div>
                <div className="flex gap-4">
                    <div
                        className="p-4 hover:text-yellow-400 cursor-pointer"
                        onClick={() => {
                            setCurrentTheme((prevTheme) =>
                                prevTheme === "dark" ? "light" : "dark"
                            );
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                        >
                            <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                            <path
                                fillRule="evenodd"
                                d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="hover:underline cursor-pointer p-4 mr-10 hover:text-sky-300">
                        Hello User
                    </div>
                </div>
            </div>
        </div>
    );
});

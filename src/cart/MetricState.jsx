import { atom } from "recoil";

export const metricState = atom({
    key: "metricState",
    default: [
        { id: 1, metric: "Steps", value: 7500, unit: "steps" },
        { id: 2, metric: "Calories", value: 520, unit: "kcal" },
        { id: 3, metric: "Heart Rate", value: 72, unit: "bpm" },
    ],
});

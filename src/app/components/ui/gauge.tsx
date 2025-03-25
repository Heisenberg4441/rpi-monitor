"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
    value: number;
    label: string;
    color?: string;
};

export default function Speedometer({ value, label, color = "#3b82f6" }: Props) {
    return (
        <div className="flex flex-col items-center ml-4 mr-4">
            <div className="w-[128px] h-[128px]">
                <CircularProgressbar
                    value={value}
                    text={`${value}%`}
                    styles={buildStyles({
                        pathColor: color,
                        textColor: "#ffffff",
                        trailColor: "#374151",
                        textSize: "16px",
                    })}
                />
            </div>
            <p className="mt-2 text-lg text-white">{label}</p>
        </div>
    );
}

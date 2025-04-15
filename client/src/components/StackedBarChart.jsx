import { useState } from "react"

function StackedBarChart({ segments, borderRadius = 8 }) {
    const total = segments.reduce((sum, seg) => sum + seg.value, 0);

    return (
      <div
        className="w-full flex overflow-hidden text-white"
        style={{
          borderRadius,
          boxShadow: "inset 0 0 0 1px #ccc",
        }}
      >
        {segments.map((seg, idx) => {
          const widthPercent = (seg.value / total) * 100;
  
          return (
            <div
              key={idx}
              className={`flex items-center justify-center text-xs py-[0.15rem] ${seg.color}`}
              style={{
                width: `${widthPercent}%`,
                // backgroundColor: seg.color,
                whiteSpace: "nowrap",
              }}
            >
              {seg.label}
            </div>
          );
        })}
      </div>
    );
  };

export default StackedBarChart
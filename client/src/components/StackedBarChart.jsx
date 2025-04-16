function StackedBarChart({ segments, borderRadius = 8 }) {
    const total = segments.reduce((sum, seg) => sum + seg.value, 0);

    const sortedSegments = [...segments].sort((a, b) => {
      if (a.label === "1€") return -1;
      if (b.label === "1€") return 1;
      if (a.label > 0 && b.label <= 0) return -1;
      if (a.label <= 0 && b.label > 0) return 1;
      return 0;
    });

    return (
      <div
        className="w-full flex overflow-hidden"
        style={{
          borderRadius,
          boxShadow: "inset 0 0 0 1px #ccc",
        }}
      >
        {sortedSegments.map((seg, idx) => {
          const widthPercent = (seg.value / total) * 100;
  
          return (
            <div
              key={idx}
              className={`flex items-center justify-center text-xs py-[0.15rem] ${seg.textColorBar}`}
              style={{
                width: `${widthPercent}%`,
                backgroundColor: seg.color,
                opacity: seg.opacity,
                whiteSpace: "nowrap",
              }}
            >
              {seg.label.toFixed(2)}
            </div>
          );
        })}
      </div>
    );
  };

export default StackedBarChart
function StackedBarChart({ segments }) {
    const total = segments.reduce((sum, seg) => sum + seg.value, 0);

    const sortedSegments = [...segments].sort((a, b) => {
      if (a.label === "1€") return -1;
      if (b.label === "1€") return 1;
      if (a.label > 0 && b.label <= 0) return -1;
      if (a.label <= 0 && b.label > 0) return 1;
      return 0;
    });

    return (
      <div className="w-full flex overflow-hidden rounded-md">
        {sortedSegments.map((seg, idx) => {
          const widthPercent = (seg.value / total) * 100;
  
          return (
            <div key={idx} className={`flex items-center justify-center border-y text-xs py-[0.15rem] ${idx === sortedSegments.length-1 ? "border-r" : ""} ${seg.textColorBar}`}
              style={{ width: `${widthPercent}%`, backgroundColor: seg.color, opacity: seg.opacity, whiteSpace: "nowrap" }}>
              {seg.label != 1 ? seg.label.toFixed(2) : seg.label}
            </div>
          );
        })}
      </div>
    );
  };

export default StackedBarChart
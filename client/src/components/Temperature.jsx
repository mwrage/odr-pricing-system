
function Temperature({ temp, threshold })  {
    const max = 30;
    const thresholdPercent = (threshold / max) * 100;
    const valuePercent = temp < 0 ? 0 : (temp / max) * 100;
  
    const gradient = `linear-gradient(
      to right,
      #ef4444 0%,
      #ef4444 ${thresholdPercent}%,
      #fbbf24 ${thresholdPercent}%,
      #22c55e 100%
    )`;
  
    return (
      <div className="relative w-1/2">
        <div className="absolute w-full h-3 rounded" style={{ background: gradient }} />
        <div style={{ left: `${valuePercent}%` }} className="absolute top-0 h-3">
          <div className="absolute -top-1 h-5 w-0.5 bg-zinc-800" />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-zinc-800"></div>
        </div>
        <div style={{ left: `${thresholdPercent}%` }} className="absolute top-0 h-3">
          <div className="absolute -top-1 h-5 w-0.5 bg-red-500" />
          <div className="absolute -bottom-6 -translate-by-1/2 text-xs text-red-500">{threshold}°C</div>
        </div>
      </div>
    );
  };
export default Temperature;
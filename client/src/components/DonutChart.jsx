import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const DonutChart = ({ data, width = 300, height = 300 }) => {
    const ref = useRef();
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const arc = d3.arc().innerRadius(radius - 50).outerRadius(radius);  
    const pie = d3.pie().value(d => d.value);
    const pieChart = pie(data)
    const outerLabelArc = d3.arc().innerRadius(radius).outerRadius(radius + 10);
  
    useEffect(() => {
    let svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .classed('mx-auto', true)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcs = svg.selectAll('arc')
      .data(pieChart)
      .enter()
      .append('path')
      .attr('d', arc)
      .style('fill', d => d.data.color)
      .style('fill-opacity', d => d.data.opacity ?? 1)
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

  }, [data, width, height]);

  const total = "6.40€"
  const max = "8.20€"

  return (
    <div className="relative w-1/2 aspect-square">
      <svg
        ref={ref}
        viewBox="0 0 300 300"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      ></svg>
      <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
        <div className='-space-y-1'>
          <p className="text-xl font-bold inter-800">{total}</p>
          <p className="text-xs inter-300 text-zinc-600">statt {max}</p>
        </div>
      </div>

      {pieChart.map((d, i) => {
        const arc = d3.arc().innerRadius(100).outerRadius(150);
        const [x, y] = arc.centroid(d);
        return (
          <div
            key={i}
            className="absolute text-xs inter-400 text-center pointer-events-none"
            style={{
              left: `calc(50% + ${x * 0.85}px)`,
              top: `calc(50% + ${y * 0.76}px)`,
              transform: 'translate(-50%, -50%)',
              color: d.data.color,
            }}
          >
            <p>{d.data.label}</p>
            <p>{d.data.factor}</p>
          </div>
        );
      })} 

    </div>
  );
};

export default DonutChart;
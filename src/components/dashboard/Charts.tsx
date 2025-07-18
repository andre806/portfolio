/**
 * Componentes de gráficos para o dashboard
 */

'use client';

import { useMemo } from 'react';

interface ChartDataItem {
    value?: number;
    views?: number;
    sessions?: number;
    count?: number;
    visitors?: number;
    percentage?: number;
    name?: string;
    label?: string;
    source?: string;
    color?: string;
}

interface ChartProps {
    data: ChartDataItem[];
    width?: number;
    height?: number;
    className?: string;
}

// Componente de gráfico de linha simples
export function LineChart({ data, width = 400, height = 200, className = '' }: ChartProps) {
    const { pathData, maxValue, minValue } = useMemo(() => {
        if (!data || data.length === 0) return { pathData: '', maxValue: 0, minValue: 0 };

        const values = data.map(d => d.value || d.views || d.sessions || 0);
        const maxVal = Math.max(...values);
        const minVal = Math.min(...values);

        const padding = 20;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;

        const points = values.map((value, index) => {
            const x = padding + (index / (values.length - 1)) * chartWidth;
            const y = padding + chartHeight - ((value - minVal) / (maxVal - minVal || 1)) * chartHeight;
            return `${x},${y}`;
        });

        const pathData = `M ${points.join(' L ')}`;

        return { pathData, maxValue: maxVal, minValue: minVal };
    }, [data, width, height]);

    if (!data || data.length === 0) {
        return (
            <div className={`flex items-center justify-center bg-gray-50 rounded-lg ${className}`}
                style={{ width, height }}>
                <p className="text-gray-500 text-sm">Sem dados para exibir</p>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
            <svg width={width} height={height} className="overflow-visible">
                {/* Grid lines */}
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width={width} height={height} fill="url(#grid)" />

                {/* Chart area */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Data points */}
                {data.map((_, index) => {
                    const x = 20 + (index / (data.length - 1)) * (width - 40);
                    const value = data[index].value || data[index].views || data[index].sessions || 0;
                    const y = 20 + (height - 40) - ((value - minValue) / (maxValue - minValue || 1)) * (height - 40);

                    return (
                        <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#3B82F6"
                            stroke="white"
                            strokeWidth="2"
                            className="hover:r-6 transition-all duration-200"
                        />
                    );
                })}

                {/* Y-axis labels */}
                <text x="10" y="25" className="text-xs fill-gray-500" textAnchor="end">
                    {maxValue}
                </text>
                <text x="10" y={height - 15} className="text-xs fill-gray-500" textAnchor="end">
                    {minValue}
                </text>
            </svg>
        </div>
    );
}

// Componente de gráfico de barras
export function BarChart({ data, width = 400, height = 200, className = '' }: ChartProps) {
    const { bars, maxValue } = useMemo(() => {
        if (!data || data.length === 0) return { bars: [], maxValue: 0 };

        const values = data.map(d => d.value || d.count || d.visitors || 0);
        const maxVal = Math.max(...values);

        const padding = 20;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        const barWidth = chartWidth / data.length * 0.8;
        const barSpacing = chartWidth / data.length * 0.2;

        const bars = data.map((item, index) => {
            const value = item.value || item.count || item.visitors || 0;
            const barHeight = (value / maxVal) * chartHeight;
            const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
            const y = padding + chartHeight - barHeight;

            return {
                x,
                y,
                width: barWidth,
                height: barHeight,
                value,
                label: item.name || item.label || item.source || `Item ${index + 1}`,
                color: item.color || '#3B82F6'
            };
        });

        return { bars, maxValue: maxVal };
    }, [data, width, height]);

    if (!data || data.length === 0) {
        return (
            <div className={`flex items-center justify-center bg-gray-50 rounded-lg ${className}`}
                style={{ width, height }}>
                <p className="text-gray-500 text-sm">Sem dados para exibir</p>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
            <svg width={width} height={height}>
                {/* Bars */}
                {bars.map((bar, index) => (
                    <g key={index}>
                        <rect
                            x={bar.x}
                            y={bar.y}
                            width={bar.width}
                            height={bar.height}
                            fill={bar.color}
                            rx="4"
                            className="hover:opacity-80 transition-opacity"
                        />

                        {/* Value labels */}
                        <text
                            x={bar.x + bar.width / 2}
                            y={bar.y - 5}
                            className="text-xs fill-gray-700"
                            textAnchor="middle"
                        >
                            {bar.value}
                        </text>

                        {/* Category labels */}
                        <text
                            x={bar.x + bar.width / 2}
                            y={height - 5}
                            className="text-xs fill-gray-500"
                            textAnchor="middle"
                        >
                            {bar.label.length > 8 ? bar.label.slice(0, 8) + '...' : bar.label}
                        </text>
                    </g>
                ))}

                {/* Y-axis */}
                <line x1="20" y1="20" x2="20" y2={height - 20} stroke="#e5e7eb" strokeWidth="1" />

                {/* Y-axis labels */}
                <text x="15" y="25" className="text-xs fill-gray-500" textAnchor="end">
                    {maxValue}
                </text>
                <text x="15" y={height - 15} className="text-xs fill-gray-500" textAnchor="end">
                    0
                </text>
            </svg>
        </div>
    );
}

// Componente de gráfico de pizza
interface PieChartProps extends ChartProps {
    showLabels?: boolean;
    showPercentages?: boolean;
}

export function PieChart({
    data,
    width = 300,
    height = 300,
    showLabels = true,
    showPercentages = true,
    className = ''
}: PieChartProps) {
    const { slices, total } = useMemo(() => {
        if (!data || data.length === 0) return { slices: [], total: 0 };

        const values = data.map(d => d.value || d.count || d.visitors || d.percentage || 0);
        const total = values.reduce((sum, val) => sum + val, 0);

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 40;

        let currentAngle = -90;

        const slices = data.map((item, index) => {
            const value = item.value || item.count || item.visitors || item.percentage || 0;
            const percentage = (value / total) * 100;
            const angle = (percentage / 100) * 360;

            const startAngle = (currentAngle * Math.PI) / 180;
            const endAngle = ((currentAngle + angle) * Math.PI) / 180;

            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);

            const largeArcFlag = angle > 180 ? 1 : 0;

            const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
            ].join(' ');

            // Label position
            const labelAngle = (currentAngle + angle / 2) * Math.PI / 180;
            const labelRadius = radius + 20;
            const labelX = centerX + labelRadius * Math.cos(labelAngle);
            const labelY = centerY + labelRadius * Math.sin(labelAngle);

            currentAngle += angle;

            return {
                path: pathData,
                color: item.color || `hsl(${index * 137.5}, 70%, 50%)`,
                value,
                percentage: Math.round(percentage),
                label: item.name || item.label || `Item ${index + 1}`,
                labelX,
                labelY
            };
        });

        return { slices, total };
    }, [data, width, height]);

    if (!data || data.length === 0) {
        return (
            <div className={`flex items-center justify-center bg-gray-50 rounded-lg ${className}`}
                style={{ width, height }}>
                <p className="text-gray-500 text-sm">Sem dados para exibir</p>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
            <svg width={width} height={height}>
                {/* Pie slices */}
                {slices.map((slice, index) => (
                    <g key={index}>
                        <path
                            d={slice.path}
                            fill={slice.color}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                        />

                        {/* Labels */}
                        {showLabels && (
                            <text
                                x={slice.labelX}
                                y={slice.labelY}
                                className="text-xs fill-gray-700 font-medium"
                                textAnchor={slice.labelX > width / 2 ? 'start' : 'end'}
                            >
                                {slice.label}
                                {showPercentages && ` (${slice.percentage}%)`}
                            </text>
                        )}
                    </g>
                ))}

                {/* Center circle for donut effect */}
                <circle
                    cx={width / 2}
                    cy={height / 2}
                    r="30"
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                />

                {/* Center text */}
                <text
                    x={width / 2}
                    y={height / 2 - 5}
                    className="text-sm fill-gray-700 font-bold"
                    textAnchor="middle"
                >
                    Total
                </text>
                <text
                    x={width / 2}
                    y={height / 2 + 10}
                    className="text-xs fill-gray-500"
                    textAnchor="middle"
                >
                    {total.toLocaleString()}
                </text>
            </svg>
        </div>
    );
}

// Componente de gráfico de área
export function AreaChart({ data, width = 400, height = 200, className = '' }: ChartProps) {
    const { pathData, areaData, maxValue, minValue } = useMemo(() => {
        if (!data || data.length === 0) return { pathData: '', areaData: '', maxValue: 0, minValue: 0 };

        const values = data.map(d => d.value || d.views || d.sessions || 0);
        const maxVal = Math.max(...values);
        const minVal = Math.min(...values);

        const padding = 20;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;

        const points = values.map((value, index) => {
            const x = padding + (index / (values.length - 1)) * chartWidth;
            const y = padding + chartHeight - ((value - minVal) / (maxVal - minVal || 1)) * chartHeight;
            return { x, y };
        });

        const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

        const areaData = pathData +
            ` L ${points[points.length - 1].x},${padding + chartHeight}` +
            ` L ${points[0].x},${padding + chartHeight} Z`;

        return { pathData, areaData, maxValue: maxVal, minValue: minVal };
    }, [data, width, height]);

    if (!data || data.length === 0) {
        return (
            <div className={`flex items-center justify-center bg-gray-50 rounded-lg ${className}`}
                style={{ width, height }}>
                <p className="text-gray-500 text-sm">Sem dados para exibir</p>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
            <svg width={width} height={height}>
                {/* Gradient definition */}
                <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.05 }} />
                    </linearGradient>
                </defs>

                {/* Area fill */}
                <path
                    d={areaData}
                    fill="url(#areaGradient)"
                />

                {/* Line */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Data points */}
                {data.map((_, index) => {
                    const x = 20 + (index / (data.length - 1)) * (width - 40);
                    const value = data[index].value || data[index].views || data[index].sessions || 0;
                    const y = 20 + (height - 40) - ((value - minValue) / (maxValue - minValue || 1)) * (height - 40);

                    return (
                        <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#3B82F6"
                            stroke="white"
                            strokeWidth="2"
                            className="hover:r-6 transition-all duration-200"
                        />
                    );
                })}
            </svg>
        </div>
    );
}

// Componente de heatmap simples
interface HeatmapProps {
    data: Array<{ hour: number; day: string; value: number }>;
    width?: number;
    height?: number;
    className?: string;
}

export function Heatmap({ data, width = 500, height = 150, className = '' }: HeatmapProps) {
    const { cells } = useMemo(() => {
        if (!data || data.length === 0) return { cells: [] };

        const maxVal = Math.max(...data.map(d => d.value));
        const cellWidth = (width - 60) / 24; // 24 hours
        const cellHeight = (height - 40) / 7; // 7 days

        const cells = data.map(item => {
            const intensity = item.value / maxVal;
            return {
                x: 40 + item.hour * cellWidth,
                y: 20 + ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].indexOf(item.day) * cellHeight,
                width: cellWidth - 2,
                height: cellHeight - 2,
                intensity,
                value: item.value,
                hour: item.hour,
                day: item.day
            };
        });

        return { cells };
    }, [data, width, height]);

    if (!data || data.length === 0) {
        return (
            <div className={`flex items-center justify-center bg-gray-50 rounded-lg ${className}`}
                style={{ width, height }}>
                <p className="text-gray-500 text-sm">Sem dados para exibir</p>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
            <svg width={width} height={height}>
                {/* Hour labels */}
                {Array.from({ length: 24 }, (_, i) => (
                    <text
                        key={i}
                        x={40 + i * ((width - 60) / 24) + ((width - 60) / 24) / 2}
                        y={15}
                        className="text-xs fill-gray-500"
                        textAnchor="middle"
                    >
                        {i}h
                    </text>
                ))}

                {/* Day labels */}
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, i) => (
                    <text
                        key={day}
                        x={35}
                        y={20 + i * ((height - 40) / 7) + ((height - 40) / 7) / 2 + 4}
                        className="text-xs fill-gray-500"
                        textAnchor="end"
                    >
                        {day}
                    </text>
                ))}

                {/* Heatmap cells */}
                {cells.map((cell, index) => (
                    <rect
                        key={index}
                        x={cell.x}
                        y={cell.y}
                        width={cell.width}
                        height={cell.height}
                        fill={`rgba(59, 130, 246, ${cell.intensity})`}
                        rx="2"
                        className="hover:stroke-2 hover:stroke-blue-600 transition-all"
                    >
                        <title>{`${cell.day} ${cell.hour}h: ${cell.value} visitors`}</title>
                    </rect>
                ))}
            </svg>
        </div>
    );
}

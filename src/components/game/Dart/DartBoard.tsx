
import { useId } from "react";

export type DartHit = {
  id: number;
  x: number;
  y: number;
  score: number;
  label: string;
};

type Props = {
  hits: DartHit[];
  aim?: { x: number; y: number } | null;
  showAim?: boolean;
  flying?: boolean;
  lastHitId?: number | null;
};

const NUMBERS = [
  20, 1, 18, 4, 13, 6, 10, 15, 2, 17,
  3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
];

function polar(radius: number, degrees: number) {
  const angle = ((degrees - 90) * Math.PI) / 180;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
}

function sectorPath(
  inner: number,
  outer: number,
  start: number,
  end: number
) {
  const a = polar(outer, start);
  const b = polar(outer, end);
  const c = polar(inner, end);
  const d = polar(inner, start);

  return [
    `M ${a.x} ${a.y}`,
    `A ${outer} ${outer} 0 0 1 ${b.x} ${b.y}`,
    `L ${c.x} ${c.y}`,
    `A ${inner} ${inner} 0 0 0 ${d.x} ${d.y}`,
    "Z",
  ].join(" ");
}

export function calculateDartScore(x: number, y: number) {
  const radius = Math.hypot(x, y);

  if (radius > 90) {
    return { score: 0, label: "MISS" };
  }

  if (radius <= 5) {
    return { score: 50, label: "BULLSEYE!" };
  }

  if (radius <= 11) {
    return { score: 25, label: "OUTER BULL" };
  }

  // زاویه صفر در بالای تخته است.
  const angle =
    ((Math.atan2(y, x) * 180) / Math.PI + 90 + 360) % 360;

  const index = Math.floor((angle + 9) / 18) % 20;
  const number = NUMBERS[index];

  if (radius >= 82) {
    return { score: number * 2, label: `DOUBLE ${number}` };
  }

  if (radius >= 48 && radius <= 55) {
    return { score: number * 3, label: `TRIPLE ${number}` };
  }

  return { score: number, label: `SINGLE ${number}` };
}

export function DartBoard({
  hits,
  aim,
  showAim = false,
  flying = false,
  lastHitId,
}: Props) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <div className="dart-board-frame relative mx-auto aspect-square w-full max-w-[480px]">
      <svg
        viewBox="-112 -112 224 224"
        className="h-full w-full drop-shadow-[0_24px_24px_#0009]"
        role="img"
        aria-label="تخته دارت استاندارد با بخش‌های امتیازی"
      >
        <defs>
          <radialGradient id={gradientId}>
            <stop offset="0" stopColor="#484b50" />
            <stop offset="0.8" stopColor="#22252b" />
            <stop offset="1" stopColor="#080a0f" />
          </radialGradient>
        </defs>

        {/* قاب خارجی */}
        <circle r="109" fill={`url(#${gradientId})`} />
        <circle r="105" fill="none" stroke="#747781" strokeWidth="1" />
        <circle r="93" fill="#101115" stroke="#06070b" strokeWidth="3" />

        {NUMBERS.map((number, index) => {
          const start = index * 18 - 9;
          const end = index * 18 + 9;
          const isEven = index % 2 === 0;

          const base = isEven ? "#202328" : "#e9dcc1";
          const red = isEven ? "#d63c4c" : "#188967";

          const textPosition = polar(99, index * 18);

          return (
            <g key={number}>
              {/* بخش اصلی */}
              <path
                d={sectorPath(11, 90, start, end)}
                fill={base}
                stroke="#15161b"
                strokeWidth=".38"
              />

              {/* Triple ring */}
              <path
                d={sectorPath(48, 55, start, end)}
                fill={red}
                stroke="#222"
                strokeWidth=".35"
              />

              {/* Double ring */}
              <path
                d={sectorPath(82, 90, start, end)}
                fill={red}
                stroke="#222"
                strokeWidth=".35"
              />

              <text
                x={textPosition.x}
                y={textPosition.y}
                fill="#f8fafc"
                fontSize="6.5"
                fontWeight="700"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {number}
              </text>
            </g>
          );
        })}

        {/* خطوط حلقه */}
        {[48, 55, 82, 90].map((r) => (
          <circle
            key={r}
            r={r}
            fill="none"
            stroke="#969a96"
            strokeWidth=".45"
            opacity=".85"
          />
        ))}

        {/* Bull */}
        <circle
          r="11"
          fill="#168765"
          stroke="#c9c9c9"
          strokeWidth=".5"
        />
        <circle
          r="5"
          fill="#e84652"
          stroke="#e5c9b8"
          strokeWidth=".4"
        />

        {/* دارت‌های برخوردکرده */}
        {hits.map((hit) => (
          <g
            key={hit.id}
            transform={`translate(${hit.x} ${hit.y})`}
            className={
              hit.id === lastHitId ? "dart-hit-enter" : ""
            }
          >
            <circle r="4" fill="#000" opacity=".45" />
            <circle
              r="2.5"
              fill="#ffe17b"
              stroke="#fff"
              strokeWidth=".7"
            />
            <path
              d="M0 -2 L-4 -13 L0 -10 L4 -13 Z"
              fill="#7dd3fc"
              stroke="#fff"
              strokeWidth=".4"
            />
          </g>
        ))}

        {/* نشانه‌گیر */}
        {showAim && aim && (
          <g
            transform={`translate(${aim.x} ${aim.y})`}
            className="dart-crosshair"
            opacity={flying ? 0 : 1}
          >
            <circle
              r="8"
              fill="none"
              stroke="#fbbf24"
              strokeWidth=".8"
              strokeDasharray="3 2"
            />
            <circle r="1.2" fill="#fef3c7" />
            <path
              d="M-13 0 H-5 M5 0 H13 M0 -13 V-5 M0 5 V13"
              stroke="#fff"
              strokeWidth="1"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
                     
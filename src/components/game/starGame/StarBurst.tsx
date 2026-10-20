
export type StarBurstItem = {
  id: number;
  x: number;
  y: number;
  points: number;
};

type Props = {
  bursts: StarBurstItem[];
};

const particles = Array.from({ length: 9 }, (_, index) => {
  const angle = (index / 9) * Math.PI * 2;

  return {
    x: Math.cos(angle) * 76,
    y: Math.sin(angle) * 76,
  };
});

export function StarBurst({ bursts }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute"
          style={{
            left: `${burst.x}%`,
            top: `${burst.y}%`,
          }}
        >
          <span className="star-score-popup">
            +{burst.points.toLocaleString("fa-IR")}
          </span>

          <span className="star-burst-ring" />

          {particles.map((particle, index) => (
            <span
              key={index}
              className="star-particle"
              style={
                {
                  "--dx": `${particle.x}px`,
                  "--dy": `${particle.y}px`,
                  "--delay": `${index * 12}ms`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface StarRatingProps {
  score: number;
  max?: number;
}

export default function StarRating({ score, max = 5 }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`text-2xl transition-all ${i < score ? "animate-pop" : "opacity-30"}`}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}

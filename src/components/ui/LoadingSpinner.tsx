export default function LoadingSpinner({ text = "Einen Moment..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="text-6xl animate-bounce-soft">🦊</div>
      <p className="text-kids-md font-bold text-gray-600">{text}</p>
    </div>
  );
}

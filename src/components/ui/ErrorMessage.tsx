import BigButton from "./BigButton";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message = "Hoppla! Etwas hat nicht geklappt.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
      <div className="text-6xl">😅</div>
      <p className="text-kids-md font-bold text-gray-700">{message}</p>
      <p className="text-kids-sm text-gray-500">Kiko sagt: &quot;Versuch es nochmal!&quot;</p>
      {onRetry && (
        <BigButton onClick={onRetry} color="orange" size="sm">
          Nochmal versuchen
        </BigButton>
      )}
    </div>
  );
}

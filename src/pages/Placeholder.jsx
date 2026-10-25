export default function Placeholder({ title }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1240px] flex-col items-center justify-center px-5 text-center">
      <h1 className="font-display text-4xl font-semibold text-teal-900">{title}</h1>
      <p className="mt-3 text-muted">Ye page reference image milne ke baad banega.</p>
      <div id="book" />
    </div>
  );
}
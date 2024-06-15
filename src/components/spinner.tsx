export default function Spinner({ show, wait }: { show?: boolean; wait?: `delay-${number}` }) {
  return (
    <div
      className={`inline-block animate-spin px-3 text-xl text-blue-800 transition dark:text-white ${
        show ?? true ? `opacity-1 duration-500 ${wait ?? "delay-300"} visible` : "hidden opacity-0 delay-0 duration-500"
      }`}
      data-testid="spinner"
    >
      ⍥
    </div>
  );
}

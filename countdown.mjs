export const LAUNCH_AT = "2026-12-10T17:00:00+09:00";  // 매거진 오픈 (사용자 결정 2026-11-10, 앱 종료 12-09 17:00 다음 날)
export const LAUNCH_TIMESTAMP = Date.parse(LAUNCH_AT);

// dotslashdash.com copy (2026-11-02): the lab version caps hours at 99, which reads as a
// stuck "99:MM:SS" while more than four days remain. Show whole days in front instead ("8 days 14:55:21").
export function formatCountdown(now = Date.now()) {
  const remaining = Math.max(0, Math.ceil((LAUNCH_TIMESTAMP - now) / 1000));
  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  const clock = [hours, minutes, seconds].map(value => String(value).padStart(2, "0")).join(":");
  return days > 0 ? `${days} ${days === 1 ? "day" : "days"} ${clock}` : clock;
}

if (typeof document !== "undefined") {
  const counter = document.querySelector("[data-countdown]");
  if (counter) {
    let interval;
    const render = () => {
      const now = Date.now();
      counter.textContent = formatCountdown(now);
      if (now >= LAUNCH_TIMESTAMP) {
        clearInterval(interval);
        document.removeEventListener("visibilitychange", render);
      }
    };
    render();
    if (Date.now() < LAUNCH_TIMESTAMP) {
      interval = setInterval(render, 1000);
      document.addEventListener("visibilitychange", render);
    }
  }
}

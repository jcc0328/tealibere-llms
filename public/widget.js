/* PrivacyWidget.io embed script (framework-free, tiny footprint) */
(function () {
  if (window.__privacyWidgetLoaded) return;
  window.__privacyWidgetLoaded = true;

  var scriptTag = document.currentScript;
  var siteId = scriptTag && scriptTag.getAttribute("data-site-id");
  var preferredPosition = (scriptTag && scriptTag.getAttribute("data-position")) || "bottom-right";
  var apiBase = (scriptTag && scriptTag.getAttribute("data-api-base")) || (scriptTag ? new URL(scriptTag.src).origin : window.location.origin);

  if (!siteId) {
    console.warn("PrivacyWidget: missing data-site-id");
    return;
  }

  var css = "#pw-btn{position:fixed;z-index:2147483000;right:16px;bottom:16px;background:#1d4ed8;color:#fff;border:0;border-radius:999px;padding:12px 16px;font:600 14px system-ui;box-shadow:0 12px 40px rgba(0,0,0,.35);cursor:pointer}#pw-overlay{display:none;position:fixed;inset:0;background:rgba(2,6,23,.62);z-index:2147483001}#pw-sheet{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(430px,92vw);background:#0f172a;border:1px solid #334155;color:#e2e8f0;border-radius:16px;padding:20px;font-family:system-ui}.pw-mobile #pw-sheet{left:0;right:0;bottom:0;top:auto;transform:none;width:100%;border-radius:16px 16px 0 0;padding-bottom:calc(18px + env(safe-area-inset-bottom))}#pw-email{width:100%;margin-top:12px;border:1px solid #334155;background:#020617;color:#fff;border-radius:10px;padding:10px;font-size:14px}#pw-submit{margin-top:12px;width:100%;background:#1d4ed8;color:#fff;border:0;border-radius:10px;padding:10px;font-weight:600;cursor:pointer}#pw-msg{margin-top:8px;font-size:12px;color:#93c5fd}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var button = document.createElement("button");
  button.id = "pw-btn";
  button.textContent = "🛡 Privacy Options";
  if (preferredPosition === "bottom-left") {
    button.style.left = "16px";
    button.style.right = "auto";
  }

  var overlay = document.createElement("div");
  overlay.id = "pw-overlay";

  var mobile = window.matchMedia("(max-width: 768px)").matches;
  if (mobile) overlay.className = "pw-mobile";

  overlay.innerHTML = '<div id="pw-sheet" role="dialog" aria-modal="true" aria-label="Privacy options"><h3 style="margin:0;font-size:18px">Opt-Out of ADMT</h3><p style="margin:8px 0 0;font-size:13px;color:#cbd5e1">Enter your email to submit an ADMT opt-out request.</p><input id="pw-email" type="email" placeholder="you@example.com" /><button id="pw-submit">Submit Request</button><p id="pw-msg"></p></div>';

  function open() { overlay.style.display = "block"; }
  function close(e) { if (e && e.target !== overlay) return; overlay.style.display = "none"; }

  button.addEventListener("click", open);
  overlay.addEventListener("click", close);

  overlay.querySelector("#pw-submit").addEventListener("click", function () {
    var email = overlay.querySelector("#pw-email").value.trim();
    var msg = overlay.querySelector("#pw-msg");
    if (!email || email.indexOf("@") === -1) {
      msg.textContent = "Please enter a valid email.";
      return;
    }

    fetch(apiBase + "/api/widget/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site_id: siteId, consumer_email: email, request_type: "opt_out_admt" }),
      credentials: "omit"
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        msg.textContent = data && data.ok ? "您的请求已记录。" : (data.error || "Submission failed");
        if (data && data.ok) setTimeout(function () { overlay.style.display = "none"; }, 1000);
      })
      .catch(function () { msg.textContent = "Network error, please retry."; });
  });

  document.body.appendChild(button);
  document.body.appendChild(overlay);
})();

(function () {
  "use strict";

  const input = document.getElementById("input");
  const output = document.getElementById("output");
  const hint = document.getElementById("hint");
  const urlsafe = document.getElementById("urlsafe");
  const drop = document.getElementById("drop");
  const file = document.getElementById("file");

  function bytesToB64(bytes) {
    let bin = "";
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    let b64 = btoa(bin);
    if (urlsafe.checked) b64 = b64.replace(/\+/g, "-").replace(/\//g, "_");
    return b64;
  }

  function b64ToBytes(b64) {
    b64 = b64.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  function encode() {
    const text = input.value;
    if (!text) { hint.textContent = "Enter some text"; return; }
    try {
      const bytes = new TextEncoder().encode(text);
      output.value = bytesToB64(bytes);
      hint.textContent = "Encoded";
    } catch (e) { hint.textContent = "Encode error"; }
  }

  function decode() {
    const b64 = input.value.trim();
    if (!b64) { hint.textContent = "Enter Base64"; return; }
    try {
      const bytes = b64ToBytes(b64);
      output.value = new TextDecoder().decode(bytes);
      hint.textContent = "Decoded";
    } catch (e) { hint.textContent = "Invalid Base64"; }
  }

  document.getElementById("btn-encode").onclick = encode;
  document.getElementById("btn-decode").onclick = decode;
  document.getElementById("btn-swap").onclick = () => {
    const t = input.value; input.value = output.value; output.value = t;
  };
  document.getElementById("btn-copy").onclick = () => {
    navigator.clipboard.writeText(output.value).then(() => hint.textContent = "Copied");
  };

  file.onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const bytes = new Uint8Array(reader.result);
      output.value = bytesToB64(bytes);
      hint.textContent = "File encoded";
    };
    reader.readAsArrayBuffer(f);
  };

  drop.ondragover = (e) => e.preventDefault();
  drop.ondrop = (e) => {
    e.preventDefault();
    file.files = e.dataTransfer.files;
    file.onchange({target: file});
  };
})();

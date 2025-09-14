<label>
  Memory (MB):
  <input type="range" id="memorySlider" min="4" max="131072" value="4096" />
  <span id="memoryValue">4096 MB</span>
</label>
<div id="memoryPreviewBar"></div>
<script>
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.value;
      terminalOutput.textContent += `\n$ ${cmd}\nCommand '${cmd}' not found`;
      terminalInput.value = '';
    }
  });
</script>
<script>
  const themeToggle = document.getElementById('themeToggle');
  const fontSelector = document.getElementById('fontSelector');

  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      document.documentElement.style.setProperty('--bg-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#000000');
    } else {
      document.documentElement.style.setProperty('--bg-color', '#121212');
      document.documentElement.style.setProperty('--text-color', '#eee');
    }
  });

  fontSelector.addEventListener('change', () => {
    const selectedFont = fontSelector.value;
    document.documentElement.style.setProperty('--font-family', selectedFont);
  });
</script>
<script>
  const memorySlider = document.getElementById('memorySlider');
  const memoryDisplay = document.getElementById('memoryDisplay');
  memorySlider.addEventListener('input', () => {
    memoryDisplay.textContent = `${memorySlider.value} MB`;
  });

  const thumbInput = document.getElementById('vmThumbnail');
  const thumbPreview = document.getElementById('thumbPreview');
  thumbInput.addEventListener('change', () => {
    const file = thumbInput.files[0];
    if (file) {
      thumbPreview.src = URL.createObjectURL(file);
      thumbPreview.style.display = 'block';
    }
  });

  function downloadQEMU() {
    document.getElementById('downloadStatus').textContent = "Downloading QEMU...";
    // Simulate download
    setTimeout(() => {
      document.getElementById('downloadStatus').textContent = "QEMU downloaded successfully.";
    }, 2000);
  }

  function downloadDebian() {
    document.getElementById('downloadStatus').textContent = "Downloading Debian emulator...";
    setTimeout(() => {
      document.getElementById('downloadStatus').textContent = "Debian emulator downloaded.";
    }, 2000);
  }

  function finalizeVM() {
    alert("VM Created! You can now launch it from the dashboard.");
    // You can add file saving logic here using Termux or AIDE APIs
  }
</script>
<label>
  Memory (MB):
  <input type="range" id="memorySlider" min="4" max="131072" value="4096" />
  <input type="number" id="memoryInput" min="4" max="131072" value="4096" />
</label>
<div id="memoryPreviewBar"></div>
<script>
  function launchQEMU() {
    const isoFile = document.getElementById('isoSelector').files[0];
    const diskFile = document.getElementById('diskSelector').files[0];
    const memory = document.getElementById('launchMemory').value;
    const cpu = document.getElementById('launchCPU').value;

    if (!isoFile || !diskFile) {
      alert("Please select both ISO and disk image files.");
      return;
    }

    const isoPath = isoFile.name;
    const diskPath = diskFile.name;

    const qemuCmd = `qemu-system-aarch64 \\
  -m ${memory} \\
  -smp ${cpu} \\
  -cdrom ${isoPath} \\
  -hda ${diskPath} \\
  -boot d \\
  -machine virt \\
  -cpu cortex-a57 \\
  -nographic`;

    document.getElementById('cmdPreview').textContent = qemuCmd;

    // Optional: Save command to qemu.cmd or execute via Termux
    // You can use Termux's API to run this if needed
  }
</script>
<script>
  function downloadQEMU() {
    const qemuUrl = "https://sourceforge.net/projects/vectras-vm-android/files/qemu-system-aarch64.zip/download";
    window.open(qemuUrl, "_blank");
    document.getElementById("downloadStatus").textContent = "QEMU download started in a new tab.";
  }

  function downloadDebian() {
    const debianUrl = "https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-13.0.0-amd64-netinst.iso";
    window.open(debianUrl, "_blank");
    document.getElementById("downloadStatus").textContent = "Debian ISO download started in a new tab.";
  }
</script>
<script>
  function startVM() {
    const isoFile = document.getElementById('startIso').files[0];
    const diskFile = document.getElementById('startDisk').files[0];
    const memory = document.getElementById('startMemory').value;
    const cpu = document.getElementById('startCPU').value;

    if (!isoFile || !diskFile) {
      alert("Please select both ISO and disk image files.");
      return;
    }

    const isoPath = isoFile.name;
    const diskPath = diskFile.name;

    const qemuCmd = `qemu-system-aarch64 \\
  -m ${memory} \\
  -smp ${cpu} \\
  -cdrom ${isoPath} \\
  -hda ${diskPath} \\
  -boot d \\
  -machine virt \\
  -cpu cortex-a57 \\
  -nographic`;

    document.getElementById('vmCommandPreview').textContent = qemuCmd;

    // Optional: Save to qemu.cmd or run via Termux
    // You can integrate Termux:API to execute this if needed
  }
</script>
<script>
  let qemuCommand = "";

  function previewVM() {
    const isoFile = document.getElementById('startIso').files[0];
    const diskFile = document.getElementById('startDisk').files[0];
    const memory = document.getElementById('startMemory').value;
    const cpu = document.getElementById('startCPU').value;

    if (!isoFile || !diskFile) {
      alert("Please select both ISO and disk image files.");
      return;
    }

    const isoPath = `/storage/emulated/0/Download/${isoFile.name}`;
    const diskPath = `/storage/emulated/0/Download/${diskFile.name}`;

    qemuCommand = `qemu-system-aarch64 \\
  -m ${memory} \\
  -smp ${cpu} \\
  -cdrom "${isoPath}" \\
  -hda "${diskPath}" \\
  -boot d \\
  -machine virt \\
  -cpu cortex-a57 \\
  -nographic`;

    document.getElementById('vmCommandPreview').textContent = qemuCommand;
  }

  function runInTermux() {
    if (!qemuCommand) {
      alert("Preview the command first.");
      return;
    }

    const encodedCmd = encodeURIComponent(qemuCommand);
    const termuxURL = `termux://com.termux.execute?command=${encodedCmd}`;
    window.location.href = termuxURL;
  }
</script>
<script>
  let vmPaused = false;

  function togglePause() {
    vmPaused = !vmPaused;
    document.getElementById('pauseBtn').textContent = vmPaused ? '▶️ Resume' : '⏸️ Pause';
    // Optional: Send pause/resume signal to QEMU via Termux or shell
  }

  function toggleKeyboard() {
    const panel = document.getElementById('keyboardPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  // Optional: Mouse control logic
  document.getElementById('vmMouse').addEventListener('click', () => {
    alert("Mouse control activated (placeholder)");
    // You can later add touch-to-move or VNC pointer logic here
  });
</script>
<script>
  let vmPaused = false;

  function togglePause() {
    vmPaused = !vmPaused;
    document.getElementById('pauseBtn').textContent = vmPaused ? '▶️ Resume' : '⏸️ Pause';
    // Optional: Send pause/resume signal to QEMU via Termux or shell
  }

  function toggleKeyboard() {
    const panel = document.getElementById('keyboardPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  // 🖱️ Drag Mouse Control
  const vmMouse = document.getElementById('vmMouse');
  vmMouse.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData("text/plain", null);
  });

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    vmMouse.style.position = 'fixed';
    vmMouse.style.left = `${x}px`;
    vmMouse.style.top = `${y}px`;
  });
</script>
<script>
  function startVMDisplay() {
    // Example: connect to local VNC server
    document.getElementById('vmDisplay').src = "http://localhost:6080/vnc.html?host=localhost&port=5901";
  }

  // Call this after VM starts
  startVMDisplay();
</script>
<script>
  let vmPaused = false;

  function togglePause() {
    vmPaused = !vmPaused;
    document.getElementById('pauseBtn').textContent = vmPaused ? '▶️ Resume' : '⏸️ Pause';
    // Optional: Send pause/resume signal to QEMU via Termux or shell
  }

  function toggleKeyboard() {
    const panel = document.getElementById('keyboardPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  // 🖱️ Drag Mouse Control
  const vmMouse = document.getElementById('vmMouse');
  vmMouse.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData("text/plain", null);
  });

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    vmMouse.style.position = 'fixed';
    vmMouse.style.left = `${x}px`;
    vmMouse.style.top = `${y}px`;
  });
</script>
function toggleFullscreen() {
  const iframe = document.getElementById('vmDisplay');
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.webkitRequestFullscreen) {
    iframe.webkitRequestFullscreen();
  } else if (iframe.msRequestFullscreen) {
    iframe.msRequestFullscreen();
  }
}
function captureVM() {
  const canvas = document.getElementById('vmCanvas');
  const imgData = canvas.toDataURL("image/png");
  // You can open it in a new tab or save it
  window.open(imgData);
}
function startVM() {
  // Your QEMU launch logic here...

  // Then auto-load the VNC viewer
  document.getElementById('vmDisplay').src = "http://localhost:6080/vnc.html?resize=scale&autoconnect=true";
}
function showSnackbar(message) {
  const bar = document.getElementById("snackbar");
  bar.textContent = message;
  bar.className = "show";
  setTimeout(() => bar.className = bar.className.replace("show", ""), 3000);
}
showSnackbar("VM started successfully");
let qemuCommand = "";

function previewVM() {
  const iso = document.getElementById('startIso').files[0];
  const disk = document.getElementById('startDisk').files[0];
  const memory = document.getElementById('startMemory').value;
  const cpu = document.getElementById('startCPU').value;

  if (!iso || !disk) {
    alert("Please select both ISO and disk image.");
    return;
  }

  const isoPath = `/storage/emulated/0/Download/${iso.name}`;
  const diskPath = `/storage/emulated/0/Download/${disk.name}`;

  qemuCommand = `qemu-system-aarch64 \\
  -m ${memory} \\
  -smp ${cpu} \\
  -cdrom "${isoPath}" \\
  -hda "${diskPath}" \\
  -boot d \\
  -machine virt \\
  -cpu cortex-a57 \\
  -vnc :1 \\
  -device virtio-keyboard-device \\
  -device virtio-mouse-device`;

  document.getElementById('vmCommandPreview').textContent = qemuCommand;
}

function loadVMDisplay() {
  document.getElementById('vmDisplay').src = "http://localhost:6080/vnc.html?resize=scale&autoconnect=true";
}
function applyTheme(mode) {
  if (mode === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } else {
    document.documentElement.setAttribute("data-theme", mode);
  }
  localStorage.setItem("fwvm-theme", mode);
}

// Load saved theme on startup
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("fwvm-theme") || "system";
  document.getElementById("themeSelect").value = saved;
  applyTheme(saved);
});
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showSnackbar("Copied to clipboard");
  });
}

function shareText(text) {
  if (navigator.share) {
    navigator.share({ text });
  } else {
    copyText(text);
  }
}
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
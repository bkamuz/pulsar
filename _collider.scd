// Install required quarks (run this once, then recompile)
// Uncomment the lines below to install quarks:
// Quarks.install("https://github.com/supercollider-quarks/Vowel");
// Quarks.install("https://github.com/daslyfe/StrudelDirt");
// After installing, recompile: Language > Recompile Class Library (or Ctrl+K)

// Start SuperDirt on port 57120 to match OSC server configuration
// SuperDirt.start(numChannels, server, numOrbits, port: portNumber)
// numChannels: 2 (stereo), server: s (default), numOrbits: 12, port: 57120

s.waitForBoot {
    ~dirt = StrudelDirt(2, s); // если используешь StrudelDirt, не SuperDirt
    ~dirt.loadSoundFiles("./.samples/*");
	~dirt = StrudelDirt.start(port: 57120);
};

// Install required quarks (run this once, then recompile)
// Uncomment the lines below to install quarks:
// Quarks.install("https://github.com/supercollider-quarks/Vowel");
// Quarks.install("https://github.com/daslyfe/StrudelDirt");
// After installing, recompile: Language > Recompile Class Library (or Ctrl+K)

// Configure server options to handle large sample libraries
// Increase buffer numbers (default: 1024) to support many samples
s.options.numBuffers = 8192;
// Increase real-time memory (default: 8192 KB) to prevent alloc failures
// 256 MB should handle complex synths with many delay/effects units
s.options.memSize = 262144; // 256 MB
// Increase interconnect buffers (default: 64) to prevent "exceeded number of interconnect buffers" errors
// This is critical for complex synth graphs with many modules
s.options.numWireBufs = 2048;
// Increase audio bus channels for more routing flexibility
s.options.numAudioBusChannels = 1024;
// Increase control bus channels
s.options.numControlBusChannels = 16384;

// Quit server if running to apply new options, then boot with new settings
fork {
    if(s.serverRunning, {
        s.quit;
        1.wait; // Wait for server to fully quit
    });

    // Start StrudelDirt on port 57120 to match OSC server configuration
    // numChannels: 2 (stereo), server: s (default), numOrbits: 12, port: 57120
    s.waitForBoot {
        // Construct absolute path to samples directory
        // Try to get script directory, fallback to constructing from current path
        var scriptPath, basePath, samplesPath, soundFiles;
        scriptPath = thisProcess.nowExecutingPath;
        basePath = if(scriptPath.notNil, {
            scriptPath.dirname
        }, {
            // Fallback: construct from platform-specific paths
            Platform.userAppSupportDir +/+ "pulsar"
        });
        samplesPath = (basePath +/+ ".samples").standardizePath;
        
        // Create SuperDirt instance using constructor pattern (allows loadSoundFiles method)
        ~dirt = SuperDirt(2, s);
        
        // Load samples before starting - use loadSoundFiles with wildcard pattern
        if(File.exists(samplesPath), {
            // Load all samples recursively using wildcard
            ~dirt.loadSoundFiles(samplesPath +/+ "*");
            ("Loaded samples from: " + samplesPath).postln;
            
            // Count files for verification
            soundFiles = PathName(samplesPath).deepFiles.select({ |path|
                #[\wav, \aiff, \aif, \mp3, \flac].includes(path.extension.asSymbol)
            });
            ("Found " + soundFiles.size + " sound files").postln;
        }, {
            ("WARNING: Samples directory not found at: " + samplesPath).postln;
            ("Please ensure .samples directory exists and run _converter.js if needed").postln;
        });
        
        // Start SuperDirt after loading samples
        ~dirt.start(57120, 0 ! 12);
    };
};

// Check if the server is running and quit if needed
if(s.serverRunning, {
	s.quit;
	// Wait for server to fully quit before continuing
	fork {
		1.wait;
		// Boot the server (port will be set by SuperDirt if needed)
		s.boot;
	};
}, {
	// Server not running, start it directly
	s.boot;    // Boot the server
});

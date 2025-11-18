samples('https://raw.githubusercontent.com/bkamuz/pulsar/refs/heads/main/samples/strudel.json');

$: s("Breaks:1*4").fit().scope()

$: n("<0 4 0 9 7>*16").scale("g:minor").trans(-12)
    .s("sawtooth")
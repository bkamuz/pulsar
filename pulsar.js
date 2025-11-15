samples(
  "https://raw.githubusercontent.com/bkamuz/pulsar/refs/heads/main/samples/strudel.json",
);

$: stack(
  // HARMONY
  n(irand(12).ribbon("<10 131 547>", 1))
    .scale("<G>:mixolydian")
    .transpose(12)
    .sound("<sawtooth square triangle sine supersaw>".fast(8))
    .struct("<x*16(3,8) x*2@3 x*8(2,6) x*2 x*4> <x(2,8) x x(4,4)>")
    .slow(1)
    ._pianoroll()
    // SFX
    .vib(0.31)
    .delay(0.3)
    .delaytime(0.75)
    .delayfeedback(0.7)
    .lpf(sine.range(100, 2700).slow(1.2))
    .lpq(24),
)
  .gain(0.1)
  .room(0.9)
  .orbit(2);

$: stack(
  // LOWS
  n(irand(12).ribbon("<10 131 547>", 1))
    .scale("<G>:mixolydian")
    .transpose(-36)
    .sound("<sawtooth>")
    .struct("<x(3,8)><x(4,8)>")
    .slow(1)
    // .chop(16).ply("<16 1 8 32 3 8>")
    // .fit()
    // SFX
    .lpf("<100 200 300>/0.125")
    .lpq(6)
    .lpe("<2 3 2 1>/0.125")
    .lpd("0.09")
    .delay("<.25 .25 .5 0.75>")
    .delaytime(0.1),
  // .phaser(1).phaserdepth(10)
  // .hpf(200)
)
  .gain(0.55)
  .room(0.31)
  .roomsize(1)
  .roomfade(0.5)
  .orbit(3);

$: stack(
  // LOWS
  n(irand(1).ribbon("<10 131 547>", 1))
    .sound("<Kick:1>")
    .struct("<x(2,8)><x(2,8)>")
    .slow(1)
    .duck(3)
    // .chop(16).ply("<16 1 8 32 3 8>")
    // .fit()
    // SFX
    .lpf("<100 200 300>/0.125")
    .lpq(6)
    .lpe("<2 3 2 1>/0.125")
    .lpd("0.09"),
  // .delay("<.25 .25 .5 0.75>").delaytime(0.1)
  // .phaser(1).phaserdepth(10)
  // .hpf(200)
)
  .gain(0.95)
  .room(0.31)
  .roomsize(1)
  .roomfade(0.5)
  .orbit(1);

$: stack(
  // DRUMS
  n("<0 1 2*0.5 3*2>")
    .s("Breaks:3")
    .loop(1)
    .slow(8)
    .chop(16)
    .ply("<16 1 8 32 3 8>")
    .fit()
    // SFX
    .lpf(sine.range(100, 2100).slow(0.33))
    .lpq(4)
    .delay("<0 .25 .5 1>")
    .delaytime(0.4)
    .phaser(1)
    .phaserdepth(110)
    .hpf(200),
)
  .gain(0.25)
  .room(0.8)
  .roomsize(10)
  .roomfade(0.5)
  .orbit(1);

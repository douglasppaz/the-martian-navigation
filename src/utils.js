const probeSerializer = probe => ({
  x: probe.x,
  y: probe.y,
  direction: probe.direction,
});

exports.probeSerializer = probeSerializer;

exports.getActiveContent = (contents) => {
  if (!contents.length) return null;

  const total = contents.reduce((sum, c) => sum + c.Schedule.duration, 0);

  const now = Date.now();
  const slot = now % (total * 60000);

  let cumulative = 0;

  for (let c of contents) {
    cumulative += c.Schedule.duration * 60000;
    if (slot < cumulative) return c;
  }
};
export const notes = [
  {
    title: 'Heap vs Stack — Interview Notes', campaignTag: 'JMM', levelTag: 'Fundamentals', accent: 'cyan',
    description: 'The layout questions interviewers ask before anything else: what lives where, and why it matters for L1 cache and garbage collection performance.',
    pages: 5,
  },
  {
    title: 'GC Algorithms Compared', campaignTag: 'JMM', levelTag: 'Advanced', accent: 'red',
    description: 'G1 vs ZGC vs Shenandoah, side by side — pause times, colored pointers, load barriers, and when each collector is the right answer.',
    pages: 7,
  },
  {
    title: 'synchronized vs Lock Internals', campaignTag: 'MT Core', levelTag: 'Core', accent: 'cyan',
    description: 'Monitors, ObjectHeader lock-bits (biased, thin, fat), reentrancy, and where ReentrantLock actually earns its complexity.',
    pages: 6,
  },
];

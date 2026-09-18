// Mirrors the `videos` array from the original static page. Once the
// backend exists, replace this import with contentApi.fetchVideos().
export const videos = [
  {
    title: 'Heap vs Stack Memory Layout',
    tag: 'JMM',
    duration: '18:42',
    desc: "Where objects actually live, and why the stack is faster but the heap is where everything interesting happens. Covers thread frames, escape analysis, JIT scalar replacement, and the exact difference between primitive local variables and object pointers.",
  },
  {
    title: 'Object Headers & Memory Padding',
    tag: 'JMM',
    duration: '14:10',
    desc: 'The 12–16 bytes every single Java object pays before your fields even begin. Mark word, Klass word, compressed OOPs, and why alignment padding exists at all.',
  },
  {
    title: 'Garbage Collection: G1, ZGC, Shenandoah',
    tag: 'JMM',
    duration: '26:35',
    desc: 'Three collectors, three trade-offs — pause time versus throughput versus memory overhead. Deep dive into colored pointers and load barriers.',
  },
  {
    title: 'Thread Lifecycle & Context Switching',
    tag: 'Multithreading',
    duration: '16:52',
    desc: 'Every state a thread passes through, and what the JVM and OS are each doing during a context switch. Thread dump analysis.',
  },
  {
    title: 'synchronized, Locks & Monitors',
    tag: 'Multithreading',
    duration: '21:08',
    desc: 'What a monitor actually is, why synchronized is reentrant, biased lock revocation, and where java.util.concurrent locks take over.',
  },
];

export const chapterMarkers = [
  { pct: 0, label: 'Overview', time: '00:00', title: 'Intro & Overview' },
  { pct: 20, label: 'Stack Mechanics', time: '03:45', title: 'Stack Frames & L1 Cache' },
  { pct: 45, label: 'Escape Analysis', time: '08:12', title: 'Escape Analysis (-XX:+DoEscapeAnalysis)' },
  { pct: 70, label: 'Interview Traps', time: '14:20', title: 'The 5 Interview Traps' },
];

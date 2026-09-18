export const campaigns = [
  {
    number: '01', title: 'Java Memory Model', accent: '#3DDAD7', published: 4, total: 6,
    description: 'Heap, stack, GC roots, compressed OOPs, and object layout mechanics that show up the moment an interviewer says: "Walk me through what happens in memory when this line executes."',
    segments: [
      { n: '01', title: 'Heap vs Stack Memory Layout', status: 'published' },
      { n: '02', title: 'Object Headers & Memory Padding', status: 'published' },
      { n: '03', title: 'Garbage Collection: G1, ZGC, Shenandoah', status: 'published' },
      { n: '04', title: 'Reference Types & GC Roots', status: 'published' },
      { n: '05', title: 'OutOfMemoryError: Reading the Heap Dump', status: 'in-progress' },
      { n: '06', title: 'Escape Analysis & Stack Allocation', status: 'upcoming' },
    ],
  },
  {
    number: '02', title: 'Multithreading & Concurrency Internals', accent: '#FF1A1A', published: 4, total: 6,
    description: 'Thread states, OS scheduler context switches, volatile memory barriers (happens-before), monitor locks, and thread pool executor queuing — the questions that turn simple interviews into rigorous architectural defense.',
    segments: [
      { n: '01', title: 'Thread Lifecycle & Context Switching', status: 'published' },
      { n: '02', title: 'synchronized, Locks & Monitors', status: 'published' },
      { n: '03', title: 'volatile & the Java Memory Model', status: 'published' },
      { n: '04', title: 'Executor Framework Internals', status: 'published' },
      { n: '05', title: 'CompletableFuture & Async Pipelines', status: 'in-progress' },
      { n: '06', title: 'Deadlocks: Detection & Prevention', status: 'upcoming' },
    ],
  },
];

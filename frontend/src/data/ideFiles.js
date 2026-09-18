export const ideFileTree = [
  { key: 'Main.java', id: 'main', icon: '☕' },
  { key: 'MemoryBench.java', id: 'mem', icon: '☕' },
  { key: 'ThreadPool.java', id: 'thread', icon: '☕' },
  { key: 'README.md', id: 'readme', icon: '📄' },
];

export const ideFiles = {
  'Main.java': `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {2, 7, 11, 15};\n        int target = 9;\n        System.out.println("Result: " + java.util.Arrays.toString(twoSum(nums, target)));\n    }\n\n    static int[] twoSum(int[] nums, int target) {\n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                if (nums[i] + nums[j] == target) return new int[]{i, j};\n            }\n        }\n        return new int[]{};\n    }\n}`,
  'MemoryBench.java': `// JMH Benchmark for JMM Heap vs Stack Allocation\n@BenchmarkMode(Mode.Throughput)\n@OutputTimeUnit(TimeUnit.MILLISECONDS)\npublic class MemoryBench {\n    @Benchmark\n    public Point allocateOnStack() {\n        // Scalar Replacement should eliminate heap allocation\n        return new Point(10, 20);\n    }\n}`,
  'ThreadPool.java': `// Production Thread Pool Executor Configuration\npublic class ThreadPool {\n    public static ExecutorService createSafePool() {\n        int cores = Runtime.getRuntime().availableProcessors();\n        return new ThreadPoolExecutor(\n            cores, cores * 2, 60L, TimeUnit.SECONDS,\n            new ArrayBlockingQueue<>(500),\n            new ThreadPoolExecutor.CallerRunsPolicy()\n        );\n    }\n}`,
  'README.md': `# Two Sum Project & Crusader Guidelines\n- Optimal approach uses single pass HashMap.\n- Memory overhead: 32 bytes per HashMap.Node entry.\n- Watch Campaign 01 Segment 02 for object header layout details.`,
};

export const problems = [
  { name: 'Two Sum', difficulty: 'Easy', tags: 'Hash Map / Arrays' },
  { name: 'Reverse Linked List', difficulty: 'Medium', tags: 'Pointers / Recursion' },
  { name: 'Valid Parentheses', difficulty: 'Easy', tags: 'Stack Frames' },
  { name: 'Merge Intervals', difficulty: 'Medium', tags: 'Sorting / Intervals' },
  { name: 'LRU Cache', difficulty: 'Hard', tags: 'Doubly-Linked List' },
];

export const difficultyStyles = {
  Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Hard: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const languages = ['Java', 'Python', 'C++', 'Go', 'JavaScript'];

// Only "Two Sum" ships a worked solution in the mockup; other problems fall
// back to a generic placeholder until the backend supplies real content via
// GET /api/practice/problems.
export const problemSolutions = {
  'Two Sum': {
    Java: {
      brute: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Brute Force: O(n^2) Time\n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                if (nums[i] + nums[j] == target) return new int[]{i, j};\n            }\n        }\n        return new int[]{};\n    }\n}`,
      optimal: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Single Pass HashMap: O(n) Time, O(n) Space\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`,
    },
  },
};

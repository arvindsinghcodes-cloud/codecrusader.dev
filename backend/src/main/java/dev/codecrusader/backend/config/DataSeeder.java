package dev.codecrusader.backend.config;

import dev.codecrusader.backend.domain.*;
import dev.codecrusader.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds demo content mirroring the frontend's src/data/*.js fixtures, plus
 * two demo accounts, so the API is immediately useful without a separate
 * admin UI. Only runs when the target tables are empty, guarded by
 * app.seed.enabled (see application-prod.yml, which defaults it to false).
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final VideoRepository videoRepository;
    private final CourseRepository courseRepository;
    private final ScheduleSlotRepository scheduleSlotRepository;
    private final CampaignRepository campaignRepository;
    private final NoteRepository noteRepository;
    private final ProblemRepository problemRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.seed.enabled:true}")
    private boolean seedEnabled;

    @Override
    public void run(String... args) {
        if (!seedEnabled) {
            return;
        }
        seedUsers();
        seedVideos();
        seedCourses();
        seedSchedule();
        seedCampaigns();
        seedNotes();
        seedProblems();
    }

    private void seedUsers() {
        if (userRepository.count() > 0) return;

        userRepository.save(User.builder()
                .name("Arvind Kumar Singh")
                .email("admin@codecrusader.dev")
                .passwordHash(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .build());

        userRepository.save(User.builder()
                .name("Demo Student")
                .email("student@codecrusader.dev")
                .passwordHash(passwordEncoder.encode("student123"))
                .role(Role.USER)
                .build());
    }

    private void seedVideos() {
        if (videoRepository.count() > 0) return;

        videoRepository.saveAll(List.of(
                Video.builder().orderIndex(0).title("Heap vs Stack Memory Layout").tag("JMM").duration("18:42")
                        .description("Where objects actually live, and why the stack is faster but the heap is where everything interesting happens. Covers thread frames, escape analysis, JIT scalar replacement, and the exact difference between primitive local variables and object pointers.")
                        .build(),
                Video.builder().orderIndex(1).title("Object Headers & Memory Padding").tag("JMM").duration("14:10")
                        .description("The 12–16 bytes every single Java object pays before your fields even begin. Mark word, Klass word, compressed OOPs, and why alignment padding exists at all.")
                        .build(),
                Video.builder().orderIndex(2).title("Garbage Collection: G1, ZGC, Shenandoah").tag("JMM").duration("26:35")
                        .description("Three collectors, three trade-offs — pause time versus throughput versus memory overhead. Deep dive into colored pointers and load barriers.")
                        .build(),
                Video.builder().orderIndex(3).title("Thread Lifecycle & Context Switching").tag("Multithreading").duration("16:52")
                        .description("Every state a thread passes through, and what the JVM and OS are each doing during a context switch. Thread dump analysis.")
                        .build(),
                Video.builder().orderIndex(4).title("synchronized, Locks & Monitors").tag("Multithreading").duration("21:08")
                        .description("What a monitor actually is, why synchronized is reentrant, biased lock revocation, and where java.util.concurrent locks take over.")
                        .build()
        ));
    }

    private void seedCourses() {
        if (courseRepository.count() > 0) return;

        courseRepository.saveAll(List.of(
                Course.builder().code("JV").color("cyan").title("Java Internals").category("Language")
                        .modules(42).progress(65).progressLabel("65% Done").progressColor("text-emerald-400")
                        .ctaLabel("Continue Learning →").ctaHref("#videos").type("lang").completed(false).build(),
                Course.builder().code("SPR").color("red").title("Spring Boot Core").category("Framework")
                        .modules(28).progress(20).progressLabel("20% Done").progressColor("text-yellow-400")
                        .ctaLabel("Explore Modules →").ctaHref("#videos").type("fw").completed(false).build(),
                Course.builder().code("PY").color("cyan").title("Python for Systems").category("Language")
                        .modules(36).progress(40).progressLabel("40% Done").progressColor("text-emerald-400")
                        .ctaLabel("Resume →").ctaHref("#practice").type("lang").completed(false).build(),
                Course.builder().code("GIT").color("emerald").title("Git & GitHub Pro").category("Tool")
                        .modules(14).progress(100).progressLabel("100% Completed").progressColor("text-emerald-400")
                        .ctaLabel("Certificate 🏅").ctaHref("#").type("fw").completed(true).build()
        ));
    }

    private void seedSchedule() {
        if (scheduleSlotRepository.count() > 0) return;

        scheduleSlotRepository.saveAll(List.of(
                ScheduleSlot.builder().orderIndex(0).day("24").month("SEP").title("OutOfMemoryError: Reading the Heap Dump")
                        .time("7:00 PM IST").campaign("Java Memory Model").campaignColor("text-[#3DDAD7]")
                        .status("LIVE IN 6 DAYS").statusStyle("bg-red-500/10 text-[#FF1A1A] border-red-500/20").build(),
                ScheduleSlot.builder().orderIndex(1).day("27").month("SEP").title("CompletableFuture & Async Pipelines")
                        .time("7:00 PM IST").campaign("Multithreading").campaignColor("text-[#FF1A1A]")
                        .status("UPCOMING").statusStyle("bg-[#1B1E23] text-gray-400").build(),
                ScheduleSlot.builder().orderIndex(2).day("01").month("OCT").title("Escape Analysis & Stack Allocation")
                        .time("7:00 PM IST").campaign("Java Memory Model").campaignColor("text-[#3DDAD7]")
                        .status("UPCOMING").statusStyle("bg-[#1B1E23] text-gray-400").build()
        ));
    }

    private void seedCampaigns() {
        if (campaignRepository.count() > 0) return;

        Campaign jmm = Campaign.builder().orderIndex(0).number("01").title("Java Memory Model").accent("#3DDAD7")
                .published(4).total(6)
                .description("Heap, stack, GC roots, compressed OOPs, and object layout mechanics that show up the moment an interviewer says: \"Walk me through what happens in memory when this line executes.\"")
                .build();
        jmm.setSegments(List.of(
                seg(jmm, 0, "01", "Heap vs Stack Memory Layout", "published"),
                seg(jmm, 1, "02", "Object Headers & Memory Padding", "published"),
                seg(jmm, 2, "03", "Garbage Collection: G1, ZGC, Shenandoah", "published"),
                seg(jmm, 3, "04", "Reference Types & GC Roots", "published"),
                seg(jmm, 4, "05", "OutOfMemoryError: Reading the Heap Dump", "in-progress"),
                seg(jmm, 5, "06", "Escape Analysis & Stack Allocation", "upcoming")
        ));

        Campaign mt = Campaign.builder().orderIndex(1).number("02").title("Multithreading & Concurrency Internals").accent("#FF1A1A")
                .published(4).total(6)
                .description("Thread states, OS scheduler context switches, volatile memory barriers (happens-before), monitor locks, and thread pool executor queuing — the questions that turn simple interviews into rigorous architectural defense.")
                .build();
        mt.setSegments(List.of(
                seg(mt, 0, "01", "Thread Lifecycle & Context Switching", "published"),
                seg(mt, 1, "02", "synchronized, Locks & Monitors", "published"),
                seg(mt, 2, "03", "volatile & the Java Memory Model", "published"),
                seg(mt, 3, "04", "Executor Framework Internals", "published"),
                seg(mt, 4, "05", "CompletableFuture & Async Pipelines", "in-progress"),
                seg(mt, 5, "06", "Deadlocks: Detection & Prevention", "upcoming")
        ));

        campaignRepository.saveAll(List.of(jmm, mt));
    }

    private CampaignSegment seg(Campaign campaign, int orderIndex, String n, String title, String status) {
        return CampaignSegment.builder()
                .campaign(campaign).orderIndex(orderIndex).n(n).title(title).status(status)
                .build();
    }

    private void seedNotes() {
        if (noteRepository.count() > 0) return;

        noteRepository.saveAll(List.of(
                Note.builder().orderIndex(0).title("Heap vs Stack — Interview Notes").campaignTag("JMM").levelTag("Fundamentals").accent("cyan")
                        .description("The layout questions interviewers ask before anything else: what lives where, and why it matters for L1 cache and garbage collection performance.")
                        .pages(5).build(),
                Note.builder().orderIndex(1).title("GC Algorithms Compared").campaignTag("JMM").levelTag("Advanced").accent("red")
                        .description("G1 vs ZGC vs Shenandoah, side by side — pause times, colored pointers, load barriers, and when each collector is the right answer.")
                        .pages(7).build(),
                Note.builder().orderIndex(2).title("synchronized vs Lock Internals").campaignTag("MT Core").levelTag("Core").accent("cyan")
                        .description("Monitors, ObjectHeader lock-bits (biased, thin, fat), reentrancy, and where ReentrantLock actually earns its complexity.")
                        .pages(6).build()
        ));
    }

    private void seedProblems() {
        if (problemRepository.count() > 0) return;

        Problem twoSum = Problem.builder().orderIndex(0).name("Two Sum").difficulty("Easy").tags("Hash Map / Arrays").build();
        twoSum.setSolutions(List.of(
                ProblemSolution.builder().problem(twoSum).language("Java").variant("brute")
                        .source("class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Brute Force: O(n^2) Time\n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                if (nums[i] + nums[j] == target) return new int[]{i, j};\n            }\n        }\n        return new int[]{};\n    }\n}")
                        .build(),
                ProblemSolution.builder().problem(twoSum).language("Java").variant("optimal")
                        .source("class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Single Pass HashMap: O(n) Time, O(n) Space\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}")
                        .build()
        ));

        problemRepository.saveAll(List.of(
                twoSum,
                Problem.builder().orderIndex(1).name("Reverse Linked List").difficulty("Medium").tags("Pointers / Recursion").build(),
                Problem.builder().orderIndex(2).name("Valid Parentheses").difficulty("Easy").tags("Stack Frames").build(),
                Problem.builder().orderIndex(3).name("Merge Intervals").difficulty("Medium").tags("Sorting / Intervals").build(),
                Problem.builder().orderIndex(4).name("LRU Cache").difficulty("Hard").tags("Doubly-Linked List").build()
        ));
    }
}

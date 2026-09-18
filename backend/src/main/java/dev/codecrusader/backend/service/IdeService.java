package dev.codecrusader.backend.service;

import dev.codecrusader.backend.dto.ide.IdeChatRequest;
import dev.codecrusader.backend.dto.ide.IdeChatResponse;
import org.springframework.stereotype.Service;

@Service
public class IdeService {

    /**
     * Rule-based stand-in for the AI copilot. Swap this method's body for a
     * call to an LLM (e.g. the Anthropic Messages API) once one is wired up;
     * the request already carries the active file, its source, and the
     * user's message, which is what a real prompt would need.
     */
    public IdeChatResponse chat(IdeChatRequest request) {
        String lower = request.message().toLowerCase();
        String reply;
        if (lower.contains("bytecode")) {
            reply = "javap -c output: notice opcode invokevirtual vs invokespecial. The loops generate if_icmpge jumps. "
                    + "Replacing with a HashMap replaces those jumps with O(1) table lookups.";
        } else if (lower.contains("edge")) {
            reply = "Key interview traps for Two Sum: 1) negative integers in the array, 2) repeated elements summing "
                    + "to the target, 3) integer overflow when the target is near Integer.MAX_VALUE.";
        } else {
            reply = "Looking at " + (request.activeFile() != null ? request.activeFile() : "your file")
                    + " — the nested loops make this O(n²). Swap the inner loop for a HashMap<Integer, Integer> "
                    + "to get O(n) in one pass.";
        }
        return new IdeChatResponse(reply);
    }
}

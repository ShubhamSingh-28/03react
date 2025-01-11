import java.util.*;

public class Agilans {
    static class Instruction {
        String direction;
        int d;

        Instruction(String direction, int d) {
            this.direction = direction;
            this.d = d;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int N = sc.nextInt();
        sc.nextLine();

        Instruction[] instructions = new Instruction[N];
        for (int i = 0; i < N; i++) {
            String[] input = sc.nextLine().split(" ");
            instructions[i] = new Instruction(input[0], Integer.parseInt(input[1]));
        }

        int agilanX = sc.nextInt(), agilanY = sc.nextInt();
        int rabinX = sc.nextInt(), rabinY = sc.nextInt();

        if (!correctOneTurn(N, instructions, agilanX, agilanY, rabinX, rabinY)) {
            System.out.println("No");
        }
    }

    private static boolean correctOneTurn(int N, Instruction[] instructions, int startX, int startY, int targetX, int targetY) {
        int[][] moves = { { 0, 1 }, { 1, 0 }, { 0, -1 }, { -1, 0 } }; // {dx, dy} for north, east, south, west
        String[] possibleTurns = { "straight", "left", "right", "back" };
        int currentX = startX, currentY = startY, facing = 0;

        // Simulate Agilan's incorrect path
        for (Instruction instruction : instructions) {
            switch (instruction.direction) {
                case "left": facing = (facing + 3) % 4; break;
                case "right": facing = (facing + 1) % 4; break;
                case "back": facing = (facing + 2) % 4; break;
                case "straight": break;
            }
            currentX += moves[facing][0] * instruction.d;
            currentY += moves[facing][1] * instruction.d;
        }

        // If Agilan already reached Rabin's house, no correction is needed
        if (currentX == targetX && currentY == targetY) return false;

        // Check for one turn correction
        for (int i = 0; i < N; i++) {
            int testX = startX, testY = startY, testFacing = 0;

            for (int j = 0; j < N; j++) {
                if (j == i) {
                    // Try correcting the j-th instruction
                    for (String correction : possibleTurns) {
                        int correctedFacing = testFacing;
                        switch (correction) {
                            case "left": correctedFacing = (testFacing + 3) % 4; break;
                            case "right": correctedFacing = (testFacing + 1) % 4; break;
                            case "back": correctedFacing = (testFacing + 2) % 4; break;
                            case "straight": break;
                        }

                        int correctedX = testX + moves[correctedFacing][0] * instructions[j].d;
                        int correctedY = testY + moves[correctedFacing][1] * instructions[j].d;

                        // Simulate the remaining path
                        for (int k = j + 1; k < N; k++) {
                            switch (instructions[k].direction) {
                                case "left": correctedFacing = (correctedFacing + 3) % 4; break;
                                case "right": correctedFacing = (correctedFacing + 1) % 4; break;
                                case "back": correctedFacing = (correctedFacing + 2) % 4; break;
                                case "straight": break;
                            }
                            correctedX += moves[correctedFacing][0] * instructions[k].d;
                            correctedY += moves[correctedFacing][1] * instructions[k].d;
                        }

                        // Check if this correction leads to the target
                        if (correctedX == targetX && correctedY == targetY) {
                            System.out.println("Yes");
                            System.out.println(instructions[j].direction + " " + instructions[j].d);
                            System.out.println(correction + " " + instructions[j].d);
                            return true;
                        }
                    }
                }

                // Follow the current instruction
                switch (instructions[j].direction) {
                    case "left": testFacing = (testFacing + 3) % 4; break;
                    case "right": testFacing = (testFacing + 1) % 4; break;
                    case "back": testFacing = (testFacing + 2) % 4; break;
                    case "straight": break;
                }
                testX += moves[testFacing][0] * instructions[j].d;
                testY += moves[testFacing][1] * instructions[j].d;
            }
        }
        return false;
    }
}

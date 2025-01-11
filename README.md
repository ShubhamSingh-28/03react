import java.util.*;

public class FriendshipBands {
    static int S;
    static int[][][] cube;
    static int maxOverlap = 0;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Read cube size
        S = sc.nextInt();
        cube = new int[S][S][S];

        // Read starting position and movements for Band 1
        int x1 = sc.nextInt();
        int y1 = sc.nextInt();
        int z1 = sc.nextInt();
        String moves1 = sc.next();

        // Read starting position and movements for Band 2
        int x2 = sc.nextInt();
        int y2 = sc.nextInt();
        int z2 = sc.nextInt();
        String moves2 = sc.next();

        // Place bands and check for interlocks
        boolean interlocked = placeBand(x1, y1, z1, moves1, 1) || placeBand(x2, y2, z2, moves2, 2);

        // Output result
        if (interlocked) {
            System.out.println("Impossible");
        } else {
            System.out.println(maxOverlap);
        }
    }

    private static boolean placeBand(int x, int y, int z, String moves, int bandId) {
        int overlapCount = 0;

        for (char move : moves.toCharArray()) {
            if (!isValid(x, y, z)) {
                return true; // Out of bounds or overlapping with the same band
            }

            if (cube[z][y][x] != 0 && cube[z][y][x] != bandId) {
                // Overlapping with another band
                if (bandId == 1) {
                    maxOverlap++;
                } else {
                    overlapCount++;
                }
            }

            // Mark the cell with the band ID
            cube[z][y][x] = bandId;

            // Move to the next cell
            switch (move) {
                case 'u': y--; break;
                case 'd': y++; break;
                case 'f': z++; break;
                case 'b': z--; break;
                case 'r': x++; break;
                case 'l': x--; break;
            }
        }

        // Handle the last overlap count for Band 2
        if (bandId == 2) {
            maxOverlap = Math.max(maxOverlap, overlapCount);
        }

        return false;
    }

    private static boolean isValid(int x, int y, int z) {
        return x >= 0 && x < S && y >= 0 && y < S && z >= 0 && z < S;
    }
}

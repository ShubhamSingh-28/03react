import java.util.*;


class Shark {

    static class Cell {

        int r, c, t, strength;


        Cell(int r, int c, int t, int strength) {

            this.r = r;

            this.c = c;

            this.t = t;

            this.strength = strength;

        }

    }


    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);


        int N = sc.nextInt();

        int M = sc.nextInt();


        int[][] sharkStrength = new int[N][M];

        int[][] timePath = new int[N][M];

        int startRow = 0, startCol = 0, endRow = 0, endCol = 0;


       

        for (int i = 0; i < N; i++) {

            for (int j = 0; j < M; j++) {

                String cell = sc.next();

                if (cell.equals("S")) {

                    startRow = i;

                    startCol = j;

                    sharkStrength[i][j] = 0;

                } else if (cell.equals("D")) {

                    endRow = i;

                    endCol = j;

                    sharkStrength[i][j] = 0;

                } else {

                    sharkStrength[i][j] = Integer.parseInt(cell);

                }

            }

        }


       

        for (int i = 0; i < N; i++) {

            for (int j = 0; j < M; j++) {

                timePath[i][j] = sc.nextInt();

            }

        }


        int K = sc.nextInt();


        int[] result = findShortestPath(N, M, startRow, startCol, endRow, endCol, sharkStrength, timePath, K);


        if (result[0] == -1) {

            System.out.println("Not Possible");

        } else {

            System.out.println(result[0] + " " + result[1]);

        }

    }


    private static int[] findShortestPath(int N, int M, int startRow, int startCol, int endRow, int endCol,int[][] sharkStrength, int[][] timePath, int K)

    {

        int[][] directions = { { 0, 1 }, { 1, 0 }, { 0, -1 }, { -1, 0 } };

        boolean[][][] visited = new boolean[N][M][K + 1];

        PriorityQueue<Cell> pq = new PriorityQueue<>((a, b) -> a.t - b.t);


        pq.offer(new Cell(startRow, startCol, 0, K));


        while (!pq.isEmpty()) {

            Cell current = pq.poll();


            if (current.r == endRow && current.c == endCol) {

                return new int[] { current.t, current.strength };

            }


            if (visited[current.r][current.c][current.strength]) {

                continue;

            }


            visited[current.r][current.c][current.strength] = true;


            for (int[] dir : directions) {

                int newRow = current.r + dir[0];

                int newCol = current.c + dir[1];


                if (newRow >= 0 && newRow < N && newCol >= 0 && newCol < M) {

                    int newStrength = current.strength - 1 - sharkStrength[newRow][newCol];

                    int newTime = current.t + timePath[newRow][newCol];


                    if (newStrength >= 0 && !visited[newRow][newCol][newStrength]) {

                        pq.offer(new Cell(newRow, newCol, newTime, newStrength));

                    }

                }

            }

        }


        return new int[] { -1, -1 };

    }

}


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.nio.file.Files;
import java.nio.file.Path;
public class Solution {
    public static void main(String[] args) {
        try {
            List<String> lines = Files.readAllLines(Path.of("../input.txt"));
            int width = lines.get(0).length();
		    int height = lines.size();
            List<Point> points = new ArrayList<>();

            var yPos = 0;
            for (String line : lines) {
                for (int xPos=0; xPos < line.length(); xPos++) {
                    if(line.charAt(xPos) == '#'){
                        points.add(new Point(xPos, yPos));
                    }
                }
                yPos++;
            }

            var expansionRate = 1000000;
            // Expand empty rows
            for(int i = width -1; i >= 0; i--){
                var empty = true;
                for (Point point : points) {
                    if(point.y == i){
                        empty = false;
                        break;
                    }
                }
                if(!empty){
                    continue;
                }
                for (Point point : points) {
                    if(point.y >= i){
                        point.y += expansionRate - 1;
                    }
                }
            }

            // Expand empty cols
            for(int i = height -1; i >= 0; i--){
                var empty = true;
                for (Point point : points) {
                    if(point.x == i){
                        empty = false;
                        break;
                    }
                }
                if(!empty){
                    continue;
                }
                for (Point point : points) {
                    if(point.x >= i){
                        point.x += expansionRate - 1;
                    }
                }
            }

            long sum = 0;
            for (int i = 0; i < points.size(); i++) {
                for (int j = i + 1; j < points.size(); j++) {
                    var p1 = points.get(i);
                    var p2 = points.get(j);
                    sum += Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
                }
            }

            System.out.println(sum);

        
        } catch (IOException e) {
            // Handle any potential IO exception
            e.printStackTrace();
        }
    }
}

public class Point {
    public int x;
    public int y;

    // Constructor to initialize x and y values
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Point point = (Point) o;
        return x == point.x && y == point.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }

    @Override
    public String toString() {
        return "Point: (" + x + ", " + y + ")";
    }

    public Integer getX() {
        return x;
    }

        public Integer getY() {
        return y;
    }
}
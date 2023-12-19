var lines = File.ReadAllLines("../input.txt");

var output = new List<Direction>[lines.Length][];
for(int i = 0; i < lines.Length; i++){
    output[i] = new List<Direction>[lines[i].Length];
    for(int j = 0; j < lines[i].Length; j++){
        output[i][j] = [];
    }
}

var results = new List<int>();
for (int i = 0; i < lines.Length; i++) 
{
    results.Add(Travel(-1,i, Direction.E));
    clear();
    results.Add(Travel(lines.Length,i, Direction.W));
    clear();
}

for (int i = 0; i < lines[0].Length; i++) 
{
    results.Add(Travel(i, lines[i].Length, Direction.N));
    clear();
    results.Add(Travel(i, -1, Direction.S));
    clear();
}

Console.WriteLine($"Energized tiles: {results.Max()}");

int Travel(int x, int y, Direction direction){
    x += direction switch {
        Direction.E => 1,
        Direction.W => -1,
        _ => 0
    };

    y += direction switch {
        Direction.N => -1,
        Direction.S => 1,
        _ => 0
    };

    if(x < 0 || x >= lines[0].Length || y < 0 || y >= lines.Length){
        return 0;
    }
    
    if(output[y][x].Contains(direction)){
        return 0;
    }

    var distance = output[y][x].Any() ? 0 : 1;
    var element = lines[y][x];
    output[y][x].Add(direction);
    
    if(element == '.'){
         distance += Travel(x, y, direction);
    }else if(element == '|'){
        if(direction is Direction.E or Direction.W){
            distance += Travel(x, y, Direction.N);
            distance += Travel(x, y, Direction.S);
        }else{
            distance += Travel(x, y, direction);
        }
    }else if(element == '-'){
        if(direction is Direction.N or Direction.S){
            distance += Travel(x, y, Direction.E);
            distance += Travel(x, y, Direction.W);
        }else{
            distance += Travel(x, y, direction);
        }
    }else if(element == '\\'){
        if(direction is Direction.N){
            distance += Travel(x, y, Direction.W);
        }else if (direction is Direction.E){
            distance += Travel(x, y, Direction.S);
        }else if (direction is Direction.S){
            distance += Travel(x, y, Direction.E);
        }else if (direction is Direction.W){
            distance += Travel(x, y, Direction.N);
        }
    }else if(element == '/'){
        if(direction is Direction.N){
            distance += Travel(x, y, Direction.E);
        }else if (direction is Direction.E){
            distance += Travel(x, y, Direction.N);
        }else if (direction is Direction.S){
            distance += Travel(x, y, Direction.W);
        }else if (direction is Direction.W){
            distance += Travel(x, y, Direction.S);
        }
    }

    return distance;
}

void clear(){
    for(int i = 0; i < lines.Length; i++){
        output[i] = new List<Direction>[lines[i].Length];
        for(int j = 0; j < lines[i].Length; j++){
            output[i][j] = [];
        }
    }
}

public enum Direction{
    N, E, S, W
}
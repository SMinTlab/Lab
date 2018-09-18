import java.util.HashMap;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.Arrays;
/****************************************************/
/* Map[][] = {...} -> Map[][] = {MAP}				*/
/* Area[][] = {...} -> Area[][] = {AREA}			*/
/* tmp = {...} -> tmp = {PLAYER1_X,PLAYER1_Y}		*/
/* this.name = ... -> this.name = "PLAYER1_NAME" 	*/
/* {...} -> {PLAYER1_CODE}							*/
/****************************************************/
enum DIR {
	SOUTH("south"), NORTH("north"), EAST("east"), WEST("west");

	private String dir;

	private DIR(String dir) {
		this.dir = dir;
	}

	public String getDir() {
		return this.dir;
	}
}

enum OBJECT {
	WALL("1"), NOTHING("0");

	private String id;

	private OBJECT(String id) {
		this.id = id;
	}

	public String getId() {
		return this.id;
	}
}

class Player {
        final static public String surfix = "Human";
	final BlockingQueue<String> in, out;
	//final static private String Map[][] = {{"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"},{"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"},{"1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1"},{"1","1","0","1","1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","1"},{"1","1","0","0","0","0","0","1","0","1","0","1","0","0","0","1","0","0","0","0","1","1"},{"1","1","1","0","1","1","0","1","0","1","0","0","0","0","0","1","0","1","1","1","1","1"},{"1","1","0","0","0","1","0","0","0","1","0","1","0","0","0","1","0","0","0","0","1","1"},{"1","1","1","0","1","1","1","1","1","1","0","1","1","1","0","1","0","1","1","1","1","1"},{"1","1","0","0","0","0","0","0","0","1","0","1","0","0","0","1","0","0","0","0","1","1"},{"1","1","0","0","0","1","0","1","0","1","0","1","0","0","0","0","0","0","0","0","1","1"},{"1","1","0","0","0","1","0","1","0","1","0","1","0","0","0","1","0","0","0","0","1","1"},{"1","1","1","1","0","1","1","1","0","1","0","1","0","1","1","1","1","1","1","1","1","1"},{"1","1","0","0","0","1","0","1","0","1","0","1","0","0","0","0","0","0","0","0","1","1"},{"1","1","0","1","0","1","0","1","0","1","0","1","0","1","0","1","1","0","1","1","1","1"},{"1","1","0","1","0","1","0","1","0","1","0","1","0","1","0","1","0","0","0","0","1","1"},{"1","1","1","1","0","1","0","1","0","1","0","1","0","1","0","1","0","0","0","0","1","1"},{"1","1","0","1","0","1","0","1","0","1","0","1","0","1","0","1","0","0","0","0","1","1"},{"1","1","0","1","0","1","0","1","0","1","0","1","0","1","1","1","1","1","1","1","1","1"},{"1","1","0","1","0","0","0","1","0","1","0","1","0","0","0","0","0","0","0","0","1","1"},{"1","1","0","0","0","1","0","1","0","1","0","1","0","1","0","0","0","0","0","0","1","1"},{"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"},{"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"}};
	//static private String Area[][] = {{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","2","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"},{"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"}};
	final static private String Map[][] = {MAP};
	static private String Area[][] = {AREA};
        public String drawNum;
	public String name;
	public DIR dir = DIR.SOUTH;
	static HashMap<String, int[]> Player = new HashMap<String, int[]>() {
		{
			int[] tmp = { 0, 0 };
			put("", tmp);
		}
		{
			//int[] tmp = { 2, 2 };
			int[] tmp = {PLAYER1_X,PLAYER1_Y};
			put("PLAYER1_NAME", tmp);
		}
		{
			//int[] tmp = { 19, 19 };
			int[] tmp = {PLAYER2_X,PLAYER2_Y};
			put("PLAYER2_NAME", tmp);
		}
	};

	public Player(BlockingQueue<String> in, BlockingQueue<String> out) {
		this.in = in;
		this.out = out;
	}

	void print(String s) {
		try {
			out.put(s);
			in.take();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	public int[] get_Position() {
		return Player.get(name);
	}

	public int get_X() {
		return Player.get(name)[0];
	}
	public int get_Y() {
		return Player.get(name)[1];
	}
	public DIR get_Direction() {
		return this.dir;
	}

	public String MapElem(int[] pos) {
		return Map[pos[0]][pos[1]];
	}
	public DIR FORWARD(){
		return get_Direction();
	}
	public DIR BACKWARD(){
		switch(get_Direction()){
		case EAST:
			return DIR.WEST;
		case NORTH:
			return DIR.SOUTH;
		case SOUTH:
			return DIR.NORTH;
		case WEST:
			return DIR.EAST;
		default:
			return DIR.NORTH;
		}
	}
	public DIR RIGHT(){
		switch(get_Direction()){
		case EAST:
			return DIR.SOUTH;
		case NORTH:
			return DIR.EAST;
		case SOUTH:
			return DIR.WEST;
		case WEST:
			return DIR.NORTH;
		default:
			return DIR.WEST;
		}
	}
	public DIR LEFT(){
		switch(get_Direction()){
		case EAST:
			return DIR.NORTH;
		case NORTH:
			return DIR.WEST;
		case SOUTH:
			return DIR.EAST;
		case WEST:
			return DIR.SOUTH;
		default:
			return DIR.EAST;
		}
	}
	public void move(String dir) {
			int p[] = Player.get(name);
			switch (dir) {
			case "north":
				if(!detect(dir, OBJECT.WALL)){
					p[1]--;
					Player.put(name, p);
				}
				this.dir = DIR.NORTH;
				print(this.name + ".move"+surfix+"(" + dir + ")");
				break;
			case "west":
				if(!detect(dir, OBJECT.WALL)){
					p[0]--;
					Player.put(name, p);
				}
				this.dir = DIR.WEST;
				print(this.name + ".move"+surfix+"(" + dir + ")");
				break;
			case "south":
				if(!detect(dir, OBJECT.WALL)){
					p[1]++;
					Player.put(name, p);
				}
				this.dir = DIR.SOUTH;
				print(this.name + ".move"+surfix+"(" + dir + ")");
				break;
			case "east":
				if(!detect(dir, OBJECT.WALL)){
					p[0]++;
					Player.put(name, p);
				}
				this.dir = DIR.EAST;
				print(this.name + ".move"+surfix+"(" + dir + ")");
				break;
			default:
				return;
			}
                        
			getArea()[p[0]][p[1]] = this.drawNum;

	}

	public void move(DIR dir) {
		move(dir.getDir());
	}

	public boolean detect(String dir, String target) {
		switch (dir) {
		case "north":
			//this.dir = DIR.NORTH;
			if (target != null)
				return Map[Player.get(name)[0]][Player.get(name)[1] - 1].equals(target);
			else
				return !Map[Player.get(name)[0]][Player.get(name)[1] - 1].equals("0");
		case "west":
			//this.dir = DIR.WEST;
			if (target != null)
				return Map[Player.get(name)[0] - 1][Player.get(name)[1]].equals(target);
			else
				return !Map[Player.get(name)[0] - 1][Player.get(name)[1]].equals("0");
		case "south":
			//this.dir = DIR.SOUTH;
			if (target != null)
				return Map[Player.get(name)[0]][Player.get(name)[1] + 1].equals(target);
			else
				return !Map[Player.get(name)[0]][Player.get(name)[1] + 1].equals("0");
		case "east":
			//this.dir = DIR.EAST;
			if (target != null)
				return Map[Player.get(name)[0] + 1][Player.get(name)[1]].equals(target);
			else
				return !Map[Player.get(name)[0] + 1][Player.get(name)[1]].equals("0");
		default:
			return false;
		}
	}

	public boolean detect(DIR dir, OBJECT target) {
		return detect(dir.getDir(), target.getId());
	}
	public boolean detect(String dir, OBJECT target) {
		return detect(dir, target.getId());
	}
	public void draw() {
		switch (get_Direction()) {
		case NORTH:
			getArea()[get_Position()[0]][get_Position()[1] - 1] = this.drawNum;
			break;
		case EAST:
			getArea()[get_Position()[0] + 1][get_Position()[1]] = this.drawNum;
			break;
		case WEST:
			getArea()[get_Position()[0] - 1][get_Position()[1]] = this.drawNum;
			break;
		case SOUTH:
			getArea()[get_Position()[0]][get_Position()[1] + 1] = this.drawNum;
			break;
		default:
			break;
		}
		print(this.name + ".draw"+surfix+"()");
	}

	public static String[][] getArea() {
		return Area;
	}
}

class A extends Player {
	public A(BlockingQueue<String> in, BlockingQueue<String> out) {
		super(in, out);
		this.name = "PLAYER1_NAME";
                this.dir = DIR.SOUTH;
                this.drawNum = "1";
		getArea()[get_Position()[0]][get_Position()[1]] = this.drawNum;
	}

	public void run() {// プレイヤーAはこの中を書いてもらう
		for (int player1repeatcounter = 5000; player1repeatcounter > 0; player1repeatcounter--) {
			PLAYER1_CODE
/*
                    if(!detect(FORWARD(), OBJECT.WALL)){
		        if(detect(LEFT(), OBJECT.WALL)){
		            move(FORWARD());
		        }
		        else{
		            move(LEFT());
		        }
		    }
		    else{
		        draw();
		        if(detect(LEFT(), OBJECT.WALL)){
		            move(RIGHT());
		        }
		        else{
		            move(LEFT());
		        }
		    }
*/
		}
	}
}

class B extends Player {
	public B(BlockingQueue<String> in, BlockingQueue<String> out) {
		super(in, out);
		this.name = "PLAYER2_NAME";
                this.dir = DIR.SOUTH;
                this.drawNum = "2";
		getArea()[get_Position()[0]][get_Position()[1]] = this.drawNum;
	}

	public void run() {// プレイヤーBはこの中を書いてもらう
		for (int player2repeatcounter = 5000; player2repeatcounter > 0; player2repeatcounter--) {
			PLAYER2_CODE
/*
                    if(!detect(FORWARD(), OBJECT.WALL)){
		        if(detect(LEFT(), OBJECT.WALL)){
		            move(FORWARD());
		        }
		        else{
		            move(LEFT());
		        }
		    }
		    else{
		        draw();
		        if(detect(LEFT(), OBJECT.WALL)){
		            move(RIGHT());
		        }
		        else{
		            move(LEFT());
		        }
		    }
*/
		}
	}
}

public class Main {// merge output
	public static void main(String[] args) {
		BlockingQueue<String> a_in, a_out, b_in, b_out;
		a_in = new LinkedBlockingQueue<String>();
		a_out = new LinkedBlockingQueue<String>();
		b_in = new LinkedBlockingQueue<String>();
		b_out = new LinkedBlockingQueue<String>();

		A obj_a = new A(a_in, a_out);
		B obj_b = new B(b_in, b_out);

		Thread thread_a = new Thread(new Runnable() {

			@Override
			public void run() {
				obj_a.run();
			}
		});

		Thread thread_b = new Thread(new Runnable() {

			@Override
			public void run() {
				obj_b.run();
			}
		});

		thread_a.start();
		thread_b.start();

		try {
			while (true) {
				String s;

				s = a_out.take();
				System.out.println(s);
				a_in.put("");

				s = b_out.take();
				System.out.println(s);
				b_in.put("");

			}
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
---
title: Java语言程序设计基础篇 第八章 课后编程答案
date: 2014-04-06 13:33:32
categories: [JAVA]
tags: [JAVA]
---

## ch0801  

```Java
import java.util.Scanner;

public class ch0801{
	public static void main( String[] args ){
		Rectangle r1 = new Rectangle(4,40) ;
		Rectangle r2 = new Rectangle(3.5,35.9) ;
		System.out.println("Rectangle1 : width = " + r1.width + " , height = " + r1.height + " , area = " + r1.getArea() + " , perimeter = " + r1.getPerimeter() ) ;
		System.out.println("Rectangle2 : width = " + r2.width + " , height = " + r2.height + " , area = " + r2.getArea() + " , perimeter = " + r2.getPerimeter() ) ;

	}
}

class Rectangle{
	double width ;
	double height ;
	Rectangle(){
		width = height = 1 ;
	}
	Rectangle( double w , double h ){
		width = w ;
		height = h ;
	}
	double getArea(){
		return width*height ;
	}
	double getPerimeter(){
		return (width+height)*2 ;
	}
}
```

<!-- more -->

## ch0802  

```Java
import java.util.Scanner;

public class ch0802{
	public static void main( String[] args ){
		Stock myStock = new Stock("JAVA","Sum Microsystems Inc") ;
		myStock.setPreviousClosingPrice(4.5) ;
		myStock.setCurrentPrice(4.35) ;
		System.out.println("Has changed " + myStock.getChangePerent() ) ;
	}
}

class Stock{
	private String symbol ;
	private String name ;
	private double previousClosingPrice ;
	private double currentPrice ;
	Stock(){

	}
	Stock( String symbol , String name ){
		this.symbol = symbol ;
		this.name = name ;
	}
	double getChangePerent(){
		return (currentPrice-previousClosingPrice)/previousClosingPrice ;
	}
	void setPreviousClosingPrice( double previousClosingPrice ){
		this.previousClosingPrice = previousClosingPrice ;
	}
	void setCurrentPrice( double currentPrice ){
		this.currentPrice = currentPrice ;
	}
}
```

## ch0803  

```Java
import java.util.Date;
public class ch0803{
	public static void main( String[] args ){
		Date date = new Date() ;
		long goesTime = 10000 ;
		int times = 1 ;
		while( times <= 8 ){
			date.setTime(goesTime);
			System.out.println(date.toString()) ;
			goesTime = goesTime * 10 ;
			times++ ;
		}
	}
}
```

## ch0804  

```Java
import java.util.Random;

public class ch0804{
	public static void main( String[] args ){
		Random random = new Random(1000) ;
		int i = 0 ;
		while( i < 50 ){
			int x = random.nextInt(100) ;
			System.out.println(x) ;
			++i ;
		}
	}
}
```

## ch0805  

```Java
import java.util.GregorianCalendar;

public class ch0805{
	public static void main( String[] args ){
		myGregorianCalendar calendar = new myGregorianCalendar() ;
		calendar.show_date() ;
		calendar.set(123456789765L) ;
		calendar.show_date() ;
	}
}

class myGregorianCalendar{
	private GregorianCalendar ca ;
	private int year ;
	private int month ;
	private int day ;
	myGregorianCalendar(){
		ca = new GregorianCalendar() ;
		year = ca.get(GregorianCalendar.YEAR) ;
		month = ca.get(GregorianCalendar.MONTH) + 1 ;
		day = ca.get(GregorianCalendar.DAY_OF_MONTH) ;
	}
	void show_date(){
		System.out.println( "Current date is " + month + " " + day + ", " + year ) ;
	}
	void set( long d ){
		ca.setTimeInMillis(d) ;
		year = ca.get(GregorianCalendar.YEAR) ;
		month = ca.get(GregorianCalendar.MONTH) + 1 ;
		day = ca.get(GregorianCalendar.DAY_OF_MONTH) ;
	}
}
```

## ch0806  

```Java
import java.util.Scanner;
import javax.swing.JOptionPane;

public class ch0806 {
    public static void main(String[] args) {

        PrintCalendar myCalendar = new PrintCalendar() ;

        myCalendar.print() ;

    }
}

class PrintCalendar{
    int year ;
    int month ;
    // static String output ;
    PrintCalendar(){

        Scanner in = new Scanner(System.in) ;

        System.out.print("Enter Year : ") ;

        year = in.nextInt() ;

        System.out.print("Enter Month: ") ;

        month = in.nextInt() ;

    }
    void print(){
        int st = this.getFirst() ;
        String output = "" ;
        output += "      " + monthInEnglish() + ", " + year + "\n" ;
        output += "-------------------------------\n" ;
        output += " Sum Mon Tue Wed Thu Fri Sat\n" ;
        int days = getMonthDays() ;
        int p_day = 1 ;
        for( int i = 0 ; i < st ; ++i ){
            output += "    " ;
        }
        while( st <= 6 ){
            output += "   " + p_day ;
            p_day++ ;
            st++ ;
        }
        output += "\n" ;
        while( true ){
            for( int i = 0 ; i < 7 ; ++i ){
                output += "  " + (p_day<10?(" "+p_day):(p_day)) ;
                p_day++ ;
                if( p_day > days )
                    break ;
            }
            output += "\n" ;
            if( p_day > days )
                break ;
        }
        System.out.println(output);
    }
    int getFirst(){
        int c ;
        int y ;
        int m ;
        int d = 1 ;
        if( month >= 3 ){
            m = month ;
            c = year/100 ;
            y = year%100 ;
        }
        else{
            m = 12 + month ;
            c = (year-1)/100 ;
            y = (year-1)%100 ;
        }
        int w = y + y/4 + c/4 - 2*c + 26*(m+1)/10 + d - 1 ;
        w = w % 7 ;
        if( w < 0 ) w += 7 ;
        return w ;
    }
    String monthInEnglish(){
        String[] m = { "" , "January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December" } ;
        return m[month] ;
    }
    int getMonthDays(){
        if( month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12 )
            return 31 ;
        if( month != 2 )
            return 30 ;
        if( year % 4 == 0 && ( year % 100 != 0 || year % 400 == 0 ) )
            return 29 ;
        return 28 ;
    }
}
```

## ch0807  

```Java
import java.util.Date;
import java.util.Scanner;

public class ch0807{
	public static void main( String[] args ){
		Account myAccount = new Account(1122,20000) ;
		myAccount.setAnnualInterestRate(4.5) ;
		myAccount.withDraw(2500) ;
		myAccount.deposit(3000) ;
		System.out.println( "balance =: " + myAccount.getBalance()) ;
		System.out.println( "MonthlyTnterest =: " + myAccount.getMonthlyTnterest()) ;
		System.out.println(myAccount.getDateCreated()) ;
	}
}

class Account{
	private int id ;
	private double balance ;
	private double annualInterestRate ;
	Date dateCreated ;
	Account(){
		id = 0 ;
		balance = annualInterestRate = 0 ;
		dateCreated = new Date() ;
	}
	Account( int id , double balance ){
		this.id = id ;
		this.balance = balance ;
		annualInterestRate = 0 ;
		dateCreated = new Date() ;
	}
	int getId(){
		return id ;
	}
	double getBalance(){
		return balance ;
	}
	double getAnnualInterestRate(){
		return annualInterestRate ;
	}
	void setId( int id ){
		this.id = id ;
	}
	void setBalance( double balance ){
		this.balance = balance ;
	}
	void setAnnualInterestRate( double annualInterestRate ){
		this.annualInterestRate = annualInterestRate ;
	}
	Date getDateCreated(){
		return dateCreated ;
	}
	double getMonthlyTnterest(){
		return balance * (annualInterestRate/1200) ;
	}
	void withDraw( double num ){
		balance -= num ;
	}
	void deposit( double num ){
		balance += num ;
	}
}
```

## ch0808  

```Java
public class ch0808{
	public static void main( String[] args ){
		Fan fan1 = new Fan() ;
		fan1.setSpeed(3) ;
		fan1.setRadius(10) ;
		fan1.setColor("yellow") ;
		fan1.setOn(true) ;
		Fan fan2 = new Fan() ;
		fan2.setSpeed(2) ;
		fan2.setRadius(5) ;
		fan2.setColor("blue") ;
		fan2.setOn(false) ;
		System.out.println("fan1:\n" + fan1.tostring()) ;
		System.out.println("fan2:\n" + fan2.tostring()) ;
	}
}

class Fan{
	public static int SLOW = 1 ;
	public static int MEDIUM = 2 ;
	public static int FAST = 3 ;
	private int speed ;
	private boolean on ;
	private double radius ;
	String color ;
	Fan(){
		speed = SLOW ;
		on = false ;
		radius = 5 ;
		color = "blue" ;
	}
	int getSpeed(){
		return speed ;
	}
	void setSpeed( int speed ){
		this.speed = speed ;
	}
	boolean getOn(){
		return on ;
	}
	void setOn( boolean on ){
		this.on = on ;
	}
	double getRadius(){
		return radius ;
	}
	void setRadius( double radius ){
		this.radius = radius ;
	}
	String getColor(){
		return color ;
	}
	void setColor( String color ){
		this.color = color ;
	}
	String tostring(){
		if( on )
			return "Fan is on and:\nNow speed is " + speed + "\nColor is " + color + "\nRadius is " + radius + "\n" ;
		else
			return "Fan is off and:\nColor is " + color + "\nRadius is " + radius + "\n" ;
	}

}
```

## ch0809  

```Java
import java.util.Scanner;

public class ch0809{
	public static void main( String[] args ){
		RegularPolygon re1 = new RegularPolygon() ;
		RegularPolygon re2 = new RegularPolygon(6,4) ;
		RegularPolygon re3 = new RegularPolygon(10,4,5.6,7.8) ;
		System.out.println( "re1 perimeter is: " + re1.getPerimeter() ) ;
		System.out.println( "re1 area is: " + re1.getArea() ) ;
		System.out.println( "re2 perimeter is: " + re2.getPerimeter() ) ;
		System.out.println( "re2 area is: " + re2.getArea() ) ;
		System.out.println( "re3 perimeter is: " + re3.getPerimeter() ) ;
		System.out.println( "re3 area is: " + re3.getArea() ) ;
	}
}

class RegularPolygon{
	private int n ;
	private double side ;
	private double x ;
	private double y ;
	RegularPolygon(){
		this.n = 3 ;
		this.side = 1 ;
		this.x = 0 ;
		this.y = 0 ;
	}
	RegularPolygon( int n , double side ){
		this.x = y = 0 ;
		this.n = n ;
		this.side = side ;
	}
	RegularPolygon( int n , double side , double x , double y ){
		this.n = n ;
		this.side = side ;
		this.x = x ;
		this.y = y ;
	}
	int getN(){
		return n ;
	}
	double getSide(){
		return side ;
	}
	double getX(){
		return x ;
	}
	double getY(){
		return y ;
	}
	void setN( int n ){
		this.n = n ;
	}
	void setSide( double side ){
		this.side = side ;
	}
	void setX( double x ){
		this.x = x ;
	}
	void setY( double y ){
		this.y = y ;
	}
	double getPerimeter(){
		return n * side ;
	}
	double getArea(){
		return n*side*side/4/Math.tan(side) ;
	}
}
```

## ch0810  

```Java
import java.util.Scanner;
public class ch0810{
	public static void main( String[] args ){
		Scanner in = new Scanner(System.in) ;
		System.out.print("Enter a, b, c: ") ;
		double a = in.nextDouble() ;
		double b = in.nextDouble() ;
		double c = in.nextDouble() ;
		QuadraticEquation qua = new QuadraticEquation(a,b,c) ;
		System.out.println("Discriminant is: "+qua.getDiscriminant()) ;
		if( qua.getDiscriminant() >= 0 ){
			System.out.println("Root1 is: " + qua.getRoot1() ) ;
			System.out.println("Root2 is: " + qua.getRoot2() ) ;
		}
	}
}

class QuadraticEquation{
	private double a ;
	private double b ;
	private double c ;
	QuadraticEquation( double a , double b , double c ){
		this.a = a ;
		this.b = b ;
		this.c = c ;
	}
	double getA(){
		return a ;
	}
	double getB(){
		return b ;
	}
	double getC(){
		return c ;
	}
	double getDiscriminant(){
		return b*b - 4*a*c ;
	}
	double getRoot1(){
		if( this.getDiscriminant() < 0 )
			return 0 ;
		return (-b+Math.sqrt(this.getDiscriminant()))/(2*a) ;
	}
	double getRoot2(){
		if( this.getDiscriminant() < 0 )
			return 0 ;
		return (-b+Math.sqrt(this.getDiscriminant()))/(2*a) ;
	}
}
```

## ch0811  

```Java
import java.util.Scanner;
public class ch0811{
	public static void main( String[] args ){
		Scanner in = new Scanner(System.in) ;
		System.out.println("Enter a, b, c, d, e, f: ") ;
		double a = in.nextDouble() ;
		double b = in.nextDouble() ;
		double c = in.nextDouble() ;
		double d = in.nextDouble() ;
		double e = in.nextDouble() ;
		double f = in.nextDouble() ;
		LinearEquation line = new LinearEquation(a,b,c,d,e,f) ;
		if( line.isSolvable() == false )
			System.out.println("The equation has no solution.") ;
		else
			System.out.println("X = " + line.getX() + " , Y = " + line.getY() ) ;
	}
}

class LinearEquation{
	private double a ;
	private double b ;
	private double c ;
	private double d ;
	private double e ;
	private double f ;
	LinearEquation(double a, double b, double c, double d, double e, double f){
		this.a = a ;
		this.b = b ;
		this.c = c ;
		this.d = d ;
		this.e = e ;
		this.f = f ;
	}
	boolean isSolvable(){
		if( (a*d - b*c) != 0 )
			return true ;
		return false ;
	}
	double getX(){
		return (e*d-b*f)/(a*d-b*c) ;
	}
	double getY(){
		return (a*f-e*c)/(a*d-b*c) ;
	}
}
```

## ch0812  

```Java
import java.util.Scanner;

public class ch0812{
	public static void main( String[] args ){
		double sx , sy , ex , ey ;
		line l1 = new line() ;
		line l2 = new line() ;
		Scanner in = new Scanner(System.in) ;
		System.out.print("Enter the endpoints of the first line segment:" ) ;
		sx = in.nextDouble() ;
		sy = in.nextDouble() ;
		ex = in.nextDouble() ;
		ey = in.nextDouble() ;
		l1.set(sx,sy,ex,ey);
		System.out.print("Enter the endpoints of the second line segment:" ) ;
		sx = in.nextDouble() ;
		sy = in.nextDouble() ;
		ex = in.nextDouble() ;
		ey = in.nextDouble() ;
		l2.set(sx,sy,ex,ey) ;
		l1.show_crosser_with(l2) ;
	}
}

class line{
	private double sx ;
	private double sy ;
	private double ex ;
	private double ey ;
	line(){
		this.sx = 0 ;
		this.sy = 0 ;
		this.ex = 0 ;
		this.ey = 0 ;
	}
	void set( double sx , double sy , double ex , double ey ){
		this.sx = sx ;
		this.sy = sy ;
		this.ex = ex ;
		this.ey = ey ;
	}
	void show_crosser_with( line line2 ){
		double k1 = (ey-sy)/(ex-sx) ;
		double k2 = (line2.ey-line2.sy)/(line2.ex-line2.sx) ;
		if( k1 == k2 ){
			System.out.println( "These two lines are parallel to each other !" ) ;
		}
		else{
			double csx , csy ;
			double b1 = sy - k1*sx ;
			double b2 = line2.sy - k2*line2.sx ;
			csx = (b2-b1)/(k1-k2) ;
			csy = k1*(b2-b1)/(k1-k2) + b1 ;
			System.out.println( "The intersecting point is: (" + csx + ", " + csy + ")" ) ;
		}
	}
}
```

## ch0813  

```Java
import java.util.Scanner;

public class ch0813{
	static int r , c ;
	public static void main( String[] args ){
		Scanner in = new Scanner(System.in) ;
		System.out.print("Enter the number of rows and columns of the array: ") ;
		r = in.nextInt() ;
		c = in.nextInt() ;
		double[][] a = new double[r][c] ;
		for( int i = 0 ; i < r ; ++i ){
			for( int j = 0 ; j < c ; ++j ){
				a[i][j] = in.nextDouble() ;
			}
		}
		Location locat = new Location() ;
		locat = locateLargest(a) ;
		System.out.println("The location of the largest element is " + locat.maxValue + " at (" + locat.row + ", " + locat.column + ")");
	}

	public static Location locateLargest( double[][] a ){
		Location locat = new Location() ;
		locat.maxValue = -0xffffff ;
		for( int i = 0 ; i < r ; ++i ){
			for( int j = 0 ; j < c ; ++j ){
				if( a[i][j] > locat.maxValue ){
					locat.maxValue = a[i][j] ;
					locat.row = i ;
					locat.column = j ;
				}
			}
		}
		return locat ;
	}
}

class Location{
	public int row ;
	public int column ;
	public double maxValue ;
}
```

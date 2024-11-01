// primitive

let test :string|number

test = 3
test = "feji"

// array

let array: (string|number|never[]|boolean)[] = ["fi", 1, []]
let empty = []
array.push(true)

// object
let user = {
    name: "A",
    age: 2,
}

let usertype : {
    name: string;
    age: number;
}

let user2: {
    name: string;
    phone?: number;
}

// fucntion
let sayHi = ():string => {
    console.log("hello");
    return "hello";

}

// 公開関数
// 肩によって変わる関数

// type

type usertype = {
    username: string;
    age: number;
}

let a: usertype = {
    username : "fej",
    age: 2
}

// interfaace

interface IUser {
    username: string;
    age: number;
}

interface IEmployee extends IUser{
    id: number;
}

interface Student{
    studentId: number
}
interface Teacher{
    teacherId: number
}

interface TA extends Student, Teacher{
    calc_salary: () => number
}

const ta : TA = {
    studentId: 2,
    teacherId: 3,
    calc_salary: () =>{
        return 2;
    }
}

// Generic

interface IPostBetter<T>{
    id: number;
    content: string;
    extra: T[]
}

interface IAuthor{
    name: string,
    age: number
}



const post : IPostBetter<string> = {
    id: 3,
    content: "test",
    extra: ["fei", "feij"]
}

interface IPostBetter2<T extends object>{
    id: number;
    content: string;
    extra: T[]
}

const post2: IPostBetter2<{id: number}> = {
    id: 3,
    content: "fe",
    extra: [{id: 1}]
}

//// 再帰

function factorial(n: number): number {
    if(n <=1) return 1;
    return n * factorial(n-1);
}

console.log(factorial(10))

const factorial2 = (n:number): number => {
    if( n<=1) return 1;
    return n * factorial2(n-1)
}

console.log(factorial2(10))

type ShapeType = "cube" | "square" | "rectangle" | "triangle";
type TwoDShapeType = Exclude<ShapeType, "cube">;


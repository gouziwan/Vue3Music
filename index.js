let a = { name: 1, b: { name: 2 } }


// 浅拷贝
let b = { ...a };


b.b.name = 4;


console.log(a.b.name)

// 深拷贝

let c = {
    ...a,
    b: { ...a.b }
}


c.b.name = 5;


console.log(a.b.name)
export function test(){

    let a = 0;
    let arr = ['jeff', 'adi', 'bryce'];
    arr.forEach(()=>{
        console.log("ayo we testing")
        await new Promise((resolve, reject)=>{
            console.log(a);
            console.log(arr[a]);
            resolve();
        });
        a++;
    });

}

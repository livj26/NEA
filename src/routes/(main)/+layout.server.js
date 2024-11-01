
export async function load (event){
    console.log("Layout:", event.locals.employeeid);
    return { employeeid: event.locals.employeeid }
}
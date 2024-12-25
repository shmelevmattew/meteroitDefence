import supabase from "../client";
export interface TableRow {
    id:number,
    name:string,
    score:number,
    place?: number
}
export async function getScores() {
    console.log(123)

    const { data = {} , error } = await supabase.from('score').select("id,name,score").order("score",{ascending: false})
    console.log(data)
    return data as TableRow[]
}
export async function addScore(name : string,score : number){
    const { data = {} , error } = await supabase.from('score').insert({name,score})
    console.log(data,error)
    return data as TableRow[]
}
export  async function getByName(name : string){
    const { data = {} , error } = await supabase.from('score').select("id,name,score").eq('name',name).order("score",{ascending: false})
    console.log(data)
    return data as TableRow[]
}
export async function insertScore(newScore : number,name : string){
    const { error } = await supabase
        .from('score')
        .update({ score: newScore })
        .eq('name', name)
    console.log(error)
    return error
}
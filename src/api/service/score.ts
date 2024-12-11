import supabase from "../client";
export interface TableRow {
    id:number,
    name:string,
    score:number
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

const fs=require('fs')
const chalk=require('chalk')

const addNote=(title,body)=>{
    const notes=loadNotes()
    const duplicateNotes=notes.filter((note)=>note.title===title)
     
    if(duplicateNotes.length===0)
    {
        notes.push({
            title:title,
            body:body
        })
       saveNotes(notes)
       console.log(chalk.green('New Note Added'))
    }
    else
    {
        console.log(chalk.red("Note Title Taken"))
    }
}

const removeNote=(title)=>{
    const notes=loadNotes()
    const notesToKeep=notes.filter((note)=>note.title!==title)
    
    if(notes.length>notesToKeep.length)
    {
        console.log(chalk.green('Note Removed'))
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red('No Note Found'))
    }
} 

const listNotes=()=>{
    console.log(chalk.inverse("Your Lists"))
    const notes=loadNotes()
    notes.forEach((note)=>{
        console.log(note.title)
    })

}

const readNotes=(title)=>{
    const notes=loadNotes()
    const note=notes.find((note)=>note.title===title)
    if(note)
    {
        console.log(chalk.inverse.green(note.title))
        console.log(note.body)
    }
    else
    {
        console.log(chalk.red("No Notes Added"))
    }
}

const saveNotes=(notes)=>{
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)

}



const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync('notes.json')
        const dataJSON=dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []

    }
    
    

}

module.exports={
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}
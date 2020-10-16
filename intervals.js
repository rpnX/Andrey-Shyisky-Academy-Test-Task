function intervalConstruction(arr) {

    const Intervals = {
        m2 : {semitone : 1, degrees: 2},
        M2 : {semitone : 2, degrees: 2},
        m3 : {semitone : 3, degrees: 3},
        M3 : {semitone : 4, degrees: 3},
        P4 : {semitone : 5, degrees: 4},
        P5 : {semitone : 7, degrees: 5},
        m6 : {semitone : 8, degrees: 6},
        M6 : {semitone : 9, degrees: 6},
        m7 : {semitone : 10, degrees: 7},
        M7 : {semitone : 11, degrees: 7},
        P8 : {semitone : 12, degrees: 8}
    }
    
    const MIN_ARGUMENT_NUMBER = 2
    const MAX_ARGUMENT_NUMBER = 3
    
    const Notes = {
        full: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        //      0    1    2    3    4    5    6
        half: ['Cbb', 'Cb', 'C', 'C#', 'C##', 'Dbb', 'Db', 'D', 'D#', 'D##', 'Ebb', 'Eb', 'E', 'E#', 'E##', 'Fbb', 'Fb', 'F', 'F#', 'F##', 'Gbb', 'Gb', 'G', 'G#', 'G##', 'Abb', 'Ab', 'A', 'A#', 'A##', 'Bbb', 'Bb', 'B', 'B#', 'B##']
    }
    
    const Semitons = [
        'C', 1, 'D', 1, 'E', 'F', 1, 'G', 1, 'A', 1, 'B',
    //   0   1   2   3   4    5   6   7   8   9  10   11  
    //   1   2   3   4   5    6   7   8   9  10  11   12
    ]
    
    const [Interval, StartNote, sc = 'asc'] = arr

    let Note = StartNote[0]

    let SemitoneNumber

    if (StartNote[1] == '#'){
        SemitoneNumber = 1
    } else if (!StartNote[1]){
        SemitoneNumber = 0
    } else {
        SemitoneNumber = -1
    }
    if(StartNote.length > 2){
        SemitoneNumber*=2
    }

    let startSemitons = Semitons.indexOf(Note) + SemitoneNumber

    if((arr.length < MIN_ARGUMENT_NUMBER) || (arr.length > MAX_ARGUMENT_NUMBER)){
        throw "Illegal number of elements in input array"
    }
    if(!Intervals[Interval]){
        throw "Intervals is not valid"
    }
    if(Notes.half.indexOf(StartNote) == -1){
        throw "Wrong Note"
    }

    const FindEndNoteAsc = (Note, Interval) => {
        if ((Intervals[Interval].degrees + Notes.full.indexOf(Note)) < (Notes.full.length - 1)){
            result = Notes.full.indexOf(Note) + Intervals[Interval].degrees - 1
        } else {
            result = Intervals[Interval].degrees - (Notes.full.length - Notes.full.indexOf(Note)) - 1
        }
        
        return(Notes.full[result])
    }
    const FindEndNoteDsc = (Note, Interval) => {

        if (( Notes.full.indexOf(Note)) >= (Intervals[Interval].degrees - 1)){
            result = Notes.full.indexOf(Note) - (Intervals[Interval].degrees - 1)
        } else {
            result = Notes.full.length - (Intervals[Interval].degrees - (Notes.full.indexOf(Note) + 1)) 
        }
        
        return(Notes.full[result])
    }

    const EndNote = () =>{
        if (sc == 'dsc'){
            return FindEndNoteDsc(Note, Interval)
        } else {
            return FindEndNoteAsc(Note, Interval)
        }
    }

    const FindEndSemitoneAsc = (startSemitons, Interval) => {

        if ((Intervals[Interval].semitone + startSemitons) < (Semitons.length - 1)){
            result = startSemitons + Intervals[Interval].semitone
        } else {
            result = Intervals[Interval].semitone - (Semitons.length - startSemitons)
        }
        
        return(result)
    }

    const FindEndSemitoneDsc = (startSemitons, Interval) => {

        if ((startSemitons) >= (Intervals[Interval].semitone )){
            result = startSemitons - (Intervals[Interval].semitone)
        } else {
            result = Semitons.length - (Intervals[Interval].semitone - (startSemitons)) 
        }
        
        return(result)
    }

    const EndSemitone = () =>{
        if (sc == 'dsc'){
            return FindEndSemitoneDsc(startSemitons, Interval)
        } else {
            return FindEndSemitoneAsc(startSemitons, Interval)
        }
    }

    let difSemitonesNotes = EndSemitone() - Semitons.indexOf(EndNote())

    let ResultKey = Notes.half.indexOf(EndNote()) + difSemitonesNotes

    let Result = Notes.half[ResultKey]

    console.log(Result)
    
    return(Result)
    

}

intervalConstruction(['M2', 'C', 'dsc'])  //Bb
intervalConstruction(['M2', 'C', 'asc'])  //D
intervalConstruction(['P5', 'B', 'asc'])  //F#
intervalConstruction(['m2', 'Bb', 'dsc'])  //A
intervalConstruction(['M3', 'Cb', 'dsc'])  //Abb
intervalConstruction(['P4', 'G#', 'dsc'])	//D#
intervalConstruction(['m3', 'B', 'dsc']) 	//G#
intervalConstruction(['m2', 'Fb', 'asc'])	//Gbb
intervalConstruction(['M2', 'E#', 'dsc'])  //D#
intervalConstruction(['P4', 'E', 'dsc'])  //B
intervalConstruction(['m2', 'D#', 'asc'])	//E
intervalConstruction(['M7', 'G', 'asc'])	 //F#
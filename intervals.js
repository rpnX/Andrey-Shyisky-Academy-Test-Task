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
    if((sc !== 'asc') && (sc !== 'dsc')){
        throw "Illegal direction" 
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
    return(Result)

}

function intervalIdentification(arr) {

    const Intervals = {
        1 : 'm2',
        2 : 'M2',
        3 : 'm3',
        4 : 'M3',
        5 : 'P4',
        7 : 'P5',
        8 : 'm6',
        9 : 'M6',
        10 : 'm7',
        11 : 'M7',
        12 : 'P8'
    }
    const MIN_ARGUMENT_NUMBER = 2
    const MAX_ARGUMENT_NUMBER = 3
    
    const Notes = {
        half: ['Cbb', 'Cb', 'C', 'C#', 'C##', 'Dbb', 'Db', 'D', 'D#', 'D##', 'Ebb', 'Eb', 'E', 'E#', 'E##', 'Fbb', 'Fb', 'F', 'F#', 'F##', 'Gbb', 'Gb', 'G', 'G#', 'G##', 'Abb', 'Ab', 'A', 'A#', 'A##', 'Bbb', 'Bb', 'B', 'B#', 'B##'],
        full: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        //      0    1    2    3    4    5    6
        semitons : ['C', 1, 'D', 1, 'E', 'F', 1, 'G', 1, 'A', 1, 'B']
                //   0   1   2   3   4    5   6   7   8   9  10   11  
    }

    const [StartNote, EndNote, sc = 'asc'] = arr

    const StartNoteOnce = StartNote[0]
    const EndNoteOnce = EndNote[0]
    if((arr.length < MIN_ARGUMENT_NUMBER) || (arr.length > MAX_ARGUMENT_NUMBER)){
        throw "Illegal number of elements in input array"
    }

    if(Notes.half.indexOf(StartNote) == -1){
        throw "Wrong First Note"
    }
    if(Notes.half.indexOf(EndNote) == -1){
        throw "Wrong Last Note"
    }
    if((sc !== 'asc') && (sc !== 'dsc')){
        throw "Illegal direction" 
    }

    const SemitoneNumber = (Note) => {

        let NoteSemitoneNumber

        if (Note[1] == '#'){
            NoteSemitoneNumber = 1
        } else if (!Note[1]){
            NoteSemitoneNumber = 0
        } else {
            NoteSemitoneNumber = -1
        }
        if(Note.length > 2){
            NoteSemitoneNumber*=2
        }
        return NoteSemitoneNumber
    }
    const StartSemitoneOnce = Notes.semitons.indexOf(StartNoteOnce) + SemitoneNumber(StartNote)
    const EndSemitoneOnce = Notes.semitons.indexOf(EndNoteOnce) + SemitoneNumber(EndNote)

    const SemitonesAsc = (StartSemitoneOnce, EndSemitoneOnce) => {
        if (StartSemitoneOnce < EndSemitoneOnce){
            result = EndSemitoneOnce - StartSemitoneOnce
        } else {
            result = (Notes.semitons.length) - StartSemitoneOnce + EndSemitoneOnce
        }
        return(result)
    }

    const SemitonesDsc = (StartSemitoneOnce, EndSemitoneOnce) => {
        if (StartSemitoneOnce > EndSemitoneOnce){
            result = StartSemitoneOnce - EndSemitoneOnce
        } else {
            result = StartSemitoneOnce + (Notes.semitons.length - EndSemitoneOnce)
        }
        return(result)
    }

    const Semitones = () => {
        if (sc == 'asc'){
            return SemitonesAsc(StartSemitoneOnce, EndSemitoneOnce)
        } else {
            return SemitonesDsc(StartSemitoneOnce, EndSemitoneOnce)
        }
    }

    const Result = Intervals[Semitones()]

    return(Result)

}


intervalIdentification(['C', 'D'])	      //M2
intervalIdentification(['B', 'F#', 'asc'])  //P5
intervalIdentification(['Fb', 'Gbb'])	      //m2
intervalIdentification(['G', 'F#', 'asc'])  //M7
intervalIdentification(['Bb', 'A', 'dsc'])  //m2
intervalIdentification(['Cb', 'Abb', 'dsc']) //M3
intervalIdentification(['G#', 'D#', 'dsc']) //P4
intervalIdentification(['E', 'B', 'dsc'])	  //P4
intervalIdentification(['E#', 'D#', 'dsc']) //M2
intervalIdentification(['B', 'G#', 'dsc'])  //m3
intervalIdentification(['G', 'G', 'dsc'])  //P8
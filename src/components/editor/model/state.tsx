

const State = {
    models:{},
}
export type StateType = {
    models: { [key:string]: any },
}

export default State

// class M<A> {

// }


// interface Functor<F> { // 思考为啥<F>不是<A,B>
//     fmap:<A,B>(h:(a:A)=>B) => (f:[F,A]) => [F,B]
// }

// type StateM<S, A> = (x: S) => [A, S]    
// const runState = <S,A>(sm: StateM<S, A>) => [A, StateM<S, A>]

// interface MonadStateJSON<A> extends StateM<{}, A> {
//     return:(a:A)=> StateM<{},A>;
//     bind:<B>(s:StateM<{},A>) => (f: (x:A) => StateM<{},B>) => StateM<{},B>
// }

// class MonadStateJSON<A> implements MonadStateJSON<A> {
//     return = (a:A):StateM<{}, A> => (s:{})=>[a,s]
//     bind = (pre_s:StateM<{}, A>) => (k:(a:A)=>StateM<{}, A>):StateM<{},B> => {
//         let [A,S] = pre_s
//     }
// }

// const getState = (m:MonadStateJSON<{}>) => {

// }


// const ComA = (props:any,children) => {
    


//     return (props:any) => {

//     }
// }
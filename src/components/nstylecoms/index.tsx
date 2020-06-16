import React, {FunctionComponent, ComponentType, ReactNode, ReactElement, ElementType, MouseEvent, cloneElement, PropsWithChildren, HTMLAttributes, DetailedReactHTMLElement} from 'react'
import { FnParamType } from 'src/common/type/helper'
export * from './state'

export type LayoutType = HLayoutType | VLayoutType

type HLayoutType = "HLayoutType" 
type VLayoutType = "VLayoutType"
export const Layout = ({styl, es}:{styl:LayoutType, es:Array<ReactElement>}) => {
    console.log("Layout render")
    if (styl == "HLayoutType") {
        return <div>
            {
                es.map(i=><div>{i}</div>)
            }
        </div>
    } else {
        return <div style={{display:"flex"}}>
            {
                es.map(i=><div>{i}</div>)
            }
        </div>
    }
}

// type CheckType<P> = Pick<{a:string} & P, Exclude<keyof P, "a" >>

// const f = <P extends {}>(a:CheckType<P>)

export const Title: React.FC<{value:string}> = ({value}) => {
    console.log("Title render")
    return <div>{value}</div>
}

// const PostMail: React.FC<{children:ReactElement|ReactElement<MultiPropsType<any, any>>}> = ({children}) => {
//     // children.map(e=>{
//     //     console.log(e)
//     // })//创建Element但还没渲染，这时可以重新组织

    
//     if (children.type === Multi) {
//         const e:ReactElement<MultiPropsType<any, any>> = children
//         e.props.children.reduce((i:ReactElement, r:{})=>{ // 分组
//             if(i.type=="button") {
//                 return cloneElement(i, {...i.props})
//             }
//         },{button:[], titles:[]})
//     }
//     return <div>
//         {children}
//     </div>
// }

// type MultiPropsType<P extends HTMLAttributes<T>, T extends HTMLElement> =  P & {children:Array<DetailedReactHTMLElement<P, T>>}

// type MultiType = <P extends HTMLAttributes<T>, T extends HTMLElement>(p:MultiPropsType<P,T>) => ReactElement<MultiPropsType<P,T>>

// const Multi:MultiType = ({children, ...p}) => <div>{children.map(re=>cloneElement(re, p))}</div>



// const Content: React.FC<{value2:string}> = ({value2}) => <div>{value2}</div>

// const Button: React.FC<{onClick: (event: MouseEvent<HTMLButtonElement>) => void}> = ({onClick}) => <button onClick={onClick} />

// const StateA: 


// export {
//     PostMail as default,
//     Title,
//     Multi,
//     Content
// }




import React from 'react'
import { LayoutType } from './index'

export const StateFC = <P>(com:React.FC<P>, testFunc:Function):React.ComponentType<P> => 
class StateComponent extends React.Component<P> {
    com:React.FC<P>;
    state:P;

    constructor(props:P) {
        super(props);
        this.com = com
        this.state = props

        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.setState(testFunc(this.state))
    }


    render() {
        return React.createElement("div", {onClick:this.onClick}, React.createElement(this.com, this.state))
    }
}

export const Layout2= <P>(props:{styl:LayoutType, es:Array<React.FC<P>>} & P) => {
    props.es=[]
    // const {styl, es, ...p} = props
    console.log("Layout2 render")
    if (props.styl == "HLayoutType") {
        return React.createElement("div", {}, props.es.map(i=>React.createElement("div", {}, React.createElement(i, props))))
    } else {
        return React.createElement("div", {style:{display:"flex"}}, props.es.map(i=>React.createElement("div", {}, React.createElement(i, props))))
    }
}
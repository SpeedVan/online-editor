import React from 'react';
import style from './style.module.css';
import {Layout as lo, Layout2, Title, StateFC, LayoutType} from 'src/components/nstylecoms'
const Layout = StateFC(lo, ({styl}:{styl:string}) => {
	return styl === "HLayoutType"? {styl:"VLayoutType"} : {styl:"HLayoutType"}
})



type PT = {styl:LayoutType, es:Array<React.FC<PT>>, value:string}

const Lo2 = StateFC<PT>(Layout2, ({styl}:{styl:string}) => {
	return styl === "HLayoutType"? {styl:"VLayoutType"} : {styl:"HLayoutType"}
})

// type P2 = {value: string} & typeof Lo2

// type P3 = typeof Title & {styl:LayoutType, es:Array<React.FC<P>>}

const Home = () => (
	<div className={style.home}>
		<h1>Home</h1>
		<p>This is the Home component.</p>
		<Layout styl={"VLayoutType"} es={[<Title value={"123"} />, <Title value={"abc"} />]}/>

		<Lo2 styl={"VLayoutType"} value={"456"} es={[Title, Title]} />
	</div>
);

export default Home;

import { StateType } from './state'

export const init = async (cb:Function) => {
    return await fetch("https://gitlab.com/api/v4/projects/sv_apitest%2Fp_apitest/repository/tree?ref=6ec5628bbb45e43c5903b3fe54249f296ac24e2c&path=/&per_page=500",{
      headers: {
          "Private-Token": "sF7us_xdFTBseuKeyvNo"
      }
    })
    .then(res => res.json())
    .then(j => cb(j.map((i:any)=>({title:i.name, isDirectory:i.type=="tree", expand:i.type=="tree" }))))
}
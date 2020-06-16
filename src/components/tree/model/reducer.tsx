
export const init = async (cb:Function) => {
    return await fetch("https://gitlab.com/api/v4/projects/sv_apitest%2Fp_apitest/repository/tree?ref=774ecfb6ab9b2e2ff66d80dcd39cdfa115cabb40&path=/&per_page=500",{
      headers: {
          "Private-Token": "sF7us_xdFTBseuKeyvNo"
      }
    })
    .then(res => res.json())
    .then(j => cb(j.map((i:any)=>({title:i.name, isDirectory:i.type==="tree", expand:i.type==="tree" }))))
}
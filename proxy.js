import fetch from "node-fetch";

export default async function handler(req, res) {
    const API_KEY = process.env.TCGAPI_KEY; // store this in Vercel secrets
    const { groupId } = req.query;

    if(req.url.includes("/groups")){
        const response = await fetch("https://api.tcgapis.com/pokemon/groups", {
            headers: { "X-Api-Key": API_KEY }
        });
        const data = await response.json();
        res.setHeader("Access-Control-Allow-Origin","*");
        res.json(data);
        return;
    }

    if(groupId){
        const response = await fetch(`https://api.tcgapis.com/pokemon/cards?groupId=${groupId}`, {
            headers: { "X-Api-Key": API_KEY }
        });
        const data = await response.json();
        res.setHeader("Access-Control-Allow-Origin","*");
        res.json(data);
        return;
    }

    res.status(400).json({error:"No endpoint specified"});
}

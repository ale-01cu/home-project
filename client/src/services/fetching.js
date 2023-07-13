
export const fetching = async ( url ) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }catch(e){
        console.log(e);
    }

}
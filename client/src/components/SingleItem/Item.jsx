export default function Item({ item }) {
    
    if (item) {
        return (
            <>
                <h1>{item.name}</h1>
                <div>
                    <img src={item.image}/>
                    <p>{item.description}</p>
                </div>
            </>
        )  
    }
}
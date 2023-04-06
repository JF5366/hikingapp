import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllTrails } from "../../services/trailService"

function Index({ user }) {

    const [trails, setTrails] = useState([])

    useEffect(() => {
        async function loadData() {
            const data = await getAllTrails()
            setTrails(data)
        }
        loadData()
    }, [])
    console.log(trails)
    return (
            <div className="index">
                <h1>Long Trails in the United States</h1>
                <div id="trails">

                        {trails?.map((trail, index) => 
                            <Link to={`/trails/${trail._id}`} key={index}>
                                <div className="trailz" style={{backgroundImage: `url(${trail.image})`}}>
                                    {trail.name}
                                
                                </div>
                            </Link>
                        )}
            
                    
    
                </div>
                {user && 
                        <Link to="/trails/new">
                            <button>NEW TRAIL</button>
                        </Link>
                    }
            </div>
    )
}

export default Index
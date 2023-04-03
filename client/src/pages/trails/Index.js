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
            <div>
                <h1>Index View of Trails</h1>
                <div id="trails">

                        {trails?.map((trail, index) => 
                            <Link to={`/trails/${trail._id}`} key={index}>
                                <div className="trailz">
                                    {trail.name}
                                </div>
                            </Link>
                        )}
            
                    {user && 
                        <Link to="/trails/new">
                            <button>NEW TRAIL</button>
                        </Link>
                    }
    
                </div>
            </div>
    )
}

export default Index
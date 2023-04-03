import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrails } from "../../services/trailService";

function New({ user }) {
    let [trail, setTrail] = useState({});
    let navigate = useNavigate()
    
    let nameRef = useRef()
    let lengthRef = useRef()
    let startRef = useRef()
    let endRef = useRef()

    

    async function handleSubmit(e) {
        e.preventDefault()
        let trail = {
            name: nameRef.current.value,
            length: lengthRef.current.value,
            start: startRef.current.value,
            end: endRef.current.value,
            user
        }
        let id = await createTrails(trail)
        navigate(`/trails/${id}`)
    }

    return ( 
        <div>
            <h1>New Trail</h1>
            <form onSubmit={handleSubmit}>
                    <label htmlFor="nme">Name:</label><br />
                    <input type="text" id="nme" ref={nameRef} defaultValue={trail.name} /><br /><br />

                    <label htmlFor="lgt">Length:</label><br />
                    <textarea ref={lengthRef} id="lgt" cols="30" rows="10" defaultValue={trail.length} /><br /><br />

                    <label htmlFor="str">Start:</label><br />
                    <textarea ref={startRef} id="str" cols="30" rows="10" defaultValue={trail.start} /><br /><br />

                    <label htmlFor="ed">End:</label><br />
                    <textarea ref={endRef} id="ed" cols="30" rows="10" defaultValue={trail.end} /><br /><br />

                <button>Submit</button>
            </form>
        </div>
     );
}

export default New;
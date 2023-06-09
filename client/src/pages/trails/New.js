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
    let timeRef = useRef()
    let imgRef = useRef()
    let latRef=useRef()
    let longRef=useRef()

    async function handleSubmit(e) {
        e.preventDefault()
        let trail = {
            name: nameRef.current.value,
            length: lengthRef.current.value,
            start: startRef.current.value,
            end: endRef.current.value,
            time: timeRef.current.value,
            image: imgRef.current.value,
            location: [Number(latRef.current.value),  Number(longRef.current.value)],
            user
        }
        let id = await createTrails(trail)
        navigate(`/trails/${id}`)
    }

    return ( 
        <div className="new">
            <h1>New Trail</h1>
            <form onSubmit={handleSubmit}>
                    <label htmlFor="nme">Name:</label>
                    <input type="text" id="nme" ref={nameRef} defaultValue={trail.name} /><br />

                    <label htmlFor="lgt">Length:</label>
                    <input type="text" ref={lengthRef} id="lgt" cols="30" rows="10" defaultValue={trail.length} /><br />

                    <label htmlFor="str">Start:</label>
                    <input type="text" ref={startRef} id="str" cols="30" rows="10" defaultValue={trail.start} /><br />

                    <label htmlFor="ed">End:</label>
                    <input type="text" ref={endRef} id="ed" cols="30" rows="10" defaultValue={trail.end} /><br />

                    <label htmlFor="tme">Duration:</label>
                    <input type="text" ref={timeRef} id="tme" cols="30" rows="10" defaultValue={trail.time} /><br />

                    <label htmlFor="imag">Image:</label>
                    <input type="text" ref={imgRef} id="imag"  defaultValue={trail.image} /><br />

                    <label htmlFor="lat">Latitude:</label>
                        <input type="text" ref={latRef} id="lat"  defaultValue={trail.location? trail.location[0] : 0} /><br />
                       
                        <label htmlFor="long">Longitude:</label>
                        <input type="text" ref={longRef} id="long"  defaultValue={trail.location? trail.location[1] : 0} /><br />




                <button>Submit</button>
            </form>
        </div>
     );
}

export default New;
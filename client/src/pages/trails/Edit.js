import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getTrails, updateTrails } from '../../services/trailService'

function Edit() {

    const [trail, setTrail] = useState({})

    const navigate = useNavigate()
    const params = useParams()

    let nameRef = useRef()
    let lengthRef = useRef()
    let startRef = useRef()
    let endRef = useRef()
    let timeRef = useRef()
    let imgRef = useRef()
    let latRef=useRef()
    let longRef=useRef()

    useEffect(() => {
        getTrails(params.id).then(data => setTrail(data))
    }, [params.id])

    async function handleSubmit(e) {
        e.preventDefault()
        let updatedTrail= {
            name: nameRef.current.value,
            length: lengthRef.current.value,
            start: startRef.current.value,
            end: endRef.current.value,
            time: timeRef.current.value,
            image: imgRef.current.value,
            location: [Number(latRef.current.value),  Number(longRef.current.value)]
        }
        await updateTrails(trail._id, updatedTrail)
        navigate(`/trails/${trail._id}`)
    }

    return ( 
        <div className='edit'>
            <h1>Edit Trail</h1>
            <div className='edits' style={{ flexDirection: 'column' }}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nme">Name:</label>
                    <input type="text" id="nme" ref={nameRef} defaultValue={trail.name} /><br />

                    <label htmlFor="lgt">Length:</label>
                    <input type="text" ref={lengthRef} id="lgt"  defaultValue={trail.length} /><br />

                    <label htmlFor="str">Start:</label>
                    <input type="text" ref={startRef} id="str" defaultValue={trail.start} /><br />

                    <label htmlFor="ed">End:</label>
                    <input type="text" ref={endRef} id="ed" defaultValue={trail.end} /><br />

                    <label htmlFor="tme">Duration:</label>
                    <input type="text" ref={timeRef} id="tme"  defaultValue={trail.time} /><br />
                   
                        <label htmlFor="imag">Image:</label>
                        <input type="text" ref={imgRef} id="imag"  defaultValue={trail.image} /><br />
                   
                        <label htmlFor="lat">Latitude:</label>
                        <input type="text" ref={latRef} id="lat"  defaultValue={trail.location? trail.location[0] : 0} /><br />
                       
                        <label htmlFor="long">Longitude:</label>
                        <input type="text" ref={longRef} id="long"  defaultValue={trail.location? trail.location[1] : 0} /><br />



                    <button>Submit</button>
                </form>
                <Link to={`/trails/${trail._id}`}>
                    <button>Back</button>
                </Link>
                
            </div>
        </div>
    );
}

export default Edit;
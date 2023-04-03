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

    useEffect(() => {
        getTrails(params.id).then(data => setTrails(data))
    }, [params.id])

    async function handleSubmit(e) {
        e.preventDefault()
        let updatedTrail= {
            name: nameRef.current.value,
            length: lengthRef.current.value,
            start: startRef.current.value,
            end: endRef.current.value
        }
        await updateTrails(trail._id, updatedTrail)
        navigate(`/trails/${trail._id}`)
    }

    return ( 
        <div>
            <h1>Edit Trail</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>
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
                <Link to={`/trails/${trail._id}`}>
                    <button>Back</button>
                </Link>
                
            </div>
        </div>
    );
}

export default Edit;
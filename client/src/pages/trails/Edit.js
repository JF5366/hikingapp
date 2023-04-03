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
            image: imgRef.current.value
        }
        await updateTrails(trail._id, updatedTrail)
        navigate(`/trails/${trail._id}`)
    }

    return ( 
        <div className='edit'>
            <h1>Edit Trail</h1>
            <div className='edits' style={{ flexDirection: 'column' }}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nme">Name:</label><br />
                    <input type="text" id="nme" ref={nameRef} defaultValue={trail.name} /><br />

                    <label htmlFor="lgt">Length:</label><br />
                    <input type="text" ref={lengthRef} id="lgt"  defaultValue={trail.length} /><br />

                    <label htmlFor="str">Start:</label><br />
                    <input type="text" ref={startRef} id="str" defaultValue={trail.start} /><br />

                    <label htmlFor="ed">End:</label><br />
                    <input type="text" ref={endRef} id="ed" defaultValue={trail.end} /><br />

                    <label htmlFor="tme">Duration:</label><br />
                    <input type="text" ref={timeRef} id="tme"  defaultValue={trail.time} /><br />
                    <div>
                        <label htmlFor="imag">Image:</label><br />
                        <input type="text" ref={imgRef} id="imag"  defaultValue={trail.image} /><br />
                    </div>

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
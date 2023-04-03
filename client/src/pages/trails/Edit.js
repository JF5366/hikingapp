import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getTrails, updateTrails } from '../../services/trailService'

function Edit() {

    const [trail, setTrail] = useState({})

    const navigate = useNavigate()
    const params = useParams()

    const bodyRef = useRef()
    const subjectRef = useRef()

    useEffect(() => {
        getTrails(params.id).then(data => setTrails(data))
    }, [params.id])

    async function handleSubmit(e) {
        e.preventDefault()
        let updatedTrail= {
            subject: subjectRef.current.value,
            body: bodyRef.current.value
        }
        await updateTrails(trail._id, updatedTrail)
        navigate(`/trails/${trail._id}`)
    }

    return ( 
        <div>
            <h1>Edit Trail</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nme">Subject:</label><br />
                    <input type="text" id="nme" ref={subjectRef} defaultValue={trail.subject} /><br /><br />

                    <label htmlFor="clr">Body:</label><br />
                    <textarea ref={bodyRef} id="clr" cols="30" rows="10" defaultValue={trail.body} /><br /><br />

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
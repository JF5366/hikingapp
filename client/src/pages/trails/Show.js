import { useEffect, useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { createComment, deleteComment } from "../../services/commentService"
import { deleteTrails, getTrails } from "../../services/trailService"

function Show({ user }) {

    const [trail, setTrail] = useState({})

    const navigate = useNavigate()
    const params = useParams()
    const bodyRef = useRef()
    const detailsRef = useRef()

    useEffect(() => {
        async function loadData() {
            const data = await getTrails(params.id)
            if (!data) navigate('/trails')
            setTrail(data)
        }
        loadData()
    }, [params.id])

    async function handleDeleteComment(comment) {
        await deleteComment(comment._id, trail._id)
        let updatedTrail = { ...trail }
        updatedTrail.comments = updatedTrail.comments.filter(c => c._id !== comment._id)
        setTrail(updatedTrail)
    }

    async function handleDelete() {
        await deleteTrails(trail._id)
        navigate('/trails')
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let comment = {
            body: bodyRef.current.value,
            user
        }

        const newComment = await createComment(comment, trail._id)
        let updatedTrail = { ...trail }
        updatedTrail.comments.push(newComment)
        setTrail(updatedTrail)
        bodyRef.current.value = ''
        detailsRef.current.open = false
    }

    return (
            <div>
                <div className="trailz">
                    <h2>{trail.subject}</h2>
                    <h5 style={{ opacity: '.3'}}>Trail by {trail.user} on {new Date(trail.createdAt).toLocaleDateString()} at {new Date(trail.createdAt).toLocaleTimeString()}</h5>
                    <div className='p-body'>{trail.body}</div><br /><br />

                    {
                        trail.comments?.length ?
                        <>
                            <div>Comments:</div>
                            <div>{trail.comments.map((comment, i) => 
                                <div key={i} className="comm">
                                    <div>{comment.user}</div>
                                    <div>{comment.body}</div>
                                    {comment.user === user &&
                                        <>
                                            <button onClick={() => handleDeleteComment(comment)}>X</button>
                                            <Link to={`/trails/${trail._id}/comments/${comment._id}`}><span>+</span></Link>
                                        </>
                                    }
                                </div>
                            )}</div>
                            <br/><br/>
                        </>
                        : ''
                    }
                    {user && 
                        <details ref={detailsRef}>
                            <summary style={{ opacity: '.5' }}>Leave a comment:</summary>
                            <form onSubmit={handleSubmit}>
                                <textarea ref={bodyRef} id="lc" cols="1" rows="1" />
                                <button>Comment</button>
                            </form>
                        </details>
                    }
                    
                    <div className="buttons">
                        {trail.user === user &&
                            <>
                                <button onClick={handleDeleteTrail}>Delete</button>
                                <Link to={`/trails/${trail._id}/edit`}>
                                    <button>Edit</button>
                                </Link>
                            </>
                        }
                        <Link to='/trails'>
                            <button>Back</button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default Show
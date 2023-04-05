import { useEffect, useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { createComment, deleteComment } from "../../services/commentService"
import { deleteTrails, getTrails, updateTrails } from "../../services/trailService"
import axios from 'axios'

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

    // async function handleEditTrails() {
    //     await updateTrails(trail._id)
    //     navigate('/trails/Edit')
    // }


    async function handleDeleteTrail() {
       // await deleteTrails(trail._id)
        console.log('hi')
        try {
            let token = localStorage.getItem("token")
            await axios.delete(`http://localhost:8080/trails/${trail._id}`, {headers: {
                Authorization: `Bearer ${token}`
            }})
        } catch(err) {
            console.log(err.message)
        }
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
        bodyRef.current.value = "";
        detailsRef.current.open = false
    }

    return (
            <div className="show">
                {/* <img className="bkimg" src={trail.image} alt="" /> */}
                <div className="trailz">
                  <div className="trailDisplay">
                    <div className="info">
                        <h2>{trail.name}</h2>
                        <h4>Trail Length: {trail.length} miles</h4>
                        <h4>Trail Start Location: {trail.start}</h4>
                        <h4>Trail End Location: {trail.end}</h4>
                        <h4>Estimated Time to Hike: {trail.time}</h4>
                    </div>
                    <div className="image">
                     <img style={{width:"300px", height:"300px"}} src={trail.image} alt="" />
                    </div>
                    </div>
                    <div>
                    <h5 style={{ opacity: '.3'}}>Trail by {trail.user} on {new Date(trail.createdAt).toLocaleDateString()} at {new Date(trail.createdAt).toLocaleTimeString()}</h5>
                    <div className='tBody'>{trail.body}</div>

                    {
                        trail.comments?.length ?
                        <div className="comments">
                            <div className="comment">Comments:</div>
                            <div>{trail.comments.map((comment, i) => 
                                <div key={i} className="comm">
                                    
                                    <div className="cBody">{comment.body}</div>
                                    <div className="cUser">{comment.user}</div>
                                    {comment.user === user &&
                                        <>
                                            <button onClick={() => handleDeleteComment(comment)}>Delete</button>
                                            <Link to={`/trails/${trail._id}/comments/${comment._id}`}><span>+</span></Link>
                                        </>
                                    }
                                </div>
                            )}</div>
                            <br/><br/>
                        </div>
                        : ''
                    }
                    {user && 
                        <details ref={detailsRef}>
                            <summary style={{ opacity: '.5' }}>Leave a comment:</summary>
                            <form onSubmit={handleSubmit}>
                                <textarea style={{width:"300px", height:"100px", margin:"auto"}} ref={bodyRef} id="lc" cols="10" rows="1" />
                                <button className="subComm">Submit</button>
                            </form>
                        </details>
                    }
                    
                    <div className="buttons">
                        {/* {trail.user === user && */}
                            <>
                                <button onClick={handleDeleteTrail}>Delete</button>
                                <Link to={`/trails/${trail._id}/edit`}>
                                    <button>Edit</button>
                                </Link>
                            </>
                        {/* // } */}
                        <Link to='/trails'>
                            <button>Back</button>
                        </Link>
                    </div>
                </div>
                </div>
            </div>
    )
}

export default Show
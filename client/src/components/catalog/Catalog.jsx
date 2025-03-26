import {Link} from 'react-router'

export default function Catalog(){
    return(
        <section>
            The catalog will be here and it will contain catalogItemComponents
            
            <ul>
                <li>
                    <div>
                    <img src="???" alt="Camera Image"/>
                    <h2>Camera Name</h2>
                    <p>Camera Price</p>
                    <p>Number of likes</p>
                    <p>Potential number of comments</p>
                    <Link to={`/cameras/cameraId/details`}>Details</Link>
                    </div>
                </li>
            </ul>
            
        </section>
    )
}
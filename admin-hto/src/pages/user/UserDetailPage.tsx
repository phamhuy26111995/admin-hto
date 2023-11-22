import React from 'react'
import { useParams } from 'react-router-dom';

const UserDetailPage = (props : any) => {
    let { userId } = useParams();

    
    return (
        <React.Fragment>
            <h1>User Detail {userId}</h1>
            <img src='http://drive.google.com/uc?export=view&id=1zPnaVvC4APAXUCGWKVytUnHymAu--5Th'></img>
        </React.Fragment>
    )
}

export default UserDetailPage;
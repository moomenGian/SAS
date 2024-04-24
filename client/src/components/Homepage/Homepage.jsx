import './Homepage.css'
import Navbar from '../Navbar/Navbar'
import SectionsPage from './SectionsPage'
import LoginPage from '../LoginPage/LoginPage'

function Homepage({authorized, setAuthorization}) {
    console.log(sessionStorage.getItem('authorized'));
    if(!sessionStorage.getItem('authorized')){
        return <LoginPage authorized={authorized} setAuthorization={setAuthorization}/>
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-1 px-0">
                        <Navbar />
                    </div>
                    <div className="col-11 px-0">
                        <SectionsPage />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage
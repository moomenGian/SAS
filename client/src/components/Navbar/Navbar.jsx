import './Navbar.css'
import schoolLogo from '../../assets/school-logo.png'
import settingsLogo from '../../assets/image 6.svg'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../Hooks/AuthContext'

function Navbar() {
    return (
        <>
            <nav>
                <img className='school-logo' src={schoolLogo} alt="school logo"/>
                <div className="links">
                    <Link to={'/Dashboard'} className='btn'>
                        DASHBOARD
                    </Link>
                    <Link to={'/'} className='btn'>
                        RECORDS
                    </Link>
                </div>

                
                <div className='footer'>
                    <Link to={'/Login'} className='btn'>
                        Log in
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar
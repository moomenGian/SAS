import './sectionHeader.css'
import searchIcon from '../../assets/searchIcon.png'
import { SearchComponent } from './SearchComponent'

function SectionHeader() {
    return (
        <div className="content">
            <h1>SECTION VIOLATION RECORDS</h1>
            <div>
                <SearchComponent />
                {/* <input type="text" placeholder='Search Students...'/>*/}
                {/* <img className='searchIcon' src={searchIcon} alt="searchIcon" />  */}
            </div>
        </div>
    )
}

export default SectionHeader
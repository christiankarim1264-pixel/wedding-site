import './styles.css';
import Link from "next/link";
import Countdown from "./Countdown";

export default function Header(){
    return(
        <>
        <img className="topPhoto" src='/pictures/pen-flourished-bird-image-GraphicsFairy-nobackground-blue2.png'/>
        <header className='mainHeader'>
            <div className=''>
                <h1 className='headerHeading py-3'>Christian & Raakel</h1>
                <p className='mainText'>JANUARY 23, 2027 || PIONEER LIVING HISTORY MUSEUM, AZ</p>
                <Countdown/>
            </div>
            {/* <hr/> */}
            <nav className="navLinks">
            <Link className='navBtn' href ='/'>Home</Link>
            <Link className='navBtn' href= '/RSVP'>RSVP</Link>
            <Link className='navBtn' href='https://www.amazon.com/wedding/share/christianandraakel' target='_blank' rel='noopener noreferrer'>Amazon Registry</Link>
            <Link className='navBtn' href='/About'>About the Venue</Link>
            </nav>
            {/* <img className="invitationPhoto" src="pictures/sample-invitation.jpg"/> */}
            
        </header>
        </>
    );
}
import './styles.css';
import Link from "next/link";

export default function Header(){
    return(
        <>
        <img className="topPhoto" src='pictures/pen-flourished-bird-image-GraphicsFairy-nobackground-blue2.png'/>
        <header className='mainHeader'>
            <div>
                <h1 className='headerHeading'>Christian&nbsp;Karim & Raakel&nbsp;Kariniemi</h1>
                <p className='mainText'>JANUARY 23, 2027 || PIONEER LIVING HISTORY MUSEUM, AZ</p>
                <br/>
            </div>
            {/* <hr/> */}
            <nav className="navLinks">
            <Link className='navBtn' href ='/'>Home</Link>
            <Link className='navBtn' href= '/RSVP'>RSVP</Link>
            <Link className='navBtn' href='/registry'>Registry</Link>
            </nav>
            {/* <img className="invitationPhoto" src="pictures/sample-invitation.jpg"/> */}
            
        </header>
        </>
    );
}
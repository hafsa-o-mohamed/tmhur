import {NavLink, Outlet } from "react-router-dom";
export default function HelpLayout(){
    return(
        <div className="help-layout">
            <h2>website Help</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            
            <nav>
                <NavLink to="faq">View the FAQ</NavLink>
                <NavLink to="contact">Contact Us</NavLink>
            </nav>

            <Outlet/>
        </div>
    )

}
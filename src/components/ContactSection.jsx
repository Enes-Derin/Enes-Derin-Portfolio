import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContact } from "../redux/contactSlice";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

export default function ContactSection() {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.contact);

    useEffect(() => {
        dispatch(fetchContact(1));
    }, [dispatch]);

    if (!data) return null;

    return (
        <section className="section contact-section">
            <h2>Contact</h2>

            <div className="contact-grid">
                <div className="contact-card">
                    <Mail />
                    <p>{data.email}</p>
                </div>
                <div className="contact-card">
                    <Phone />
                    <p>{data.phone}</p>
                </div>
                <div className="contact-card">
                    <MapPin />
                    <p>{data.location}</p>
                </div>
            </div>

            <div className="socials">
                <a className="social linkedin" href={data.linkedinLink} target="_blank">
                    <Linkedin size={22} />
                </a>
                <a className="social github" href={data.githubLink} target="_blank" >
                    <Github size={22} />
                </a>
            </div>
        </section>
    );
}



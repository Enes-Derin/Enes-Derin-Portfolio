import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbout } from "../redux/aboutSlice";

export default function AboutSection() {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.about);

    useEffect(() => {
        dispatch(fetchAbout(1));
    }, [dispatch]);

    if (!data) return null;

    return (
        <section className="section">
            <div className="about">
                <img
                    src={data.profileImage}
                    className="about-img"
                />
                <div>
                    <h2>About Me</h2>
                    <p>
                        {data.aboutText}
                    </p>
                </div>
            </div>
        </section>
    );
}

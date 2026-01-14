import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHero } from "../redux/heroSlice";

export default function HeroSection() {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.hero);

    useEffect(() => {
        dispatch(fetchHero(1));
    }, [dispatch]);

    if (!data) return null;

    return (
        <section className="hero">
            <div
                className="hero-bg"
                style={{
                    backgroundImage: `url(${data.backgroundImage})`,
                }}
            />
            <div className="hero-overlay" />
            <div className="hero-content">
                <h1>{data.title}</h1>
                <p>{data.subtitle}</p>
                <a className="hero-btn" href={data.buttonLink}>{data.buttonText}</a>
            </div>
        </section>
    );
}

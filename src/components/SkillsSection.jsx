import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "../redux/skillSlice";

export default function SkillsSection() {
    const dispatch = useDispatch();
    const { list } = useSelector(state => state.skill);

    useEffect(() => {
        dispatch(fetchSkills());
    }, [dispatch]);

    return (
        <section className="section">
            <h2>Skills</h2>

            <div className="skills">
                {list.map((s) => (
                    <div key={s.name} className="skill">
                        <div className="skill-header">
                            {s.iconUrl && (
                                <img
                                    src={s.iconUrl}
                                    alt={`${s.name} icon`}
                                    className="skill-icon"
                                />
                            )}
                            <span>{s.name}</span>
                        </div>

                        <div className="bar">
                            <div style={{ width: `${s.percentage}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

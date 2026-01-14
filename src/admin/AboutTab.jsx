import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createAbout, fetchAbout, updateAbout, deleteAbout } from "../redux/aboutSlice";

export default function AboutTab() {
    const dispatch = useDispatch();
    const about = useSelector((s) => s.about.data);
    const [aboutText, setAboutText] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        dispatch(fetchAbout());
    }, [dispatch]);

    useEffect(() => {
        if (about) {
            setAboutText(about.aboutText || "");
        }
    }, [about]);

    const submit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("aboutText", aboutText);
        if (profileImage) fd.append("profileImage", profileImage);

        if (about?.id) {
            dispatch(updateAbout({ id: about.id, formData: fd }));
        } else {
            dispatch(createAbout(fd));
        }

        setProfileImage(null);
    };

    const removeItem = () => {
        if (about?.id && confirm("Are you sure?")) {
            dispatch(deleteAbout(about.id));
        }
    };

    return (
        <div>
            <form onSubmit={submit} className="admin-form">
                <textarea
                    placeholder="About text"
                    value={aboutText}
                    onChange={(e) => setAboutText(e.target.value)}
                />
                <div className="file-input-container">
                    <input
                        type="file"
                        id="profile-image"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                    <label htmlFor="profile-image" className="file-input-label">
                        {profileImage ? "Dosya Değiştir" : "Profil Fotoğrafı Seç"}
                    </label>
                    {profileImage && <span className="file-name">{profileImage.name}</span>}
                </div>
                <button type="submit">{about?.id ? "Update About" : "Add About"}</button>
            </form>

            {about && (
                <div className="admin-list">
                    <div className="admin-list-item">
                        <div>
                            <p>{about.aboutText}</p>
                            {about.profileImage && <img src={about.profileImage} alt="profile" width={50} />}
                        </div>
                        <div>
                            <button className="update" onClick={() => setAboutText(about.aboutText)}>Update</button>
                            <button className="delete" onClick={removeItem}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

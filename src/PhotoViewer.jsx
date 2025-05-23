import { useEffect, useState } from "react";
import { supabase } from "./supabaseclient";

const PhotoViewer = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSessionAndCategories = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      setUser(user);

      if (user) {
        const { data: cats, error } = await supabase
          .from("categories")
          .select("*")
          .eq("user_id", user.id);

        if (error) console.error("Category fetch error:", error);
        else setCategories(cats);
      }
    };

    getSessionAndCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) fetchPhotos();
  }, [selectedCategory]);

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .eq("category_id", selectedCategory)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Photo fetch error:", error);
    } else {
      setPhotos(data);
    }
  };

  return (
    <div className="photo-viewer-container">
      <h2>📁 View Your Photos</h2>
      <select
        className="input"
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <div className="photo-gallery">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.url}
            alt="Uploaded"
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoViewer;

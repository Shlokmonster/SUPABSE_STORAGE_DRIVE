import { useState, useEffect } from "react";
import { supabase } from "./supabaseclient";

const PhotoUploader=()=>{

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user);
    };

    getSession();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    const { data } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", user.id);
    setCategories(data || []);
  };
  const handleUpload = async () => {
    if (!image || !categoryId || !user) return;

    const fileExt = image.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data: storageData, error: uploadError } = await supabase.storage
      .from("photos")
      .upload(`${user.id}/${fileName}`, image);

    if (uploadError) return alert("Upload failed!");

    const publicUrl = supabase.storage
      .from("photos")
      .getPublicUrl(`${user.id}/${fileName}`).data.publicUrl;

    const { error: dbError } = await supabase.from("photos").insert([
      {
        url: publicUrl,
        user_id: user.id,
        category_id: categoryId,
      },
    ]);

    if (dbError) {
      alert("Photo DB insert failed");
    } else {
      alert("Photo uploaded!");
    }
  };

  return (
    <div>
      <h2>Upload a Photo</h2>
      <select onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option value={cat.id} key={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <br />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default PhotoUploader;

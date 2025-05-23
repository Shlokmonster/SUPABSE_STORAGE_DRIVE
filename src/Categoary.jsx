import { supabase } from "./supabaseclient";
import { useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState(""); // ✅ declared properly

  const fetchCategories = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching categories:", error.message);
      } else {
        setCategories(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
    }
  };

  const createCategory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !categoryName.trim()) return;

      const { error } = await supabase.from("categories").insert([
        {
          name: categoryName,
          user_id: user.id,
        },
      ]);

      if (error) {
        alert("Error adding category");
        console.error(error.message);
      } else {
        setCategoryName("");
        fetchCategories(); // refresh the list
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="categories-box">
    <h3>📂 Your Categories</h3>
    <input
      value={categoryName}
      onChange={(e) => setCategoryName(e.target.value)}
      placeholder="New category"
    />
    <button onClick={createCategory}>Add</button>
    <ul>
      {categories.map((cat) => (
        <li key={cat.id}>{cat.name}</li>
      ))}
    </ul>
  </div>
  );
};

export default Categories;

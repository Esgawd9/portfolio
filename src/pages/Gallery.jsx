import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Search, Upload, Loader2, Grid } from "lucide-react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { THEME } from "../config/theme";
import GalleryCard from "../components/GalleryCard";

// ==========================================
// COMPONENT: GALLERY PAGE
// ==========================================
const Gallery = ({ isDarkMode, user }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "Animals",
    difficulty: "Intermediate",
    image: "",
    desc: "",
    artist: "",
    paper: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", msg: "" });
  const fileInputRef = useRef(null);

  // TODO: Categories
  const categories = [
    "All",
    // "Animals",
    // "Insects",
  ];

  // Theme Shortcuts
  const cardBg = isDarkMode ? THEME.dark.card : THEME.light.card;
  const border = isDarkMode ? THEME.dark.border : THEME.light.border;
  const textMain = isDarkMode ? THEME.dark.text : THEME.light.text;
  const inputClass = `p-2 rounded border w-full ${
    isDarkMode
      ? `${THEME.dark.input} ${THEME.dark.inputBorder} ${THEME.dark.inputText} placeholder-gray-400`
      : `${THEME.light.input} ${THEME.light.inputBorder} ${THEME.light.inputText}`
  }`;
  const dashBorder = isDarkMode ? "border-slate-600" : "border-stone-300";
  const hoverBg = isDarkMode ? "hover:bg-slate-700" : "hover:bg-stone-100";

  const adminBg = isDarkMode
    ? "bg-slate-800 border-slate-700"
    : editingId
    ? "bg-blue-50 border-blue-200"
    : "bg-red-50 border-red-200";

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "origami"), (snapshot) => {
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || "",
      category: item.category || "Animals",
      difficulty: item.difficulty || "Intermediate",
      image: item.image || "",
      desc: item.desc || "",
      artist: item.artist || "",
      paper: item.paper || "",
      date: item.date || "",
    });
    setImagePreview(null);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "Animals",
      difficulty: "Intermediate",
      image: "",
      desc: "",
      artist: "",
      paper: "",
      date: "",
    });
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSaveOrigami = async (e) => {
    e.preventDefault();
    setFormStatus({ type: "", msg: "" });

    if (!formData.title)
      return setFormStatus({ type: "error", msg: "Title is required" });
    if (!imageFile && !formData.image)
      return setFormStatus({
        type: "error",
        msg: "Please provide an image (Upload or URL)",
      });

    setIsUploading(true);
    try {
      let finalImageUrl = formData.image;

      if (imageFile) {
        const storageRef = ref(
          storage,
          `origami/${Date.now()}_${imageFile.name}`
        );
        const snapshot = await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      const dataToSave = { ...formData, image: finalImageUrl };

      if (editingId) {
        await updateDoc(doc(db, "origami", editingId), dataToSave);
        setFormStatus({ type: "success", msg: "Updated successfully!" });
      } else {
        await addDoc(collection(db, "origami"), {
          ...dataToSave,
          createdAt: serverTimestamp(),
        });
        setFormStatus({ type: "success", msg: "Added successfully!" });
      }

      handleCancelEdit();
      setTimeout(() => setFormStatus({ type: "", msg: "" }), 3000);
    } catch (error) {
      setFormStatus({ type: "error", msg: "Error: " + error.message });
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Delete permanently?"))
      await deleteDoc(doc(db, "origami", id));
  };

  const filtered = items.filter((item) => {
    return (
      (activeTab === "All" || item.category === activeTab) &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="animate-in slide-in-from-right-4 duration-500">
      {user && (
        <div
          className={`mb-12 p-6 rounded-xl border-2 border-dashed ${adminBg}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl flex items-center gap-2">
              {editingId ? (
                <>
                  <Pencil size={20} /> Edit Origami
                </>
              ) : (
                <>
                  <Plus size={20} /> Add New Origami
                </>
              )}
            </h3>
            {editingId && (
              <button
                onClick={handleCancelEdit}
                className={`text-sm text-gray-500 ${THEME.accent.textHover} underline`}
              >
                Cancel Edit
              </button>
            )}
          </div>

          {formStatus.msg && (
            <div
              className={`mb-4 p-3 rounded flex gap-2 ${
                formStatus.type === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {formStatus.msg}
            </div>
          )}

          <form
            onSubmit={handleSaveOrigami}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              placeholder="Title"
              className={inputClass}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              disabled={isUploading}
            />

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Image URL (Paste link here)"
                className={inputClass}
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                disabled={isUploading || imageFile}
              />

              <label
                className={`flex flex-col items-center justify-center w-full h-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${dashBorder} ${hoverBg} ${
                  isDarkMode ? "bg-slate-800" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Upload size={16} />{" "}
                  {imageFile ? imageFile.name : "Or upload file"}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  disabled={isUploading}
                />
              </label>
            </div>

            {(imagePreview || formData.image) && (
              <div className="md:col-span-2 flex justify-center bg-black/5 p-2 rounded">
                <img
                  src={imagePreview || formData.image}
                  alt="Preview"
                  className="h-32 object-contain rounded"
                />
              </div>
            )}

            <select
              className={inputClass}
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              disabled={isUploading}
            >
              {categories
                .filter((c) => c !== "All")
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
            <select
              className={inputClass}
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({ ...formData, difficulty: e.target.value })
              }
              disabled={isUploading}
            >
              <option value="Simple">Simple</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Complex">Complex</option>
              <option value="Super Complex">Super Complex</option>
            </select>
            <input
              type="date"
              className={inputClass}
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              disabled={isUploading}
            />
            <input
              placeholder="Artist / Designer"
              className={inputClass}
              value={formData.artist}
              onChange={(e) =>
                setFormData({ ...formData, artist: e.target.value })
              }
              disabled={isUploading}
            />
            <input
              placeholder="Paper Type"
              className={inputClass}
              value={formData.paper}
              onChange={(e) =>
                setFormData({ ...formData, paper: e.target.value })
              }
              disabled={isUploading}
            />

            <textarea
              placeholder="Description..."
              className={`${inputClass} md:col-span-2`}
              rows="2"
              value={formData.desc}
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
              disabled={isUploading}
            />

            <button
              type="submit"
              disabled={isUploading}
              className={`md:col-span-2 text-white py-3 rounded font-bold flex items-center justify-center gap-2 ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : editingId
                  ? `${THEME.secondary.bg} ${THEME.secondary.bgHover}`
                  : `${THEME.accent.bg} ${THEME.accent.bgHover}`
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin" />{" "}
                  {editingId ? "Updating..." : "Uploading..."}
                </>
              ) : editingId ? (
                "Update Origami"
              ) : (
                "Add to Gallery"
              )}
            </button>
          </form>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div className="flex items-center gap-3">
          <Grid className={`w-6 h-6 ${THEME.accent.text}`} />
          <h2 className="text-3xl font-bold">Gallery</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg border w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-red-500 ${inputClass}`}
            />
          </div>
          {/* TODO: do the category filtering */}
          {/* <div
            className={`inline-flex p-1 rounded-lg overflow-x-auto ${
              isDarkMode ? "bg-slate-800" : "bg-stone-200"
            }`}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === cat
                    ? isDarkMode
                      ? "bg-slate-600 text-white"
                      : "bg-white text-stone-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div> */}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className={`h-106 rounded-xl ${
                isDarkMode ? "bg-slate-800" : "bg-stone-200"
              }`}
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              user={user}
              isDarkMode={isDarkMode}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              cardBg={cardBg}
              border={border}
              textMain={textMain}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;

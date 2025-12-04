import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { THEME } from "../config/theme";

// ==========================================
// COMPONENT: GALLERY CARD
// ==========================================
const GalleryCard = ({
  item,
  user,
  isDarkMode,
  cardBg,
  border,
  textMain,
  handleEdit,
  handleDelete,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      to={`/gallery/${item.id}`}
      className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${cardBg} ${border}`}
    >
      {user && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleEdit(item);
            }}
            className={`${THEME.secondary.bg} text-white p-2 rounded-full ${THEME.secondary.bgHover} shadow-lg`}
            title="Edit"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={(e) => handleDelete(item.id, e)}
            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-lg"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {/* IMAGE CONTAINER WITH LOADER */}
      <div
        className={`aspect-square overflow-hidden relative ${
          isDarkMode ? "bg-slate-900" : "bg-stone-100"
        }`}
      >
        {/* Spinner */}
        {!isImageLoaded && (
          <div className={`absolute inset-0 flex items-center justify-center z-10 animate-pulse ${isDarkMode ? "bg-slate-800" : "bg-stone-200"}`}>
            <Loader2
              className={`animate-spin ${THEME.accent.text}`}
              size={32}
            />
          </div>
        )}

        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            isImageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          }`}
        />

        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded backdrop-blur-sm z-10">
          {item.difficulty}
        </div>
      </div>

      <div className="p-4">
        <h3 className={`text-lg text-center font-bold mb-2 ${textMain}`}>{item.title}</h3>
      </div>
    </Link>
  );
};

export default GalleryCard;

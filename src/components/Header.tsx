import React from "react";
import { Calendar, MapPin } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white py-8 px-4 shadow-lg relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-center mb-4">
          {/* Logo placeholder - using Calendar icon as reference */}
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-pink-100 mb-1">
              COMUNE DI RAMACCA
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
              Estate Ramacchese
            </h1>
            <div className="text-2xl md:text-3xl font-bold text-pink-200 mt-1">
              2025
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center text-pink-100 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <p className="text-sm md:text-base">
            Dal 27 Giugno al 27 Settembre • Ramacca
          </p>
        </div>

        <div className="text-center">
          <div className="inline-flex flex-wrap justify-center gap-2 text-xs md:text-sm font-medium">
            <span className="px-3 py-1 bg-pink-500 bg-opacity-80 rounded-full backdrop-blur-sm">
              Musica
            </span>
            <span className="px-3 py-1 bg-purple-500 bg-opacity-80 rounded-full backdrop-blur-sm">
              Sport
            </span>
            <span className="px-3 py-1 bg-green-500 bg-opacity-80 rounded-full backdrop-blur-sm">
              Cultura
            </span>
            <span className="px-3 py-1 bg-yellow-500 bg-opacity-80 rounded-full backdrop-blur-sm">
              Giochi
            </span>
            <span className="px-3 py-1 bg-cyan-500 bg-opacity-80 rounded-full backdrop-blur-sm">
              Arte
            </span>
            <span className="px-3 py-1 bg-emerald-500 bg-opacity-80 rounded-full backdrop-blur-sm">
              Tradizione
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

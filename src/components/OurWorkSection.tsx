import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/mockData';
import { ProjectItem } from '../types';
import { ArrowRight, MapPin, Clock, Palette, CheckCircle, X, ExternalLink } from 'lucide-react';

interface OurWorkSectionProps {
  onOpenEstimate: () => void;
}

export const OurWorkSection: React.FC<OurWorkSectionProps> = ({ onOpenEstimate }) => {
  const [filter, setFilter] = useState<'all' | 'interior' | 'exterior'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  return (
    <section id="work" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-amber-400"></span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1a30] tracking-tight font-display">
              Our Work
            </h2>
            <span className="h-px w-8 bg-amber-400"></span>
          </div>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Explore Our Recent Projects Across Auckland
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[
              { label: 'All Projects', value: 'all' },
              { label: 'Interior Living & Kitchens', value: 'interior' },
              { label: 'Exterior Villas & Estates', value: 'exterior' }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.value
                    ? 'bg-[#0b1a30] text-amber-300 shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5 Project Showcase Cards matching the screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Project Image */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                {/* Location Pill */}
                <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-semibold text-white flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{project.location}</span>
                </div>

                {/* Inspect Overlay Prompt */}
                <div className="absolute bottom-2.5 right-2.5 bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <span>View</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>{project.completionTime}</span>
                  </span>
                  <span className="text-amber-600 font-bold hover:underline">
                    Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Projects button matching flyer */}
        <div className="mt-10 text-center">
          <button
            onClick={() => onOpenEstimate()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#0b1a30] hover:bg-slate-800 text-white shadow-md transition-all cursor-pointer"
          >
            <span>View More Projects & Get A Quote</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

      </div>

      {/* Interactive Project Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-900 relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/80 px-3 py-1 rounded-md text-xs text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedProject.location}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Completed Case Study
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0b1a30]">
                  {selectedProject.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Duration</span>
                  <p className="text-xs font-bold text-slate-800">{selectedProject.completionTime}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Scope</span>
                  <p className="text-xs font-bold text-slate-800">{selectedProject.scope}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">NZ Paint Products</span>
                  <p className="text-xs font-bold text-amber-600">{selectedProject.colorsUsed.join(', ')}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenEstimate();
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-500 text-slate-950"
                >
                  Request Similar Project Quote →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

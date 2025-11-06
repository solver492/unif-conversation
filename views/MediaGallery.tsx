
import React from 'react';
import { mediaFiles } from '../data';
import type { MediaFile, FileType } from '../types';
import { SearchIcon, BellIcon, ChevronDownIcon, SortIcon, DocumentIcon, VideoIcon } from '../components/IconComponents';

const FileCard: React.FC<{ file: MediaFile }> = ({ file }) => {
    const renderThumbnail = () => {
        if (file.thumbnail_url) {
            if (file.type === 'pdf') {
                return <div className="bg-teal-600/20 text-teal-400 w-full h-full flex items-center justify-center"><DocumentIcon className="w-16 h-16"/></div>
            }
            if (file.thumbnail_url === '') {
                 return <div className="bg-slate-700 w-full h-full"></div>
            }
            return <img src={file.thumbnail_url} alt={file.name} className="w-full h-full object-cover" />;
        }
        return <div className="bg-slate-700 w-full h-full"></div>;
    };
    
    return (
        <div className="bg-slate-800 rounded-lg overflow-hidden flex flex-col">
            <div className="aspect-video bg-slate-700">
                {renderThumbnail()}
            </div>
            <div className="p-4">
                <h3 className="text-white font-semibold truncate">{file.name}</h3>
                <p className="text-sm text-slate-400 mt-1">From: {file.from}</p>
                 <p className="text-xs text-slate-500 mt-1">{file.date}</p>
            </div>
        </div>
    );
};

const MediaGallery: React.FC = () => {
    const [activeFilter, setActiveFilter] = React.useState<'all' | FileType>('all');
    const [searchQuery, setSearchQuery] = React.useState('');
    
    const filteredFiles = mediaFiles.filter(file => {
        const matchesType = activeFilter === 'all' || file.type === activeFilter;
        const matchesSearch = searchQuery === '' || 
            file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.from.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    return (
         <div className="flex flex-col h-full bg-slate-900">
            <header className="flex-shrink-0 flex items-center justify-between p-4 bg-slate-800/50 border-b border-slate-700">
                <h1 className="text-xl font-bold text-white">Media Gallery</h1>
                 <div className="flex items-center gap-4">
                    <button className="text-slate-400 hover:text-white"><BellIcon className="w-6 h-6"/></button>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="relative flex-grow max-w-lg">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                            type="search" 
                            placeholder="Search files by name..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                         <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-md p-1">
                            <button onClick={() => setActiveFilter('all')} className={`px-3 py-1 text-sm rounded ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}>All</button>
                            <button onClick={() => setActiveFilter('image')} className={`px-3 py-1 text-sm rounded ${activeFilter === 'image' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}>Images</button>
                            <button onClick={() => setActiveFilter('document')} className={`px-3 py-1 text-sm rounded ${activeFilter === 'document' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}>Documents</button>
                            <button onClick={() => setActiveFilter('video')} className={`px-3 py-1 text-sm rounded ${activeFilter === 'video' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}>Videos</button>
                        </div>
                        <button className="flex items-center gap-2 text-sm bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-700">
                           <SortIcon className="w-5 h-5"/> Sort by: Date <ChevronDownIcon className="w-4 h-4"/>
                        </button>
                    </div>
                </div>

                {searchQuery && (
                    <div className="mb-4 text-sm text-slate-400">
                        {filteredFiles.length} file{filteredFiles.length !== 1 ? 's' : ''} found
                    </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredFiles.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
                            <p>No files found</p>
                            {searchQuery && <p className="text-sm mt-2">Try adjusting your search</p>}
                        </div>
                    ) : (
                        filteredFiles.map(file => <FileCard key={file.id} file={file} />)
                    )}
                </div>
            </main>
        </div>
    );
};

export default MediaGallery;

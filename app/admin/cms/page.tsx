'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, FileText, Image as ImageIcon, X } from 'lucide-react';

// 1. Article Type
type Article = {
    id: number;
    title: string;
    category: string;
    author: string;
    status: 'Published' | 'Draft';
    views: number;
    image: string;
    date: string;
};

// 2. Mock Data
const initialArticles: Article[] = [
    {
        id: 1,
        title: "Navigating Postpartum Depression",
        category: "Pregnancy",
        author: "Dr. Lakshmi Nair",
        status: "Published",
        views: 1240,
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df4?auto=format&fit=crop&w=100",
        date: "Oct 24, 2023"
    },
    {
        id: 2,
        title: "Exam Stress: A Guide for Students",
        category: "Adolescent Health",
        author: "Ms. Priya K",
        status: "Published",
        views: 890,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=100",
        date: "Oct 20, 2023"
    },
    {
        id: 3,
        title: "Understanding Gender Dysphoria",
        category: "Queer Support",
        author: "Mx. Alex V",
        status: "Draft",
        views: 0,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100",
        date: "Pending"
    }
];

export default function CMSPage() {
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [newPost, setNewPost] = useState({
        title: '', category: 'Adolescent Health', content: '', image: '', status: 'Published'
    });

    const handleAddPost = (e: React.FormEvent) => {
        e.preventDefault();
        const post: Article = {
            id: Date.now(),
            title: newPost.title,
            category: newPost.category,
            author: "Admin", // Default
            status: newPost.status as 'Published' | 'Draft',
            views: 0,
            image: newPost.image || "https://source.unsplash.com/random/100x100/?wellness",
            date: new Date().toLocaleDateString()
        };
        setArticles([post, ...articles]);
        setIsModalOpen(false);
        setNewPost({ title: '', category: 'Adolescent Health', content: '', image: '', status: 'Published' });
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this article?")) {
            setArticles(articles.filter(a => a.id !== id));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setNewPost({ ...newPost, image: URL.createObjectURL(e.target.files[0]) });
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Content Management (CMS)</h1>
                    <p className="text-gray-500">Manage blog posts and resources for &quot;Her Space&quot;.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-pink-500 transition shadow-lg"
                >
                    <Plus size={20} /> Write New Article
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><FileText /></div>
                    <div>
                        <h3 className="text-2xl font-bold">{articles.length}</h3>
                        <p className="text-xs text-gray-500">Total Articles</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-xl text-green-600"><Eye /></div>
                    <div>
                        <h3 className="text-2xl font-bold">2.4k</h3>
                        <p className="text-xs text-gray-500">Total Reads</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-xl text-orange-600"><Edit2 /></div>
                    <div>
                        <h3 className="text-2xl font-bold">{articles.filter(a => a.status === 'Draft').length}</h3>
                        <p className="text-xs text-gray-500">Drafts Pending</p>
                    </div>
                </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-4">
                    <Search className="text-gray-400" size={20} />
                    <input type="text" placeholder="Search articles..." className="flex-1 outline-none text-gray-600" />
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                        <tr>
                            <th className="px-6 py-4">Article Details</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Views</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {articles.map((article) => (
                            <tr key={article.id} className="hover:bg-gray-50/50 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <img src={article.image} className="w-12 h-12 rounded-lg object-cover" alt="Thumbnail" />
                                        <div>
                                            <h4 className="font-bold text-gray-800">{article.title}</h4>
                                            <p className="text-xs text-gray-500">by {article.author} • {article.date}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                                        {article.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`flex items-center gap-2 text-xs font-bold ${article.status === 'Published' ? 'text-green-600' : 'text-orange-500'}`}>
                                        <span className={`w-2 h-2 rounded-full ${article.status === 'Published' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                                        {article.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-600">
                                    {article.views.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(article.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Article Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold">Write New Article</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="text-gray-400 hover:text-red-500" /></button>
                        </div>

                        <form onSubmit={handleAddPost} className="p-8 space-y-6">

                            {/* Image Upload */}
                            <div className="w-full h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center relative cursor-pointer group hover:bg-gray-100 transition">
                                {newPost.image ? (
                                    <img src={newPost.image} className="w-full h-full object-cover rounded-xl" />
                                ) : (
                                    <>
                                        <ImageIcon className="text-gray-400 mb-2 group-hover:scale-110 transition" />
                                        <p className="text-sm text-gray-400 font-medium">Click to upload cover image</p>
                                    </>
                                )}
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Article Title</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. 5 Tips for Better Sleep"
                                    className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-pink-300 text-lg font-medium"
                                    value={newPost.title}
                                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                                    <select
                                        className="w-full p-3 rounded-xl border border-gray-200 outline-none bg-white"
                                        value={newPost.category}
                                        onChange={e => setNewPost({ ...newPost, category: e.target.value })}
                                    >
                                        <option>Adolescent Health</option>
                                        <option>Pregnancy & Postpartum</option>
                                        <option>Queer Support</option>
                                        <option>Career & Burnout</option>
                                        <option>Sexual Health</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                                    <select
                                        className="w-full p-3 rounded-xl border border-gray-200 outline-none bg-white"
                                        value={newPost.status}
                                        onChange={e => setNewPost({ ...newPost, status: e.target.value })}
                                    >
                                        <option value="Published">Publish Immediately</option>
                                        <option value="Draft">Save as Draft</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Content</label>
                                <textarea
                                    required
                                    rows={8}
                                    placeholder="Start writing your article here..."
                                    className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-pink-300"
                                    value={newPost.content}
                                    onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-pink-500 transition shadow-lg">
                                    {newPost.status === 'Published' ? 'Publish Article' : 'Save Draft'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

import React from 'react';
import Breadcrumbs from "@/components/common/Breadcrumbs";

const BlogPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-950">
            <Breadcrumbs />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-400 text-center">The blog is coming soon</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Stay tuned for updates!
            </p>
        </div>
    );
};

export default BlogPage;
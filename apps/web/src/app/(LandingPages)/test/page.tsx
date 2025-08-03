export default function TestPage() {
    return (
        <div className="container mx-auto max-w-3xl px-4 py-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    Hello World!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    This is a simple test page.
                </p>
                <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Welcome to the Test Page</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        This page is working correctly! You can use this as a starting point
                        for building new features.
                    </p>
                </div>
            </div>
        </div>
    )
}
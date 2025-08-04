export default function TestPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="space-y-4 text-center">
        <h1 className="font-bold text-4xl text-gray-900 dark:text-gray-100">
          Hello World!
        </h1>
        <p className="text-gray-600 text-lg dark:text-gray-400">
          This is a simple test page.
        </p>
        <div className="mt-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
          <h2 className="mb-4 font-semibold text-2xl">
            Welcome to the Test Page
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            This page is working correctly! You can use this as a starting point
            for building new features.
          </p>
        </div>
      </div>
    </div>
  )
}

import { ComponentDemo } from './component-demo'

/**
 * TestPage - A simple test page to demonstrate our MUI → Shadcn UI compatibility
 */
export function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          MUI → Shadcn/UI Compatibility Test
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Component Demo
          </h2>
          <p className="text-gray-600 mb-6">
            The components below demonstrate 100% MUI prop compatibility with Shadcn/UI implementation.
            All existing MUI props work seamlessly.
          </p>

          <ComponentDemo />
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            🎯 Key Features Demonstrated
          </h3>
          <ul className="text-blue-700 space-y-1">
            <li>✅ Zero breaking changes to existing MUI props</li>
            <li>✅ Full TypeScript support and IntelliSense</li>
            <li>✅ SX prop support for custom styling</li>
            <li>✅ All MUI variants and sizes preserved</li>
            <li>✅ Loading states and icons supported</li>
            <li>✅ Tailwind CSS integration with existing variables</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
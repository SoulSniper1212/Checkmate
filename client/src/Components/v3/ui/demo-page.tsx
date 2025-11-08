import React from 'react'
import { ComponentDemo } from './component-demo'

/**
 * DemoPage - A standalone page to showcase all MUI → Shadcn migrated components
 * This page demonstrates the compatibility layer in action
 */
export function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MUI → Shadcn UI Component Migration
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            This page demonstrates the successful migration of MUI components to Shadcn UI while maintaining
            full prop compatibility. All components below accept standard MUI props and render using Shadcn/Tailwind implementations.
          </p>
        </div>

        <ComponentDemo />
      </div>
    </div>
  )
}
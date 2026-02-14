import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { performance } from 'perf_hooks'
import CarCard from '../../components/CarCard'
import ServiceCard from '../../components/ServiceCard'

describe('Performance Optimizations', () => {
  test('should render CarCard efficiently without recreating objects', () => {
    // F2P Test: FAILS in base (performance issue), PASSES after optimization
    const startTime = performance.now()
    
    const features = [
      { feature: "Air Conditioning" },
      { feature: "Automatic Transmission" },
      { feature: "Diesel" }
    ]
    
    // Render multiple times to test performance
    for (let i = 0; i < 100; i++) {
      render(
        <CarCard
          category="Sedan"
          description="Comfortable sedan car"
          features={features}
          originalPrice="₹2000"
          discountedPrice="₹1800"
          discount="10%"
          onBook={() => {}}
        />
      )
    }
    
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    // Should render 100 times in under 100ms after optimization
    expect(renderTime).toBeLessThan(100)
  })

  test('should handle ServiceCard rendering efficiently', () => {
    // F2P Test: FAILS in base (inefficient rendering), PASSES after optimization
    const startTime = performance.now()
    
    const service = {
      title: "Airport Transfer",
      description: "Quick airport transfers",
      image: "test-image.jpg"
    }
    
    // Render multiple times
    for (let i = 0; i < 50; i++) {
      render(
        <ServiceCard
          service={service}
          onClick={() => {}}
        />
      )
    }
    
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    // Should render 50 times in under 50ms
    expect(renderTime).toBeLessThan(50)
  })

  test('should maintain normal functionality after optimization', () => {
    // P2P Test: PASSES in both base and after
    const features = [{ feature: "Air Conditioning" }]
    
    render(
      <CarCard
        category="Sedan"
        description="Comfortable sedan car"
        features={features}
        originalPrice="₹2000"
        discountedPrice="₹1800"
        discount="10%"
        onBook={() => {}}
      />
    )
    
    expect(screen.getByText('Sedan')).toBeInTheDocument()
    expect(screen.getByText('Comfortable sedan car')).toBeInTheDocument()
  })

  test('should handle empty features gracefully', () => {
    // P2P Test: PASSES in both base and after
    render(
      <CarCard
        category="Sedan"
        description="Comfortable sedan car"
        features={[]}
        originalPrice="₹2000"
        discountedPrice="₹1800"
        discount="10%"
        onBook={() => {}}
      />
    )
    
    expect(screen.getByText('Sedan')).toBeInTheDocument()
  })
})

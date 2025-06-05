import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <ApperIcon name="AlertTriangle" className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-surface-900 mb-4">404</h1>
          <p className="text-lg text-surface-600 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          Back to TaskFlow
        </Link>
      </div>
    </div>
  )
}

export default NotFound
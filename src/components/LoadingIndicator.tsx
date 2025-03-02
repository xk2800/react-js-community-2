import { LoaderCircle } from 'lucide-react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <LoaderCircle className="animate-spin size-12" />
    </div>
  )
}

export default LoadingIndicator
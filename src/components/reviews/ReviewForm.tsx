import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCreateReview, useUpdateReview } from '@/hooks/useReviews';

interface ReviewFormProps {
  productId: string;
  existingReview?: {
    id: string;
    rating: number;
    comment: string | null;
  };
  onClose?: () => void;
}

const ReviewForm = ({ productId, existingReview, onClose }: ReviewFormProps) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState(existingReview?.comment || '');
  
  const createReview = useCreateReview();
  const updateReview = useUpdateReview();
  
  const isEditing = !!existingReview;
  const isLoading = createReview.isPending || updateReview.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) return;

    if (isEditing) {
      await updateReview.mutateAsync({
        reviewId: existingReview.id,
        rating,
        comment,
        productId
      });
    } else {
      await createReview.mutateAsync({
        productId,
        rating,
        comment
      });
    }
    
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Your Rating</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1 transition-transform hover:scale-110"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={`w-6 h-6 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? 'text-secondary fill-secondary'
                    : 'text-muted'
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
          </span>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Your Review (optional)</label>
        <Textarea
          placeholder="Share your experience with this product..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </div>
      
      <div className="flex gap-2 justify-end">
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="hero" disabled={rating === 0 || isLoading}>
          {isLoading ? 'Submitting...' : isEditing ? 'Update Review' : 'Submit Review'}
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
